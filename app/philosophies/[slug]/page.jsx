import { notFound } from "next/navigation";
import Heading from "@/components/Heading";
import Script from "next/script";
import PhilosophyAnalytics from "@/components/PhilosophyAnalytics";
import { getPhilosophie } from "@/lib/getPhilosophie";

/* =========================
   METADATA (Server)
========================= */
export async function generateMetadata({ params }) {
  const { slug } = await params; // ✅ WAJIB await

  if (!slug) return {};

  const { data } = await getPhilosophie(slug);
  if (!data) return notFound();

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      images: [
        {
          url: data.image || "/images/default-philosophy.webp",
        },
      ],
    },
  };
}

/* =========================
   PAGE (Server Component)
========================= */
export default async function PhilosophiePage({ params }) {
  const { slug } = await params; // ✅ WAJIB await

  if (!slug) return notFound();

  const { data, contentHtml } = await getPhilosophie(slug);
  if (!data) return notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: data.title,
    description: data.description,
    image: `https://www.reltroner.com${data.image || "/images/default-philosophy.webp"}`,
    author: {
      "@type": "Person",
      name: data.author || "Rei Reltroner",
    },
    publisher: {
      "@type": "Organization",
      name: "Reltroner Studio",
      logo: {
        "@type": "ImageObject",
        url: "https://www.reltroner.com/images/logo.webp",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.reltroner.com/philosophies/${slug}`,
    },
    datePublished: data.date || "2025-01-01",
    dateModified: data.modified || data.date || "2025-01-01",
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* 🔥 GA Philosophy Event */}
      <PhilosophyAnalytics philosophy={{ slug }} />

      <Heading>{data.title}</Heading>

      <ul className="space-y-1">
        <li className="italic text-sm pb-2">
          {data.date} • {data.published ? "Published" : "Draft"}
        </li>
      </ul>

      {data.image && (
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-auto rounded-lg mb-6 shadow-md"
        />
      )}

      <p className="text-gray-700 text-lg font-semibold italic mb-2">
        {data.role}
      </p>

      <p className="text-gray-600 mb-4 text-sm">
        {data.description}
      </p>

      {data.quote && (
        <blockquote className="border-l-4 border-blue-600 pl-4 italic text-gray-800 mb-4">
          “{data.quote}”
        </blockquote>
      )}

      <div
        className="prose prose-slate prose-sm sm:prose lg:prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      <Script
        id="structured-data-philosophy"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </div>
  );
}
