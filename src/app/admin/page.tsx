import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { DeleteButton } from "./DeleteButton";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="container mx-auto px-4 py-20 max-w-5xl">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold font-heading text-gradient">Admin Dashboard</h1>
        <div className="flex gap-4">
          <Link 
            href="/admin/categories" 
            className="bg-muted hover:bg-muted/80 text-foreground font-bold py-3 px-6 rounded-full transition-all"
          >
            Manage Categories
          </Link>
          <Link 
            href="/admin/messages" 
            className="bg-muted hover:bg-muted/80 text-foreground font-bold py-3 px-6 rounded-full transition-all"
          >
            Manage Messages
          </Link>
          <Link 
            href="/admin/fun-break" 
            className="bg-muted hover:bg-muted/80 text-foreground font-bold py-3 px-6 rounded-full transition-all"
          >
            Manage Fun Break Sites
          </Link>
          <Link 
            href="/admin/post" 
            className="bg-primary hover:bg-primary/80 text-white font-bold py-3 px-6 rounded-full transition-all shadow-lg"
          >
            + New Post
          </Link>
        </div>
      </div>
      
      <div className="overflow-x-auto bg-background/50 backdrop-blur-md border border-border rounded-xl shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/20">
              <th className="p-4 font-semibold text-foreground">Title</th>
              <th className="p-4 font-semibold text-foreground">Status</th>
              <th className="p-4 font-semibold text-foreground text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-8 text-center text-muted-foreground">
                  No posts found. Create your first post!
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="border-b border-border hover:bg-muted/10 transition-colors">
                  <td className="p-4 font-medium">{post.title}</td>
                  <td className="p-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${post.published ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-3">
                    <Link 
                      href={`/admin/posts/${post.id}/edit`}
                      className="text-primary hover:underline text-sm font-medium"
                    >
                      Edit
                    </Link>
                    <DeleteButton id={post.id} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
