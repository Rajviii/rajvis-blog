export const metadata = {
  title: "Contact",
  description: "Get in touch with Rajvi.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-gradient">Get in Touch</h1>
        <p className="text-lg text-muted-foreground">
          Have a question or want to work together? Drop me a message below.
        </p>
      </div>

      <div className="glass rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl -ml-16 -mb-16 pointer-events-none"></div>

        <form className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <input 
                type="text" 
                id="name" 
                className="w-full bg-background/50 border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm backdrop-blur-xs"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full bg-background/50 border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm backdrop-blur-xs"
                placeholder="john@example.com"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium">Subject</label>
            <input 
              type="text" 
              id="subject" 
              className="w-full bg-background/50 border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm backdrop-blur-xs"
              placeholder="How can I help you?"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">Message</label>
            <textarea 
              id="message" 
              rows={6}
              className="w-full bg-background/50 border border-border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-sm backdrop-blur-xs"
              placeholder="Your message here..."
            ></textarea>
          </div>
          <button 
            type="button"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 active:translate-y-0"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
