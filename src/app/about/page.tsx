import Image from "next/image";
import { Heart, Sparkles, Coffee, History, Camera, User } from "lucide-react";

export const metadata = {
  title: "About",
  description: "Learn more about Rajvi and the mission behind this blog.",
};

export default function AboutPage() {
  return (
    <div className="relative min-h-screen bg-background overflow-hidden py-12 md:py-20">
      {/* Background Decorative Elements */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-difference z-0"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none z-0" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[150px] pointer-events-none z-0" />

      <div className="container mx-auto px-4 relative z-10 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-4 border border-primary/20 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            MY STORY
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-heading leading-tight text-foreground">
            A sanctuary for <span className="text-primary italic font-serif">insights and ideas.</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl italic font-serif">
            "Writing to inspire, inform, and share the journey of development and design."
          </p>
        </div>

        {/* Profile & Story Section - Centralized Layout */}
        <div className="space-y-24">
          <div className="relative max-w-sm mx-auto group">
            {/* Polaroid-style Profile Card */}
            <div className="bg-white dark:bg-zinc-900 p-4 pb-16 shadow-2xl rounded-sm -rotate-2 border border-black/5 dark:border-white/10 transform transition-transform group-hover:rotate-0 duration-500">
              <div className="relative aspect-[4/5] bg-muted overflow-hidden rounded-xs">
                <Image
                  src="/About-IVJAR.png"
                  alt="Rajvi - Blogger & Developer"
                  fill
                  className="object-cover sepia-[0.1] transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-black/5 mix-blend-overlay" />
              </div>
              <div className="mt-6 flex items-center justify-between px-2">
                <div>
                  <h3 className="text-zinc-800 dark:text-zinc-200 font-serif italic text-2xl font-semibold">
                    Hi, I'm Rajvi
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400 font-medium text-sm m-0">
                    Blogger & Developer
                  </p>
                </div>
                <User className="w-6 h-6 text-zinc-300 dark:text-zinc-700" />
              </div>
            </div>

            {/* Floating Decorative Icon */}
            <div className="absolute -top-4 -right-4 w-12 h-12 md:w-16 md:h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-xl rotate-12 z-20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-0">
              <Heart className="w-6 h-6 md:w-8 md:h-8 fill-current" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-16 max-w-3xl mx-auto">
            <div className="space-y-6 text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="p-2 rounded-lg bg-primary/10">
                  <History className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold font-heading text-foreground">
                  Why I Blog?
                </h2>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                In a world dominated by rapid feeds and short-form media, I wanted to create a dedicated space for detailed tutorials, thoughtful insights, and evergreen guides. This blog is my digital workshop where I document lessons, explore clean design principles, and share practical discoveries.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-3xl bg-card border border-border/50 backdrop-blur-xs hover:bg-muted/30 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Camera className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold font-heading mb-3 text-foreground">The Vision</h4>
                <p className="text-muted-foreground leading-relaxed">
                  To build a high-quality reference hub where readers find clear coding guides, software engineering stories, and clean UI/UX ideas, packaged in an elegant, reader-focused layout.
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-card border border-border/50 backdrop-blur-xs hover:bg-muted/30 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Coffee className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-bold font-heading mb-3 text-foreground">The Content</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Every article is written with care—from Next.js and databases to lifestyle logs. My goal is to break down complex architectural themes into clear, helpful reading for creators and developers alike.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Call to Action */}
        <div className="mt-32 text-center">
          <div className="p-10 md:p-16 rounded-[40px] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary/10 rounded-full blur-[80px] group-hover:bg-primary/20 transition-colors" />

            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-foreground">
              Let's Connect
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10 text-lg">
              Thank you for being part of this reader community. Let's write, build, and grow together. My inbox is always open for questions, reviews, or collaborations.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <a
                href="mailto:rajvijprajapati24@gmail.com"
                className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-10 py-4 font-bold text-lg hover:bg-primary/90 transition-all hover:scale-105 shadow-xl shadow-primary/20 font-heading"
              >
                Say Hello
              </a>
              <span className="text-muted-foreground italic font-serif">
                "Sharing the journey..."
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
