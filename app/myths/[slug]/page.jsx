import { createCollectionRoute } from "@/lib/utils/createCollectionRoute";

const route = createCollectionRoute("myths");

export const generateMetadata = route.generateMetadata;
export const generateStaticParams = route.generateStaticParams;

export default route.Page;