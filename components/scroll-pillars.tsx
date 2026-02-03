"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";

// Pillar data with associated visual themes and images
const pillars = [
  { 
    word: "Thing", 
    description: "What's your One thing you'd change about Oxford?",
    image: "/six-pillars/one-thing.JPG",
  },
  { 
    word: "Community", 
    description: "Undergrads and postgrads together, not two separate worlds",
    image: "/six-pillars/one-community.jpg",
  },
  { 
    word: "Standard", 
    description: "We're the #1 university, let's act like it",
    image: "/six-pillars/one-standard.JPEG",
  },
  { 
    word: "Voice", 
    description: "Every individual matters",
    image: "/six-pillars/one-voice.JPG",
  },
  { 
    word: "Vote", 
    description: "Your vote counts",
    image: "/six-pillars/one-vote.jpg",
  },
  { 
    word: "Oxbridge", 
    description: "Leadership experience at both Cambridge and Oxford",
    image: "/six-pillars/one-oxbridge.JPG",
  },
];

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
        <div className="container relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:pl-24">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Text content */}
            <div className="relative z-10 order-1 rounded-lg bg-[#002147]/70 p-6 backdrop-blur-md lg:order-none lg:bg-transparent lg:p-0 lg:backdrop-blur-none">
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
              <h2 className="mt-4 font-serif text-[clamp(2.5rem,8vw,6rem)] font-normal leading-[1.1] tracking-tight text-white">
                <span className="block text-white/40">One</span>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={pillars[activeIndex].word}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="block text-white"
                  >
                    {pillars[activeIndex].word}
                  </motion.span>
                </AnimatePresence>
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

            {/* Photo content - Right side on desktop, below text on mobile */}
            <div className="relative order-2 mt-8 lg:order-none lg:mt-0">
              <div className="relative">
                {/* Main image container with animated border */}
                <motion.div
                  className="relative aspect-[4/3] overflow-hidden lg:aspect-4/5"
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
                      <Image
                        src={pillars[activeIndex].image}
                        alt={`One ${pillars[activeIndex].word}`}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 40vw, 100vw"
                      />
                    </motion.div>
                  </AnimatePresence>
                </motion.div>

                {/* Decorative floating elements - hidden on mobile */}
                <motion.div
                  className="absolute -bottom-4 -right-4 hidden h-24 w-24 border border-[#E2C044]/30 lg:block"
                  animate={{ 
                    rotate: [0, 90],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute -left-6 -top-6 hidden h-16 w-16 rounded-full border border-white/20 lg:block"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                
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

        {/* Side progress - only visible on lg screens */}
        <div className="absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
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
