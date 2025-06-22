import { z } from "zod"

export const userSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  company: z.string().min(1).max(100),
  industry: z.string().optional(),
})

export const chatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(10000),
})

export const trainingDataSchema = z.object({
  dataType: z.enum(["product", "faq", "policy", "custom"]),
  content: z.any(),
})

export const apiKeySchema = z.object({
  name: z.string().min(1).max(50),
})

export function validateEnvVars() {
  const requiredEnvVars = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "OPENAI_API_KEY",
    "STRIPE_SECRET_KEY",
    "STRIPE_WEBHOOK_SECRET",
    "SMTP_HOST",
    "SMTP_USER",
    "SMTP_PASS",
    "PINECONE_API_KEY",
    "PINECONE_INDEX",
  ]

  const missing = requiredEnvVars.filter((envVar) => !process.env[envVar])

  if (missing.length > 0) {
    throw new Error(`Missing required environment variables: ${missing.join(", ")}`)
  }
}
