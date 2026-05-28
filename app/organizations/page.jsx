import { createCollectionPage, getCollectionPageMetadata } from "@/lib/utils/createCollectionPage";

export const metadata = getCollectionPageMetadata("organizations");

const OrganizationsPage = createCollectionPage("organizations");

export default OrganizationsPage;