import CollectionPageClient from "@/components/worldbuilding/CollectionPageClient";
import { COLLECTIONS } from "@/lib/constants/collections";
import { getCollectionEntries } from "@/lib/utils/content";

export const metadata = {
  title: COLLECTIONS.blog.title,
  description: COLLECTIONS.blog.description,
};

export default async function BlogPage() {
  const posts = await getCollectionEntries("blog");

  return <CollectionPageClient collection={COLLECTIONS.blog} items={posts} />;
}