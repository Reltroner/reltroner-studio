import { createCollectionPage, getCollectionPageMetadata } from "@/lib/utils/createCollectionPage";

export const metadata = getCollectionPageMetadata("characters");

const CharactersPage = createCollectionPage("characters");

export default CharactersPage;