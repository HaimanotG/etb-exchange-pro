"use client"

import * as React from "react"
import { ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const currencies = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "USDT", name: "Tether USD" },
]

interface Rate {
  currency: string
  rate: number
  date: string
}

export function RateComparison() {
  const [currency1, setCurrency1] = React.useState("USD")
  const [currency2, setCurrency2] = React.useState("EUR")
  const [rates, setRates] = React.useState<Rate[]>([])
  const [isLoading, setIsLoading] = React.useState(false)

  const fetchRates = React.useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/rates")
      const data = await response.json()
      setRates(data.items || [])
    } catch (error) {
      console.error("Failed to fetch rates:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  React.useEffect(() => {
    fetchRates()
  }, [fetchRates])

  const getRate = (currency: string) => {
    return rates.find((r) => r.currency === currency)?.rate || 0
  }

  const calculateCrossRate = () => {
    const rate1 = getRate(currency1)
    const rate2 = getRate(currency2)
    return rate1 && rate2 ? (rate1 / rate2).toFixed(4) : "0.0000"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compare Rates</CardTitle>
        <CardDescription>Compare exchange rates between different currencies</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <Select value={currency1} onValueChange={setCurrency1}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <ArrowRight className="hidden sm:block" />
            <Select value={currency2} onValueChange={setCurrency2}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.code} - {currency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="grid gap-1">
              <p className="text-sm font-medium">Cross Rate</p>
              <p className="text-2xl font-bold">
                {isLoading ? (
                  <span className="animate-pulse">Loading...</span>
                ) : (
                  <>
                    1 {currency1} = {calculateCrossRate()} {currency2}
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

