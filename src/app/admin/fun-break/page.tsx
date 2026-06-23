"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Edit, Trash2, Upload, ExternalLink, Globe, ArrowLeft, Eye, EyeOff } from "lucide-react";

export default function FunBreakAdmin() {
  const [sites, setSites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [editId, setEditId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Creativity");
  const [discoveredBy, setDiscoveredBy] = useState("");
  const [image, setImage] = useState("");
  const [displayOnWeb, setDisplayOnWeb] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      const res = await fetch("/api/fun-break");
      if (res.ok) {
        const data = await res.json();
        setSites(data);
      }
    } catch (error) {
      console.error("Failed to fetch sites:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleResetForm = () => {
    setEditId(null);
    setTitle("");
    setUrl("");
    setDescription("");
    setCategory("Creativity");
    setDiscoveredBy("");
    setImage("");
    setDisplayOnWeb(false);
  };

  const handleEditSelect = (site: any) => {
    setEditId(site.id);
    setTitle(site.title);
    setUrl(site.url);
    setDescription(site.description);
    setCategory(site.category);
    setDiscoveredBy(site.discoveredBy);
    setImage(site.image || "");
    setDisplayOnWeb(site.displayOnWeb);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !url || !description || !discoveredBy) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    const payload = {
      title,
      url,
      description,
      category,
      discoveredBy,
      image,
      displayOnWeb,
    };

    try {
      if (editId) {
        // Update
        const res = await fetch(`/api/fun-break/${editId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          handleResetForm();
          fetchSites();
        } else {
          alert("Failed to update site");
        }
      } else {
        // Create
        const res = await fetch("/api/fun-break", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          handleResetForm();
          fetchSites();
        } else {
          alert("Failed to create site");
        }
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this site?")) return;
    try {
      const res = await fetch(`/api/fun-break/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        if (editId === id) handleResetForm();
        fetchSites();
      } else {
        alert("Failed to delete site");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleDisplay = async (site: any) => {
    const updatedStatus = !site.displayOnWeb;
    try {
      const res = await fetch(`/api/fun-break/${site.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...site,
          displayOnWeb: updatedStatus,
        }),
      });
      if (res.ok) {
        fetchSites();
        // If we are currently editing this site, sync form display state
        if (editId === site.id) {
          setDisplayOnWeb(updatedStatus);
        }
      } else {
        alert("Failed to toggle status");
      }
    } catch (error) {
      console.error("Failed to toggle display on web status:", error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setImage(data.url);
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Upload failed");
      }
    } catch (error) {
      console.error(error);
      alert("Image upload encountered an error");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 max-w-6xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
        <div>
          <Link
            href="/admin"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-2 gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold font-heading text-gradient">
            Manage Fun Break Sites
          </h1>
        </div>
        <Link
          href="/fun-break"
          target="_blank"
          className="inline-flex items-center gap-2 bg-muted hover:bg-muted/80 text-foreground font-bold py-2.5 px-5 rounded-full transition-all text-sm"
        >
          View Live Page
          <ExternalLink className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-4">
          <div className="glass p-6 rounded-2xl bg-card border border-border sticky top-24">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-foreground">
                {editId ? "Edit Site Details" : "Add New Site"}
              </h2>
              {editId && (
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors underline"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Radio Garden"
                  className="w-full bg-background border border-border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  URL *
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://radio.garden"
                  className="w-full bg-background border border-border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-background border border-border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                >
                  <option value="Creativity">Creativity 🎨</option>
                  <option value="Music">Music 🎵</option>
                  <option value="Learning">Learning 🧠</option>
                  <option value="Fun">Fun 😂</option>
                  <option value="Explore">Explore 🌎</option>
                  <option value="Random">Random ⚡</option>
                  <option value="Game">Game 🎮</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Description *
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the website, tools, or mini game..."
                  rows={3}
                  className="w-full bg-background border border-border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Discovered By *
                </label>
                <input
                  type="text"
                  value={discoveredBy}
                  onChange={(e) => setDiscoveredBy(e.target.value)}
                  placeholder="e.g. Recommended by a friend"
                  className="w-full bg-background border border-border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Thumbnail Image URL
                </label>
                <div className="flex gap-2 items-center mb-1">
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="URL starting with / or http"
                    className="flex-1 bg-background border border-border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => document.getElementById("img-upload")?.click()}
                    disabled={isUploading}
                    className="bg-muted hover:bg-muted/80 text-foreground text-xs font-semibold py-2.5 px-3 rounded-lg border border-border transition-all flex items-center gap-1 shrink-0 disabled:opacity-50"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    {isUploading ? "Uploading" : "Upload"}
                  </button>
                  <input
                    type="file"
                    id="img-upload"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Leave blank to use dynamic color gradients instead of an image.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="displayOnWeb"
                  checked={displayOnWeb}
                  onChange={(e) => setDisplayOnWeb(e.target.checked)}
                  className="w-4.5 h-4.5 accent-primary border-border bg-background rounded"
                />
                <label
                  htmlFor="displayOnWeb"
                  className="text-sm font-semibold select-none cursor-pointer text-foreground"
                >
                  Display on Live Website
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-bold py-3 rounded-xl transition-all shadow-md mt-4 disabled:opacity-50"
              >
                {isSubmitting
                  ? "Saving..."
                  : editId
                    ? "Save Changes"
                    : "Add Site"}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: List Table */}
        <div className="lg:col-span-8">
          <div className="glass rounded-2xl overflow-hidden bg-card border border-border">
            {loading ? (
              <div className="p-12 text-center text-muted-foreground">
                Loading fun break sites...
              </div>
            ) : sites.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground">
                No sites found in the database. Run the seeder or add one to get started!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border bg-muted/20">
                      <th className="p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Site Info
                      </th>
                      <th className="p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Category
                      </th>
                      <th className="p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-center">
                        Display Status
                      </th>
                      <th className="p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sites.map((site) => (
                      <tr
                        key={site.id}
                        className="border-b border-border hover:bg-muted/5 transition-colors"
                      >
                        <td className="p-4">
                          <div className="font-semibold text-foreground flex items-center gap-1.5">
                            {site.title}
                            <a
                              href={site.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-muted-foreground hover:text-primary transition-colors"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                          <p className="text-xs text-muted-foreground max-w-sm truncate mt-0.5">
                            {site.description}
                          </p>
                        </td>
                        <td className="p-4 text-sm font-medium">
                          <span className="inline-block bg-muted/50 border border-border text-foreground px-2 py-0.5 rounded text-xs">
                            {site.category}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <button
                            type="button"
                            onClick={() => handleToggleDisplay(site)}
                            title="Click to toggle display status"
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-all border ${site.displayOnWeb
                                ? "bg-green-500/10 text-green-500 border-green-500/20 hover:bg-green-500/20"
                                : "bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20"
                              }`}
                          >
                            {site.displayOnWeb ? (
                              <>
                                <Eye className="w-3 h-3" />
                                Active
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-3 h-3" />
                                Hidden
                              </>
                            )}
                          </button>
                        </td>
                        <td className="p-4 text-right space-x-3">
                          <button
                            onClick={() => handleEditSelect(site)}
                            className="text-primary hover:underline text-xs font-semibold inline-flex items-center gap-1"
                          >
                            <Edit className="w-3.5 h-3.5" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(site.id)}
                            className="text-red-500 hover:text-red-700 text-xs font-semibold inline-flex items-center gap-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
