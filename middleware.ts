import { NextResponse } from "next/server";

export async function middleware() {
  // if (request.nextUrl.pathname === "/api/rates") {
  //   const referer = request.headers.get("referer");
  //   const origin = request.headers.get("origin");
  //   const host = request.headers.get("host");

  //   // Allow requests from localhost during development
  //   if (host?.includes("localhost")) {
  //     return NextResponse.next();
  //   }

  //   // Allow requests from our domain
  //   if (
  //     referer?.includes(process.env.DOMAIN!) ||
  //     origin?.includes(process.env.DOMAIN!)
  //   ) {
  //     return NextResponse.next();
  //   }

  //   // Block all other requests
  //   return new NextResponse(
  //     JSON.stringify({
  //       error: "Access denied. This API is for internal use only.",
  //     }),
  //     {
  //       status: 403,
  //       headers: {
  //         "content-type": "application/json",
  //       },
  //     }
  //   );
  // }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
