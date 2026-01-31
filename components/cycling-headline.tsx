"use client";

import { useEffect, useState } from "react";

const words = ["Oxford", "Thing", "Community", "Standard", "Voice", "Vote", "Oxbridge"];

export function CyclingHeadline() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsAnimating(false);
      }, 300);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="animate-fade-up flex items-end gap-2 font-serif text-[clamp(3.5rem,12vw,10rem)] font-normal leading-[0.9] tracking-tight text-white opacity-0 md:gap-4">
      <span 
        className="mb-[-0.1em] font-instrument-serif text-[clamp(7rem,24vw,20rem)] leading-none text-white"
        aria-hidden="true"
      >
        #
      </span>
      <div className="flex flex-col">
        <span>One</span>
        <span 
          className={`transition-all duration-300 ${
            isAnimating 
              ? "translate-y-2 opacity-0" 
              : "translate-y-0 opacity-100"
          }`}
        >
          {words[currentIndex]}
        </span>
      </div>
    </h1>
  );
}
