import { type SchemaTypeDefinition } from "sanity";
import { homePage } from "./schemas/documents/home-page";
import { product } from "./schemas/documents/product";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homePage, product],
};
