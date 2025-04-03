import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import { remark } from "remark";
import html from "remark-html";
import Heading from "@/components/Heading";

export async function generateMetadata({ params }) {
  const { data } = await getPlace(params.slug);
  if (!data) return notFound();
  return {
    title: data.name,
    description: data.description,
  };
}

async function getPlace(slug) {
  const filePath = path.join(process.cwd(), "content/places", `${slug}.md`);
  if (!fs.existsSync(filePath)) return { data: null, contentHtml: null };

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();
  return { data, contentHtml };
}

export default async function PlacePage({ params }) {
  const { data, contentHtml } = await getPlace(params.slug);
  if (!data) return notFound();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Heading>{data.name}</Heading>
      <img
        src={data.image}
        alt={data.name}
        className="w-full max-h-[400px] object-contain mx-auto"
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
    </div>
  );
}
