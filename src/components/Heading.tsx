import Link from "next/link";

interface Props {
  title: string;
  text?: string; // Added new text prop
  tags?: boolean;
}

const Heading = ({ title = "", text, tags = false }: Props) => {
  return (
    <header className="py-4 px-4 mb-8 text-center border-b dark:border-purple-900">
      <h2 className="capitalize text-2xl mx-auto max-w-2xl font-bold">
        {title}
      </h2>
      {text && <h3 className="text-lg text-muted-foreground mt-2">{text}</h3>}
      {tags && (
        <div className="text-sm mt-2 hover:text-purple-500">
          <Link href="/tag">#tags</Link>
        </div>
      )}
    </header>
  );
};

export default Heading;
