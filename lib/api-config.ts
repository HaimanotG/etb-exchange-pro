if (!process.env.NEXT_PUBLIC_API_URL) {
  console.warn("NEXT_PUBLIC_API_URL is not defined. Using fallback URL.");
}

export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  ENDPOINTS: {
    RATES: "/v1/rates",
  },
  DEFAULT_HEADERS: {
    "Content-Type": "application/json",
  },
  TIMEOUT: 5000, // 5 seconds
};

export class APIError extends Error {
  constructor(message: string, public status?: number, public data?: unknown) {
    super(message);
    this.name = "APIError";
  }
}

export async function fetchWithTimeout<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        ...API_CONFIG.DEFAULT_HEADERS,
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new APIError(
        `HTTP error! status: ${response.status}`,
        response.status,
        await response.json().catch(() => null)
      );
    }

    const data = await response.json();

    // Validate the response structure
    if (!data || typeof data !== "object") {
      throw new APIError("Invalid response format");
    }

    return data as T;
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }

    if (error instanceof Error) {
      if (error.name === "AbortError") {
        throw new APIError("Request timed out");
      }
      throw new APIError(error.message);
    }

    throw new APIError("An unknown error occurred");
  } finally {
    clearTimeout(timeoutId);
  }
}
