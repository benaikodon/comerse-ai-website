import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client for admin operations
export const supabaseAdmin = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Database Types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          first_name: string
          last_name: string
          company: string
          industry: string
          subscription_tier: "trial" | "basic" | "pro" | "enterprise"
          subscription_status: "active" | "canceled" | "past_due"
          stripe_customer_id: string | null
          api_key: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          first_name: string
          last_name: string
          company: string
          industry: string
          subscription_tier?: "trial" | "basic" | "pro" | "enterprise"
          subscription_status?: "active" | "canceled" | "past_due"
          stripe_customer_id?: string | null
          api_key?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          email?: string
          first_name?: string
          last_name?: string
          company?: string
          industry?: string
          subscription_tier?: "trial" | "basic" | "pro" | "enterprise"
          subscription_status?: "active" | "canceled" | "past_due"
          stripe_customer_id?: string | null
          api_key?: string
          updated_at?: string
        }
      }
      chat_sessions: {
        Row: {
          id: string
          user_id: string
          session_id: string
          messages: any[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          session_id: string
          messages?: any[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          messages?: any[]
          updated_at?: string
        }
      }
      training_data: {
        Row: {
          id: string
          user_id: string
          data_type: "product" | "faq" | "policy" | "custom"
          content: any
          status: "processing" | "completed" | "failed"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          data_type: "product" | "faq" | "policy" | "custom"
          content: any
          status?: "processing" | "completed" | "failed"
          created_at?: string
          updated_at?: string
        }
        Update: {
          content?: any
          status?: "processing" | "completed" | "failed"
          updated_at?: string
        }
      }
      analytics_events: {
        Row: {
          id: string
          user_id: string
          event_type: string
          event_data: any
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          event_type: string
          event_data: any
          created_at?: string
        }
      }
      api_keys: {
        Row: {
          id: string
          user_id: string
          key_hash: string
          name: string
          last_used: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          key_hash: string
          name: string
          last_used?: string | null
          created_at?: string
        }
        Update: {
          name?: string
          last_used?: string | null
        }
      }
    }
  }
}
