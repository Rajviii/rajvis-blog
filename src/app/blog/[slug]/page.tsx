import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { author: true, category: true },
  });

  if (!post) return { title: "Post Not Found" };

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt || "",
      images: post.featuredImage ? [post.featuredImage] : [],
      type: "article",
      publishedTime: post.createdAt.toISOString(),
      authors: [post.author.name],
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      author: true,
      category: true,
      tags: true,
    },
  });

  if (!post) {
    notFound();
  }

  const renderNode = (node: any, index?: number): React.ReactNode => {
    if (node.type === "text") {
      let text = <>{node.text}</>;
      if (node.marks) {
        node.marks.forEach((mark: any) => {
          if (mark.type === "bold") text = <strong key="bold">{text}</strong>;
          if (mark.type === "italic") text = <em key="italic">{text}</em>;
          if (mark.type === "underline") text = <u key="underline">{text}</u>;
          if (mark.type === "strike") text = <s key="strike">{text}</s>;
          if (mark.type === "code") text = <code key="code" className="bg-muted px-1 py-0.5 rounded text-sm">{text}</code>;
          if (mark.type === "link") text = <a key="link" href={mark.attrs?.href} className="text-primary underline underline-offset-4">{text}</a>;
        });
      }
      return <span key={index}>{text}</span>;
    }

    const children = node.content ? node.content.map((child: any, i: number) => renderNode(child, i)) : null;

    switch (node.type) {
      case "paragraph":
        return <p key={index} className="mb-6 text-lg leading-relaxed text-muted-foreground">{children}</p>;
      case "heading":
        const level = node.attrs?.level || 1;
        const HeadingTag = `h${level}` as any;
        const sizeClasses = {
          1: "text-4xl mt-12 mb-6",
          2: "text-3xl mt-10 mb-5",
          3: "text-2xl mt-8 mb-4",
          4: "text-xl mt-6 mb-3",
          5: "text-lg mt-4 mb-2",
          6: "text-base mt-4 mb-2",
        };
        const sizeClass = sizeClasses[level as keyof typeof sizeClasses] || "text-2xl mt-8 mb-4";
        return <HeadingTag key={index} className={`font-bold font-heading text-foreground ${sizeClass}`}>{children}</HeadingTag>;
      case "bulletList":
        return <ul key={index} className="list-disc pl-6 mb-6 text-lg text-muted-foreground space-y-2">{children}</ul>;
      case "orderedList":
        return <ol key={index} className="list-decimal pl-6 mb-6 text-lg text-muted-foreground space-y-2">{children}</ol>;
      case "listItem":
        return <li key={index} className="pl-2">{children}</li>;
      case "image":
        return (
          <figure key={index} className="my-8 rounded-xl overflow-hidden glass shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={node.attrs?.src} alt={node.attrs?.alt || "Article image"} className="w-full h-auto object-cover" />
          </figure>
        );
      case "blockquote":
        return <blockquote key={index} className="border-l-4 border-primary pl-6 italic my-8 text-xl text-muted-foreground">{children}</blockquote>;
      case "codeBlock":
        return <pre key={index} className="bg-muted p-6 rounded-xl my-8 overflow-x-auto text-sm"><code>{children}</code></pre>;
      case "horizontalRule":
        return <hr key={index} className="my-12 border-border" />;
      case "doc":
        return <>{children}</>;
      default:
        // Render unknown blocks as divs instead of ignoring them
        return <div key={index}>{children}</div>;
    }
  };

  const renderContent = (content: any) => {
    if (!content) return <p>No content available.</p>;
    return renderNode(content, 0);
  };

  return (
    <article className="container mx-auto px-4 py-20 max-w-4xl">
      <header className="mb-12 text-center">
        {post.category && (
          <span className="mb-4 inline-block rounded-full bg-primary/20 px-3 py-1 text-sm font-semibold text-primary backdrop-blur-md border border-primary/20">
            {post.category.name}
          </span>
        )}
        <h1 className="mb-6 text-4xl font-bold font-heading text-foreground md:text-6xl lg:text-7xl">
          {post.title}
        </h1>
        <div className="flex items-center justify-center space-x-4">
          {post.author.image && (
            <Image
              src={post.author.image}
              alt={post.author.name}
              width={48}
              height={48}
              className="rounded-full border-2 border-primary/20"
            />
          )}
          <div className="text-left">
            <p className="text-sm font-medium text-foreground">{post.author.name}</p>
            <p className="text-xs text-muted-foreground">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })} • 5 min read
            </p>
          </div>
        </div>
      </header>

      {post.featuredImage && (
        <div className="relative aspect-video mb-16 overflow-hidden rounded-3xl glass shadow-2xl">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="prose prose-lg max-w-none">
        {renderContent(post.content)}
      </div>

      <footer className="mt-20 pt-12 border-t border-border">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag.id} className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground hover:bg-muted/80 transition-colors cursor-pointer">
              #{tag.name}
            </span>
          ))}
        </div>
      </footer>

      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "image": post.featuredImage,
            "datePublished": post.createdAt.toISOString(),
            "dateModified": post.updatedAt.toISOString(),
            "author": {
              "@type": "Person",
              "name": post.author.name,
            },
          }),
        }}
      />
    </article>
  );
}
