import type { Metadata } from "next"
import { HistoricalRates } from "@/components/historical-rates"

export const metadata: Metadata = {
  title: "Historical Data | ETB Exchange Rates",
  description: "View and analyze historical Ethiopian Birr (ETB) exchange rates against major currencies.",
}

export default function HistoricalPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Historical Exchange Rates</h1>
      <HistoricalRates />
    </div>
  )
}

