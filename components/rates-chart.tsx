"use client";

import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { ChartContainer } from "@/components/ui/chart";
import { Rate } from "@/lib/get-rates";

type ChartData = {
  id: number;
  date: string;
  currency: string;
  rate: number;
};

export function RatesChart({ rates }: { rates: Rate[] }) {
  const chartData = rates.map((item: ChartData) => ({
    ...item,
    date: new Date(item.date).toISOString(),
  }));

  const todayAverage = rates.length
    ? (rates.reduce((sum, rate) => sum + rate.rate, 0) / rates.length).toFixed(
        2
      )
    : "0.00";

  return (
    <div className="space-y-4">
      <div className="rounded-lg border bg-card p-4">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-muted-foreground">
            Today&apos;s Average
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">{todayAverage}</span>
            <span className="text-sm text-muted-foreground">ETB</span>
          </div>
        </div>
      </div>
      <ChartContainer
        config={{
          rate: {
            label: "Rate",
            color: "hsl(var(--primary))",
          },
        }}
        className="h-[300px]"
      >
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <XAxis
            dataKey="date"
            tickFormatter={(value) => {
              return new Intl.DateTimeFormat("en-US", {
                hour: "numeric",
                minute: "numeric",
              }).format(new Date(value));
            }}
            tickLine={false}
            axisLine={false}
            fontSize={12}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            fontSize={12}
            domain={["auto", "auto"]}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          Rate
                        </span>
                        <span className="font-bold text-muted-foreground">
                          {typeof payload[0].value === "number"
                            ? payload[0].value.toFixed(2)
                            : payload[0].value}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          Time
                        </span>
                        <span className="font-bold text-muted-foreground">
                          {new Date(
                            payload[0].payload.date
                          ).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Line
            type="monotone"
            dataKey="rate"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
