import { readdir,readFile } from "node:fs/promises";
import { marked } from "marked";
import matter from "gray-matter";

export async function getPost(slug) {
    try {
        const filePath = `${process.cwd()}/content/blog/${slug}.md`;
        const text = await readFile(filePath, 'utf8');

        const { content, data } = matter(text);
        const html = marked(content);

        return {
            title: data.title,
            description: data.description,
            date: data.date,
            published: data.published,
            image: data.image || "/images/default.jpg", // Default jika tidak ada
            html
        };
    } catch (error) {
        console.error(`Error loading post: ${slug}`, error);
        return {
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
    const files = await readdir(`${process.cwd()}/content/blog`); // Menggunakan process.cwd() untuk mendapatkan direktori saat ini
    const posts = await Promise.all(
        files.map(async (file) => {
            const slug = file.replace('.md', '');
            return await getPost(slug);
        })
    );
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date));    // Mengurutkan berdasarkan tanggal terbaru
}