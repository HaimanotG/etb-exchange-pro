import type { Metadata } from "next"
import { CurrencyConverter } from "@/components/currency-converter"

export const metadata: Metadata = {
  title: "Currency Converter | ETB Exchange Rates",
  description: "Convert Ethiopian Birr (ETB) to and from major currencies using real-time exchange rates.",
}

export default function ConverterPage() {
  return (
    <div className="container py-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Currency Converter</h1>
        <CurrencyConverter />
      </div>
    </div>
  )
}

