import Heading from "@/components/Heading";
import { getPost } from "@/lib/post";

export const metadata = {
    title: "Disclaimer",
    description: "Legal disclaimer for Astralis Pinnacle and Red Pill concepts.",
  };

export default async function Legal() {
    const post = await getPost("legal-disclaimer");
    return (
        <div>
            <>
            
            <Heading>{post.title}</Heading>
            <ul>
                <li className="text-sm text-gray-500">{post.description}</li>
                <li className="italic text-sm pb-2">
                    {post.date} - {post.published ? 'Published' : 'Draft'}
                </li>
            </ul>
            <div className="flex gap-5">
            
            </div>
            <img src="/images/legal-disclaimer.png" alt="" width={640} height={400} className="mb-3"/>
            <article dangerouslySetInnerHTML={{ __html: post.html }} className="max-w-screen-sm prose prose-slate"/>
            </>
        </div>    
    );
}