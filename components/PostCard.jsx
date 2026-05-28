import Link from "next/link";
import ArchiveCardMedia from "@/components/media/ArchiveCardMedia";

export default function PostCard({ title, description, slug, image, author, uploadDate }) {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-[1.015] transition-all duration-300 w-full max-w-100 mx-auto dark:bg-gray-900 dark:text-white">
            <div className="p-4">
                <Link href={`/blog/${slug}`}>
                    <ArchiveCardMedia
                        image={image}
                        title={title}
                        sizes="(min-width: 1024px) 400px, 100vw"
                        className="mb-3 h-48 w-full rounded-md"
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

