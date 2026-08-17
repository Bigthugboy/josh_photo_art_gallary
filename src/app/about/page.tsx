"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const aboutImages = [
  "/images/about-1.jpg",
  "/images/about-2.jpg",
];

export default function About() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % aboutImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="pt-32 pb-20 min-h-screen px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            The Vision Behind <br /><span className="text-primary">Retro Imprint</span>
          </h1>
          <p className="text-foreground/70 mb-6 leading-relaxed text-lg">
            At Retro Imprint, we don’t just click a shutter, we freeze time in its most beautiful state. Founded on the principles of relentless creativity and bold visual storytelling, we specialize in delivering uncompromising, high end media experiences.
          </p>
          <p className="text-foreground/70 mb-8 leading-relaxed text-lg">
            From the raw emotion of a cinematic wedding to the bold identity of a commercial brand, I blend technical mastery with an artistic eye backed by a trusted network of creatives to produce striking visual legacies that demand to be seen.
          </p>

          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-foreground/60 uppercase tracking-wider">Shoots Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10+</div>
              <div className="text-sm text-foreground/60 uppercase tracking-wider">Years Experience</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden glass p-2"
        >
          <div className="w-full h-full rounded-2xl overflow-hidden relative">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={currentIndex}
                src={aboutImages[currentIndex]}
                alt="Retro Imprint - The Visionary"
                className="w-full h-full object-cover absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none"></div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
