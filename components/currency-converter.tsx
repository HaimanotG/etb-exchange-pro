"use client";

import * as React from "react";
import { ArrowDownUp, Calculator } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const currencies = [
  { code: "ETB", name: "Ethiopian Birr" },
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "USDT", name: "Tether USD" },
] as const;

const formSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Amount must be a positive number"
    ),
  fromCurrency: z.string().min(1, "Please select a currency"),
  toCurrency: z.string().min(1, "Please select a currency"),
});

export function CurrencyConverter() {
  const { toast } = useToast();
  const [result, setResult] = React.useState<number | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      fromCurrency: "ETB",
      toCurrency: "USD",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      // Simulate API call - replace with actual conversion logic
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/rates?currency=${values.toCurrency}`
      );
      const data = await response.json();

      if (!data.items || !data.items.length) {
        throw new Error("No rate available for this currency pair");
      }

      const rate = data.items[0].rate;
      const amount = Number.parseFloat(values.amount);

      if (values.fromCurrency === "ETB") {
        setResult(amount / rate);
      } else {
        setResult(amount * rate);
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to convert currency. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleSwapCurrencies() {
    const from = form.getValues("fromCurrency");
    const to = form.getValues("toCurrency");
    form.setValue("fromCurrency", to);
    form.setValue("toCurrency", from);
    setResult(null);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Currency Converter
        </CardTitle>
        <CardDescription>
          Convert between ETB and other major currencies using real-time
          exchange rates.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter amount" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="fromCurrency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>From</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.code} - {currency.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="toCurrency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>To</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {currencies.map((currency) => (
                          <SelectItem key={currency.code} value={currency.code}>
                            {currency.code} - {currency.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? "Converting..." : "Convert"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSwapCurrencies}
                  disabled={isLoading}
                >
                  <ArrowDownUp className="h-4 w-4" />
                  <span className="sr-only">Swap currencies</span>
                </Button>
              </div>

              {result !== null && (
                <div className="rounded-lg border bg-card p-4 text-card-foreground">
                  <div className="text-sm text-muted-foreground">Result</div>
                  <div className="mt-1 text-2xl font-bold">
                    {result.toFixed(2)} {form.getValues("toCurrency")}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    1 {form.getValues("fromCurrency")} ={" "}
                    {(
                      result / Number.parseFloat(form.getValues("amount"))
                    ).toFixed(4)}{" "}
                    {form.getValues("toCurrency")}
                  </div>
                </div>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
