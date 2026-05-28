import CollectionPageClient from "@/components/worldbuilding/CollectionPageClient";
import { getCollectionConfig } from "@/lib/constants/collections";
import { buildCollectionMetadata } from "@/lib/seo/metadata";
import { getCollectionEntries } from "@/lib/utils/content";

export function getCollectionPageMetadata(collection) {
  const config = getCollectionConfig(collection);
  return buildCollectionMetadata(config);
}

export function createCollectionPage(collection) {
  const config = getCollectionConfig(collection);

  return async function CollectionPage() {
    const items = await getCollectionEntries(collection);
    return <CollectionPageClient collection={config} items={items} />;
  };
}