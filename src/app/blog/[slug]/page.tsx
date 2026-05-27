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

  // Simple renderer for TipTap JSON (placeholder logic)
  const renderContent = (content: any) => {
    // In a real app, use a dedicated renderer like @tiptap/extension-html
    // For now, we'll just show the text from the JSON
    if (content?.type === "doc") {
      return content.content.map((block: any, i: number) => {
        if (block.type === "paragraph") {
          return (
            <p key={i} className="mb-4 text-lg leading-relaxed text-muted-foreground">
              {block.content?.map((text: any) => text.text).join("")}
            </p>
          );
        }
        return null;
      });
    }
    return <p>No content available.</p>;
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
