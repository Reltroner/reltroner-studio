import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { remark } from "remark";
import html from "remark-html";
import Heading from "@/components/Heading";
import Script from "next/script";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data } = await getBlog(slug);
  if (!data) return notFound();
  return {
    title: data.title,
    description: data.description,
  };
}

async function getBlog(slug) {
  const filePath = path.join(process.cwd(), "content/blog", `${slug}.md`);
  if (!fs.existsSync(filePath)) return { data: null, contentHtml: null };

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();
  return { data, contentHtml };
}

export default async function BlogPage({ params }) {
  const { slug } = await params;
  const { data, contentHtml } = await getBlog(slug);
  if (!data) return notFound();

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": data.title,
    "description": data.description,
    "image": `https://www.reltroner.com${data.image || "/images/default-og.webp"}`,
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
      "@id": `https://www.reltroner.com/blog/${slug}`
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
      
      {/* 🚀 Schema.org for Rich Result */}
      <Script
        id="article-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
    </div>
  );
}
