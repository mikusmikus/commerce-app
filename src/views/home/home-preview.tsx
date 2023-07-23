import { HOME_PAGE_QUERY } from "@/lib/groq-queries";
import { useLiveQuery } from "@sanity/preview-kit";

import { type HomeViewProps, HomeView } from "./home-view";

export const PreviewHomePage = (props: HomeViewProps) => {
  const [previewData] = useLiveQuery(props, HOME_PAGE_QUERY, {});

  return <HomeView {...previewData} />;
};
