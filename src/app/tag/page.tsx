import type { Metadata } from "next";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { Tag } from "@/lib/interface";
import Header2 from "@/components/Header2";

export const metadata: Metadata = {
  title: "Tags - Sanity CMS - Next.js",
  description: "Created by Trae Zeeofor",
};

// --- Revalidate every 60 seconds (ISR) ---
export const revalidate = 60;

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
  return client.fetch(query);
}

const TagPage = async () => {
  const tags = await getAllTags();

  return (
    <div>
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
    </div>
  );
};

export default TagPage;
