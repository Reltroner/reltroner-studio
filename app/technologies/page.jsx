import { createCollectionPage, getCollectionPageMetadata } from "@/lib/utils/createCollectionPage";

export const metadata = getCollectionPageMetadata("technologies");

const TechnologiesPage = createCollectionPage("technologies");

export default TechnologiesPage;