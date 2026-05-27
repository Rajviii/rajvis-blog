import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

async function getCategoryData(slug: string) {
  if (!slug) return null;
  
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      posts: {
        where: { published: true },
        include: { author: true, category: true },
        orderBy: { createdAt: "desc" },
      },
    },
  });
  return category;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryData(slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <header className="mb-16">
        <Link href="/categories" className="text-sm font-medium text-primary hover:underline mb-4 inline-block">
          ← Back to all categories
        </Link>
        <h1 className="text-4xl font-bold font-heading mb-4 text-gradient md:text-6xl">
          {category.name}
        </h1>
        <p className="text-muted-foreground">
          Showing {category.posts.length} {category.posts.length === 1 ? "story" : "stories"} in {category.name}
        </p>
      </header>

      {category.posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {category.posts.map((post) => (
            <article key={post.id} className="group relative flex flex-col glass rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <Link href={`/blog/${post.slug}`} className="block relative aspect-video overflow-hidden">
                {post.featuredImage ? (
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-secondary/10" />
                )}
              </Link>
              <div className="p-6">
                <h3 className="mb-3 text-xl font-bold font-heading group-hover:text-primary transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="mb-6 text-sm text-muted-foreground line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-border/50">
                  <span className="text-xs text-muted-foreground">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                  <span className="text-xs font-medium text-primary">Read More →</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass rounded-3xl">
          <h2 className="text-2xl font-bold mb-4">No stories found</h2>
          <p className="text-muted-foreground">Check back later for new content in this category.</p>
        </div>
      )}
    </div>
  );
}
