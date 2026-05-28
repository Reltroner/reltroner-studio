import { createCollectionPage, getCollectionPageMetadata } from "@/lib/utils/createCollectionPage";

export const metadata = getCollectionPageMetadata("cultures");

const CulturesPage = createCollectionPage("cultures");

export default CulturesPage;