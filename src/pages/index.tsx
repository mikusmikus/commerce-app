/* eslint-disable @next/next/no-html-link-for-pages */
import { getClient } from "@/sanity/lib/getClient";
import { type GetStaticProps } from "next";
import { HOME_PAGE_QUERY } from "@/lib/groq-queries";
import dynamic from "next/dynamic";
import { PreviewHomePage } from "@/views/home/home-preview";
import HomeView, { type HomeViewProps } from "@/views/home/home-view";

const PreviewProvider = dynamic(() => import("@/components/preview-provider"));

type HomePageProps = {
  preview: boolean;
  previewToken: string;
  data: HomeViewProps;
};

export default function Home({ data, preview, previewToken }: HomePageProps) {
  return (
    <>
      {preview ? (
        <PreviewProvider previewToken={previewToken}>
          <PreviewHomePage {...data} />
          <div className="fixed right-0 top-2 z-[100] bg-slate-300 p-2">
            <a href="/api/sanity/exit-preview">Exit preview</a>
          </div>
        </PreviewProvider>
      ) : (
        <HomeView {...data} />
      )}
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const preview = context.draftMode || false;
  const previewToken = preview ? process.env.SANITY_API_READ_TOKEN : ``;
  if (preview && !previewToken) {
    throw new Error(
      `Preview mode is active, but SANITY_API_READ_TOKEN is not set in environment variables`
    );
  }
  const client = getClient(previewToken);

  const data = await client.fetch<HomeViewProps | null>(HOME_PAGE_QUERY);

  return { props: { data, preview, previewToken } };
};
