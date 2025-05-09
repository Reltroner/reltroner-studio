// app/factions/[slug]/page.jsx

import { notFound } from "next/navigation";
import Heading from "@/components/Heading";
import { getFaction } from "@/lib/getFaction";
import Script from "next/script";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data } = await getFaction(slug);
  if (!data) return notFound();
  return {
    title: data.title,
    description: data.description,
  };
}

export default async function FactionPage({ params }) {
  const { slug } = await params;
  const { data, contentHtml } = await getFaction(slug);
  if (!data) return notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": data.title,
    "description": data.description,
    "url": `https://www.reltroner.com/factions/${slug}`,
    "logo": `https://www.reltroner.com${data.image || "/images/default-faction.webp"}`,
    "founder": {
      "@type": "Person",
      "name": data.founder || "Unknown",
      "url": "https://www.reltroner.com/about"
    },
    "foundingDate": data.date || "2025-01-01",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.reltroner.com/factions/${slug}`
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Heading>{data.title}</Heading>
      <ul className="space-y-1">
        <li className="italic text-sm pb-2">{data.date} • {data.published ? 'Published' : 'Draft'}</li>
      </ul>
      <img
        src={data.image}
        alt={data.title}
        className="w-full h-auto rounded-lg mb-6 shadow-md"
      />
      <p className="text-gray-700 text-lg font-semibold italic mb-2">{data.role}</p>
      <p className="text-gray-600 mb-4 text-sm">{data.description}</p>
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
        id="structured-data-faction"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </div>
  );
}
