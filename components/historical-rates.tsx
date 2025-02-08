"use client";

import { useCallback, useEffect, useState } from "react";
import { format, subDays } from "date-fns";
import { CalendarIcon, Download } from "lucide-react";
import type { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { HistoricalChart } from "./historical-chart";
import { HistoricalTable } from "./historical-table";
import { Rate } from "@/lib/get-rates";

const currencies = [
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "USDT", name: "Tether USD" },
];

export function HistoricalRates() {
  const { toast } = useToast();
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });
  const [currency, setCurrency] = useState("USD");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Rate[]>([]);

  const fetchHistoricalData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/rates/historical?` +
          new URLSearchParams({
            currency,
            from: date?.from?.toISOString() || "",
            to: date?.to?.toISOString() || "",
          })
      );

      if (!response.ok) throw new Error("Failed to fetch data");

      const result = await response.json();
      setData(result.items || []);
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch historical data. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [currency, date?.from, date?.to, toast]);

  useEffect(() => {
    if (date?.from && date?.to && currency) {
      fetchHistoricalData();
    }
  }, [date, currency, fetchHistoricalData]);

  const exportData = () => {
    const csvContent = [
      ["Date", "Rate"],
      ...data.map((item) => [
        format(new Date(item.date), "yyyy-MM-dd HH:mm:ss"),
        item.rate.toString(),
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", `etb-${currency}-rates.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Filter Options</CardTitle>
          <CardDescription>
            Select a date range and currency to view historical rates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                    disabled={{ after: new Date() }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="w-full md:w-[200px]">
              <Select value={currency} onValueChange={setCurrency}>
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      {c.code} - {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              className="w-full md:w-auto"
              onClick={exportData}
              disabled={isLoading || !data.length}
            >
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <Card>
          <CardContent className="pt-6">
            <div className="flex h-[400px] items-center justify-center">
              <div className="flex flex-col items-center gap-2">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                <p className="text-sm text-muted-foreground">Loading data...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : data.length > 0 ? (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Rate Trends</CardTitle>
              <CardDescription>
                Historical exchange rates for ETB/{currency}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <HistoricalChart data={data} currency={currency} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Historical Data</CardTitle>
              <CardDescription>
                Detailed view of exchange rates over time
              </CardDescription>
            </CardHeader>
            <HistoricalTable data={data} currency={currency} />
          </Card>
        </>
      ) : (
        <Card>
          <CardContent className="pt-6">
            <div className="flex h-[400px] items-center justify-center">
              <p className="text-muted-foreground">
                Select a date range and currency to view historical data
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
