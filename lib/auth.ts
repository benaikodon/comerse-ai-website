import { supabase, supabaseAdmin } from "./supabase"
import { createCustomer } from "./stripe"
import { sendEmail, emailTemplates } from "./email"
import crypto from "crypto"

export async function signUp({
  email,
  password,
  firstName,
  lastName,
  company,
  industry,
}: {
  email: string
  password: string
  firstName: string
  lastName: string
  company: string
  industry: string
}) {
  try {
    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          company,
          industry,
        },
      },
    })

    if (authError) throw authError

    if (authData.user) {
      // Create Stripe customer
      const stripeCustomer = await createCustomer({
        email,
        name: `${firstName} ${lastName}`,
        metadata: {
          user_id: authData.user.id,
          company,
        },
      })

      // Create user record
      const { error: dbError } = await supabaseAdmin.from("users").insert({
        id: authData.user.id,
        email,
        first_name: firstName,
        last_name: lastName,
        company,
        industry,
        stripe_customer_id: stripeCustomer.id,
      })

      if (dbError) throw dbError

      // Send welcome email
      await sendEmail({
        to: email,
        ...emailTemplates.welcome(`${firstName} ${lastName}`),
      })
    }

    return { data: authData, error: null }
  } catch (error) {
    console.error("Sign up error:", error)
    return { data: null, error }
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    return { data, error }
  } catch (error) {
    console.error("Sign in error:", error)
    return { data: null, error }
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export async function resetPassword(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
  })
  return { error }
}

export async function generateApiKey(userId: string, name: string) {
  const key = `ck_live_${crypto.randomBytes(32).toString("hex")}`
  const keyHash = crypto.createHash("sha256").update(key).digest("hex")

  const { error } = await supabaseAdmin.from("api_keys").insert({
    user_id: userId,
    key_hash: keyHash,
    name,
  })

  if (error) throw error

  return key
}

export async function validateApiKey(key: string) {
  const keyHash = crypto.createHash("sha256").update(key).digest("hex")

  const { data, error } = await supabaseAdmin
    .from("api_keys")
    .select("user_id, users(*)")
    .eq("key_hash", keyHash)
    .single()

  if (error || !data) return null

  // Update last used
  await supabaseAdmin.from("api_keys").update({ last_used: new Date().toISOString() }).eq("key_hash", keyHash)

  return data
}
