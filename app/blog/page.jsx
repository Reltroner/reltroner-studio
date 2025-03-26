import Heading from "@/components/Heading";
import PostCard from "@/components/PostCard";

export default function Blog() {
    const posts = [
        {
            title: "Astralis × Nytherion Manifesto",
            description: "A powerful duality shaping the core of Reltroner Studio — between clarity and illusion, growth and stagnation.",
            link: "/blog/astralis-nytherion-manifesto",
            image: "/images/astralis-nytherion-banner.webp",
            author: "RaidanRR",
            uploadDate: "March 8, 2025"
        },
        {
            title: "Legal Disclaimer",
            description: "Clarifying the originality of Astralis Pinnacle, Red Pill concepts, and the legacy of Reltroner Studio.",
            link: "/blog/legal-disclaimer",
            image: "/images/legal-disclaimer.png",
            author: "Reltroner Studio",
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
            description: "My journey completing a express.js CRUD project through sheer self-discipline and effort.",
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
        },
        {
            title: "My Roadmap to 2045",
            description: "A personal vision of growth, legacy, and freedom — from zero to Astralis Pinnacle.",
            link: "/blog/roadmap-2045",
            image: "/images/roadmap-2045-banner.webp"
        },
        {
            title: "Let Astralis Light the Unknown",
            description: "An original poem reflecting the spirit of Astralis Pinnacle in The Abyss of Comfort.",
            link: "/blog/astralis-poem",
            image: "/images/astralis-poem-banner.webp"
        },
        {
            title: "Astralis-Based Developer Evaluation",
            description: "A unique evaluation framework that measures developers by clarity, resilience, and legacy — not just technical skills.",
            link: "/blog/astralis-evaluation-framework",
            image: "/images/astralis-evaluation-banner.png"
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
