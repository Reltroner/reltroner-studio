// app/blog/disclaimer/head.jsx

export default function Head() {
    return (
    <> <title>Disclaimer | Reltroner Studio</title> <meta
         name="description"
         content="Legal disclaimer for Astralis Pinnacle, Red Pill concepts, and original narrative rights by Reltroner Studio."
       /> <meta property="og:title" content="Disclaimer | Reltroner Studio" /> <meta
         property="og:description"
         content="Legal disclaimer for Astralis Pinnacle, Red Pill concepts, and original narrative rights by Reltroner Studio."
       /> <meta property="og:image" content="https://reltroner.com/images/legal-disclaimer.webp" /> <meta property="og:url" content="https://reltroner.com/blog/disclaimer" /> <meta property="og:type" content="article" /> <meta property="og:site_name" content="Reltroner Studio" /> <meta name="twitter:card" content="summary_large_image" /> <meta name="twitter:title" content="Disclaimer | Reltroner Studio" /> <meta
         name="twitter:description"
         content="Legal disclaimer for Astralis Pinnacle, Red Pill concepts, and original narrative rights by Reltroner Studio."
       /> <meta name="twitter:image" content="https://reltroner.com/images/legal-disclaimer.webp" />
    
      {/* Structured Data: Legal Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "Legal Disclaimer",
            "description": "Legal disclaimer for Astralis Pinnacle and Red Pill concepts.",
            "image": "https://reltroner.com/images/legal-disclaimer.webp",
            "datePublished": "2025-03-26",
            "author": {
              "@type": "Person",
              "name": "Rei Reltroner",
              "url": "https://reltroner.com/about"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Reltroner Studio",
              "logo": {
                "@type": "ImageObject",
                "url": "https://reltroner.com/images/logo.webp"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://reltroner.com/blog/disclaimer"
            }
          })
        }}
      />
    </>
    
    );
}
    