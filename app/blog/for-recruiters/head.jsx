// app/blog/for-recruiters/head.jsx
import { getBlogPost } from "@/lib/getBlogPost";

export default async function Head() {
  const post = await getBlogPost("for-recruiters");

  const title = post?.data?.title || "Reltroner Studio";
  const description = post?.data?.description || "Explore the creative side of code and storytelling.";
  const image = post?.data?.image || "/images/default-og.webp";
  const url = "https://www.reltroner.com/blog/for-recruiters";

  return (
    <>
      <title>{title} | Reltroner Studio</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`https://www.reltroner.com${image}`} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="Reltroner Studio" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`https://www.reltroner.com${image}`} />
    </>
  );
}
