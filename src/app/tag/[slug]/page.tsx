import type { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { Post } from "@/lib/interface";
import Header2 from "@/components/Header2";
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
    <div className="w-full ">
      <section className="w-full max-w-[1440px] mx-auto h-auto">
        <Header2 title={`#${slug}`} tags />
        <div>
          {posts.map((post) => (
            <PostComponent key={post._id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default TagSlugpage;
