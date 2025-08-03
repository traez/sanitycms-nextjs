import Link from "next/link";
import { client } from "@/sanity/lib/client";
import Header2 from "@/components/Header2";
import { Post } from "@/lib/interface";

interface Params {
  params: {
    slug: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

async function getPost(slug: string) {
  const query = `
  *[_type == "post" && slug.current == "${slug}"][0] {
    title,
    slug,
    publishedAt,
    excerpt,
    _id,
    body,
    tags[]-> {
      _id,
      slug,
      name
    },
  }
  `;

  const post = await client.fetch(query);
  return post;
}

const Postspage = async ({ params }: Params) => {
  // console.log("params", params);
  const post: Post = await getPost(params?.slug);
  //console.log("posts", post);
  return (
    <div>
      <Header2 title={post?.title} />
      <div className="text-center">
        <span className=" text-purple-500">
          {new Date(post?.publishedAt).toDateString()}
        </span>
        <div className="mt-5">
          {post?.tags?.map((tag) => (
            <Link key={tag?._id} href={`/tag/${tag.slug.current}`}>
              <span className="mr-2 p-1 rounded-sm text-sm lowercase dark:bg-gray-950 border dark:border-gray-900">
                #{tag.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Postspage;
