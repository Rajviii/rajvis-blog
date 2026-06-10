import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

async function getPosts() {
  return await prisma.post.findMany({
    where: { published: true },
    include: {
      category: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export default async function BlogPage() {
  const posts = await getPosts();

  // Helper to extract the first image from TipTap content if no featured image exists
  const getCoverImage = (post: any) => {
    if (post.featuredImage) return post.featuredImage;
    if (post.content && typeof post.content === 'object' && post.content.type === 'doc' && Array.isArray(post.content.content)) {
      const imgBlock = post.content.content.find((b: any) => b.type === 'image' && b.attrs?.src);
      if (imgBlock) return imgBlock.attrs.src;
    }
    return null;
  };

  return (
    <div className="container mx-auto px-4 py-20 max-w-6xl">
      <header className="mb-16 text-center">
        <h1 className="text-4xl font-bold font-heading mb-4 text-gradient md:text-6xl">
          All Stories
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore all our latest insights and stories.
        </p>
      </header>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="group relative flex flex-col glass rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <Link href={`/blog/${post.slug}`} className="block relative aspect-video overflow-hidden">
                {getCoverImage(post) ? (
                  <Image
                    src={getCoverImage(post)}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-secondary/10" />
                )}
              </Link>
              <div className="p-6 flex flex-col flex-grow">
                {post.category && (
                  <span className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-primary">
                    {post.category.name}
                  </span>
                )}
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
          <p className="text-muted-foreground">Check back later for new content.</p>
        </div>
      )}
    </div>
  );
}
