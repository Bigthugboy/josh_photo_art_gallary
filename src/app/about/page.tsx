"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="pt-32 pb-20 min-h-screen px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            The Vision Behind <br/><span className="text-primary">Josh Gallery</span>
          </h1>
          <p className="text-foreground/70 mb-6 leading-relaxed text-lg">
            At Josh Photo & Art Gallery, we believe that every moment holds a unique piece of art waiting to be captured. Founded on the principles of creativity and visual storytelling, we specialize in delivering premium media experiences.
          </p>
          <p className="text-foreground/70 mb-8 leading-relaxed text-lg">
            Whether it's a grand wedding, an intimate portrait session, or a commercial shoot, our team blends technical mastery with an artistic eye to produce striking, cinematic visuals that stand the test of time.
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
            <img 
              src="https://images.unsplash.com/photo-1554048665-8ce66cb314d3?q=80&w=2070&auto=format&fit=crop" 
              alt="Photographer behind the scenes"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
