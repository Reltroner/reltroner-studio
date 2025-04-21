// app/blog/[slug]/head.jsx
import { getBlogPost } from "@/lib/getBlogPost";

export default async function Head({ params }) {
  const { slug } = params;
  const post = await getBlogPost(slug);

  const title = post?.data?.title || "Reltroner Studio";
  const description = post?.data?.description || "Exploring worldbuilding, philosophy, and software craftsmanship.";
  const image = post?.data?.image || "/images/default-og.webp";
  const datePublished = post?.data?.date || "2025-01-01";
  const authorName = post?.data?.author || "Rei Reltroner";
  const url = `https://www.reltroner.com/blog/${slug}`;

  return (
    <>
      <title>{title} | Reltroner Studio</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`https://www.reltroner.com${image}`} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="Reltroner Studio" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`https://www.reltroner.com${image}`} />

      {/* Structured Data: Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "description": description,
            "image": `https://www.reltroner.com${image}`,
            "author": {
              "@type": "Person",
              "name": authorName
            },
            "publisher": {
              "@type": "Organization",
              "name": "Reltroner Studio",
              "logo": {
                "@type": "ImageObject",
                "url": "https://reltroner.com/images/logo.png"
              }
            },
            "datePublished": datePublished,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": url
            }
          })
        }}
      />
    </>
  );
}
