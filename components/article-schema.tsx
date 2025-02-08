export function ArticleSchema({ article }: { 
  article: {
    title: string;
    description: string;
    publishDate: string;
    modifiedDate: string;
  }
}) {
  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "datePublished": article.publishDate,
    "dateModified": article.modifiedDate,
    "publisher": {
      "@type": "Organization",
      "name": "ETB Exchange",
      "url": process.env.DOMAIN
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleData) }}
    />
  );
}