import { client } from "@/sanity/lib/client";
import Heading from "@/components/Heading";
import { Post } from "@/lib/interface";
import PostComponent from "@/components/PostComponent";

async function getPosts() {
  const query = `
  *[_type == "post"] {
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

export default async function Home() {
  const posts: Post[] = await getPosts();

  return (
    <div className="w-full min-h-[calc(100vh-103.3px)]">
      <section className="w-full max-w-[1440px] mx-auto h-auto">
        <Heading title="Articles" tags />
        <div>
          {posts?.length > 0 &&
            posts?.map((post) => <PostComponent key={post?._id} post={post} />)}
        </div>
      </section>
    </div>
  );
}
