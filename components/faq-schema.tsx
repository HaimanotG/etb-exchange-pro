export function FaqSchema() {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How often are ETB exchange rates updated?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our exchange rates are updated in real-time throughout the trading day.",
        },
      },
      {
        "@type": "Question",
        name: "Which currencies are supported?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We support major currencies including USD, EUR, GBP, and more against the Ethiopian Birr (ETB).",
        },
      },
      {
        "@type": "Question",
        name: "Are these official bank rates?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We provide both official bank rates and market rates to give you a comprehensive view of the Ethiopian Birr exchange rates.",
        },
      },
    ],
  };

  return (
    <script
      key="faq-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
    />
  );
}
