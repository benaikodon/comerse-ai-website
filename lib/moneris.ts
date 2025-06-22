import axios from "axios"

// Moneris Configuration
const MONERIS_CONFIG = {
  store_id: process.env.MONERIS_STORE_ID!,
  api_token: process.env.MONERIS_API_TOKEN!,
  environment: process.env.NODE_ENV === "production" ? "prod" : "qa", // qa for testing, prod for production
  country: process.env.MONERIS_COUNTRY || "CA", // CA for Canada, US for United States
}

// Moneris API URLs
const MONERIS_URLS = {
  CA: {
    prod: "https://www3.moneris.com",
    qa: "https://esqa.moneris.com",
  },
  US: {
    prod: "https://esplus.moneris.com",
    qa: "https://esplusqa.moneris.com",
  },
}

const BASE_URL =
  MONERIS_URLS[MONERIS_CONFIG.country as keyof typeof MONERIS_URLS][MONERIS_CONFIG.environment as "prod" | "qa"]

export const PLANS = {
  trial: {
    name: "Trial",
    queries: 1000,
    price: 0,
    plan_id: "trial",
  },
  basic: {
    name: "Basic",
    queries: 10000,
    price: 500, // $5.00 CAD
    plan_id: process.env.MONERIS_PLAN_BASIC!,
  },
  pro: {
    name: "Pro",
    queries: 50000,
    price: 2000, // $20.00 CAD
    plan_id: process.env.MONERIS_PLAN_PRO!,
  },
  enterprise: {
    name: "Enterprise",
    queries: -1, // unlimited
    price: 5000, // $50.00 CAD
    plan_id: process.env.MONERIS_PLAN_ENTERPRISE!,
  },
}

interface MonerisResponse {
  receipt: {
    ReceiptId: string
    ReferenceNum: string
    ResponseCode: string
    ISO: string
    AuthCode: string
    TransTime: string
    TransDate: string
    TransType: string
    Complete: string
    Message: string
    TransAmount: string
    CardType: string
    TransID: string
    TimedOut: string
  }
}

interface CreatePaymentParams {
  amount: number
  orderId: string
  customerId?: string
  customerEmail: string
  customerName: string
  plan: string
  successUrl: string
  cancelUrl: string
}

export async function createPaymentSession({
  amount,
  orderId,
  customerId,
  customerEmail,
  customerName,
  plan,
  successUrl,
  cancelUrl,
}: CreatePaymentParams) {
  try {
    // Create Moneris Hosted Payment Page
    const paymentData = {
      store_id: MONERIS_CONFIG.store_id,
      api_token: MONERIS_CONFIG.api_token,
      hpp_id: process.env.MONERIS_HPP_ID!, // Hosted Payment Page ID
      charge_total: (amount / 100).toFixed(2), // Convert cents to dollars
      order_id: orderId,
      cust_id: customerId || customerEmail,
      email: customerEmail,
      note: `Subscription: ${plan}`,
      lang: "en-CA",
      success_url: successUrl,
      cancel_url: cancelUrl,
      // Additional customer info
      bill_first_name: customerName.split(" ")[0] || "",
      bill_last_name: customerName.split(" ").slice(1).join(" ") || "",
      bill_email: customerEmail,
    }

    const response = await axios.post(`${BASE_URL}/HPPDP/index.php`, paymentData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })

    // Parse the response to get the payment URL
    const responseText = response.data
    const urlMatch = responseText.match(/location\.replace$$"([^"]+)"$$/)

    if (urlMatch && urlMatch[1]) {
      return {
        id: orderId,
        url: urlMatch[1],
        success: true,
      }
    }

    throw new Error("Failed to create payment session")
  } catch (error) {
    console.error("Moneris payment session error:", error)
    throw new Error("Payment session creation failed")
  }
}

export async function createRecurringPayment({
  amount,
  orderId,
  customerId,
  customerEmail,
  customerName,
  plan,
}: Omit<CreatePaymentParams, "successUrl" | "cancelUrl">) {
  try {
    const recurringData = {
      store_id: MONERIS_CONFIG.store_id,
      api_token: MONERIS_CONFIG.api_token,
      order_id: orderId,
      cust_id: customerId || customerEmail,
      amount: (amount / 100).toFixed(2),
      recur_unit: "month",
      start_now: "true",
      start_date: new Date().toISOString().split("T")[0], // YYYY-MM-DD
      num_recurs: "0", // 0 = indefinite
      period: "1", // every 1 month
      recur_amount: (amount / 100).toFixed(2),
    }

    const response = await axios.post(`${BASE_URL}/gateway2/servlet/MpgRequest`, recurringData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })

    return response.data
  } catch (error) {
    console.error("Moneris recurring payment error:", error)
    throw new Error("Recurring payment setup failed")
  }
}

export async function verifyPayment(orderId: string): Promise<MonerisResponse> {
  try {
    const verifyData = {
      store_id: MONERIS_CONFIG.store_id,
      api_token: MONERIS_CONFIG.api_token,
      order_id: orderId,
    }

    const response = await axios.post(`${BASE_URL}/gateway2/servlet/MpgRequest`, verifyData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })

    return response.data
  } catch (error) {
    console.error("Moneris payment verification error:", error)
    throw new Error("Payment verification failed")
  }
}

export async function refundPayment(orderId: string, amount?: number): Promise<MonerisResponse> {
  try {
    const refundData = {
      store_id: MONERIS_CONFIG.store_id,
      api_token: MONERIS_CONFIG.api_token,
      order_id: orderId,
      amount: amount ? (amount / 100).toFixed(2) : undefined, // Partial refund if amount specified
    }

    const response = await axios.post(`${BASE_URL}/gateway2/servlet/MpgRequest`, refundData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })

    return response.data
  } catch (error) {
    console.error("Moneris refund error:", error)
    throw new Error("Refund failed")
  }
}

export async function cancelRecurringPayment(customerId: string): Promise<MonerisResponse> {
  try {
    const cancelData = {
      store_id: MONERIS_CONFIG.store_id,
      api_token: MONERIS_CONFIG.api_token,
      cust_id: customerId,
    }

    const response = await axios.post(`${BASE_URL}/gateway2/servlet/MpgRequest`, cancelData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })

    return response.data
  } catch (error) {
    console.error("Moneris cancellation error:", error)
    throw new Error("Subscription cancellation failed")
  }
}

// Helper function to generate unique order IDs
export function generateOrderId(userId: string, plan: string): string {
  const timestamp = Date.now()
  return `${plan}_${userId}_${timestamp}`
}

// Helper function to check if payment was successful
export function isPaymentSuccessful(response: MonerisResponse): boolean {
  return response.receipt.ResponseCode === "00" || response.receipt.ResponseCode === "000"
}
