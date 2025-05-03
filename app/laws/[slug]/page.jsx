import { notFound } from "next/navigation";
import Heading from "@/components/Heading";
import { getLaw } from "@/lib/getLaw";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data } = await getLaw(slug);
  if (!data) return notFound();
  return {
    title: data.title,
    description: data.description,
  };
}

export default async function LawPage({ params }) {
  const { slug } = await params;
  const { data, contentHtml } = await getLaw(slug);
  if (!data) return notFound();

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
    </div>
  );
}
