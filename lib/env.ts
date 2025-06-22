import { z } from "zod"

const envSchema = z.object({
  // App Configuration
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  NEXT_PUBLIC_SITE_URL: z.string().default("http://localhost:3000"),

  // Database (optional for demo)
  NEXT_PUBLIC_SUPABASE_URL: z.string().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),

  // AI Services (optional for demo)
  OPENAI_API_KEY: z.string().optional(),

  // Payments (optional for demo)
  MONERIS_STORE_ID: z.string().optional(),
  MONERIS_API_TOKEN: z.string().optional(),
  MONERIS_HPP_ID: z.string().optional(),
  MONERIS_WEBHOOK_SECRET: z.string().optional(),
  MONERIS_PLAN_BASIC: z.string().optional(),
  MONERIS_PLAN_PRO: z.string().optional(),
  MONERIS_PLAN_ENTERPRISE: z.string().optional(),
  MONERIS_COUNTRY: z.string().default("CA"),

  // Email (optional for demo)
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),

  // Vector Database (optional for demo)
  PINECONE_API_KEY: z.string().optional(),
  PINECONE_INDEX: z.string().optional(),

  // Security (optional for demo)
  JWT_SECRET: z.string().default("demo-jwt-secret-key"),
  ENCRYPTION_KEY: z.string().default("demo-encryption-key-32-chars-long"),

  // Rate Limiting (optional for demo)
  UPSTASH_REDIS_REST_URL: z.string().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),

  // Monitoring (optional)
  SENTRY_DSN: z.string().optional(),
  VERCEL_ANALYTICS_ID: z.string().optional(),

  // Cron Jobs (optional for demo)
  CRON_SECRET: z.string().default("demo-cron-secret"),
})

export type Env = z.infer<typeof envSchema>

let env: Env

try {
  env = envSchema.parse(process.env)
} catch (error) {
  console.warn("⚠️ Some environment variables are missing, using defaults for demo")
  // Provide safe defaults for demo mode
  env = envSchema.parse({
    NODE_ENV: process.env.NODE_ENV || "development",
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    JWT_SECRET: "demo-jwt-secret-key",
    ENCRYPTION_KEY: "demo-encryption-key-32-chars-long",
    CRON_SECRET: "demo-cron-secret",
    MONERIS_COUNTRY: "CA",
  })
}

// Helper functions to check if services are configured
export const isProductionReady = () => {
  return !!(
    env.NEXT_PUBLIC_SUPABASE_URL &&
    env.SUPABASE_SERVICE_ROLE_KEY &&
    env.OPENAI_API_KEY &&
    env.STRIPE_SECRET_KEY
  )
}

export const isDemoMode = () => !isProductionReady()

export { env }
