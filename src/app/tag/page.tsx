import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { Tag } from "@/lib/interface";
import Header2 from "@/components/Header2";

export const metadata: Metadata = {
  title: "Tags - Sanity CMS - Next.js",
  description: "Created by Trae Zeeofor",
};

// --- Fetch all tags with post count ---
async function getAllTags(): Promise<Tag[]> {
  const query = `
    *[_type == "tag"] {
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
    <div className="w-full ">
      <section className="w-full max-w-[1440px] mx-auto h-auto">
        <Header2 title="Tags" />

        <div className="mt-6 space-y-2">
          {tags.length > 0 ? (
            tags.map((tag) => (
              <Link key={tag._id} href={`/tag/${tag.slug.current}`}>
                <div className="mb-2 p-2 text-sm lowercase dark:bg-gray-950 border dark:border-gray-900 hover:text-purple-500">
                  #{tag.name} ({tag.postCount})
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-sm text-gray-500">No tags found.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default TagPage;
