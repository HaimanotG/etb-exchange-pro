import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions - ETB Exchange Rates",
  description: "Find answers to common questions about Ethiopian Birr exchange rates and our services.",
  keywords: ["ETB FAQ", "Ethiopian Birr questions", "currency exchange FAQ"],
};

export default function FaqPage() {
  return (
    <div className="mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>

      <div className="space-y-6">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">About Our Exchange Rates</h2>
          
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-medium mb-2">How often are the rates updated?</h3>
              <p className="text-muted-foreground">
                Our exchange rates are updated multiple times throughout the day to ensure accuracy and reliability.
              </p>
            </div>

            <div className="border-b pb-4">
              <h3 className="font-medium mb-2">Which currencies do you support?</h3>
              <p className="text-muted-foreground">
                We currently support major currencies including USD, EUR, GBP, and others against the Ethiopian Birr (ETB).
              </p>
            </div>

            <div className="border-b pb-4">
              <h3 className="font-medium mb-2">Are these official bank rates?</h3>
              <p className="text-muted-foreground">
                We provide both official bank rates and market rates to give you a comprehensive view of the exchange landscape.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Using Our Service</h2>
          
          <div className="space-y-4">
            <div className="border-b pb-4">
              <h3 className="font-medium mb-2">Is this service free to use?</h3>
              <p className="text-muted-foreground">
                Yes, our service is completely free for all users.
              </p>
            </div>

            <div className="border-b pb-4">
              <h3 className="font-medium mb-2">Can I use these rates for business purposes?</h3>
              <p className="text-muted-foreground">
                While our rates are for informational purposes, we recommend consulting with official financial institutions for business transactions.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}