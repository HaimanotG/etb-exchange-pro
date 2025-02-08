export default function PrivacyPage() {
  return (
    <div className="mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground">
        Last updated: {new Date().toLocaleDateString()}
      </p>

      <div className="space-y-6">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Information We Collect</h2>
          <p className="text-muted-foreground">
            We collect information that you provide directly to us, including:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Usage data and preferences</li>
            <li>Device information</li>
            <li>Cookies and similar technologies</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>To provide and maintain our service</li>
            <li>To improve user experience</li>
            <li>To send service-related notifications</li>
            <li>To comply with legal obligations</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Cookies</h2>
          <p className="text-muted-foreground">
            We use cookies and similar tracking technologies to track activity
            on our service and hold certain information. You can instruct your
            browser to refuse all cookies or to indicate when a cookie is being
            sent.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Third-Party Services</h2>
          <p className="text-muted-foreground">
            We may employ third-party companies and individuals due to the
            following reasons:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>To facilitate our Service</li>
            <li>To provide analytics</li>
            <li>To serve advertisements</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Contact Us</h2>
          <p className="text-muted-foreground">
            If you have any questions about this Privacy Policy, please contact
            us at: contact@etbexchange.com
          </p>
        </section>
      </div>
    </div>
  );
}
