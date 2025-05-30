// app/principles/[slug]/page.jsx

import { notFound } from "next/navigation";
import Heading from "@/components/Heading";
import { getPrinciple } from "@/lib/getPrinciple";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data } = await getPrinciple(slug);
  if (!data) return notFound();
  return {
    title: data.title,
    description: data.description,
  };
}

export default async function PrinciplePage({ params }) {
  const { slug } = await params;
  const { data, contentHtml } = await getPrinciple(slug);
  if (!data) return notFound();

  const datePublished = `${data.date}T00:00:00+07:00`;
  const dateModified = `${(data.modified || data.date)}T00:00:00+07:00`;

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

      {/* Structured Data: Article */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": data.title,
            "description": data.description,
            "image": data.image,
            "datePublished": datePublished,
            "dateModified": dateModified,
            "author": {
              "@type": "Person",
              "name": data.author || "Rei Reltroner",
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
              "@id": `https://reltroner.com/principles/${slug}`
            }
          })
        }}
      />
    </div>
  );
}
