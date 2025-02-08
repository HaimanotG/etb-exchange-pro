import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us - ETB Exchange Rates",
  description:
    "Get in touch with ETB Exchange. We're here to help with your Ethiopian Birr exchange rate inquiries and feedback.",
  keywords: [
    "contact ETB Exchange",
    "Ethiopian currency support",
    "ETB rate inquiry",
    "currency exchange contact",
    "Birr exchange support",
    "ETB exchange assistance",
    "ETB currency exchange",
    "Ethiopian currency exchange",
    "ETB exchange contact",
    "ETB exchange support",
  ],
  openGraph: {
    title: "Contact ETB Exchange",
    description: "Get in touch with our team",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <p className="text-muted-foreground">
        Have questions or suggestions? We&apos;d love to hear from you.
      </p>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Get in Touch</h2>
        <div className="space-y-2">
          <p>Email: contact@etbexchange.com</p>
          <p>Location: Addis Ababa, Ethiopia</p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Business Hours</h2>
        <p>Monday - Friday: 9:00 AM - 5:00 PM (EAT)</p>
        <p>Saturday - Sunday: Closed</p>
      </div>
    </div>
  );
}
