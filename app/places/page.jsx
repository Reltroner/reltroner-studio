import { createCollectionPage, getCollectionPageMetadata } from "@/lib/utils/createCollectionPage";

export const metadata = getCollectionPageMetadata("places");

const PlacesPage = createCollectionPage("places");

export default PlacesPage;