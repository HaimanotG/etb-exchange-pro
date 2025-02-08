export function validateEnv() {
  const requiredEnvVars = {
    NEXT_PUBLIC_DOMAIN: process.env.NEXT_PUBLIC_DOMAIN,
    DOMAIN: process.env.DOMAIN,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,

    GOOGLE_SITE_VERIFICATION_KEY: process.env.GOOGLE_SITE_VERIFICATION_KEY,
    NEXT_PUBLIC_GA_ID: process.env.GOOGLE_SITE_VERIFICATION_KEY,
    NEXT_PUBLIC_GTM_ID: process.env.GOOGLE_SITE_VERIFICATION_KEY,
    NEXT_PUBLIC_CLICKY_ID: process.env.GOOGLE_SITE_VERIFICATION_KEY,
  };

  const missingEnvVars = Object.entries(requiredEnvVars)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missingEnvVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingEnvVars.join(", ")}`
    );
  }
}
