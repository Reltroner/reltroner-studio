import Link from "next/link";

export default function PostCard({ title, description, slug, image, author, uploadDate }) {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4">
                <Link href={`/blog/${slug}`}>
                    <img src={image} alt={title} className="w-full h-48 object-cover hover:opacity-80 transition-opacity" />
                    <h2 className="text-lg font-bold">{title}</h2>
                    <p className="text-gray-600 text-sm">{description}</p>
                    <p className="text-xs text-gray-500 mt-1">Uploaded on {uploadDate} by {author}</p>
                </Link>
            </div>
        </div>
    );
}
