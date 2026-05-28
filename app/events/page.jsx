import { createCollectionPage, getCollectionPageMetadata } from "@/lib/utils/createCollectionPage";

export const metadata = getCollectionPageMetadata("events");

const EventsPage = createCollectionPage("events");

export default EventsPage;