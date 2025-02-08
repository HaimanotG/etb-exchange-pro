export type Rate = {
  id: number;
  date: string;
  currency: string;
  rate: number;
};

export type RatesResponse = {
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  items: Rate[];
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

import { headers } from "next/headers";

export async function getRates(): Promise<RatesResponse> {
  try {
    let baseUrl = "/";

    if (typeof window === "undefined") {
      const headersList = await headers();
      const host = headersList.get("host");
      const protocol = headersList.get("x-forwarded-proto") || "http";
      baseUrl = `${protocol}://${host}`;
    } else {
      const url = new URL(window.location.href);
      baseUrl = `${url.protocol}//${url.host}`;
    }

    console.log(`Base URL: ${baseUrl}`);

    const response = await fetch(`${baseUrl}/api/rates`, {
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 60,
      },
    });

    if (!response.ok) {
      console.log(`Something went wrong try again later`);
      return {
        pageNumber: 0,
        totalPages: 0,
        totalCount: 0,
        items: [],
        hasNextPage: false,
        hasPreviousPage: false,
      };
    }

    const data = await response.json();

    if (!data.items || !Array.isArray(data.items)) {
      throw new Error("Invalid response format");
    }

    return data;
  } catch (error) {
    console.error("Failed to fetch rates:", error);
    return {
      pageNumber: 0,
      totalPages: 0,
      totalCount: 0,
      items: [],
      hasNextPage: false,
      hasPreviousPage: false,
    };
  }
}
