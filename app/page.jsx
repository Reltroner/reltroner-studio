import Link from "next/link";
import Heading from "@/components/Heading";
export default function Home() {
    const posts = [
        {
            title: "World Building Basics",
            description: "Exploring the fundamentals of world-building for creative writing.",
            link: "/blog/study",
            image: "/images/WorldBuilding.jpg"
        },
        {
            title: "Magic Systems",
            description: "Crafting balanced and intriguing magic systems.",
            link: "/blog/magic-systems",
            image: "/images/magicsystem.png"
        },
        {
            title: "Cultures & Civilizations",
            description: "Building realistic cultures and societies for your world.",
            link: "/blog/cultures",
            image: "/images/culwil.png"
        },
        {
            title: "Politics",
            description: "Understanding political systems and power dynamics in your world.",
            link: "/blog/politics",
            image: "/images/politics.png"
        },
        {
            title: "Locations/Geography",
            description: "Designing immersive landscapes and geographic features.",
            link: "/blog/locations",
            image: "/images/locationexample.jpg"
        },
        {
            title: "Events",
            description: "Creating impactful historical and future events for your world.",
            link: "/blog/events",
            image: "/images/calendar.png"
        },
        {
            title: "Certificate Achievement",
            description: "My journey completing a Laravel CRUD project through sheer self-discipline and effort.",
            link: "/blog/certificate-achievement",
            image: "/images/direktori-listing.png"
        }
        
    ];
    return (
        <div className="p-5 bg-slate-100">
            <Heading>Home</Heading>
            <p className="mb-4 text-center font-bold">Welcome to the home page about world-building!</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {posts.map((post, index) => (
                    <div key={index} className="border rounded-lg shadow-md overflow-hidden">
                        <img src={post.image} alt={post.title} className="w-full h-48 object-cover hover:opacity-70" />
                        <div className="p-4">
                            <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                            <p className="text-gray-600 mb-4">{post.description}</p>
                            <Link href={post.link} className="text-blue-500 hover:underline">
                                Read more
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}