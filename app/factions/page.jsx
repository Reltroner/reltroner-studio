import { createCollectionPage, getCollectionPageMetadata } from "@/lib/utils/createCollectionPage";

export const metadata = getCollectionPageMetadata("factions");

const FactionsPage = createCollectionPage("factions");

export default FactionsPage;