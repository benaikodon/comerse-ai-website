import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const session = req.cookies.get("session")?.value

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userData = JSON.parse(Buffer.from(session, "base64").toString())

    // Mock user data - replace with database lookup
    const user = {
      email: userData.email,
      name: userData.name,
      company: "Demo Company",
      industry: "fashion",
      subscription: "pro",
      apiKey: "ck_live_demo123456789",
      usage: {
        currentMonth: 34000,
        limit: 50000,
        percentage: 68,
      },
      createdAt: "2024-01-15T10:30:00Z",
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error("Profile error:", error)
    return NextResponse.json({ error: "Invalid session" }, { status: 401 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = req.cookies.get("session")?.value
    const updates = await req.json()

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // In production, update user in database
    console.log("Updating user profile:", updates)

    return NextResponse.json({ success: true, message: "Profile updated" })
  } catch (error) {
    console.error("Profile update error:", error)
    return NextResponse.json({ error: "Update failed" }, { status: 500 })
  }
}
