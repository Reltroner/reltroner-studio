import Heading from "@/components/Heading";
import { getPost } from "@/lib/post";

export async function generateMetadata() {
  const post = await getPost("legal-disclaimer");
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: "https://www.reltroner.com/blog/disclaimer",
      siteName: "Reltroner Studio",
      images: [
        {
          url: "https://www.reltroner.com/images/legal-disclaimer.webp",
          width: 1200,
          height: 630,
          alt: "Legal Disclaimer",
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["https://www.reltroner.com/images/legal-disclaimer.webp"],
      creator: "@reltroner",
    },
  };
}

export default async function Legal() {
  const post = await getPost("legal-disclaimer");

  const datePublished = new Date(post.date || "2025-01-01").toISOString();
  const dateModified = new Date(post.modified || post.date || "2025-01-01").toISOString();

  return (
    <div className="px-4 py-6 sm:px-6 sm:py-8 mx-auto max-w-3xl">
      {/* Metadata Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.description,
            image: "https://www.reltroner.com/images/legal-disclaimer.webp",
            author: {
              "@type": "Person",
              name: "Rei Reltroner",
              url: "https://www.reltroner.com/about",
            },
            publisher: {
              "@type": "Organization",
              name: "Reltroner Studio",
              logo: {
                "@type": "ImageObject",
                url: "https://www.reltroner.com/images/logo.webp",
              },
            },
            datePublished,
            dateModified,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": "https://www.reltroner.com/blog/disclaimer",
            },
          }),
        }}
      />

      <Heading className="text-2xl sm:text-3xl mb-4">{post.title}</Heading>

      <ul className="space-y-1">
        <li className="italic text-sm pb-2">{post.date} • {post.published ? 'Published' : 'Draft'}</li>
      </ul>

      <img
        src="/images/legal-disclaimer.webp"
        alt={post.title}
        className="w-full h-auto rounded-lg mb-6 shadow-md"
      />

      <ul className="space-y-1 mb-6">
        <li className="text-sm text-gray-600">{post.description}</li>
      </ul>

      <article className="prose prose-slate prose-sm sm:prose lg:prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </div>
  );
}
