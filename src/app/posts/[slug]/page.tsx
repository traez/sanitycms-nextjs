import Link from "next/link";
import Image from "next/image";
import type { Metadata, ResolvingMetadata } from "next";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import Header2 from "@/components/Header2";
import { Post } from "@/lib/interface";

// --- Params Interface ---
interface Params {
  params: {
    slug: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

// --- Rich text styling ---
const richTextStyles = `
  mt-14
  text-justify
  max-w-2xl
  m-auto
  prose-headings:my-5
  prose-heading:text-2xl
  prose-p:mb-5
  prose-p:leading-7
  prose-li:list-disc
  prose-li:leading-7
  prose-li:ml-4
`;

// --- Portable Text config ---
const myPortableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <Image src={urlFor(value).url()} alt="Post" width={700} height={700} />
    ),
  },
};

// --- Fetch a single post by slug ---
async function getPost(slug: string): Promise<Post | null> {
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
  return await client.fetch(query);
}

// --- Dynamic Metadata ---
export async function generateMetadata(
  { params }: Params,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getPost(params.slug);

  return {
    title: post?.title
      ? `${post.title} - Sanity CMS - Next.js`
      : "Post Not Found",
    description: post?.excerpt || "Created by Trae Zeeofor",
  };
}

// --- Page Component ---
const Postspage = async ({ params }: Params) => {
  const post = await getPost(params.slug);

  if (!post) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl font-bold">Post not found</h2>
      </div>
    );
  }

  return (
    <div>
      <Header2 title={post.title} />
      <div className="text-center">
        <span className="text-purple-500">
          {new Date(post.publishedAt).toDateString()}
        </span>

        <div className="mt-5">
          {post.tags?.map((tag) => (
            <Link key={tag._id} href={`/tag/${tag.slug.current}`}>
              <span className="mr-2 p-1 rounded-sm text-sm lowercase dark:bg-gray-950 border dark:border-gray-900">
                #{tag.name}
              </span>
            </Link>
          ))}
        </div>

        <div className={richTextStyles}>
          <PortableText
            value={post.body}
            components={myPortableTextComponents}
          />
        </div>
      </div>
    </div>
  );
};

export default Postspage;
