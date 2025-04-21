// app/blog/disclaimer/page.jsx
import Heading from "@/components/Heading";
import { getPost } from "@/lib/post";

export const metadata = {
  title: "Disclaimer",
  description: "Legal disclaimer for Astralis Pinnacle and Red Pill concepts.",
};

export default async function Legal() {
  const post = await getPost("legal-disclaimer");

  return (
    <div className="px-4 py-6 sm:px-6 sm:py-8 mx-auto max-w-3xl">
      <Heading className="text-2xl sm:text-3xl mb-4">{post.title}</Heading>

      <ul className="space-y-1 mb-6">
        <li className="text-sm text-gray-500">{post.description}</li>
        <li className="italic text-sm text-gray-400">{post.date} • {post.published ? 'Published' : 'Draft'}</li>
      </ul>

      <img
        src="/images/legal-disclaimer.webp"
        alt={post.title}
        className="w-full h-auto rounded-lg mb-6 shadow-md"
      />

      <article className="prose prose-slate prose-sm sm:prose lg:prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
    </div>
  );
}
