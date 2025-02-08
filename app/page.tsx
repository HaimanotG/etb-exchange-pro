import { Suspense } from "react";
import type { Metadata } from "next";
// import { ArrowRight } from "lucide-react";

import { RatesTable } from "@/components/rates-table";
import { RatesChart } from "@/components/rates-chart";
import { RatesSkeleton } from "@/components/rates-skeleton";
import { ErrorBoundary } from "@/components/error-boundary";
import { SocialShare } from "@/components/social-share";
// import { RateComparison } from "@/components/rate-comparison";
import { RateAlerts } from "@/components/rate-alerts";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
import { getRates } from "@/lib/get-rates";

export const metadata: Metadata = {
  title: "Current ETB Exchange Rates",
  description:
    "Live Ethiopian Birr (ETB) exchange rates against major currencies. Updated in real-time.",
};

export default async function HomePage() {
  const data = await getRates();
  const rates = data.items;

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      {/* Header Section - Stack on mobile, row on larger screens */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          ETB Exchange Rates
        </h1>
        <div className="flex items-center gap-2 sm:gap-4">
          <RateAlerts />
          <SocialShare />
        </div>
      </div>
      {/* Main Content Section - Stack on mobile, grid on larger screens */}
      <div className="flex flex-col gap-6 lg:gap-8">
        <div className="max-w-full overflow-x-hidden">
          <h2 className="text-lg font-semibold mb-3 sm:text-xl sm:mb-4">
            Today&apos;s Trend
          </h2>
          <ErrorBoundary>
            <Suspense fallback={<RatesSkeleton />}>
              <RatesChart rates={rates} />
            </Suspense>
          </ErrorBoundary>
        </div>
        <div className="">
          <h2 className="text-lg font-semibold mb-3 sm:text-xl sm:mb-4">
            Current Rates
          </h2>
          <ErrorBoundary>
            <Suspense fallback={<RatesSkeleton />}>
              <RatesTable rates={rates} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
      {/* 
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:gap-8">
        <RateComparison />
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">
              Quick Calculator
            </CardTitle>
            <CardDescription className="text-sm">
              Calculate currency conversions on the go
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <Input
                  type="number"
                  placeholder="Amount"
                  className="w-full sm:w-[120px]"
                />
                <Select defaultValue="ETB">
                  <SelectTrigger className="w-full sm:w-[160px]">
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ETB">ETB - Ethiopian Birr</SelectItem>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                  </SelectContent>
                </Select>
                <ArrowRight className="hidden sm:block h-4 w-4" />
                <Select defaultValue="USD">
                  <SelectTrigger className="w-full sm:w-[160px]">
                    <SelectValue placeholder="Currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    <SelectItem value="ETB">ETB - Ethiopian Birr</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-lg border bg-card p-3 sm:p-4">
                <div className="grid gap-1">
                  <p className="text-sm font-medium">Result</p>
                  <p className="text-xl sm:text-2xl font-bold">0.00</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

       */}
    </div>
  );
}
