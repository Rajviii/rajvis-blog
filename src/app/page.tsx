import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getPosts() {
  return await prisma.post.findMany({
    where: { published: true },
    include: {
      author: true,
      category: true,
      tags: true,
    },
    orderBy: { createdAt: "desc" },
    take: 10,
  });
}

export default async function Home() {
  const posts = await getPosts();
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

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
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      {featuredPost ? (
        <section className="mb-20">
          <Link href={`/blog/${featuredPost.slug}`} className="group relative block aspect-video overflow-hidden rounded-3xl glass shadow-2xl">
            {getCoverImage(featuredPost) ? (
              <Image
                src={getCoverImage(featuredPost)}
                alt={featuredPost.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-secondary/20" />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 p-8 md:p-12">
              {featuredPost.category && (
                <span className="mb-4 inline-block rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md border border-primary/20">
                  {featuredPost.category.name}
                </span>
              )}
              <h1 className="mb-4 text-4xl font-bold font-heading md:text-6xl group-hover:text-primary transition-colors text-white">
                {featuredPost.title}
              </h1>
              <p className="mb-6 max-w-2xl text-lg text-white/80 line-clamp-2">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center space-x-4">
                {featuredPost.author.image && (
                  <Image
                    src={featuredPost.author.image}
                    alt={featuredPost.author.name}
                    width={40}
                    height={40}
                    className="rounded-full border border-white/20"
                  />
                )}
                <div>
                  <p className="text-sm font-medium text-white">{featuredPost.author.name}</p>
                  <p className="text-xs text-white/60">
                    {new Date(featuredPost.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </section>
      ) : (
        <section className="mb-20 py-20 text-center glass rounded-3xl">
          <h1 className="text-4xl font-bold font-heading text-gradient mb-4">Welcome to Rajvi's Blog</h1>
          <p className="text-muted-foreground">Daily insights and evergreen stories coming soon.</p>
        </section>
      )}

      {/* Grid Section */}
      <section>
        <div className="mb-12 flex items-center justify-between">
          <h2 className="text-3xl font-bold font-heading">Recent Stories</h2>
          <Link href="/blog" className="text-sm font-medium text-primary hover:underline underline-offset-4">
            View all stories →
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {otherPosts.map((post) => (
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
              <div className="p-6">
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
      </section>
    </div>
  );
}
