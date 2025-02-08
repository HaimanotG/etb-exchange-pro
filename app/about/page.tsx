import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About ETB Exchange - Ethiopian Birr Exchange Rates",
  description:
    "Learn about ETB Exchange, your trusted source for real-time Ethiopian Birr exchange rates and currency conversion services.",
  keywords: [
    "ETB Exchange about",
    "Ethiopian currency service",
    "Birr exchange platform",
    "Ethiopian dollar rate",
    "unofficial ETB rate",
    "ETB market rates",
    "alternative exchange rates Ethiopia",
    "USDT Ethiopia",
    "ETB currency market",
    "Ethiopian forex rates",
    "real ETB rate",
    "current Ethiopian dollar price",
    "ETB market analysis",
    "Ethiopian currency market",
    "ETB trading rate",
    "Ethiopian money exchange",
  ],
};

export default function AboutPage() {
  return (
    <div className="mx-auto space-y-6">
      <h1 className="text-3xl font-bold">About ETB Exchange</h1>

      <div className="space-y-4">
        <p className="text-muted-foreground">
          ETB Exchange is your trusted source for real-time Ethiopian Birr (ETB)
          exchange rates. We provide accurate, up-to-date currency exchange
          information to help you make informed decisions.
        </p>

        <h2 className="text-xl font-semibold">Our Mission</h2>
        <p className="text-muted-foreground">
          To provide transparent, reliable, and real-time currency exchange
          information to individuals, businesses, and organizations dealing with
          Ethiopian Birr.
        </p>

        <h2 className="text-xl font-semibold">What We Offer</h2>
        <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
          <li>Real-time exchange rates</li>
          <li>Historical rate tracking</li>
          <li>Currency conversion tools</li>
          <li>Rate alerts and notifications</li>
        </ul>
      </div>
    </div>
  );
}
