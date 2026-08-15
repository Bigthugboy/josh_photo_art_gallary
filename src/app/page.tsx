"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const placeholderImages = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop",
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % placeholderImages.length);
    }, 5000); // Slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slider */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img
            src={placeholderImages[currentIndex]}
            alt=""
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Hero Content */}
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto mt-20">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight uppercase"
        >
          Capturing the <br />
          <span className="text-primary">Unseen</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light"
        >
          We craft premium visual legacies for brands, couples, and visionaries. Explore our curated portfolio or commission a shoot to freeze your moment in time.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/portfolio"
            className="px-8 py-4 bg-primary text-white rounded-full font-bold uppercase tracking-wider hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-primary/30"
          >
            Enter Gallery
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/about"
            className="px-8 py-4 glass text-white rounded-full font-bold uppercase tracking-wider hover:bg-white/10 transition-all text-center"
          >
            The Vision
          </Link>
        </motion.div>
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {placeholderImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`transition-all duration-500 rounded-full ${
              i === currentIndex ? "w-8 h-2 bg-primary" : "w-2 h-2 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
