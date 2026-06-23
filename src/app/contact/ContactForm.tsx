"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      setSubmitStatus("error");
      setErrorMessage("Please fill in all the fields.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        const data = await response.json();
        setSubmitStatus("error");
        setErrorMessage(data.error || "Failed to send the message. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
      setErrorMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl -ml-16 -mb-16 pointer-events-none"></div>

      {submitStatus === "success" ? (
        <div className="text-center py-8 space-y-4 animate-in fade-in duration-300">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 text-green-500 mb-2">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Message Sent!</h2>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Thank you for reaching out. I have received your message and will get back to you soon.
          </p>
          <button
            onClick={() => setSubmitStatus(null)}
            className="mt-6 bg-muted hover:bg-muted/80 text-foreground font-bold py-2.5 px-6 rounded-full transition-all text-sm"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          {submitStatus === "error" && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-background/50 border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm backdrop-blur-xs text-foreground placeholder:text-muted-foreground/60"
                placeholder="Ivjar Linom"
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-background/50 border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm backdrop-blur-xs text-foreground placeholder:text-muted-foreground/60"
                placeholder="Ivjar24@example.com"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium">Subject</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-background/50 border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm backdrop-blur-xs text-foreground placeholder:text-muted-foreground/60"
              placeholder="How can I help you?"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">Message</label>
            <textarea
              id="message"
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-background/50 border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm backdrop-blur-xs text-foreground placeholder:text-muted-foreground/60"
              placeholder="Your message here..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span>Sending...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
