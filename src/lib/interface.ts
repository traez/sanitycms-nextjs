export interface Post {
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  body: PostBody;
  tags: Array<Tag>;
  _id: string;
  mainImage?: {
    asset: {
      _type: "reference";
      _ref: string;
    };
    alt?: string;
  };
  headings?: Array<HTMLHeadElement | string>;
  comments?: Array<Comment>;
}

export interface Tag {
  name: string;
  slug: { current: string };
  _id: string;
  postCount?: number;
}

export type PortableTextBlock = {
  _key: string;
  _type: "block";
  children: Array<{
    _key: string;
    _type: "span";
    text: string;
    marks?: string[];
  }>;
  markDefs: Array<MarkDef>;
  style: string; 
};

export type PortableTextImage = {
  _key: string;
  _type: "image";
  alt?: string;
  asset: {
    _ref: string;
    _type: "reference";
  };
};

export type PostBody = Array<PortableTextBlock | PortableTextImage>;

export type MarkDef = {
  _key: string;
  _type: "link";
  href: string;
};
