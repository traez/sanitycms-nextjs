import { defineType, defineField } from "sanity";

export const tagType = defineType({
  name: "tag",
  title: "Tag",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Tag Name",
      type: "string",
      validation: (Rule) => Rule.required().error("Required"),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required().error("Required"),
    }),
  ],
});
