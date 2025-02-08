import { ImageResponse } from "next/og";
import { getRates } from "@/lib/get-rates";

export const runtime = "edge";
export const alt = "ETB Exchange Rates";
export const size = {
  width: 1200,
  height: 630,
};

export default async function Image() {
  const rates = await getRates();
  const latestRate = rates.items[0];

  return new ImageResponse(
    (
      <div
        style={{
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 style={{ fontSize: 60 }}>ETB Exchange Rates</h1>
        <p style={{ fontSize: 30 }}>
          Latest Rate: 1 USD = {latestRate?.rate} ETB
        </p>
      </div>
    ),
    {
      ...size,
    }
  );
}
