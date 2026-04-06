"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
const items: string[] = [
  "Psicologia",
  "Neuroaprendizado",
  "Comunicação",
  "Experiência Internacional",
  "Desenvolvimento Humano",
];
const AuthorityLine: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMarquee, setIsMarquee] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsMarquee(window.innerWidth <= 1039);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full bg-muted/30 relative overflow-hidden tape"
    >
      <div className="w-full py-10 flex overflow-hidden">
        {isMarquee ? (
          <div className="flex animate-marquee whitespace-nowrap w-max hover:[animation-play-state:paused]">
            <div className="flex gap-10 md:gap-16 pr-10 md:pr-16 min-w-max items-center">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground"
                >
                  <div className="w-1.5 h-1.5 bg-primary-500/40 rounded-full" />
                  {item}
                </div>
              ))}
            </div>
            <div
              className="flex gap-10 md:gap-16 pr-10 md:pr-16 min-w-max items-center"
              aria-hidden="true"
            >
              {items.map((item, index) => (
                <div
                  key={`clone-${index}`}
                  className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground"
                >
                  <div className="w-1.5 h-1.5 bg-primary-500/40 rounded-full" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-6 w-full flex flex-wrap justify-center items-center gap-12">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-muted-foreground"
              >
                <div className="w-1.5 h-1.5 bg-green rounded-full shadow-[0_0_8px_rgba(91,201,158,1)]" />
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
      <style>{`
        @keyframes custom-marquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .animate-marquee {
          /* Ajuste o 20s para deixar mais lento ou mais rápido */
          animation: custom-marquee 20s linear infinite;
          /* Otimização de GPU para scroll liso */
          will-change: transform;
        }
      `}</style>
    </div>
  );
};
export default AuthorityLine;
