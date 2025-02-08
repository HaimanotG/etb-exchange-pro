export function CanonicalUrl({ path }: { path: string }) {
  const baseUrl = process.env.DOMAIN || "https://etbexchange.com";
  return <link rel="canonical" href={`${baseUrl}${path}`} />;
}
