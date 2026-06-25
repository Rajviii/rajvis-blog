import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

// Automatically synchronize favicon and app icon assets on startup/build
try {
  const rootDir = process.cwd();
  const srcDir = path.join(rootDir, "public", "images");
  const publicDir = path.join(rootDir, "public");
  const appDir = path.join(rootDir, "src", "app");

  const filesToCopy = [
    "favicon.ico",
    "favicon-16x16.png",
    "favicon-32x32.png",
    "apple-touch-icon.png",
    "android-chrome-192x192.png",
    "android-chrome-512x512.png",
    "site.webmanifest"
  ];

  // 1. Copy files to public/
  filesToCopy.forEach((file) => {
    const srcPath = path.join(srcDir, file);
    const destPath = path.join(publicDir, file);
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
    }
  });

  // 2. Copy favicon.ico to src/app/
  const appFaviconDest = path.join(appDir, "favicon.ico");
  const srcFavicon = path.join(srcDir, "favicon.ico");
  if (fs.existsSync(srcFavicon)) {
    fs.copyFileSync(srcFavicon, appFaviconDest);
  }

  // 3. Delete obsolete icon.svg in src/app/
  const appIconSvg = path.join(appDir, "icon.svg");
  if (fs.existsSync(appIconSvg)) {
    fs.unlinkSync(appIconSvg);
  }
} catch (err) {
  console.error("Error copying icon assets on startup:", err);
}

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
