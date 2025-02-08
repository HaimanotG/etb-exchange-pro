import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - ETB Exchange Rates",
  description: "Review our terms of service for using ETB Exchange's Ethiopian Birr exchange rate services.",
  keywords: [
    "ETB Exchange terms",
    "currency exchange terms",
    "Ethiopian Birr terms",
    "exchange rate terms of service",
  ],
  openGraph: {
    title: "Terms of Service - ETB Exchange",
    description: "Terms and conditions for using our services",
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <div className="mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Terms of Service</h1>
      <p className="text-sm text-muted-foreground">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <div className="space-y-6">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">1. Terms of Use</h2>
          <p className="text-muted-foreground">
            By accessing and using this website, you accept and agree to be
            bound by these terms and conditions.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">2. Disclaimer</h2>
          <p className="text-muted-foreground">
            The information provided on this website is for general
            informational purposes only. All exchange rates are indicative only.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">3. Advertising Policy</h2>
          <p className="text-muted-foreground">
            This website contains third party advertisements and links to third
            party sites. We do not make any representation as to the accuracy or
            suitability of any of the information contained in those
            advertisements or sites.
          </p>
        </section>
      </div>
    </div>
  );
}
