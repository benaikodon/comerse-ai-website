import { type NextRequest, NextResponse } from "next/server"
import { verifyPayment, isPaymentSuccessful } from "@/lib/moneris"
import { supabaseAdmin } from "@/lib/supabase"
import { sendEmail, emailTemplates } from "@/lib/email"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Moneris webhook verification
    const webhookSecret = process.env.MONERIS_WEBHOOK_SECRET
    const signature = req.headers.get("x-moneris-signature")

    if (!webhookSecret || !signature) {
      return NextResponse.json({ error: "Missing webhook verification" }, { status: 400 })
    }

    // Verify webhook signature (implement based on Moneris documentation)
    // This is a simplified version - implement proper signature verification

    const { event_type, order_id, customer_id, amount, status } = body

    switch (event_type) {
      case "payment.completed": {
        // Verify the payment with Moneris
        const paymentVerification = await verifyPayment(order_id)

        if (isPaymentSuccessful(paymentVerification)) {
          // Get order from database
          const { data: order } = await supabaseAdmin.from("payment_orders").select("*").eq("id", order_id).single()

          if (order) {
            // Update user subscription
            await supabaseAdmin
              .from("users")
              .update({
                subscription_tier: order.plan,
                subscription_status: "active",
                moneris_customer_id: customer_id,
              })
              .eq("id", order.user_id)

            // Update order status
            await supabaseAdmin.from("payment_orders").update({ status: "completed" }).eq("id", order_id)

            console.log(`Subscription activated for user ${order.user_id}: ${order.plan}`)
          }
        }
        break
      }

      case "payment.failed": {
        // Get order from database
        const { data: order } = await supabaseAdmin.from("payment_orders").select("*").eq("id", order_id).single()

        if (order) {
          // Update order status
          await supabaseAdmin.from("payment_orders").update({ status: "failed" }).eq("id", order_id)

          // Get user for email notification
          const { data: user } = await supabaseAdmin.from("users").select("*").eq("id", order.user_id).single()

          if (user) {
            // Send payment failed email
            await sendEmail({
              to: user.email,
              ...emailTemplates.paymentFailed(`${user.first_name} ${user.last_name}`),
            })
          }
        }
        break
      }

      case "subscription.cancelled": {
        // Get user by customer ID
        const { data: user } = await supabaseAdmin
          .from("users")
          .select("*")
          .eq("moneris_customer_id", customer_id)
          .single()

        if (user) {
          await supabaseAdmin
            .from("users")
            .update({
              subscription_tier: "trial",
              subscription_status: "canceled",
            })
            .eq("id", user.id)
        }
        break
      }

      case "recurring.payment.success": {
        // Handle successful recurring payment
        const { data: user } = await supabaseAdmin
          .from("users")
          .select("*")
          .eq("moneris_customer_id", customer_id)
          .single()

        if (user) {
          await supabaseAdmin.from("users").update({ subscription_status: "active" }).eq("id", user.id)
        }
        break
      }

      case "recurring.payment.failed": {
        // Handle failed recurring payment
        const { data: user } = await supabaseAdmin
          .from("users")
          .select("*")
          .eq("moneris_customer_id", customer_id)
          .single()

        if (user) {
          await supabaseAdmin.from("users").update({ subscription_status: "past_due" }).eq("id", user.id)

          // Send payment failed email
          await sendEmail({
            to: user.email,
            ...emailTemplates.paymentFailed(`${user.first_name} ${user.last_name}`),
          })
        }
        break
      }

      default:
        console.log(`Unhandled Moneris event type: ${event_type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Moneris webhook processing error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
