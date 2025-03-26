import Heading from "@/components/Heading";
import { getPost } from "@/lib/post";

export default async function Basic({ params: { slug } }) {
    const post = await getPost(slug);

    return (
        <div>
            <Heading>{post.title}</Heading>
            <p className="text-sm text-gray-500">{post.description}</p>
            <p className="italic text-sm pb-2">
                {post.date} - {post.published ? 'Published' : 'Draft'}
            </p>

            <div className="flex gap-5">
                <a href="" target="_blank" rel="noreferrer"></a><br />
                <a href="" target="_blank" rel="noreferrer"></a><br />
                <a href="" target="_blank" rel="noreferrer"></a><br />
                <a href="" target="_blank" rel="noreferrer"></a><br />
                <a href="" target="_blank" rel="noreferrer"></a>
            </div>

            {/* Gambar Dinamis dari Metadata Markdown */}
            <img src={post.image} alt={post.title} width={640} height={400} className="mb-3"/>

            <article dangerouslySetInnerHTML={{ __html: post.html }} className="max-w-screen-sm prose prose-slate"/>
        </div>
    );
}
