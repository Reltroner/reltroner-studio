import { createCollectionPage, getCollectionPageMetadata } from "@/lib/utils/createCollectionPage";

export const metadata = getCollectionPageMetadata("items");

const ItemsPage = createCollectionPage("items");

export default ItemsPage;