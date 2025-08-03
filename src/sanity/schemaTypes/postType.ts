import { defineType, defineField } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required().error("Required"),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required().error("Required"),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      validation: (Rule) => Rule.max(200).error("Max 200 characters"),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          fields: [
            defineField({
              name: "alt",
              title: "Alt",
              type: "text",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "tag" }],
        },
      ],
    }),
  ],
});

/* 
This postType.ts file defines a blog post schema for Sanity CMS, specifying fields like title, slug (auto-generated from the title), publish date (with default value), excerpt (limited to 200 characters), a rich-text body that supports text blocks and images with alt text, and tags (referencing a separate tag document type). It uses Sanity's defineType and defineField helpers to structure the content model cleanly, making it ideal for managing blog posts in a CMS-powered site.
*/