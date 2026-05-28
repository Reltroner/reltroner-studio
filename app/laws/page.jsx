import { createCollectionPage, getCollectionPageMetadata } from "@/lib/utils/createCollectionPage";

export const metadata = getCollectionPageMetadata("laws");

const LawsPage = createCollectionPage("laws");

export default LawsPage;