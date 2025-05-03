// app/events/[slug]/page.jsx

import { notFound } from "next/navigation";
import Heading from "@/components/Heading";
import { getEvent } from "@/lib/getEvent";
import Script from "next/script";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data } = await getEvent(slug);
  if (!data) return notFound();
  return {
    title: data.title,
    description: data.description,
  };
}

export default async function EventPage({ params }) {
  const { slug } = await params;
  const { data, contentHtml } = await getEvent(slug);
  if (!data) return notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": data.title,
    "description": data.description,
    "startDate": data.startDate || data.date || "2025-01-01",
    "endDate": data.endDate || undefined,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
    "image": `https://www.reltroner.com${data.image}`,
    "url": `https://www.reltroner.com/events/${slug}`,
    "location": {
      "@type": "Place",
      "name": data.location || "Reltronland Virtual Archives",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "Asthortera"
      }
    },
    "organizer": {
      "@type": "Organization",
      "name": "Reltroner Studio",
      "url": "https://www.reltroner.com"
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

      <Script
        id="structured-data-event"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </div>
  );
}
