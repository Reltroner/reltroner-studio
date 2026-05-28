import { createCollectionPage, getCollectionPageMetadata } from "@/lib/utils/createCollectionPage";

export const metadata = getCollectionPageMetadata("series");

const SeriesPage = createCollectionPage("series");

export default SeriesPage;