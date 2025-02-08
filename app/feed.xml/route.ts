import { getRates } from "@/lib/get-rates";
import { headers } from "next/headers";

export async function GET() {
  const rates = await getRates();
  const headersList = await headers();

  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto");
  const BASE_URL = `${protocol}://${host}`;

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>ETB Exchange Rates</title>
        <link>${BASE_URL}</link>
        <description>Latest Ethiopian Birr exchange rates</description>
        <language>en</language>
        ${rates.items
          .map(
            (rate) => `
          <item>
            <title>ETB/${rate.currency} Rate Update</title>
            <link>${BASE_URL}</link>
            <pubDate>${new Date(rate.date).toUTCString()}</pubDate>
            <description>Current rate: ${rate.rate}</description>
          </item>
        `
          )
          .join("")}
      </channel>
    </rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=600",
    },
  });
}
