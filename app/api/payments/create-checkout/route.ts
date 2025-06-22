import { type NextRequest, NextResponse } from "next/server"
import { createPaymentSession, PLANS, generateOrderId } from "@/lib/moneris"
import { supabase } from "@/lib/supabase"
import { z } from "zod"

const checkoutSchema = z.object({
  plan: z.enum(["basic", "pro", "enterprise"]),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { plan } = checkoutSchema.parse(body)

    // Get user from session
    const accessToken = req.cookies.get("sb-access-token")?.value
    if (!accessToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(accessToken)
    if (userError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user data from database
    const { data: userData, error: dbError } = await supabase
      .from("users")
      .select("moneris_customer_id, email, first_name, last_name")
      .eq("id", user.id)
      .single()

    if (dbError || !userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const planConfig = PLANS[plan as keyof typeof PLANS]
    if (!planConfig) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 })
    }

    const orderId = generateOrderId(user.id, plan)
    const customerName = `${userData.first_name} ${userData.last_name}`

    const session = await createPaymentSession({
      amount: planConfig.price,
      orderId,
      customerId: userData.moneris_customer_id,
      customerEmail: userData.email,
      customerName,
      plan,
      successUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?success=true&order_id=${orderId}`,
      cancelUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing?canceled=true`,
    })

    // Store the order in database for tracking
    await supabase.from("payment_orders").insert({
      id: orderId,
      user_id: user.id,
      plan,
      amount: planConfig.price,
      status: "pending",
      created_at: new Date().toISOString(),
    })

    return NextResponse.json({
      orderId: session.id,
      url: session.url,
      success: session.success,
    })
  } catch (error) {
    console.error("Moneris checkout error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid input data" }, { status: 400 })
    }

    return NextResponse.json({ error: "Checkout failed" }, { status: 500 })
  }
}
