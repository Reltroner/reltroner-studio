import { createCollectionPage, getCollectionPageMetadata } from "@/lib/utils/createCollectionPage";

export const metadata = getCollectionPageMetadata("principles");

const PrinciplesPage = createCollectionPage("principles");

export default PrinciplesPage;