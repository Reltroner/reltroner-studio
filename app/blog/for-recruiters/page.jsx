// app/blog/for-recruiters/page.jsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { notFound } from "next/navigation";
import Heading from "@/components/Heading";
import Script from "next/script";

export const metadata = {
  title: "For Recruiters & Collaborators – Reltroner Studio",
  description:
    "Professional profile and collaboration space for meritocratic partners and visionary recruiters.",
  openGraph: {
    title: "For Recruiters & Collaborators – Reltroner Studio",
    description:
      "Professional profile and collaboration space for meritocratic partners and visionary recruiters.",
    url: "https://www.reltroner.com/blog/for-recruiters",
    siteName: "Reltroner Studio",
    images: [
      {
        url: "https://www.reltroner.com/images/for-recruiters-banner.webp",
        width: 1200,
        height: 630,
        alt: "Reltroner Studio OG Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "For Recruiters & Collaborators – Reltroner Studio",
    description:
      "Professional profile and collaboration space for meritocratic partners and visionary recruiters.",
    images: ["https://www.reltroner.com/images/for-recruiters-banner.webp"],
    creator: "@reltroner",
  },
};

async function getBlog() {
  const filePath = path.join(process.cwd(), "content/blog", `for-recruiters.md`);
  if (!fs.existsSync(filePath)) return { data: null, contentHtml: null };

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();
  return { data, contentHtml };
}

export default async function BlogPage() {
  const { data, contentHtml } = await getBlog();
  if (!data) return notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": data.title,
    "description": data.description,
    "image": `https://www.reltroner.com${data.image || "/images/for-recruiters-banner.webp"}`,
    "author": {
      "@type": "Person",
      "name": data.author || "Rei Reltroner",
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
    "datePublished": `${data.date}T00:00:00+07:00`,
    "dateModified": `${(data.modified || data.date)}T00:00:00+07:00`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.reltroner.com/blog/for-recruiters"
    }
  };

  return (
    <div className="px-4 py-6 sm:px-6 sm:py-8 mx-auto max-w-3xl">
      <Heading>{data.title}</Heading>
      <ul className="space-y-1">
        <li className="italic text-sm pb-2">
          {data.date} - {data.published ? "Published" : "Draft"}
        </li>
      </ul>

      {data.image && (
        <img
          src={data.image}
          alt={data.title}
          className="w-full h-auto rounded-lg mb-6 shadow-md"
        />
      )}

      {data.role && (
        <p className="text-gray-700 text-lg font-semibold italic mb-2">
          {data.role}
        </p>
      )}

      {data.description && (
        <p className="text-gray-600 mb-4 text-sm">{data.description}</p>
      )}

      {data.quote && (
        <blockquote className="border-l-4 border-blue-600 pl-4 italic text-gray-800 mb-6">
          “{data.quote}”
        </blockquote>
      )}

      <div
        className="prose prose-slate prose-sm sm:prose lg:prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />

      {/* ✅ Structured Data for Rich Result */}
      <Script
        id="structured-data-recruiters"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </div>
  );
}
