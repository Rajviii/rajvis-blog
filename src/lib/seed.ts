import "dotenv/config";
import { prisma } from "./prisma";

async function seed() {
  // Create an author
  const author = await prisma.user.upsert({
    where: { email: "rajvi@example.com" },
    update: {},
    create: {
      name: "Rajvi",
      email: "rajvi@example.com",
      role: "AUTHOR",
    },
  });

  // Create categories
  const tech = await prisma.category.upsert({
    where: { slug: "technology" },
    update: {},
    create: { name: "Technology", slug: "technology" },
  });

  const lifestyle = await prisma.category.upsert({
    where: { slug: "lifestyle" },
    update: {},
    create: { name: "Lifestyle", slug: "lifestyle" },
  });

  // Create some posts
  await prisma.post.upsert({
    where: { slug: "the-future-of-ai" },
    update: {},
    create: {
      title: "The Future of AI: Beyond Large Language Models",
      slug: "the-future-of-ai",
      content: { type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: "Artificial Intelligence is evolving rapidly..." }] }] },
      excerpt: "Explore what's next for AI and how it will transform our daily lives beyond just chat bots.",
      published: true,
      authorId: author.id,
      categoryId: tech.id,
      featuredImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop",
    },
  });

  await prisma.post.upsert({
    where: { slug: "minimalism-in-design" },
    update: {},
    create: {
      title: "Mastering Minimalism in Modern Web Design",
      slug: "minimalism-in-design",
      content: { type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: "Minimalism is not just about less..." }] }] },
      excerpt: "Learn how to create impactful user experiences using white space, typography, and clear hierarchy.",
      published: true,
      authorId: author.id,
      categoryId: lifestyle.id,
      featuredImage: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop",
    },
  });

  await prisma.post.upsert({
    where: { slug: "sustainable-living" },
    update: {},
    create: {
      title: "10 Small Habits for a More Sustainable Life",
      slug: "sustainable-living",
      content: { type: "doc", content: [{ type: "paragraph", content: [{ type: "text", text: "Sustainability starts with small choices..." }] }] },
      excerpt: "From reducing plastic waste to conscious consumption, discover easy ways to live greener every day.",
      published: true,
      authorId: author.id,
      categoryId: lifestyle.id,
      featuredImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2000&auto=format&fit=crop",
    },
  });

  console.log("Seeding completed.");
}

seed().catch(console.error);
