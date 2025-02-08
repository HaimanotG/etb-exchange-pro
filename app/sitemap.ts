import type { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const headersList = await headers();

  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto");
  const BASE_URL = `${protocol}://${host}`;

  return [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 1,
    },
    // {
    //   url: `${BASE_URL}/historical`,
    //   lastModified: new Date(),
    //   changeFrequency: "daily",
    //   priority: 0.8,
    // },
    // {
    //   url: `${BASE_URL}/converter`,
    //   lastModified: new Date(),
    //   changeFrequency: "daily",
    //   priority: 0.8,
    // },
  ];
}
