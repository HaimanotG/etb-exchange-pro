export function SocialMeta({ 
  title, 
  description, 
  image 
}: { 
  title: string;
  description: string;
  image?: string;
}) {
  const defaultImage = `${process.env.DOMAIN}/og-image.png`;

  return (
    <>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image || defaultImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image || defaultImage} />
    </>
  );
}