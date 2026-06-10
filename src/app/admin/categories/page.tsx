"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (Array.isArray(data)) setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, slug: slug || name.toLowerCase().replace(/ /g, "-") }),
      });
      if (res.ok) {
        setName("");
        setSlug("");
        fetchCategories();
      } else {
        alert("Failed to create category");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await fetch(`/api/categories/${id}`, { method: "DELETE" });
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 max-w-5xl">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold font-heading text-gradient">Manage Categories</h1>
        <Link 
          href="/admin" 
          className="text-primary font-medium hover:underline"
        >
          &larr; Back to Dashboard
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-1">
          <div className="glass p-6 rounded-2xl bg-background/50 border border-border">
            <h2 className="text-xl font-bold mb-6">Add New</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="e.g. Technology"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Slug</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="e.g. technology"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/80 text-white font-bold py-3 rounded-lg transition-all"
              >
                {isSubmitting ? "Adding..." : "Add Category"}
              </button>
            </form>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="glass rounded-2xl overflow-hidden bg-background/50 border border-border">
            <table className="w-full text-left">
              <thead className="bg-muted/20 border-b border-border">
                <tr>
                  <th className="p-4 font-semibold">Name</th>
                  <th className="p-4 font-semibold">Slug</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-8 text-center text-muted-foreground">No categories yet.</td>
                  </tr>
                ) : (
                  categories.map(cat => (
                    <tr key={cat.id} className="border-b border-border hover:bg-muted/10 transition-colors">
                      <td className="p-4 font-medium">{cat.name}</td>
                      <td className="p-4 text-muted-foreground">{cat.slug}</td>
                      <td className="p-4 text-right">
                        <button onClick={() => handleDelete(cat.id)} className="text-red-500 hover:text-red-700 text-sm font-medium">Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
