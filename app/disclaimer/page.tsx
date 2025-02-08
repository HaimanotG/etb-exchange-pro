import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer - ETB Exchange Rates",
  description:
    "Important disclaimers regarding ETB Exchange's Ethiopian Birr exchange rate information and services.",
  keywords: [
    "ETB Exchange disclaimer",
    "currency exchange disclaimer",
    "Ethiopian Birr rates disclaimer",
    "exchange rate information notice",
  ],
  openGraph: {
    title: "Disclaimer - ETB Exchange",
    description: "Important information about our services",
    type: "website",
  },
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Disclaimer</h1>

      <div className="space-y-6">
        <section className="space-y-4">
          <p className="text-muted-foreground">
            The exchange rates displayed on this website are for informational
            purposes only. While we strive to provide accurate and up-to-date
            information, we cannot guarantee its accuracy or completeness.
          </p>

          <p className="text-muted-foreground">
            Users should verify any exchange rates with appropriate financial
            institutions before making any financial decisions or transactions.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Advertisement Disclosure</h2>
          <p className="text-muted-foreground">
            This website contains advertisements and may receive compensation
            for displaying certain content. This does not influence our exchange
            rate data or editorial content.
          </p>
        </section>
      </div>
    </div>
  );
}
