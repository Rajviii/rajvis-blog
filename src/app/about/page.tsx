export const metadata = {
  title: "About",
  description: "Learn more about Rajvi and the mission behind this blog.",
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <div className="glass rounded-3xl p-8 md:p-16 relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
          <div className="w-48 h-48 md:w-64 md:h-64 relative rounded-full overflow-hidden border-4 border-border shadow-2xl shrink-0 bg-background flex items-center justify-center">
            {/* Placeholder image, replace with user's actual image later */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
              <span className="text-6xl drop-shadow-md">✨</span>
            </div>
          </div>
          
          <div>
            <h1 className="text-4xl md:text-5xl font-bold font-heading mb-6 text-gradient">
              About Rajvi's Blog
            </h1>
            <div className="prose dark:prose-invert max-w-none text-lg text-muted-foreground leading-relaxed">
              <p>
                Welcome to my digital corner of the internet. I started this blog to share daily insights, 
                tutorial guides, and evergreen stories that inspire and inform.
              </p>
              <p>
                Our mission is to provide high-quality, deeply researched content that adds value to your life 
                every single day. Whether you're here for technology updates, lifestyle tips, or creative inspiration, 
                we have something for you.
              </p>
              <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">The Creator</h2>
              <p>
                Rajvi is a passionate writer and developer with a love for clean design and impactful storytelling. 
                With years of experience in the industry, Rajvi brings a unique perspective to every topic covered on this platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
