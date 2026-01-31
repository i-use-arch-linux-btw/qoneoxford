"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const pillars = [
  { word: "Thing", description: "What's your one thing you'd change about Oxford?" },
  { word: "Community", description: "Undergrads and postgrads together, not two separate worlds" },
  { word: "Standard", description: "We're the #1 university, let's act like it" },
  { word: "Voice", description: "Every individual matters" },
  { word: "Vote", description: "Your vote counts" },
  { word: "Oxbridge", description: "Leadership experience at both Cambridge and Oxford" },
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
        {/* Content */}
        <div className="container relative z-10 mx-auto max-w-7xl px-6 md:px-12">
          <div className="max-w-4xl">
            {/* Number label */}
            <span className="text-sm font-semibold uppercase tracking-widest text-[#E2C044]">
              0{activeIndex + 1}
            </span>
            
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
            <div className="mt-8 h-[4rem] overflow-hidden">
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
        </div>

        {/* Progress bar */}
        <div 
          className="absolute bottom-0 left-0 h-1 bg-[#E2C044]"
          style={{
            width: `${((activeIndex + pillarProgress) / pillars.length) * 100}%`,
            transition: "width 0.1s ease-out",
          }}
        />

        {/* Side progress */}
        <div className="absolute left-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 md:left-12 md:flex">
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
              <span 
                className={`h-px transition-all duration-300 ${
                  index === activeIndex ? "w-8 bg-[#E2C044]" : "w-4 bg-white/40"
                }`}
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
