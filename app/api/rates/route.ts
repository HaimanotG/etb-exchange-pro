import { NextResponse } from "next/server";

export async function GET() {
  try {
    if (!process.env.DATA_SOURCE_API_URL) {
      throw new Error("API URL is not configured");
    }

    const response = await fetch(process.env.DATA_SOURCE_API_URL, {
      headers: {
        "Content-Type": "application/json",
      },
      // next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: "Failed to fetch rates" },
      { status: 500 }
    );
  }
}
