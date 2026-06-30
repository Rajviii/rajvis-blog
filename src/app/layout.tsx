import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { WebsiteHeaderLogo } from "@/components/layout/brand-logos";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rajvisblog.vercel.app"),
  title: {
    default: "Rajvi's Blog | Insightful Stories & Daily Updates",
    template: "%s | Rajvi's Blog",
  },
  description: "A high-quality platform for daily blogs, insights, and evergreen content.",
  keywords: ["blog", "daily updates", "evergreen content", "insights"],
  authors: [{ name: "Rajvi" }],
  creator: "Rajvi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rajvisblog.vercel.app",
    siteName: "Rajvi's Blog",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rajvi's Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rajvi's Blog",
    description: "Daily insights and evergreen content.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "etppmMvaQkGqXRvYhy4FA5_uupnaAjg5b11g1sl8FDk",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} font-sans min-h-screen bg-background text-foreground transition-colors duration-300`}
      >
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);
              t.async=1;
              t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";
              y=l.getElementsByTagName(r)[0];
              y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "xf1u564vlc");
          `}
        </Script>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <footer className="border-t border-border py-12 glass">
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="col-span-2">
                    <div className="mb-4">
                      <WebsiteHeaderLogo size={36} />
                    </div>
                    <p className="text-muted-foreground max-w-sm">
                      Sharing daily insights and evergreen content to help you grow and stay informed.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-4">Links</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><a href="/privacy" className="hover:text-foreground">Privacy Policy</a></li>
                      <li><a href="/terms" className="hover:text-foreground">Terms of Service</a></li>
                      <li><a href="/sitemap.xml" className="hover:text-foreground">Sitemap</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold mb-4">Connect</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li><a href="https://x.com/Rajvi12M" className="hover:text-foreground">Twitter</a></li>
                      <li><a href="https://github.com/Rajviii" className="hover:text-foreground">GitHub</a></li>
                      <li><a href="https://www.linkedin.com/in/rajvi-prajapati-49a598220/" className="hover:text-foreground">LinkedIn</a></li>
                      <li><a href="mailto:rajvijprajapatirjp24@gmail.com" className="hover:text-foreground">Email</a></li>
                    </ul>
                  </div>
                </div>
                <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
                  © {new Date().getFullYear()} Rajvi's Blog. All rights reserved.
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
