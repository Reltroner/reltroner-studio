// app/blog/for-recruiters/page.jsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { notFound } from "next/navigation";
import Heading from "@/components/Heading";

export const metadata = {
    title: "For Recruiters & Collaborators – Reltroner Studio",
    description: "Professional profile and collaboration space for meritocratic partners and visionary recruiters.",
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
      creator: "@reltroner", // opsional, kalau ada
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

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Title */}
      <Heading>{data.title}</Heading>
      <ul>
          <li className="italic text-sm pb-2">
              {data.date} - {data.published ? 'Published' : 'Draft'}
          </li>
      </ul>

      {/* Image */}
      {data.image && (
        <img
          src={data.image}
          alt={data.title}
          className="w-full max-h-[400px] object-contain mx-auto mb-3"
        />
      )}

      {/* Role / Badge */}
      {data.role && (
        <p className="text-gray-700 text-lg font-semibold italic mb-2">
          {data.role}
        </p>
      )}

      {/* Description */}
      {data.description && (
        <p className="text-gray-600 mb-4 text-base">{data.description}</p>
      )}

      {/* Quote (if any) */}
      {data.quote && (
        <blockquote className="border-l-4 border-blue-600 pl-4 italic text-gray-800 mb-6">
          “{data.quote}”
        </blockquote>
      )}

      {/* Content */}
      <div
        className="prose prose-neutral md:prose-lg dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </div>
  );
}
