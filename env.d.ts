declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_DOMAIN: string;
      DOMAIN: string;
      NEXT_PUBLIC_API_URL: string;
      GOOGLE_SITE_VERIFICATION_KEY: string;
      NEXT_PUBLIC_ADSENSE_ID: string;
      NEXT_PUBLIC_GA_ID: string;
      NEXT_PUBLIC_GTM_ID: string;
      NEXT_PUBLIC_CLICKY_ID: string;
      // ... other env vars ...
    }
  }
}

export {};
