import { notFound } from "next/navigation";
import Heading from "@/components/Heading";
import { getStatistic } from "@/lib/getStatistic";

export async function generateMetadata({ params }) {
  const { slug } = params;
  const { data } = await getStatistic(slug);
  if (!data) return notFound();

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      url: `https://www.reltroner.com/statistics/${slug}`,
      siteName: "Reltroner Studio",
      images: [
        {
          url: `https://www.reltroner.com${data.image}`,
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: data.title,
      description: data.description,
      images: [`https://www.reltroner.com${data.image}`],
      creator: "@reltroner",
    },
  };
}

export default async function StatisticPage({ params }) {
  const { slug } = params;
  const { data, contentHtml } = await getStatistic(slug);
  if (!data) return notFound();

  const fullDateISO = `${data.date}T00:00:00+07:00`;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Heading>{data.title}</Heading>

      <ul className="space-y-1">
        <li className="italic text-sm pb-2">
          {data.date} • {data.published ? "Published" : "Draft"}
        </li>
      </ul>

      <img
        src={data.image}
        alt={data.title}
        className="w-full h-auto rounded-lg mb-6 shadow-md"
      />

      <p className="text-gray-700 text-lg font-semibold italic mb-2">
        {data.role}
      </p>

      <p className="text-gray-600 mb-4">{data.description}</p>

      {data.quote && (
        <blockquote className="border-l-4 border-blue-600 pl-4 italic text-gray-800 mb-4">
          “{data.quote}”
        </blockquote>
      )}

      <div
        className="prose prose-lg text-justify text-slate-800"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {/* Structured Data: JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article", // bisa diganti "Dataset" jika statistik mentah
            "headline": data.title,
            "description": data.description,
            "image": `https://www.reltroner.com${data.image}`,
            "datePublished": fullDateISO,
            "dateModified": fullDateISO,
            "author": {
              "@type": "Person",
              "name": "Rei Reltroner",
              "url": "https://www.reltroner.com/about"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Reltroner Studio",
              "logo": {
                "@type": "ImageObject",
                "url": "https://www.reltroner.com/images/logo.webp"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://www.reltroner.com/statistics/${slug}`
            }
          }),
        }}
      />
    </div>
  );
}
