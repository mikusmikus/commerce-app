import { DocumentTextIcon } from "@sanity/icons";
import { defineType } from "sanity";
import { title } from "../fields/title";
import { slug } from "../fields/slug";

export const product = defineType({
  type: "document",
  name: "product",
  title: "Product",
  icon: DocumentTextIcon,
  fields: [title, slug],
});
