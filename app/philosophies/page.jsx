import { createCollectionPage, getCollectionPageMetadata } from "@/lib/utils/createCollectionPage";

export const metadata = getCollectionPageMetadata("philosophies");

const PhilosophiesPage = createCollectionPage("philosophies");

export default PhilosophiesPage;