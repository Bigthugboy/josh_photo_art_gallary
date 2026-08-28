"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { getCategories, getMedia } from "@/app/actions/gallery";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("Highlights");
  const [categories, setCategories] = useState<any[]>([]);
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const cats = await getCategories();
      setCategories([{ id: "all", name: "Highlights" }, ...cats]);
      const items = await getMedia();
      setMedia(items);
      setLoading(false);
    }
    fetchData();
  }, []);

  const filteredPhotos = activeCategory === "Highlights" 
    ? media.filter(photo => photo.is_highlight) 
    : media.filter(photo => photo.categories?.name === activeCategory);

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedMedia) return;
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedMedia.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setSelectedMedia(filteredPhotos[nextIndex]);
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!selectedMedia) return;
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedMedia.id);
    const prevIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setSelectedMedia(filteredPhotos[prevIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedMedia) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setSelectedMedia(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedMedia, filteredPhotos]);

  const [touchStart, setTouchStart] = useState(0);
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    if (touchStart - touchEnd > 50) handleNext();
    if (touchStart - touchEnd < -50) handlePrev();
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 md:px-12 text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Our <span className="text-primary">Portfolio</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-foreground/60 max-w-2xl mx-auto"
        >
          Explore our curated collection of moments and visual stories.
        </motion.p>
      </div>

      {/* Category Filter */}
      <div className="container mx-auto px-6 md:px-12 mb-12 flex flex-wrap justify-center gap-4">
        {categories.map((cat, i) => (
          <motion.button
            key={cat.id || cat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            onClick={() => setActiveCategory(cat.name)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
              activeCategory === cat.name
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                : "glass text-foreground/70 hover:text-foreground hover:bg-white/5"
            }`}
          >
            {cat.name}
          </motion.button>
        ))}
      </div>

      {/* Image Grid */}
      {loading ? (
        <div className="text-center text-foreground/50">Loading gallery...</div>
      ) : (
        <motion.div 
          layout
          className="flex flex-wrap justify-center gap-6 px-6 md:px-12 container mx-auto"
        >
          <AnimatePresence>
            {filteredPhotos.map((photo) => (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative overflow-hidden rounded-2xl aspect-[4/5] w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] glass border border-white/5 cursor-pointer"
                onClick={() => setSelectedMedia(photo)}
              >
                {photo.type === 'video' ? (
                  <video src={photo.url} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" muted autoPlay loop playsInline />
                ) : (
                  <img src={photo.url} alt="Gallery Item" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-bold tracking-widest uppercase border border-white/20 px-6 py-2 rounded-full backdrop-blur-sm">
                    {photo.categories?.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
      {!loading && filteredPhotos.length === 0 && (
        <div className="text-center text-foreground/50 mt-10">No media found in this category.</div>
      )}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMedia(null)}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button 
              onClick={() => setSelectedMedia(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-[110]"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left/Right Navigation */}
            {filteredPhotos.length > 1 && (
              <>
                <button 
                  onClick={handlePrev}
                  className="hidden md:flex absolute left-4 md:left-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center text-white transition-colors z-[110]"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button 
                  onClick={handleNext}
                  className="hidden md:flex absolute right-4 md:right-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center text-white transition-colors z-[110]"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}
            
            <motion.div
              key={selectedMedia.id} // Forces re-animation when switching images
              initial={{ scale: 0.95, opacity: 0, x: 20 }}
              animate={{ scale: 1, opacity: 1, x: 0 }}
              exit={{ scale: 0.95, opacity: 0, x: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-full flex items-center justify-center px-4 md:px-12"
              onClick={(e) => e.stopPropagation()} // Prevent clicking the image from closing
            >
              {selectedMedia.type === 'video' ? (
                <video 
                  src={selectedMedia.url} 
                  className="max-w-full max-h-[85vh] md:max-h-[85vh] rounded-xl shadow-2xl" 
                  controls 
                  autoPlay 
                />
              ) : (
                <img 
                  src={selectedMedia.url} 
                  alt="Enlarged gallery item" 
                  className="max-w-full max-h-[85vh] rounded-xl shadow-2xl object-contain pointer-events-none" 
                />
              )}
              
              <div className="absolute -bottom-12 left-0 w-full text-center">
                <span className="text-white/70 font-medium tracking-widest uppercase text-sm">
                  {selectedMedia.categories?.name}
                </span>
                <span className="text-white/30 text-xs ml-4">
                  {filteredPhotos.findIndex(p => p.id === selectedMedia.id) + 1} / {filteredPhotos.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
