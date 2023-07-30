import { defineField } from "sanity";

export const slug = defineField({
  type: "slug",
  name: "slug",
  title: "Slug",
  options: {
    source: "title",
  },
});
