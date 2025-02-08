"use client";

import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { ChartContainer } from "@/components/ui/chart";

interface HistoricalChartProps {
  data: Array<{
    date: string;
    rate: number;
  }>;
  currency: string;
}

export function HistoricalChart({ data, currency }: HistoricalChartProps) {
  return (
    <ChartContainer
      config={{
        rate: {
          label: `Rate (${currency})`,
          color: "hsl(var(--primary))",
        },
      }}
      className="h-full"
    >
      <LineChart
        data={data}
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
              month: "short",
              day: "numeric",
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
                        Date
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {new Date(payload[0].payload.date).toLocaleDateString()}
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
  );
}
