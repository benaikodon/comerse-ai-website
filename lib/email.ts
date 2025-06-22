import nodemailer from "nodemailer"

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST!,
  port: Number.parseInt(process.env.SMTP_PORT || "587"),
  secure: process.env.SMTP_PORT === "465",
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  },
})

export interface EmailOptions {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail({ to, subject, html, text }: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: `"Comerse.ai" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ""), // Strip HTML for text version
    })

    console.log("Email sent:", info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error("Email send error:", error)
    return { success: false, error: error.message }
  }
}

export const emailTemplates = {
  welcome: (name: string) => ({
    subject: "Welcome to Comerse.ai!",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #3B82F6;">Welcome to Comerse.ai, ${name}!</h1>
        <p>Thank you for joining Comerse.ai. We're excited to help you transform your customer support with AI.</p>
        <p>Here's what you can do next:</p>
        <ul>
          <li>Complete your profile setup</li>
          <li>Upload your product catalog</li>
          <li>Customize your AI assistant</li>
          <li>Install the chat widget on your website</li>
        </ul>
        <a href="${process.env.NEXT_PUBLIC_SITE_URL}/dashboard" 
           style="background: #3B82F6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0;">
          Get Started
        </a>
        <p>If you have any questions, feel free to reach out to our support team.</p>
        <p>Best regards,<br>The Comerse.ai Team</p>
      </div>
    `,
  }),

  trialExpiring: (name: string, daysLeft: number) => ({
    subject: `Your Comerse.ai trial expires in ${daysLeft} days`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #F59E0B;">Trial Expiring Soon</h1>
        <p>Hi ${name},</p>
        <p>Your Comerse.ai trial expires in ${daysLeft} days. Don't lose access to your AI-powered customer support!</p>
        <p>Upgrade now to continue enjoying:</p>
        <ul>
          <li>Unlimited AI responses</li>
          <li>Advanced analytics</li>
          <li>Priority support</li>
          <li>Custom integrations</li>
        </ul>
        <a href="${process.env.NEXT_PUBLIC_SITE_URL}/pricing" 
           style="background: #F59E0B; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0;">
          Upgrade Now
        </a>
      </div>
    `,
  }),

  paymentFailed: (name: string) => ({
    subject: "Payment Failed - Action Required",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #EF4444;">Payment Failed</h1>
        <p>Hi ${name},</p>
        <p>We couldn't process your payment for Comerse.ai. Please update your payment method to continue using our service.</p>
        <a href="${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/billing" 
           style="background: #EF4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0;">
          Update Payment Method
        </a>
      </div>
    `,
  }),
}
