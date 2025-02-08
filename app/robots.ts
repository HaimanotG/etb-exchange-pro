import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const allowCrawling = process.env.ALLOW_CRAWLING === "true";
  const headersList = await headers();

  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto");
  const BASE_URL = `${protocol}://${host}`;

  return {
    rules: {
      userAgent: "*",
      ...(allowCrawling
        ? {
            allow: "/",
          }
        : { disallow: "/" }),
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
