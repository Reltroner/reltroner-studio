import { createCollectionPage, getCollectionPageMetadata } from "@/lib/utils/createCollectionPage";

export const metadata = getCollectionPageMetadata("statistics");

const StatisticsPage = createCollectionPage("statistics");

export default StatisticsPage;