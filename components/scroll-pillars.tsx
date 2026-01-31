"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

// Pillar data with associated visual themes
const pillars = [
  { 
    word: "Thing", 
    description: "What's your One thing you'd change about Oxford?",
    theme: "gradient" as const,
    pattern: "circles" as const,
  },
  { 
    word: "Community", 
    description: "Undergrads and postgrads together, not two separate worlds",
    theme: "gold" as const,
    pattern: "dots" as const,
  },
  { 
    word: "Standard", 
    description: "We're the #1 university, let's act like it",
    theme: "blue" as const,
    pattern: "lines" as const,
  },
  { 
    word: "Voice", 
    description: "Every individual matters",
    theme: "gradient" as const,
    pattern: "waves" as const,
  },
  { 
    word: "Vote", 
    description: "Your vote counts",
    theme: "gold" as const,
    pattern: "grid" as const,
  },
  { 
    word: "Oxbridge", 
    description: "Leadership experience at both Cambridge and Oxford",
    theme: "blue" as const,
    pattern: "circles" as const,
  },
];

// Animated placeholder for pillars
function PillarImage({ 
  theme, 
  pattern,
  isActive,
}: { 
  theme: "blue" | "gold" | "gradient";
  pattern: "dots" | "lines" | "circles" | "waves" | "grid";
  isActive: boolean;
}) {
  const backgrounds = {
    blue: "from-[#002147] via-[#003366] to-[#004080]",
    gold: "from-[#E2C044] via-[#D4A84B] to-[#C9983F]",
    gradient: "from-[#002147] via-[#003366] to-[#E2C044]/30",
  };

  const patternColors = {
    blue: "rgba(226, 192, 68, 0.2)",
    gold: "rgba(0, 33, 71, 0.2)",
    gradient: "rgba(255, 255, 255, 0.15)",
  };

  const patterns = {
    dots: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='2' fill='${encodeURIComponent(patternColors[theme])}'/%3E%3C/svg%3E")`,
    lines: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40L40 0' stroke='${encodeURIComponent(patternColors[theme])}' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
    circles: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='20' stroke='${encodeURIComponent(patternColors[theme])}' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
    waves: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q25 0 50 10 T100 10' stroke='${encodeURIComponent(patternColors[theme])}' stroke-width='1.5' fill='none'/%3E%3C/svg%3E")`,
    grid: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none' stroke='${encodeURIComponent(patternColors[theme])}' stroke-width='1'/%3E%3C/svg%3E")`,
  };

  return (
    <div className={`relative h-full w-full overflow-hidden bg-linear-to-br ${backgrounds[theme]}`}>
      {/* Animated pattern overlay */}
      <motion.div
        className="absolute inset-0"
        style={{ backgroundImage: patterns[pattern] }}
        animate={{ 
          backgroundPosition: isActive ? ["0% 0%", "100% 100%"] : "0% 0%",
        }}
        transition={{ 
          duration: 20, 
          ease: "linear", 
          repeat: Infinity,
        }}
      />
      
      {/* Floating orbs */}
      <motion.div
        className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl"
        animate={{ 
          scale: isActive ? [1, 1.2, 1] : 1,
          opacity: isActive ? [0.1, 0.2, 0.1] : 0.1,
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-[#E2C044]/10 blur-3xl"
        animate={{ 
          scale: isActive ? [1, 1.3, 1] : 1,
          opacity: isActive ? [0.1, 0.15, 0.1] : 0.1,
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />
      
      {/* Center decorative element */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
          className="relative"
          animate={{ 
            rotate: isActive ? 360 : 0,
          }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <svg
            className="h-48 w-48 text-white/10"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth={0.5}
          >
            <circle cx="50" cy="50" r="45" />
            <circle cx="50" cy="50" r="35" />
            <circle cx="50" cy="50" r="25" />
            <circle cx="50" cy="50" r="15" />
          </svg>
        </motion.div>
      </div>

      {/* Image placeholder icon with pulse */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ 
            scale: isActive ? [1, 1.05, 1] : 1,
            opacity: isActive ? [0.3, 0.4, 0.3] : 0.2,
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            className="h-20 w-20 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={0.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
        </motion.div>
      </div>

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent"
        animate={{ 
          x: isActive ? ["-100%", "200%"] : "-100%",
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          repeatDelay: 2,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

export function ScrollPillars() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pillarProgress, setPillarProgress] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = down, -1 = up
  const prevIndexRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const containerHeight = containerRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      const scrolled = -rect.top;
      const totalScrollable = containerHeight - viewportHeight;
      const scrollProgress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      
      const exactIndex = scrollProgress * pillars.length;
      const index = Math.min(pillars.length - 1, Math.floor(exactIndex));
      const progressWithinPillar = exactIndex - index;
      
      if (index !== prevIndexRef.current) {
        setDirection(index > prevIndexRef.current ? 1 : -1);
        prevIndexRef.current = index;
      }
      
      setActiveIndex(index);
      setPillarProgress(progressWithinPillar);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative bg-[#002147]"
      style={{ height: `${(pillars.length + 1) * 100}vh` }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* Content - Left side */}
        <div className="container relative z-10 mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Text content */}
            <div className="max-w-xl">
              {/* Number label */}
              <motion.span 
                key={`num-${activeIndex}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-sm font-semibold uppercase tracking-widest text-[#E2C044]"
              >
                0{activeIndex + 1}
              </motion.span>
              
              {/* One + Word */}
              <h2 className="mt-4 font-serif text-[clamp(3rem,10vw,8rem)] font-normal leading-[1.1] tracking-tight text-white">
                <span className="block text-white/40">One</span>
                <div className="relative h-[1.25em] overflow-hidden">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={pillars[activeIndex].word}
                      initial={{ y: direction * 100 + "%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: direction * -100 + "%", opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      className="block text-white"
                    >
                      {pillars[activeIndex].word}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </h2>

              {/* Description */}
              <div className="mt-8 h-24 overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.p
                    key={pillars[activeIndex].description}
                    initial={{ y: direction * 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: direction * -20, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
                    className="text-xl leading-relaxed text-white/50 md:text-2xl"
                  >
                    {pillars[activeIndex].description}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* Photo content - Right side */}
            <div className="relative hidden lg:block">
              <div className="relative">
                {/* Main image container with animated border */}
                <motion.div
                  className="relative aspect-4/5 overflow-hidden"
                  initial={false}
                  animate={{ 
                    boxShadow: [
                      "0 0 0 1px rgba(226, 192, 68, 0.2)",
                      "0 0 0 2px rgba(226, 192, 68, 0.3)",
                      "0 0 0 1px rgba(226, 192, 68, 0.2)",
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.div
                      key={pillars[activeIndex].word}
                      initial={{ 
                        opacity: 0, 
                        scale: 1.1,
                        x: direction * 50,
                      }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        x: 0,
                      }}
                      exit={{ 
                        opacity: 0, 
                        scale: 0.95,
                        x: direction * -50,
                      }}
                      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                      className="absolute inset-0"
                    >
                      <PillarImage 
                        theme={pillars[activeIndex].theme}
                        pattern={pillars[activeIndex].pattern}
                        isActive={true}
                      />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                {/* Decorative floating elements */}
                <motion.div
                  className="absolute -bottom-4 -right-4 h-24 w-24 border border-[#E2C044]/30"
                  animate={{ 
                    rotate: [0, 90],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute -left-6 -top-6 h-16 w-16 rounded-full border border-white/20"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Small accent images */}
                <motion.div
                  className="absolute -bottom-8 -left-8 h-32 w-32 overflow-hidden opacity-60"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <PillarImage 
                    theme={pillars[(activeIndex + 1) % pillars.length].theme}
                    pattern={pillars[(activeIndex + 1) % pillars.length].pattern}
                    isActive={false}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <motion.div 
          className="absolute bottom-0 left-0 h-1 bg-[#E2C044]"
          style={{
            width: `${((activeIndex + pillarProgress) / pillars.length) * 100}%`,
          }}
          transition={{ duration: 0.1, ease: "easeOut" }}
        />

        {/* Side progress */}
        <div className="absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 md:left-12 lg:flex">
          {pillars.map((pillar, index) => (
            <button
              key={pillar.word}
              className={`group flex items-center gap-3 transition-all duration-300 ${
                index === activeIndex ? "opacity-100" : "opacity-40 hover:opacity-70"
              }`}
              onClick={() => {
                if (!containerRef.current) return;
                const targetScroll = containerRef.current.offsetTop + 
                  (index / pillars.length) * (containerRef.current.offsetHeight - window.innerHeight);
                window.scrollTo({ top: targetScroll, behavior: "smooth" });
              }}
            >
              <motion.span 
                className="h-px bg-current"
                animate={{ 
                  width: index === activeIndex ? 32 : 16,
                  backgroundColor: index === activeIndex ? "#E2C044" : "rgba(255,255,255,0.4)",
                }}
                transition={{ duration: 0.3 }}
              />
              <span 
                className={`text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  index === activeIndex 
                    ? "translate-x-0 text-[#E2C044] opacity-100" 
                    : "-translate-x-2 text-white opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                }`}
              >
                {pillar.word}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
