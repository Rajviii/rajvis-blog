"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Trash2, ArrowUpDown, ChevronLeft, ChevronRight, Mail, Calendar, User, BookOpen } from "lucide-react";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination & Sorting State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  // Selected message for details modal/view
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);

  useEffect(() => {
    fetchMessages();
  }, [currentPage, limit, sortBy, order]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/contact?page=${currentPage}&limit=${limit}&sortBy=${sortBy}&order=${order}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
        setTotalPages(data.totalPages || 1);
        setTotalCount(data.totalCount || 0);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        if (selectedMessage?.id === id) {
          setSelectedMessage(null);
        }
        // If we delete the last item on the page, go to previous page
        if (messages.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        } else {
          fetchMessages();
        }
      } else {
        alert("Failed to delete message");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setOrder("desc");
    }
    setCurrentPage(1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container mx-auto px-4 py-20 max-w-6xl">
      {/* Header */}
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
            Manage Messages
          </h1>
        </div>
        <div className="text-sm text-muted-foreground bg-muted/50 border border-border px-4 py-2 rounded-full">
          Total Messages: <span className="font-bold text-foreground">{totalCount}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left/Main Column: Messages List */}
        <div className={selectedMessage ? "lg:col-span-7" : "lg:col-span-12"}>
          <div className="glass rounded-2xl overflow-hidden bg-card border border-border">
            
            {/* Table Controls (Limit Selection) */}
            <div className="p-4 border-b border-border bg-muted/10 flex justify-between items-center flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Show</span>
                <select
                  value={limit}
                  onChange={(e) => {
                    setLimit(parseInt(e.target.value, 10));
                    setCurrentPage(1);
                  }}
                  className="bg-background border border-border rounded px-2.5 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <span>messages per page</span>
              </div>
            </div>

            {loading ? (
              <div className="p-12 text-center text-muted-foreground">
                Loading messages...
              </div>
            ) : messages.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground">
                No contact messages found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border bg-muted/20">
                      <th 
                        onClick={() => handleSort("name")}
                        className="p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground cursor-pointer hover:bg-muted/30 transition-all select-none"
                      >
                        <div className="flex items-center gap-1.5">
                          Sender
                          <ArrowUpDown className="w-3.5 h-3.5" />
                        </div>
                      </th>
                      <th 
                        onClick={() => handleSort("subject")}
                        className="p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground cursor-pointer hover:bg-muted/30 transition-all select-none"
                      >
                        <div className="flex items-center gap-1.5">
                          Subject
                          <ArrowUpDown className="w-3.5 h-3.5" />
                        </div>
                      </th>
                      <th 
                        onClick={() => handleSort("createdAt")}
                        className="p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground cursor-pointer hover:bg-muted/30 transition-all select-none"
                      >
                        <div className="flex items-center gap-1.5">
                          Date Sent
                          <ArrowUpDown className="w-3.5 h-3.5" />
                        </div>
                      </th>
                      <th className="p-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground text-right">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.map((msg) => (
                      <tr
                        key={msg.id}
                        onClick={() => setSelectedMessage(msg)}
                        className={`border-b border-border cursor-pointer transition-colors ${
                          selectedMessage?.id === msg.id 
                            ? "bg-primary/5 hover:bg-primary/10" 
                            : "hover:bg-muted/10"
                        }`}
                      >
                        <td className="p-4">
                          <div className="font-semibold text-foreground">{msg.name}</div>
                          <div className="text-xs text-muted-foreground">{msg.email}</div>
                        </td>
                        <td className="p-4">
                          <p className="text-sm font-medium text-foreground max-w-xs truncate">
                            {msg.subject}
                          </p>
                        </td>
                        <td className="p-4 text-xs text-muted-foreground">
                          {formatDate(msg.createdAt)}
                        </td>
                        <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleDelete(msg.id)}
                            className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-500/10 transition-colors inline-flex items-center"
                            title="Delete message"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="p-4 border-t border-border bg-muted/10 flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  Page <span className="font-semibold text-foreground">{currentPage}</span> of{" "}
                  <span className="font-semibold text-foreground">{totalPages}</span>
                </span>
                <div className="flex gap-1.5">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="p-1.5 border border-border rounded-lg bg-background hover:bg-muted text-foreground transition-all disabled:opacity-50 disabled:hover:bg-background disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p)}
                      className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all border ${
                        currentPage === p
                          ? "bg-primary border-primary text-white"
                          : "border-border bg-background hover:bg-muted text-foreground"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="p-1.5 border border-border rounded-lg bg-background hover:bg-muted text-foreground transition-all disabled:opacity-50 disabled:hover:bg-background disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Message Detail view (displays side-by-side on larger screens) */}
        {selectedMessage && (
          <div className="lg:col-span-5 animate-in fade-in slide-in-from-right duration-300">
            <div className="glass p-6 rounded-2xl bg-card border border-border sticky top-24 space-y-6">
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold text-foreground">Message Details</h2>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors underline"
                >
                  Close Detail
                </button>
              </div>

              {/* Message Meta */}
              <div className="space-y-3.5 bg-muted/40 p-4 rounded-xl border border-border">
                <div className="flex items-center gap-2.5 text-sm text-foreground">
                  <User className="w-4 h-4 text-primary" />
                  <span className="font-semibold">{selectedMessage.name}</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 text-primary" />
                  <a href={`mailto:${selectedMessage.email}`} className="hover:underline hover:text-foreground transition-colors">
                    {selectedMessage.email}
                  </a>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <span>Subject: <span className="text-foreground font-medium">{selectedMessage.subject}</span></span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>{formatDate(selectedMessage.createdAt)}</span>
                </div>
              </div>

              {/* Message Content */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Message Body</h3>
                <div className="bg-background border border-border rounded-xl p-4 min-h-[160px] text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                  className="flex-1 text-center bg-primary hover:bg-primary/95 text-white font-bold py-3 rounded-xl transition-all shadow-md text-sm"
                >
                  Reply via Email
                </a>
                <button
                  onClick={() => handleDelete(selectedMessage.id)}
                  className="bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white p-3 rounded-xl transition-all"
                  title="Delete message"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
