import { client } from "@/sanity/lib/client";
import Header2 from "@/components/Header2";
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
  const data = await client.fetch(query);
  return data;
}

export const revalidate = 60; //tells the framework to revalidate the cached page data every 60 seconds.

export default async function Home() {
  const posts: Post[] = await getPosts();
  //console.log(posts, "posts");

  return (
    <div className="w-full min-h-[calc(100vh-103.3px)]">
      <section className="w-full max-w-[1440px] mx-auto h-auto">
        <Header2 title="Articles" tags />
        <div>
          {posts?.length > 0 &&
            posts?.map((post) => <PostComponent key={post?._id} post={post} />)}
        </div>
      </section>
    </div>
  );
}
