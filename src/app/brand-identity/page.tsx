"use client";

import React, { useState } from "react";
import {
  MasterLogo,
  SimplifiedLogo,
  FaviconLogo,
  AppIconLogo,
  WebsiteHeaderLogo,
  PersonalBrandLogo,
} from "@/components/layout/brand-logos";
import { Copy, Check, Download, Grid, Palette, Layout, Type, ShieldAlert } from "lucide-react";

type ThemeVariant = "dark" | "light" | "glass" | "slate";

export default function BrandIdentityPage() {
  const [showGrid, setShowGrid] = useState(false);
  const [previewTheme, setPreviewTheme] = useState<ThemeVariant>("dark");
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  // Raw SVG codes for copying/downloading
  const svgCodes = {
    master: `<svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M 220 150 C 130 170 95 270 115 370 C 130 450 170 475 210 450 C 255 420 275 320 265 240 C 260 180 245 150 220 150 Z M 210 175 C 230 175 240 230 240 290 C 240 350 220 425 200 425 C 180 425 150 380 143 315 C 136 250 160 175 210 175 Z" fill="#09090b" fill-rule="evenodd" />
  <path d="M 110 160 C 135 150 175 125 200 80 C 210 65 218 67 218 80 C 218 135 245 270 240 365 C 238 380 232 385 225 385 C 218 385 220 370 222 350 C 228 270 205 135 205 95 C 175 135 140 145 110 145 C 108 145 108 160 110 160 Z" fill="#09090b" />
  <path d="M 206 138 C 255 108 328 118 328 190 C 328 245 278 263 240 263 C 235 263 235 255 240 255 C 270 255 310 238 310 190 C 310 145 255 128 210 148 L 206 138 Z" fill="#09090b" />
  <path d="M 240 260 C 265 260 290 310 312 360 C 320 375 330 375 340 350 C 355 315 370 290 376 295 C 382 300 370 315 355 345 C 345 365 332 385 320 385 C 300 385 280 320 255 272 C 250 265 242 260 240 260 Z" fill="#09090b" />
  <path d="M 233 323 C 250 321 270 318 285 316 C 288 316 288 320 285 320 C 270 322 250 325 233 327 C 230 327 230 323 233 323 Z" fill="#09090b" />
  <path d="M 376 295 C 371 292 367 282 369 270 C 371 259 382 255 390 262 C 394 266 408 282 422 290 C 408 290 395 286 385 292 C 382 294 378 295 376 295 Z" fill="#09090b" />
  <circle cx="377" cy="268" r="1.5" fill="#FFFFFF" />
  <path d="M 383 273 C 391 276 399 283 402 288 C 396 287 390 281 383 273 Z" fill="#FFFFFF" opacity="0.7" />
</svg>`,
    simplified: `<svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g stroke="#09090b" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M 215 140 C 130 160 110 260 125 360 C 138 435 180 445 205 425 C 240 395 250 300 245 240 C 242 190 230 140 215 140 Z" />
    <path d="M 120 150 C 145 140 180 115 205 75 C 208 70 208 70 210 90 C 215 140 230 260 225 370" />
    <path d="M 210 145 C 260 120 315 130 315 190 C 315 245 265 255 220 255" />
    <path d="M 223 255 C 255 255 285 315 315 365 C 322 375 330 375 342 355 C 352 335 362 315 368 318" />
    <path d="M 224 315 H 285" stroke-width="14" />
    <path d="M 368 318 C 365 310 360 295 365 285 C 370 275 385 272 392 280 C 396 285 410 300 422 308 C 405 308 390 302 380 308 Z" fill="#09090b" stroke="none" />
  </g>
</svg>`,
    favicon: `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g stroke="#09090b" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M 45 30 C 25 35 20 60 25 80 C 30 95 40 95 45 90 C 52 80 55 60 54 48 C 53 38 50 30 45 30 Z" />
    <path d="M 25 32 C 32 30 40 22 45 15 C 47 25 50 55 48 82" />
    <path d="M 46 32 C 60 25 72 27 72 45 C 72 60 60 62 48 62" />
    <path d="M 48 62 C 56 62 64 78 70 80 C 74 81 77 77 78 72" />
    <path d="M 47 69 H 61" stroke-width="6" />
    <path d="M 78 72 C 76 70 74 65 75 60 C 76 56 80 54 83 58 C 85 60 91 68 97 72 C 90 72 84 70 78 72 Z" fill="#09090b" stroke="none" />
    <circle cx="77.5" cy="59" r="0.8" fill="#FFFFFF" stroke="none" />
  </g>
</svg>`,
    appicon: `<svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="500" y2="500" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#111111" />
      <stop offset="50%" stop-color="#1e1e1e" />
      <stop offset="100%" stop-color="#0d0d0d" />
    </linearGradient>
    <clipPath id="squircleClip">
      <rect x="0" y="0" width="500" height="500" rx="110" />
    </clipPath>
  </defs>
  <g clip-path="url(#squircleClip)">
    <rect width="500" height="500" fill="url(#bgGrad)" />
    <g opacity="0.05">
      <path d="M 0 50 H 500 M 0 100 H 500 M 0 150 H 500 M 0 200 H 500 M 0 250 H 500 M 0 300 H 500 M 0 350 H 500 M 0 400 H 500 M 0 450 H 500" stroke="#ffffff" stroke-width="1" />
      <path d="M 50 0 V 500 M 100 0 V 500 M 150 0 V 500 M 200 0 V 500 M 250 0 V 500 M 300 0 V 500 M 350 0 V 500 M 400 0 V 500 M 450 0 V 500" stroke="#ffffff" stroke-width="1" />
    </g>
    <rect x="0.5" y="0.5" width="499" height="499" rx="109.5" stroke="#ffffff" stroke-opacity="0.08" stroke-width="1" />
    <g transform="translate(42, 42) scale(0.83)">
      <g stroke="#ffffff" stroke-width="18" stroke-linecap="round" stroke-linejoin="round" fill="none">
        <path d="M 215 140 C 130 160 110 260 125 360 C 138 435 180 445 205 425 C 240 395 250 300 245 240 C 242 190 230 140 215 140 Z" />
        <path d="M 120 150 C 145 140 180 115 205 75 C 208 70 208 70 210 90 C 215 140 230 260 225 370" />
        <path d="M 210 145 C 260 120 315 130 315 190 C 315 245 265 255 220 255" />
        <path d="M 223 255 C 255 255 285 315 315 365 C 322 375 330 375 342 355 C 352 335 362 315 368 318" />
        <path d="M 224 315 H 285" stroke-width="14" />
        <path d="M 368 318 C 365 310 360 295 365 285 C 370 275 385 272 392 280 C 396 285 410 300 422 308 C 405 308 390 302 380 308 Z" fill="#ffffff" stroke="none" />
      </g>
    </g>
  </g>
</svg>`,
  };

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleDownload = (code: string, filename: string) => {
    const blob = new Blob([code], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getThemeClasses = (variant: ThemeVariant) => {
    switch (variant) {
      case "dark":
        return "bg-neutral-950 text-white border border-neutral-800 radial-grid-dark";
      case "light":
        return "bg-neutral-50 text-neutral-900 border border-neutral-200 radial-grid-light";
      case "glass":
        return "bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 text-foreground";
      case "slate":
        return "bg-slate-900 text-slate-100 border border-slate-800 radial-grid-slate";
    }
  };

  const getLogoColor = (variant: ThemeVariant) => {
    switch (variant) {
      case "light":
        return "#09090b";
      case "dark":
      case "slate":
      default:
        return "#ffffff";
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl font-body">
      {/* Header Info */}
      <div className="mb-12 border-b border-border pb-8">
        <span className="text-sm font-semibold uppercase tracking-widest text-primary">
          Design System & Brand Assets
        </span>
        <h1 className="text-5xl font-black font-heading text-foreground mt-2 mb-4 leading-tight">
          Rajvi Brand Identity
        </h1>
        <p className="text-muted-foreground text-lg max-w-3xl">
          A timeless personal identity system constructed around a hand-drawn composition, translating
          music, software engineering, nostalgia, and growth into a minimalist premium monogram.
        </p>
      </div>

      {/* Control Panel */}
      <div className="mb-10 flex flex-wrap gap-4 items-center justify-between p-6 glass rounded-2xl">
        <div className="flex items-center space-x-6">
          {/* Construction Grid Toggle */}
          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 border ${
              showGrid
                ? "bg-primary/20 text-primary border-primary/30 shadow-sm"
                : "hover:bg-muted text-muted-foreground border-transparent"
            }`}
          >
            <Grid size={18} />
            <span>{showGrid ? "Hide Construction Lines" : "Show Construction Lines"}</span>
          </button>

          {/* Theme Switcher for Previews */}
          <div className="flex items-center space-x-2 border-l border-border pl-6">
            <Palette size={18} className="text-muted-foreground" />
            <span className="text-xs font-semibold uppercase text-muted-foreground tracking-wider mr-2">
              Preview Mode
            </span>
            <div className="flex bg-neutral-100 dark:bg-neutral-800/80 p-1 rounded-lg">
              {(["dark", "light", "glass", "slate"] as ThemeVariant[]).map((theme) => (
                <button
                  key={theme}
                  onClick={() => setPreviewTheme(theme)}
                  className={`text-xs capitalize font-medium px-3 py-1.5 rounded-md transition-all ${
                    previewTheme === theme
                      ? "bg-white dark:bg-neutral-700 shadow-sm text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {theme}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground bg-muted/60 border border-border px-3 py-1.5 rounded-lg flex items-center space-x-2 mt-4 lg:mt-0">
          <Layout size={14} />
          <span>Interactive Canvas - Live Adjustments</span>
        </div>
      </div>

      {/* Logo Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        
        {/* 1. MASTER LOGO CARD */}
        <div className="flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
          <div className={`aspect-square flex items-center justify-center p-8 transition-colors duration-300 relative ${getThemeClasses(previewTheme)}`}>
            <MasterLogo size={260} color={getLogoColor(previewTheme)} showGrid={showGrid} />
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-heading font-bold text-xl text-foreground">1. Master Logo</h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-primary/10 text-primary">
                  Vector SVG
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                The calligraphic vector interpretation. Features organic transitions, custom curve tapering,
                and precise geometric balancing. Serves as the primary brand asset on all screens.
              </p>
            </div>
            <div className="flex space-x-3 mt-4 border-t border-border/50 pt-4">
              <button
                onClick={() => handleCopy(svgCodes.master, "master")}
                className="flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg bg-muted text-xs font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
              >
                {copiedIndex === "master" ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                <span>{copiedIndex === "master" ? "Copied" : "Copy Code"}</span>
              </button>
              <button
                onClick={() => handleDownload(svgCodes.master, "rajvi-logo-master.svg")}
                className="px-3.5 py-2 rounded-lg bg-muted text-xs hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                title="Download SVG file"
              >
                <Download size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* 2. SIMPLIFIED LOGO CARD */}
        <div className="flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
          <div className={`aspect-square flex items-center justify-center p-8 transition-colors duration-300 relative ${getThemeClasses(previewTheme)}`}>
            <SimplifiedLogo size={260} color={getLogoColor(previewTheme)} showGrid={showGrid} />
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-heading font-bold text-xl text-foreground">2. Simplified Logo</h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/10 text-amber-500">
                  Uniform Weight
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Constructed using consistent geometric path segments. Optimized for medium display sizes,
                technical layouts, and high-visibility printing where fine details would wash out.
              </p>
            </div>
            <div className="flex space-x-3 mt-4 border-t border-border/50 pt-4">
              <button
                onClick={() => handleCopy(svgCodes.simplified, "simplified")}
                className="flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg bg-muted text-xs font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
              >
                {copiedIndex === "simplified" ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                <span>{copiedIndex === "simplified" ? "Copied" : "Copy Code"}</span>
              </button>
              <button
                onClick={() => handleDownload(svgCodes.simplified, "rajvi-logo-simplified.svg")}
                className="px-3.5 py-2 rounded-lg bg-muted text-xs hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                title="Download SVG file"
              >
                <Download size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* 3. FAVICON VERSION */}
        <div className="flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
          <div className={`aspect-square flex flex-col items-center justify-center space-y-8 p-8 transition-colors duration-300 relative ${getThemeClasses(previewTheme)}`}>
            {/* 16x16 / 32x32 / 64x64 comparisons */}
            <div className="flex items-center space-x-8">
              <div className="flex flex-col items-center space-y-1">
                <FaviconLogo size={16} color={getLogoColor(previewTheme)} />
                <span className="text-[10px] opacity-60">16x16</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <FaviconLogo size={32} color={getLogoColor(previewTheme)} />
                <span className="text-[10px] opacity-60">32x32</span>
              </div>
              <div className="flex flex-col items-center space-y-1">
                <FaviconLogo size={64} color={getLogoColor(previewTheme)} />
                <span className="text-[10px] opacity-60">64x64</span>
              </div>
            </div>
            
            {/* Tab Mockup preview */}
            <div className="w-full max-w-[220px] rounded-lg border border-border bg-neutral-900 text-[11px] text-neutral-400 p-2 select-none shadow-md">
              <div className="flex items-center space-x-1.5 border-b border-neutral-800 pb-1.5 mb-1.5 opacity-60">
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                <div className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
              </div>
              <div className="bg-neutral-800 text-neutral-200 rounded px-2 py-1 flex items-center space-x-2 w-max max-w-full truncate">
                <FaviconLogo size={12} color={getLogoColor(previewTheme)} />
                <span className="truncate">Rajvi's Blog — Tab</span>
              </div>
            </div>
          </div>
          
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-heading font-bold text-xl text-foreground">3. Favicon Version</h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500">
                  Tab-Ready
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Pixel-optimized silhouette rendering. Designed specifically to remain distinct and recognizable
                at standard 16x16 / 32x32 browser tab resolutions and search index thumbnails.
              </p>
            </div>
            <div className="flex space-x-3 mt-4 border-t border-border/50 pt-4">
              <button
                onClick={() => handleCopy(svgCodes.favicon, "favicon")}
                className="flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg bg-muted text-xs font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
              >
                {copiedIndex === "favicon" ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                <span>{copiedIndex === "favicon" ? "Copied" : "Copy Code"}</span>
              </button>
              <button
                onClick={() => handleDownload(svgCodes.favicon, "favicon.svg")}
                className="px-3.5 py-2 rounded-lg bg-muted text-xs hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                title="Download SVG file"
              >
                <Download size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* 4. APP ICON VERSION */}
        <div className="flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
          <div className={`aspect-square flex items-center justify-center space-x-6 p-8 transition-colors duration-300 relative ${getThemeClasses(previewTheme)}`}>
            <div className="flex flex-col items-center space-y-2">
              <AppIconLogo size={120} variant="dark" />
              <span className="text-[10px] opacity-70">iOS/PWA Dark</span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <AppIconLogo size={120} variant="light" />
              <span className="text-[10px] opacity-70">iOS/PWA Light</span>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-heading font-bold text-xl text-foreground">4. App Icon Version</h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-purple-500/10 text-purple-500">
                  Squircle Wrap
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Wrapped in a custom squircle grid. Ideal for PWA installations, mobile icons (iOS/Android),
                and corporate social media profile containers. Combines gradients with fine tech details.
              </p>
            </div>
            <div className="flex space-x-3 mt-4 border-t border-border/50 pt-4">
              <button
                onClick={() => handleCopy(svgCodes.appicon, "appicon")}
                className="flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg bg-muted text-xs font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
              >
                {copiedIndex === "appicon" ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                <span>{copiedIndex === "appicon" ? "Copied" : "Copy Code"}</span>
              </button>
              <button
                onClick={() => handleDownload(svgCodes.appicon, "app-icon.svg")}
                className="px-3.5 py-2 rounded-lg bg-muted text-xs hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                title="Download SVG file"
              >
                <Download size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* 5. WEBSITE HEADER VERSION */}
        <div className="flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
          <div className={`aspect-square flex items-center justify-center p-8 transition-colors duration-300 relative ${getThemeClasses(previewTheme)}`}>
            <div className="p-4 rounded-xl border border-white/5 bg-white/5 backdrop-blur-md shadow-lg">
              <WebsiteHeaderLogo size={40} />
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-heading font-bold text-xl text-foreground">5. Website Header</h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-blue-500/10 text-blue-500">
                  Header Lockup
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Horizontal typographic arrangement. Matches the Master Logo with bold title typography in 
                the **Outfit** font family. Integrates into the primary website nav-header.
              </p>
            </div>
            <div className="flex space-x-3 mt-4 border-t border-border/50 pt-4">
              <button
                onClick={() => handleDownload(svgCodes.master, "rajvi-logo-header.svg")}
                className="w-full flex items-center justify-center space-x-2 py-2 rounded-lg bg-muted text-xs font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
              >
                <Download size={14} />
                <span>Download Header Layout</span>
              </button>
            </div>
          </div>
        </div>

        {/* 6. PERSONAL BRAND VERSION */}
        <div className="flex flex-col bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
          <div className={`aspect-square flex items-center justify-center p-8 transition-colors duration-300 relative ${getThemeClasses(previewTheme)}`}>
            <div className="p-6 rounded-xl border border-white/5 bg-white/5 backdrop-blur-md shadow-lg max-w-[280px]">
              <PersonalBrandLogo size={50} orientation="vertical" />
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-heading font-bold text-xl text-foreground">6. Personal Brand</h3>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-pink-500/10 text-pink-500">
                  Creator Identity
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Typography lockup integrating Rajvi Prajapati's full name alongside the "Technology Creator" 
                sub-brand tag. Optimized for presentations, github profiles, and speaking slide decks.
              </p>
            </div>
            <div className="flex space-x-3 mt-4 border-t border-border/50 pt-4">
              <button
                onClick={() => handleDownload(svgCodes.master, "rajvi-logo-brand.svg")}
                className="w-full flex items-center justify-center space-x-2 py-2 rounded-lg bg-muted text-xs font-semibold hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
              >
                <Download size={14} />
                <span>Download Brand Layout</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Symbolism & Narrative Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
        
        {/* Brand Narrative */}
        <div className="p-8 glass rounded-2xl">
          <h2 className="text-2xl font-bold font-heading mb-4 text-gradient flex items-center space-x-2">
            <span>Symbolism & Narrative</span>
          </h2>
          <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
            <p>
              This logo represents a deeply personal journey, capturing key life elements into a singular, unified 
              symbol. Unlike generic visual identity elements, every curve and junction carries a memory.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div className="border border-border/50 p-4 rounded-xl bg-card">
                <span className="font-bold text-foreground block mb-1">Letter R</span>
                The primary silhouette of the composition, standing for <strong className="text-foreground font-semibold">Rajvi</strong>. Represents personal growth and cohesive brand presence.
              </div>
              <div className="border border-border/50 p-4 rounded-xl bg-card">
                <span className="font-bold text-foreground block mb-1">Letter J (Left Loop)</span>
                A stylized loop representing music, creativity, and the loops of code in software development.
              </div>
              <div className="border border-border/50 p-4 rounded-xl bg-card">
                <span className="font-bold text-foreground block mb-1">Letter A</span>
                A hidden geometric letter form within the inner crossbar, honoring the initial of Rajvi's mother.
              </div>
              <div className="border border-border/50 p-4 rounded-xl bg-card">
                <span className="font-bold text-foreground block mb-1">The Bird</span>
                A stylized bird resting on the right leg tip, representing a best friend, flight, and free-spirited learning.
              </div>
            </div>
          </div>
        </div>

        {/* Brand System Rules & Typography */}
        <div className="p-8 glass rounded-2xl flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold font-heading mb-4 text-gradient flex items-center space-x-2">
              <span>Brand Guidelines</span>
            </h2>
            <div className="space-y-4">
              {/* Do & Don't snippets */}
              <div className="flex items-start space-x-3 text-sm text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                <p>
                  <strong className="text-foreground">Do:</strong> Maintain transparent spacing around the logo relative to 20% of its size container. Use the uniform-weight Simplified Logo for all text overlays under 32px height.
                </p>
              </div>
              <div className="flex items-start space-x-3 text-sm text-muted-foreground">
                <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                <p>
                  <strong className="text-foreground">Don't:</strong> Distort the aspect ratio, add heavy outer dropshadows, or combine the logo with standard musical note templates.
                </p>
              </div>
            </div>
          </div>

          {/* Typography Details */}
          <div className="mt-8 border-t border-border/50 pt-6">
            <h3 className="font-heading font-bold text-md text-foreground mb-3 flex items-center space-x-2">
              <Type size={16} className="text-primary" />
              <span>Typography Pairing</span>
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-muted rounded-xl">
                <span className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">Heading Font</span>
                <span className="font-heading font-bold text-lg text-foreground">Outfit Bold</span>
                <span className="text-xs text-muted-foreground block">Aa Bb Cc - Geometric</span>
              </div>
              <div className="p-3 bg-muted rounded-xl">
                <span className="text-[10px] uppercase font-bold text-muted-foreground block mb-1">Body Font</span>
                <span className="font-body text-md text-foreground">Inter Regular</span>
                <span className="text-xs text-muted-foreground block">Aa Bb Cc - Modern Grotesque</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* SVG Code Explorer Section */}
      <div className="p-8 bg-neutral-900 border border-neutral-800 text-neutral-200 rounded-3xl relative overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-60 pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 relative">
          <div>
            <h2 className="text-2xl font-bold font-heading text-white flex items-center space-x-2">
              <span>Production-Ready SVG Codes</span>
            </h2>
            <p className="text-sm text-neutral-400 mt-1">
              Scalable, responsive, transparent vector paths. Cleaned from design artifacts.
            </p>
          </div>
        </div>

        {/* Tab display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
          <div>
            <div className="bg-neutral-950 rounded-xl p-4 border border-neutral-800 h-96 overflow-y-auto font-mono text-xs select-all text-neutral-300">
              <pre className="whitespace-pre-wrap">{svgCodes.master}</pre>
            </div>
            <div className="flex justify-between items-center mt-3">
              <span className="text-xs text-neutral-500">Showing: Master Logo SVG paths</span>
              <button
                onClick={() => handleCopy(svgCodes.master, "master-explorer")}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200 transition-colors"
              >
                {copiedIndex === "master-explorer" ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                <span>{copiedIndex === "master-explorer" ? "Copied" : "Copy Source"}</span>
              </button>
            </div>
          </div>

          <div>
            <div className="bg-neutral-950 rounded-xl p-4 border border-neutral-800 h-96 overflow-y-auto font-mono text-xs select-all text-neutral-300">
              <pre className="whitespace-pre-wrap">{svgCodes.simplified}</pre>
            </div>
            <div className="flex justify-between items-center mt-3">
              <span className="text-xs text-neutral-500">Showing: Simplified Logo SVG paths</span>
              <button
                onClick={() => handleCopy(svgCodes.simplified, "simplified-explorer")}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold text-neutral-200 transition-colors"
              >
                {copiedIndex === "simplified-explorer" ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                <span>{copiedIndex === "simplified-explorer" ? "Copied" : "Copy Source"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
