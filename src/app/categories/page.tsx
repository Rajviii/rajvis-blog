import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getCategories() {
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { posts: { where: { published: true } } },
      },
    },
    orderBy: { name: "asc" },
  });
  return categories;
}

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 py-20">
      <header className="mb-16 text-center">
        <h1 className="text-4xl font-bold font-heading mb-4 text-gradient md:text-6xl">
          Browse by Category
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our collection of stories and insights organized by topic.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="group relative block p-8 glass rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          >
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <h2 className="text-2xl font-bold font-heading mb-2 group-hover:text-primary transition-colors">
              {category.name}
            </h2>
            <p className="text-muted-foreground">
              {category._count.posts} {category._count.posts === 1 ? "Story" : "Stories"}
            </p>
            <Link href={`/categories/${category.slug}`} className="mt-6 flex items-center text-sm font-medium text-primary cursor-pointer hover:underline underline-offset-4">View Category →</Link>
          </Link>
        ))}
      </div>
    </div>
  );
}
