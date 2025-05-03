// app/contact/head.jsx

export default function Head() {
    const title = "Contact | Reltroner Studio";
    const description =
      "Reach out to Reltroner Studio for collaboration, feedback, or visionary partnerships related to worldbuilding, storytelling, and digital development.";
    const image = "https://reltroner.com/images/contact-banner.webp";
    const url = "https://reltroner.com/contact";
  
    return (
      <>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta httpEquiv="Content-Language" content="en" />
  
        {/* OpenGraph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Reltroner Studio" />
  
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
        <meta name="twitter:creator" content="@reltroner" />
  
        {/* Structured Data: ContactPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ContactPage",
              "name": "Contact Reltroner Studio",
              "description": description,
              "url": url,
              "mainEntity": {
                "@type": "Organization",
                "name": "Reltroner Studio",
                "url": "https://reltroner.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://reltroner.com/images/logo.webp"
                }
              }
            })
          }}
        />
      </>
    );
  }
  