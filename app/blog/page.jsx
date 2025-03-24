import Heading from "@/components/Heading";
import PostCard from "@/components/PostCard";

export default function Blog() {
    const posts = [
        {
            title: "World Building Basics",
            description: "Exploring the fundamentals of world-building for creative writing.",
            link: "/blog/worldbuilding",
            image: "/images/WorldBuilding.jpg",
            author: "RaidanRR",
            uploadDate: "March 8, 2025"
        },
        {
            title: "Pi Day Celebration",
            description: "Exploring the significance of Pi in mathematics and beyond.",
            link: "/blog/pi",
            image: "/images/pi-day.jpg",
            author: "Mathematicians",
            uploadDate: "March 14, 2025"
        },
        {
            title: "Pi Day News",
            description: "Pidato Presiden Relugus Rigle di Reltronepolis tentang Pi Day.",
            link: "/blog/pinews",
            image: "/images/pi-day-news.webp",
            author: "RaidanRR",
            uploadDate: "March 14, 2025"
        },
        {
            title: "Scout Parade in Evercotage",
            description: "Highlight of the grand Scout Parade in Evercotage, the capital of Stelpadland.",
            link: "/blog/scoutparade",
            image: "/images/scout-parade.webp",
            author: "RaidanRR",
            uploadDate: "March 16, 2025"
        },
        {
            title: "Certificate Achievement",
            description: "My journey completing a Laravel CRUD project through sheer self-discipline and effort.",
            link: "/blog/certificate-achievement",
            image: "/images/direktori-listing.png"
        },
        {
            title: "Reltroner Studio Portfolio",
            description: "Explore the philosophy, mission, and future-facing projects of Reltroner Studio.",
            link: "/blog/reltroner",
            image: "/images/reltroner-studio-banner.webp"
        },
        {
            title: "For Recruiters & Collaborators",
            description: "Professional profile and collaboration space for meritocratic partners and visionary recruiters.",
            link: "/blog/for-recruiters",
            image: "/images/for-recruiters-banner.webp"
        }
        
    ];

    return (
        <div className="p-5 bg-slate-100">
            <Heading>Blog</Heading>
            <p className="mb-4 text-center font-bold">
                Explore recent articles about world-building and events.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, index) => (
                    <PostCard
                        key={index}
                        title={post.title}
                        description={post.description}
                        link={post.link}
                        image={post.image}
                        author={post.author}
                        uploadDate={post.uploadDate}
                    />
                ))}
            </div>
        </div>
    );
}
