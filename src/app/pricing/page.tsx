"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

const packages = [
  {
    name: "Essential",
    price: "$299",
    description: "Perfect for personal portraits and small lifestyle shoots.",
    features: [
      "1 Hour Session",
      "1 Location",
      "15 Edited High-Res Photos",
      "Online Delivery Gallery"
    ],
    isPopular: false,
  },
  {
    name: "Premium",
    price: "$599",
    description: "Ideal for couples, families, and extensive portrait sessions.",
    features: [
      "2-3 Hour Session",
      "Up to 2 Locations",
      "40 Edited High-Res Photos",
      "Online Delivery Gallery",
      "2 Outfit Changes"
    ],
    isPopular: true,
  },
  {
    name: "Ultimate Event",
    price: "$1200",
    description: "Comprehensive coverage for weddings and corporate events.",
    features: [
      "6 Hours Coverage",
      "Multiple Locations",
      "200+ Edited High-Res Photos",
      "Online Delivery Gallery",
      "Second Shooter Included"
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
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Investment & <span className="text-primary">Pricing</span></h1>
        <p className="text-foreground/70 max-w-2xl mx-auto">Transparent pricing for premium visual experiences.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative rounded-3xl p-8 flex flex-col h-full ${
              pkg.isPopular 
                ? "bg-primary/10 border-2 border-primary" 
                : "glass border border-white/10"
            }`}
          >
            {pkg.isPopular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full">
                Most Popular
              </div>
            )}
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
              Book Now
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
