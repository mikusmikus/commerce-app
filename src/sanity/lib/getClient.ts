
import { createClient } from "@sanity/client";
import type { SanityClient } from "@sanity/client";

import { apiVersion, dataset, projectId } from "../env";

export function getClient(previewToken?: string): SanityClient {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn : true,
  });

  return previewToken
    ? client.withConfig({
        token: previewToken,
        useCdn: false,
        ignoreBrowserTokenWarning: true,
        perspective: 'previewDrafts'
      })
    : client;
}