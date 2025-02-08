import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/api/rates") {
    const referer = request.headers.get("referer");
    const origin = request.headers.get("origin");

    // Allow requests from our domain only
    if (
      !referer?.includes(process.env.DOMAIN!) &&
      !origin?.includes(process.env.DOMAIN!)
    ) {
      return new NextResponse(
        JSON.stringify({
          error: "Access denied. This API is for internal use only.",
        }),
        {
          status: 403,
          headers: {
            "content-type": "application/json",
          },
        }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
