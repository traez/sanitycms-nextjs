import type { Metadata, ResolvingMetadata } from "next";
import { client } from "@/sanity/lib/client";
import { Post } from "@/lib/interface";
import Header2 from "@/components/Header2";
import PostComponent from "@/components/PostComponent";

interface Params {
  params: {
    slug: string;
  };
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

  return await client.fetch(query);
}

// ISR: Revalidate page every 60 seconds
export const revalidate = 60;

// Generate dynamic metadata based on tag slug
export async function generateMetadata(
  { params }: Params,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: `Posts with the tag ${params.slug}`,
    description: "Created by Trae Zeeofor",
  };
}

const TagSlugpage = async ({ params }: Params) => {
  const posts: Array<Post> = await getPostsByTag(params.slug);
  return (
    <div>
      <Header2 title={`#${params.slug}`} tags />
      <div>
        {posts.map((post) => (
          <PostComponent key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default TagSlugpage;
