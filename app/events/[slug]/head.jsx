// app/events/[slug]/head.jsx
import { getEvent } from "@/lib/getEvent";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data } = await getEvent(slug);
  if (!data) return notFound();

  const title = data.title;
  const description = data.description;
  const image = data.image || "/images/default-event.webp";
  const url = `https://www.reltroner.com/events/${slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": title,
    "description": description,
    "startDate": data.startDate || data.date || "2025-01-01",
    "endDate": data.endDate || undefined,
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
    "image": `https://www.reltroner.com${image}`,
    "url": url,
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

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Reltroner Studio",
      images: [
        { url: `https://www.reltroner.com${image}`, width: 1200, height: 630, alt: title }
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`https://www.reltroner.com${image}`],
    },
    alternates: {
      canonical: url
    },
    metadataBase: new URL("https://www.reltroner.com"),
    other: {
      "application/ld+json": JSON.stringify(schema),
    },
  };
}

export default function Head() {
  return null;
}
