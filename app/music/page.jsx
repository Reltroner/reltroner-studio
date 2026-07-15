import { createCollectionPage, getCollectionPageMetadata } from "@/lib/utils/createCollectionPage";

export const metadata = getCollectionPageMetadata("music");

const MusicPage = createCollectionPage("music");

export default MusicPage;
