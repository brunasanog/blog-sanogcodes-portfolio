import { createClient } from "@sanity/client";

// Variáveis
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = "2023-03-01";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
});

import imageUrlBuilder from "@sanity/image-url";
export function urlFor(source) {
  return imageUrlBuilder(client).image(source);
}
