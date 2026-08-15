"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

const packages = [
  {
    name: "The Signature Portrait",
    price: "$299",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2000&auto=format&fit=crop",
    description: "Perfect for personal branding, editorials, and intimate portraits.",
    features: [
      "1 Hour Session",
      "Creative Direction",
      "15 High-End Retouched Photos",
      "Private Online Gallery"
    ],
    isPopular: false,
  },
  {
    name: "The Cinematic Collection",
    price: "$599",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000&auto=format&fit=crop",
    description: "Ideal for couples, editorial campaigns, and extensive shoots.",
    features: [
      "2-3 Hour Session",
      "Up to 2 Locations",
      "40 High-End Retouched Photos",
      "Cinematic Color Grading",
      "Private Online Gallery"
    ],
    isPopular: true,
  },
  {
    name: "The Luxury Event",
    price: "$1200",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop",
    description: "Comprehensive coverage for high-end weddings and elite events.",
    features: [
      "6 Hours Coverage",
      "Second Shooter Included",
      "200+ Masterfully Edited Photos",
      "Next-Day Teaser Delivery",
      "Private Online Gallery"
    ],
    isPopular: false,
  }
];

export default function Pricing() {
  return (
    <div className="pt-32 pb-20 min-h-screen px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">The <span className="text-primary">Investment</span></h1>
        <p className="text-foreground/70 max-w-2xl mx-auto">Curated collections designed for premium visual storytelling.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative rounded-3xl overflow-hidden flex flex-col h-full ${
              pkg.isPopular 
                ? "bg-primary/10 border-2 border-primary" 
                : "glass border border-white/10"
            }`}
          >
            {pkg.isPopular && (
              <div className="absolute top-4 right-4 z-10 bg-primary text-white text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full shadow-lg">
                Most Popular
              </div>
            )}
            
            <div className="h-48 w-full relative">
              <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
            </div>
            
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-2xl font-semibold mb-2">{pkg.name}</h3>
              <p className="text-foreground/60 text-sm mb-6">{pkg.description}</p>
              <div className="text-4xl font-bold mb-8">{pkg.price}</div>
            
            <ul className="space-y-4 mb-8 flex-grow">
              {pkg.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-foreground/80">
                  <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            
            <Link 
              href="/booking" 
              className={`w-full py-4 text-center rounded-xl font-bold uppercase tracking-wider transition-all ${
                pkg.isPopular 
                  ? "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/30" 
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              Commission
            </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
