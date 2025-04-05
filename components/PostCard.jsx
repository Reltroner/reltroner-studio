import Link from "next/link";

export default function PostCard({ title, description, slug, image, author, uploadDate }) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-[1.015] transition-all duration-300 w-full max-w-[400px] mx-auto">
            <div className="p-4">
                <Link href={`/blog/${slug}`}>
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-48 object-cover rounded-md mb-3"
                    />
                    <h2 className="text-base sm:text-lg font-bold leading-snug">{title}</h2>
                    <p className="text-sm sm:text-base text-gray-600 mt-1">{description}</p>
                    <p className="text-xs text-gray-500 mt-2">
                        Uploaded on {uploadDate} by {author}
                    </p>
                </Link>
            </div>
        </div>
    );
}

