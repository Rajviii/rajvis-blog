"use client";

import React from "react";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  showGrid?: boolean;
}

/**
 * 1. MASTER LOGO (Calligraphic, elegant, high-fidelity)
 * Preservation of J (music/creativity), A (mother's initial), Bird (friend), R (Rajvi)
 */
export function MasterLogo({ size = 200, color = "currentColor", showGrid = false, ...props }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-colors duration-300"
      {...props}
    >
      {showGrid && <LogoGrid />}
      <g>
        {/* Left J-loop (oval loop) with calligraphic thickness */}
        <path
          d="M 220 150 C 130 170 95 270 115 370 C 130 450 170 475 210 450 C 255 420 275 320 265 240 C 260 180 245 150 220 150 Z 
             M 210 175 C 230 175 240 230 240 290 C 240 350 220 425 200 425 C 180 425 150 380 143 315 C 136 250 160 175 210 175 Z"
          fill={color}
          fillRule="evenodd"
        />

        {/* Main stem with top-left hook */}
        <path
          d="M 110 160 C 135 150 175 125 200 80 C 210 65 218 67 218 80 C 218 135 245 270 240 365 C 238 380 232 385 225 385 C 218 385 220 370 222 350 C 228 270 205 135 205 95 C 175 135 140 145 110 145 C 108 145 108 160 110 160 Z"
          fill={color}
        />

        {/* R-Bow (upper right loop) */}
        <path
          d="M 206 138 C 255 108 328 118 328 190 C 328 245 278 263 240 263 C 235 263 235 255 240 255 C 270 255 310 238 310 190 C 310 145 255 128 210 148 L 206 138 Z"
          fill={color}
        />

        {/* R-Leg (diagonal right sweep + bird cradle) */}
        <path
          d="M 240 260 C 265 260 290 310 312 360 C 320 375 330 375 340 350 C 355 315 370 290 376 295 C 382 300 370 315 355 345 C 345 365 332 385 320 385 C 300 385 280 320 255 272 C 250 265 242 260 240 260 Z"
          fill={color}
        />

        {/* Middle crossbar (forming the 'A' with the loop and leg) */}
        <path
          d="M 233 323 C 250 321 270 318 285 316 C 288 316 288 320 285 320 C 270 322 250 325 233 327 C 230 327 230 323 233 323 Z"
          fill={color}
        />

        {/* Bird silhouette sitting on the leg tip */}
        <path
          d="M 376 295 C 371 292 367 282 369 270 C 371 259 382 255 390 262 C 394 266 408 282 422 290 C 408 290 395 286 385 292 C 382 294 378 295 376 295 Z"
          fill={color}
        />
        {/* Eye of the bird */}
        <circle cx="377" cy="268" r="1.5" fill="#FFFFFF" />

        {/* Subtle Wing definition */}
        <path
          d="M 383 273 C 391 276 399 283 402 288 C 396 287 390 281 383 273 Z"
          fill="#FFFFFF"
          opacity="0.7"
        />
      </g>
    </svg>
  );
}

/**
 * 2. SIMPLIFIED LOGO (Geometric, uniform weight, modern minimalist Vercel/Linear style)
 * Optimized for smaller spaces and clean alignment
 */
export function SimplifiedLogo({ size = 200, color = "currentColor", showGrid = false, ...props }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-colors duration-300"
      {...props}
    >
      {showGrid && <LogoGrid />}
      <g stroke={color} strokeWidth="18" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Left J-loop */}
        <path d="M 215 140 C 130 160 110 260 125 360 C 138 435 180 445 205 425 C 240 395 250 300 245 240 C 242 190 230 140 215 140 Z" />

        {/* Main stem with top hook */}
        <path d="M 120 150 C 145 140 180 115 205 75 C 208 70 208 70 210 90 C 215 140 230 260 225 370" />

        {/* R-Bow */}
        <path d="M 210 145 C 260 120 315 130 315 190 C 315 245 265 255 220 255" />

        {/* R-Leg (bird perch) */}
        <path d="M 223 255 C 255 255 285 315 315 365 C 322 375 330 375 342 355 C 352 335 362 315 368 318" />

        {/* Crossbar (A) */}
        <path d="M 224 315 H 285" strokeWidth="14" />

        {/* Stylized geometric bird (simplified shapes) */}
        <path
          d="M 368 318 C 365 310 360 295 365 285 C 370 275 385 272 392 280 C 396 285 410 300 422 308 C 405 308 390 302 380 308 Z"
          fill={color}
          stroke="none"
        />
      </g>
    </svg>
  );
}

