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

export async function getRates(): Promise<RatesResponse> {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_DOMAIN + "/api/rates",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Something went wrong try again later`);
    }

    const data = await response.json();

    // Validate the response matches our expected format
    if (!data.items || !Array.isArray(data.items)) {
      throw new Error("Invalid response format");
    }

    return data;
  } catch (error) {
    console.error("Failed to fetch rates:", error);
    throw error; // Let the error boundary handle it
  }
}
