"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface PlaceholderImageProps {
  variant?: "portrait" | "landscape" | "square";
  theme?: "blue" | "gold" | "gradient" | "light";
  className?: string;
  label?: string;
  pattern?: "dots" | "lines" | "circles" | "waves" | "grid";
  animated?: boolean;
}

/**
 * Beautiful placeholder images for temporary use.
 * Replace with real photos later by swapping to next/image.
 */
export function PlaceholderImage({
  variant = "square",
  theme = "blue",
  className,
  label,
  pattern = "dots",
  animated = false,
}: PlaceholderImageProps) {
  const aspectRatios = {
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
    square: "aspect-square",
  };

  const backgrounds = {
    blue: "bg-gradient-to-br from-[#002147] to-[#003366]",
    gold: "bg-gradient-to-br from-[#E2C044] to-[#D4A84B]",
    gradient: "bg-gradient-to-br from-[#002147] via-[#003366] to-[#E2C044]",
    light: "bg-gradient-to-br from-gray-100 to-gray-200",
  };

  const patternColors = {
    blue: "rgba(226, 192, 68, 0.15)",
    gold: "rgba(0, 33, 71, 0.15)",
    gradient: "rgba(255, 255, 255, 0.1)",
    light: "rgba(0, 33, 71, 0.08)",
  };

  const patterns = {
    dots: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1.5' fill='${encodeURIComponent(patternColors[theme])}'/%3E%3C/svg%3E")`,
    lines: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40L40 0' stroke='${encodeURIComponent(patternColors[theme])}' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
    circles: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='20' stroke='${encodeURIComponent(patternColors[theme])}' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
    waves: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q25 0 50 10 T100 10' stroke='${encodeURIComponent(patternColors[theme])}' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
    grid: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none' stroke='${encodeURIComponent(patternColors[theme])}' stroke-width='0.5'/%3E%3C/svg%3E")`,
  };

  const iconColors = {
    blue: "text-[#E2C044]/30",
    gold: "text-[#002147]/30",
    gradient: "text-white/20",
    light: "text-[#002147]/20",
  };

  const orbColors = {
    blue: "bg-[#E2C044]/10",
    gold: "bg-[#002147]/10",
    gradient: "bg-white/10",
    light: "bg-[#002147]/5",
  };

  return (
    <div
      className={cn(
        "group/placeholder relative overflow-hidden",
        aspectRatios[variant],
        backgrounds[theme],
        className
      )}
    >
      {/* Animated pattern overlay */}
      {animated ? (
        <motion.div
          className="absolute inset-0"
          style={{ backgroundImage: patterns[pattern] }}
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
        />
      ) : (
        <div
          className="absolute inset-0 transition-transform duration-[20s] ease-linear group-hover/placeholder:translate-x-full group-hover/placeholder:translate-y-full"
          style={{ backgroundImage: patterns[pattern] }}
        />
      )}
      
      {/* Floating orbs - animated */}
      {animated ? (
        <>
          <motion.div
            className={cn("absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl", orbColors[theme])}
            animate={{ 
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className={cn("absolute -bottom-20 -left-16 h-56 w-56 rounded-full blur-3xl", orbColors[theme])}
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        </>
      ) : (
        <>
          <div className={cn("absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl transition-all duration-1000 group-hover/placeholder:scale-125 group-hover/placeholder:opacity-50", orbColors[theme], "opacity-30")} />
          <div className={cn("absolute -bottom-20 -left-16 h-56 w-56 rounded-full blur-3xl transition-all duration-1000 delay-200 group-hover/placeholder:scale-110 group-hover/placeholder:opacity-40", orbColors[theme], "opacity-20")} />
        </>
      )}
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent" />

      {/* Shimmer effect */}
      {animated ? (
        <motion.div
          className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
        />
      ) : (
        <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out group-hover/placeholder:translate-x-full" />
      )}
      
      {/* Center icon with pulse */}
      <div className="absolute inset-0 flex items-center justify-center">
        {animated ? (
          <motion.svg
            className={cn("h-16 w-16", iconColors[theme])}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
            animate={{ 
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </motion.svg>
        ) : (
          <svg
            className={cn("h-16 w-16 transition-all duration-500 group-hover/placeholder:scale-110 group-hover/placeholder:opacity-50", iconColors[theme])}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        )}
      </div>

      {/* Optional label with fade effect */}
      {label && (
        <div className="absolute bottom-4 left-4 right-4">
          <span
            className={cn(
              "text-xs font-semibold uppercase tracking-wider transition-opacity duration-300",
              theme === "gold" ? "text-[#002147]/50" : "text-white/50",
              "group-hover/placeholder:opacity-100"
            )}
          >
            {label}
          </span>
        </div>
      )}
    </div>
  );
}

/**
 * A more abstract/artistic placeholder for hero sections - now with animations
 */
export function AbstractPlaceholder({
  className,
  variant = 1,
  animated = true,
}: {
  className?: string;
  variant?: 1 | 2 | 3;
  animated?: boolean;
}) {
  const patterns = {
    1: (
      <>
        <motion.div 
          className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#E2C044]/10 blur-3xl"
          animate={animated ? { 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          } : {}}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-[#E2C044]/5 blur-3xl"
          animate={animated ? { 
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.1, 0.05],
            x: [0, -30, 0],
          } : {}}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div 
          className="absolute right-1/4 top-1/3 h-40 w-40 rounded-full bg-white/5 blur-2xl"
          animate={animated ? { 
            scale: [1, 1.4, 1],
            opacity: [0.05, 0.1, 0.05],
          } : {}}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </>
    ),
    2: (
      <>
        <motion.div 
          className="absolute -left-10 top-0 h-full w-1/2 bg-linear-to-r from-[#E2C044]/10 to-transparent"
          animate={animated ? { opacity: [0.1, 0.2, 0.1] } : {}}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-0 right-0 h-2/3 w-1/3 bg-linear-to-t from-white/5 to-transparent"
          animate={animated ? { opacity: [0.05, 0.1, 0.05] } : {}}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </>
    ),
    3: (
      <>
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-[#E2C044]/15 via-transparent to-transparent"
          animate={animated ? { opacity: [0.15, 0.25, 0.15] } : {}}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent"
          animate={animated ? { opacity: [0.05, 0.1, 0.05] } : {}}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
      </>
    ),
  };

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {patterns[variant]}
    </div>
  );
}

/**
 * Animated photo card with multiple effects - perfect for gallery grids
 */
export function AnimatedPhotoCard({
  className,
  theme = "blue",
  pattern = "dots",
  delay = 0,
  floatDirection = "up",
}: {
  className?: string;
  theme?: "blue" | "gold" | "gradient" | "light";
  pattern?: "dots" | "lines" | "circles" | "waves" | "grid";
  delay?: number;
  floatDirection?: "up" | "down" | "left" | "right";
}) {
  const floatAnimations = {
    up: { y: [0, -8, 0] },
    down: { y: [0, 8, 0] },
    left: { x: [0, -8, 0] },
    right: { x: [0, 8, 0] },
  };

  return (
    <motion.div
      className={cn("group relative overflow-hidden", className)}
      animate={floatAnimations[floatDirection]}
      transition={{ 
        duration: 4, 
        repeat: Infinity, 
        ease: "easeInOut",
        delay,
      }}
      whileHover={{ scale: 1.03 }}
    >
      <PlaceholderImage
        variant="square"
        theme={theme}
        pattern={pattern}
        animated
        className="h-full w-full"
      />
      <motion.div 
        className="absolute inset-0 bg-[#002147]/0"
        whileHover={{ backgroundColor: "rgba(0, 33, 71, 0.2)" }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

/**
 * Photo card with hover effects - perfect for gallery grids
 */
export function PhotoCard({
  className,
  theme = "blue",
  pattern = "dots",
  hoverEffect = true,
}: {
  className?: string;
  theme?: "blue" | "gold" | "light";
  pattern?: "dots" | "lines" | "circles";
  hoverEffect?: boolean;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden",
        hoverEffect && "transition-transform duration-500 hover:scale-[1.02]",
        className
      )}
    >
      <PlaceholderImage
        variant="portrait"
        theme={theme}
        pattern={pattern}
        className="h-full w-full"
      />
      {hoverEffect && (
        <div className="absolute inset-0 bg-[#002147]/0 transition-colors duration-300 group-hover:bg-[#002147]/20" />
      )}
    </div>
  );
}
