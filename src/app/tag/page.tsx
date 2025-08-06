import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { Tag } from "@/lib/interface";
import Heading from "@/components/Heading";

export const metadata: Metadata = {
  title: "Tags - Sanity CMS - Next.js",
  description: "Created by Trae Zeeofor",
};

// --- Fetch all tags with post count ---
async function getAllTags(): Promise<Tag[]> {
  const query = `
     *[_type == "tag"] | order(name asc) {
      name,
      slug,
      _id,
      "postCount": count(*[_type == "post" && references(^._id)])
    }
  `;
  const options = { next: { revalidate: 60 } };
  return client.fetch(query, {}, options);
}

const TagPage = async () => {
  const tags = await getAllTags();
  return (
    <div className="w-full min-h-[calc(100vh-103.3px)] bg-gray-50 dark:bg-gray-900">
      <section className="w-full max-w-[1440px] mx-auto h-auto px-4 py-8">
        <Heading title="Tags" />
        <div className="mt-12">
          {tags.length > 0 ? (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-8">
              {tags.map((tag) => (
                <Link key={tag._id} href={`/tag/${tag.slug.current}`}>
                  <div className="p-4 text-lg lowercase dark:bg-gray-950 border dark:border-gray-900 hover:text-purple-500 rounded-lg shadow-sm flex items-center justify-between">
                    <span className="font-medium">#{tag.name}</span>
                    <span className="text-gray-500 dark:text-gray-400">
                      ({tag.postCount})
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <svg
                  className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                  No tags found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  There are no tags available at the moment. Check back soon!
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TagPage;