/**
 * 3. FAVICON LOGO (Ultra-bold, high-contrast silhouette for 16x16 tab use)
 */
export function FaviconLogo({ size = 32, color = "currentColor", ...props }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g stroke={color} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Left loop */}
        <path d="M 45 30 C 25 35 20 60 25 80 C 30 95 40 95 45 90 C 52 80 55 60 54 48 C 53 38 50 30 45 30 Z" />

        {/* Main stem */}
        <path d="M 25 32 C 32 30 40 22 45 15 C 47 25 50 55 48 82" />

        {/* R-Bow */}
        <path d="M 46 32 C 60 25 72 27 72 45 C 72 60 60 62 48 62" />

        {/* R-Leg */}
        <path d="M 48 62 C 56 62 64 78 70 80 C 74 81 77 77 78 72" />

        {/* Crossbar (A) */}
        <path d="M 47 69 H 61" strokeWidth="6" />

        {/* Bird silhouette sitting on the leg tip */}
        <path
          d="M 78 72 C 76 70 74 65 75 60 C 76 56 80 54 83 58 C 85 60 91 68 97 72 C 90 72 84 70 78 72 Z"
          fill={color}
          stroke="none"
        />
        {/* Bird Eye */}
        <circle cx="77.5" cy="59" r="0.8" fill="#FFFFFF" stroke="none" />
      </g>
    </svg>
  );
}

/**
 * 4. APP ICON LOGO (Squircle container with gradient/grid backdrop)
 */
export function AppIconLogo({ size = 120, variant = "dark", ...props }: { size?: number; variant?: "dark" | "light" }) {
  const isDark = variant === "dark";
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.22,
        background: isDark
          ? "linear-gradient(135deg, #111111 0%, #1e1e1e 50%, #0d0d0d 100%)"
          : "linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%)",
        border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.05)",
        boxShadow: isDark
          ? "0 10px 30px -10px rgba(0, 0, 0, 0.7)"
          : "0 10px 30px -10px rgba(0, 0, 0, 0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: isDark
            ? "radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px)"
            : "radial-gradient(rgba(0, 0, 0, 0.02) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* Inner logo */}
      <SimplifiedLogo size={size * 0.65} color={isDark ? "#ffffff" : "#0f0f11"} />
    </div>
  );
}

/**
 * 5. WEBSITE HEADER VERSION (Horizontal Logo + "Rajvi's Blog" typography)
 */
export function WebsiteHeaderLogo({ size = 40, ...props }: { size?: number }) {
  return (
    <div className="flex items-center space-x-3 select-none">
      <MasterLogo size={size} color="currentColor" />
      <span className="font-heading font-bold text-xl tracking-tight text-gradient">
        Rajvi's Blog
      </span>
    </div>
  );
}

/**
 * 6. PERSONAL BRAND VERSION (Horizontal Logo + "Rajvi Prajapati" + Creator Title)
 */
export function PersonalBrandLogo({ size = 60, orientation = "horizontal", ...props }: { size?: number; orientation?: "horizontal" | "vertical" }) {
  const isVertical = orientation === "vertical";
  return (
    <div className={`flex ${isVertical ? "flex-col items-center text-center space-y-4" : "items-center space-x-4"} select-none`}>
      <MasterLogo size={size} color="currentColor" />
      <div className="flex flex-col">
        <span className="font-heading font-extrabold text-2xl tracking-tight text-foreground leading-none">
          Rajvi Prajapati
        </span>
        <span className="text-xs font-semibold uppercase tracking-widest text-primary mt-1.5 opacity-80">
          Technology Creator
        </span>
      </div>
    </div>
  );
}

/**
 * Helper Grid Component for alignment checks
 */
function LogoGrid() {
  return (
    <g opacity="0.15">
      {/* Outer Border */}
      <rect x="10" y="10" width="480" height="480" rx="20" stroke="currentColor" strokeWidth="2" />
      {/* Major Quadrants */}
      <line x1="250" y1="10" x2="250" y2="490" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
      <line x1="10" y1="250" x2="490" y2="250" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />

      {/* Concentric Circles */}
      <circle cx="250" cy="250" r="100" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <circle cx="250" cy="250" r="200" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />

      {/* Diagonals */}
      <line x1="10" y1="10" x2="490" y2="490" stroke="currentColor" strokeWidth="1" strokeDasharray="1 3" />
      <line x1="490" y1="10" x2="10" y2="490" stroke="currentColor" strokeWidth="1" strokeDasharray="1 3" />
    </g>
  );
}
