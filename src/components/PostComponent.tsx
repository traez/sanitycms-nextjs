import Link from "next/link";
import Image from "next/image";
import { Post, PortableTextImage } from "@/lib/interface"; 
import { urlFor } from "@/sanity/lib/image";

interface Props {
  post: Post;
}

const PostComponent = ({ post }: Props) => {
  // Determine the image to display
  let displayImage = post?.mainImage;
  let displayImageAlt = post?.mainImage?.alt || post?.title || "Post image";

  // If mainImage is not available, try to find the first image in the body
  if (!displayImage && post?.body) {
    const firstBodyImage = post.body.find(
      (block): block is PortableTextImage => block._type === "image"
    );
    if (firstBodyImage) {
      displayImage = firstBodyImage;
      displayImageAlt = firstBodyImage.alt || post?.title || "Post image";
    }
  }

  return (
    <div className={cardStyle}>
      <Link href={`/posts/${post?.slug?.current}`} className="block">
        {/* Featured Image */}
        {displayImage?.asset ? (
          <div className="relative w-full h-56 overflow-hidden rounded-t-lg">
            <Image
              src={urlFor(displayImage).url() || "/placeholder.svg"}
              alt={displayImageAlt}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={false}
            />
          </div>
        ) : (
          // Fallback placeholder for posts without images
          <div className="w-full h-56 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-gray-700 dark:to-gray-800 rounded-t-lg flex items-center justify-center">
            <div className="text-center text-gray-400 dark:text-gray-500">
              <svg
                className="w-12 h-12 mx-auto mb-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-sm">No image</span>
            </div>
          </div>
        )}
        {/* Content Section */}
        <div className="p-6 flex flex-col h-full">
          {/* Date */}
          <p className="text-purple-600 dark:text-purple-400 font-mono text-sm mb-3">
            {new Date(post?.publishedAt).toDateString()}
          </p>
          {/* Title */}
          <h2 className="text-xl font-bold dark:text-slate-300 mb-3 line-clamp-2 leading-tight hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-200">
            {post?.title}
          </h2>
          {/* Excerpt */}
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 text-sm leading-relaxed">
            {post?.excerpt}
          </p>
          {/* Tags */}
          <div className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 text-sm leading-relaxed">
            {post?.tags?.map((tag) => (
              <span
                key={tag?._id}
                className="inline-block px-2 py-1 rounded-md text-sm lowercase border border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-300"
              >
                #{tag?.name}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PostComponent;

const cardStyle = `
  bg-white
  dark:bg-gray-800
  border
  border-gray-200
  dark:border-gray-700
  rounded-lg
  shadow-sm
  hover:shadow-xl
  transition-all
  duration-300
  overflow-hidden
  hover:border-purple-400
  dark:hover:border-purple-500
  hover:-translate-y-1
  flex
  flex-col
  min-h-[400px]
`;
