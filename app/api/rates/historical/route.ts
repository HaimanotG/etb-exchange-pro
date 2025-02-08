import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const from = searchParams.get("from")
    const to = searchParams.get("to")
    const currency = searchParams.get("currency")

    if (!process.env.NEXT_PUBLIC_API_URL) {
      throw new Error("API URL is not configured")
    }

    const queryParams = new URLSearchParams({
      ...(from && { from }),
      ...(to && { to }),
      ...(currency && { currency }),
    })

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/rates/historical?${queryParams}`, {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 60 },
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("API route error:", error)
    return NextResponse.json({ error: "Failed to fetch historical rates" }, { status: 500 })
  }
}

