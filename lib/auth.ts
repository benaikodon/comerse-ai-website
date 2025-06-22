import { supabase, supabaseAdmin } from "./supabase"
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
      // Create user record with trial subscription
      const { error: dbError } = await supabaseAdmin.from("users").insert({
        id: authData.user.id,
        email,
        first_name: firstName,
        last_name: lastName,
        company,
        industry,
        subscription_tier: "trial", // Start with trial
        subscription_status: "active",
        trial_ends_at: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days trial
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

// Check if user's trial has expired
export async function checkTrialStatus(userId: string) {
  const { data: user } = await supabaseAdmin
    .from("users")
    .select("trial_ends_at, subscription_tier")
    .eq("id", userId)
    .single()

  if (!user) return { expired: true, daysLeft: 0 }

  if (user.subscription_tier !== "trial") {
    return { expired: false, daysLeft: -1 } // Not on trial
  }

  const trialEnd = new Date(user.trial_ends_at)
  const now = new Date()
  const daysLeft = Math.ceil((trialEnd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  return {
    expired: daysLeft <= 0,
    daysLeft: Math.max(0, daysLeft),
  }
}

// Upgrade user to paid plan (manual process)
export async function upgradeToPaidPlan(userId: string, plan: string) {
  const { error } = await supabaseAdmin
    .from("users")
    .update({
      subscription_tier: plan,
      subscription_status: "active",
      trial_ends_at: null,
    })
    .eq("id", userId)

  return { error }
}
