import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { Post } from "@/lib/interface";
import Heading from "@/components/Heading";
import PostComponent from "@/components/PostComponent";

// --- Unified Props Interface ---
interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// GROQ query to fetch posts that reference a given tag by its slug
async function getPostsByTag(tag: string) {
  const query = `
    *[_type == "post" && references(*[_type == "tag" && slug.current == "${tag}"]._id)]{
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      mainImage {
        asset,
        alt
      },
      body,
      tags[]-> {
        _id,
        slug,
        name
      }
    }
  `;
  const options = { next: { revalidate: 60 } };
  return client.fetch(query, {}, options);
}

// Generate dynamic metadata based on tag slug
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params; // Await params as it's a Promise
  return {
    title: `Posts with the tag ${slug}`,
    description: "Created by Trae Zeeofor",
  };
}

const TagSlugpage = async ({ params }: PageProps) => {
  const { slug } = await params; // Await params as it's a Promise
  const posts: Array<Post> = await getPostsByTag(slug);

  return (
    <div className="w-full min-h-[calc(100vh-103.3px)] bg-gray-50 dark:bg-gray-900">
      <section className="w-full max-w-[1440px] mx-auto h-auto px-4 py-8">
        <Heading title={`#${slug}`} tags />
        <div className="mt-12">
          {posts?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostComponent key={post?._id} post={post} />
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
                  No posts found
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  There are no blog posts available with this tag at the moment.
                  Check back soon!
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TagSlugpage;
