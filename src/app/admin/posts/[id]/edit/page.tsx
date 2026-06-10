"use client";

import { useState, useEffect } from "react";
import Editor from "@/components/editor/Editor";
import { useRouter, useParams } from "next/navigation";

export default function EditPostPage() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [content, setContent] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    fetch("/api/categories")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setCategories(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!id) return;
    
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) throw new Error("Failed to fetch post");
        const data = await res.json();
        
        setTitle(data.title);
        setSlug(data.slug);
        setExcerpt(data.excerpt || "");
        setFeaturedImage(data.featuredImage || "");
        setCategoryId(data.categoryId || "");
        setContent(data.content);
      } catch (error) {
        console.error(error);
        alert("Failed to load post data");
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPost();
  }, [id]);

  const handleSave = async (published: boolean) => {
    if (!title) {
      alert("Title is required");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          slug: slug || title.toLowerCase().replace(/ /g, "-"),
          excerpt,
          featuredImage,
          content,
          categoryId: categoryId || undefined,
          published,
        }),
      });

      if (response.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        alert("Failed to update post");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-20 max-w-5xl text-center">Loading post...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-20 max-w-5xl">
      <h1 className="text-4xl font-bold font-heading mb-12 text-gradient">Edit Post</h1>
      
      <form onSubmit={(e) => { e.preventDefault(); handleSave(true); }} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-background border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
                placeholder="Enter post title"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full bg-background border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
                placeholder="post-slug-here"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full bg-background border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
              >
                <option value="">No Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Featured Image</label>
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={featuredImage}
                  onChange={(e) => setFeaturedImage(e.target.value)}
                  className="flex-1 bg-background border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm"
                  placeholder="URL or Upload ->"
                />
                <button
                  type="button"
                  onClick={() => document.getElementById('featured-upload')?.click()}
                  className="bg-muted hover:bg-muted/80 text-muted-foreground px-4 py-3 rounded-lg font-medium transition-colors"
                >
                  Upload
                </button>
                <input
                  type="file"
                  id="featured-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const formData = new FormData();
                    formData.append("file", file);
                    try {
                      const res = await fetch("/api/upload", { method: "POST", body: formData });
                      if (res.ok) {
                        const { url } = await res.json();
                        setFeaturedImage(url);
                      } else {
                        alert("Upload failed");
                      }
                    } catch (error) {
                      console.error(error);
                      alert("Upload error");
                    }
                  }}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Excerpt</label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full bg-background border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm h-24"
                placeholder="Short summary of the post"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-4">Content</label>
          <Editor content={content} onChange={setContent} />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => handleSave(false)}
            disabled={isSubmitting}
            className="bg-muted hover:bg-muted/80 text-foreground font-bold py-4 px-8 rounded-full transition-all disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            type="button"
            onClick={() => handleSave(true)}
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary/80 text-white font-bold py-4 px-12 rounded-full transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
          >
            {isSubmitting ? "Updating..." : "Update Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
