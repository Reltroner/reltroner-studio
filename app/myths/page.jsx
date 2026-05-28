import { createCollectionPage, getCollectionPageMetadata } from "@/lib/utils/createCollectionPage";

export const metadata = getCollectionPageMetadata("myths");

const MythsPage = createCollectionPage("myths");

export default MythsPage;