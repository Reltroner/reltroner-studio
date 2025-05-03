// app/about/head.jsx

export default function Head() {
    return (
      <>
        <title>About | Reltroner Studio</title>
        <meta
          name="description"
          content="Learn more about the mind behind Reltroner Studio and the world of Asthortera."
        />
        <meta property="og:title" content="About | Reltroner Studio" />
        <meta
          property="og:description"
          content="Learn more about the mind behind Reltroner Studio and the world of Asthortera."
        />
        <meta property="og:image" content="https://reltroner.com/images/logo.webp" />
        <meta property="og:url" content="https://reltroner.com/about" />
        <meta property="og:type" content="profile" />
        <meta property="og:site_name" content="Reltroner Studio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About | Reltroner Studio" />
        <meta
          name="twitter:description"
          content="Learn more about the mind behind Reltroner Studio and the world of Asthortera."
        />
        <meta name="twitter:image" content="https://reltroner.com/images/logo.webp" />
  
        {/* Structured Data: Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Rei Reltroner",
              "alternateName": "Raidan",
              "url": "https://reltroner.com/about",
              "sameAs": [
                "https://github.com/reltroner",
                "https://twitter.com/reltroner",
                "https://www.youtube.com/@reltroner"
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "Reltroner Studio",
                "url": "https://reltroner.com"
              },
              "jobTitle": "Founder & Worldbuilder",
              "description": "Visionary mind behind Asthortera, builder of Reltroner Studio, and storyteller of Red Pill worlds."
            })
          }}
        />
      </>
    );
  } 
  