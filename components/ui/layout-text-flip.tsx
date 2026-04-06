"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TextFlipProps {
  words: string[];
  className?: string;
  interval?: number;
}

const TextFlip: React.FC<TextFlipProps> = ({
  words = ["comunicação", "mente"],
  className = "",
  interval = 4000,
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <span
      className={`relative inline-block  overflow-hidden align-middle rounded-lg border border-foreground bg-foreground/10 px-3 py-2 backdrop-blur-sm" ${className}`}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="block whitespace-nowrap"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default TextFlip;
