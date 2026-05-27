import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });

  const postEntries = posts.map((post) => ({
    url: `https://rajvis-blog.vercel.app/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  return [
    {
      url: "https://rajvis-blog.vercel.app",
      lastModified: new Date(),
      changeFrequency: "always" as const,
      priority: 1,
    },
    ...postEntries,
  ];
}
