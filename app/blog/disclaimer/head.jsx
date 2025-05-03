export default function Head() {
  const title = "Disclaimer | Reltroner Studio";
  const description =
    "Legal disclaimer for Astralis Pinnacle, Red Pill concepts, and original narrative rights by Reltroner Studio.";
  const image = "https://reltroner.com/images/legal-disclaimer.webp";
  const url = "https://reltroner.com/blog/disclaimer";
  const datePublished = "2025-03-26T00:00:00+07:00";
  const authorName = "Rei Reltroner";

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="Reltroner Studio" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Legal Disclaimer",
            description,
            image,
            datePublished,
            dateModified: datePublished,
            author: {
              "@type": "Person",
              name: authorName,
              url: "https://reltroner.com/about",
            },
            publisher: {
              "@type": "Organization",
              name: "Reltroner Studio",
              logo: {
                "@type": "ImageObject",
                url: "https://reltroner.com/images/logo.webp",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": url,
            },
          }),
        }}
      />
    </>
  );
}
