import { readdir, readFile } from "node:fs/promises";
import { marked } from "marked";
import matter from "gray-matter";

export async function getPost(slug) {
    try {
        const filePath = `${process.cwd()}/content/blog/${slug}.md`;
        const text = await readFile(filePath, 'utf8');

        const { content, data } = matter(text);
        const html = marked(content);

        return {
            slug, // penting untuk routing dan static params
            title: data.title || "Untitled",
            description: data.description || "",
            date: data.date || "",
            published: data.published ?? false,
            image: data.image || "/images/default.jpg",
            html,
        };
    } catch (error) {
        console.error(`Error loading post: ${slug}`, error);
        return {
            slug,
            title: "Post Not Found",
            description: "",
            date: "",
            published: false,
            image: "/images/default.jpg",
            html: "<p>Sorry, the requested post could not be found.</p>"
        };
    }
}

export async function getAllPosts() {
    try {
        const files = await readdir(`${process.cwd()}/content/blog`);

        const posts = await Promise.all(
            files
                .filter(file => file.endsWith(".md"))
                .map(async (file) => {
                    const slug = file.replace('.md', '');
                    return await getPost(slug);
                })
        );

        return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    } catch (err) {
        console.error("Failed to read blog posts:", err);
        return [];
    }
}
// ✅ Static Path