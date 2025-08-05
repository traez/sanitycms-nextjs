import type { Metadata } from "next";
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
  const options = { next: { revalidate: 60 } };
  return client.fetch(query, {}, options);
}

// Generate dynamic metadata based on tag slug
export async function generateMetadata(props: Params): Promise<Metadata> {
  const { slug } = await props.params;

  return {
    title: `Posts with the tag ${slug}`,
    description: "Created by Trae Zeeofor",
  };
}

const TagSlugpage = async (props: Params) => {
  const { slug } = await props.params;
  const posts: Array<Post> = await getPostsByTag(slug);
  return (
    <div>
      <Header2 title={`#${slug}`} tags />
      <div>
        {posts.map((post) => (
          <PostComponent key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default TagSlugpage;
