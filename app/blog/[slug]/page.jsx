import Heading from "@/components/Heading";
import { getPost, getAllPosts } from "@/lib/post";

// ✅ WAJIB: Generate semua slug agar tidak error
export async function generateStaticParams() {
    console.log("Generating static params for blog posts");
    const posts = await getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params: { slug } }) {
    console.log("Generating metadata for blog post", slug);
    const post = await getPost(slug); // ✅ langsung pakai slug
    return {
      title: post.title,
      description: post.description,
    };
  }
  

// ✅ Halaman BlogPostPage
export default async function BlogPostPage(props) {
    const { params } = await props; // FIX UTAMA
    console.log("Rendering blog post page", params);
    const post = await getPost(params.slug);
  
    if (!post || !post.title) {
      return <div className="p-6 text-red-500 font-bold">Post not found</div>;
    }
  
    return (
      <div className="flex-grow px-4 sm:px-6 md:px-8 py-6 max-w-screen-md mx-auto w-full pl-20">
        <Heading>{post.title}</Heading>
        <p className="text-sm text-gray-600 pl-4">{post.description}</p>
        <p className="italic text-sm text-gray-500 mb-4 pl-4">
          {post.date} — {post.published ? "Published" : "Draft"}
        </p>
        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-auto rounded-lg mb-6 object-cover sm:px-0 px-4"
          />
        )}
        <article
          className="prose prose-slate max-w-none text-justify sm:px-0 px-4"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    );
  }
  
