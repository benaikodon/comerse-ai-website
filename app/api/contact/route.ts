import { type NextRequest, NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabase"
import { sendEmail } from "@/lib/email"
import { z } from "zod"

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  company: z.string().optional(),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  planInterest: z.enum(["basic", "pro", "enterprise"]).optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, company, phone, message, planInterest } = contactSchema.parse(body)

    // Store contact request
    const { data: contactRequest, error: dbError } = await supabaseAdmin
      .from("contact_requests")
      .insert({
        name,
        email,
        company,
        phone,
        message,
        plan_interest: planInterest,
        status: "new",
      })
      .select()
      .single()

    if (dbError) throw dbError

    // Send notification email to sales team
    await sendEmail({
      to: process.env.SALES_EMAIL || "sales@comerse.ai",
      subject: `New Contact Request from ${name}`,
      html: `
        <h2>New Contact Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "Not provided"}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Plan Interest:</strong> ${planInterest || "Not specified"}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr>
        <p><small>Contact ID: ${contactRequest.id}</small></p>
      `,
    })

    // Send confirmation email to customer
    await sendEmail({
      to: email,
      subject: "Thank you for contacting Comerse AI",
      html: `
        <h2>Thank you for your interest in Comerse AI!</h2>
        <p>Hi ${name},</p>
        <p>We've received your message and our team will get back to you within 24 hours.</p>
        <p>In the meantime, feel free to explore our platform with a free trial.</p>
        <p>Best regards,<br>The Comerse AI Team</p>
      `,
    })

    return NextResponse.json({
      success: true,
      message: "Contact request submitted successfully",
      id: contactRequest.id,
    })
  } catch (error) {
    console.error("Contact form error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid form data", details: error.errors }, { status: 400 })
    }

    return NextResponse.json({ error: "Failed to submit contact request" }, { status: 500 })
  }
}
