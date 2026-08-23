"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getPackages } from "@/app/actions/pricing";

const defaultPackages = [
  {
    id: "1",
    name: "The Signature Portrait",
    price: "$299",
    image_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2000&auto=format&fit=crop",
    description: "Perfect for personal branding, editorials, and intimate portraits.",
    features: [
      "1 Hour Session",
      "Creative Direction",
      "15 High-End Retouched Photos",
      "Private Online Gallery"
    ],
    is_popular: false,
  },
  {
    id: "2",
    name: "The Cinematic Collection",
    price: "$599",
    image_url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000&auto=format&fit=crop",
    description: "Ideal for couples, editorial campaigns, and extensive shoots.",
    features: [
      "2-3 Hour Session",
      "Up to 2 Locations",
      "40 High-End Retouched Photos",
      "Cinematic Color Grading",
      "Private Online Gallery"
    ],
    is_popular: true,
  },
  {
    id: "3",
    name: "The Luxury Event",
    price: "$1200",
    image_url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop",
    description: "Comprehensive coverage for high-end weddings and elite events.",
    features: [
      "6 Hours Coverage",
      "Second Shooter Included",
      "200+ Masterfully Edited Photos",
      "Next-Day Teaser Delivery",
      "Private Online Gallery"
    ],
    is_popular: false,
  }
];

const termsContent = [
  {
    title: "1. Booking & Payment",
    items: [
      "A 50% deposit is required to secure the date.",
      "Cancellations made less than 48 hours before the shoot will result in loss of the deposit."
    ]
  },
  {
    title: "2. Final Images",
    items: [
      "You’ll get 5 edited images per outfit.",
      "Videos are delivered in 4K.",
      "Turnaround time: 24–48 hours after final payment and image selection.",
      "Raw/unedited footage isn’t included unless agreed beforehand (extra cost applies)."
    ]
  },
  {
    title: "3. Creative Vision & Prep",
    items: [
      "A pre-shoot plan (mood board, outfits, location) needs to be locked in ahead of time so the day runs smoothly.",
      "Editing style, colour grading, and final look are down to the photographer/cinematographer’s judgement.",
      "Any edits requested outside that agreed style will come at an extra cost."
    ]
  },
  {
    title: "4. What’s Expected of You",
    items: [
      "Please arrive on time and ready to shoot (outfits, makeup, props sorted in advance).",
      "Lateness eats into shoot time the fee stays the same, plus £25 for every 30 minutes lost.",
      "Extra outfits, locations, or additional time beyond what’s agreed will be charged separately."
    ]
  },
  {
    title: "5. Usage & Ownership",
    items: [
      "The photographer/cinematographer holds full copyright over all images and videos.",
      "Commercial use (ads, billboards, resale, etc.) requires a separate licensing fee.",
      "Credit (tag or mention) must be given when posting on social platforms."
    ]
  },
  {
    title: "6. Files & Storage",
    items: [
      "Final images will be shared via (Google Drive/Pixie-Set)."
    ]
  },
  {
    title: "7. Risk & Responsibility",
    items: [
      "Photographer takes no responsibility for delays caused by weather, venue restrictions, or third-party suppliers.",
      "It’s on the client to sort any necessary permits if shooting in restricted locations.",
      "Photographer can’t be held accountable for injuries, accidents, or damage to property during the shoot."
    ]
  },
  {
    title: "8. Model Release & Consent",
    items: [
      "Unless stated otherwise in writing, Client gives permission for images/videos to appear in the portfolio, on the website, and in promotional material.",
      "If you’d rather keep the shoot fully private (no portfolio use), a buyout fee will apply."
    ]
  },
  {
    title: "9. Additional Terms",
    items: [
      "Additional charges for travel, transport, or accommodation may apply for shoots taking place outside my city."
    ]
  }
];

export default function Pricing() {
  const [packages, setPackages] = useState<any[]>(defaultPackages);
  const [loading, setLoading] = useState(true);
  const [showTerms, setShowTerms] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await getPackages();
      if (data && data.length > 0) {
        setPackages(data);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

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
            key={pkg.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative rounded-3xl overflow-hidden flex flex-col h-full ${
              pkg.is_popular 
                ? "bg-primary/10 border-2 border-primary" 
                : "glass border border-white/10"
            }`}
          >
            {pkg.is_popular && (
              <div className="absolute top-4 right-4 z-10 bg-primary text-white text-xs font-bold uppercase tracking-wider py-1 px-4 rounded-full shadow-lg">
                Most Popular
              </div>
            )}
            
            <div className="h-48 w-full relative">
              <img src={pkg.image_url} alt={pkg.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020202] to-transparent"></div>
            </div>
            
            <div className="p-8 flex flex-col flex-grow">
              <h3 className="text-2xl font-semibold mb-2">{pkg.name}</h3>
              <p className="text-foreground/60 text-sm mb-6">{pkg.description}</p>
              <div className="text-4xl font-bold mb-8">{pkg.price}</div>
            
              <ul className="space-y-4 mb-8 flex-grow">
                {pkg.features.map((feature: string, i: number) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-foreground/80">
                    <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            
              <div className="flex flex-col gap-4 mt-auto">
                <button 
                  onClick={() => setShowTerms(true)}
                  className="w-full py-3 text-center rounded-xl font-bold uppercase tracking-wider transition-all border-2 border-[#ff8c00] text-[#ff8c00] hover:bg-[#ff8c00] hover:text-white"
                >
                  TERMS & CONDITIONS
                </button>

                <Link 
                  href="/booking" 
                  className={`w-full py-4 text-center rounded-xl font-bold uppercase tracking-wider transition-all ${
                    pkg.is_popular 
                      ? "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/30" 
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  Commission
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Terms & Conditions Modal */}
      <AnimatePresence>
        {showTerms && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex justify-center items-center p-4 md:p-8"
            onClick={() => setShowTerms(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white text-black max-w-4xl w-full max-h-full rounded-3xl shadow-2xl overflow-hidden flex flex-col relative"
            >
              <button 
                onClick={() => setShowTerms(false)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors z-10"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>

              <div className="overflow-y-auto p-8 md:p-12 scrollbar-hide">
                <div className="text-center mb-10 flex flex-col items-center">
                  <img src="/images/logo.png" alt="Retro Imprint Logo" className="h-20 mb-6 object-contain invert mix-blend-multiply" />
                  <div className="w-16 h-0.5 bg-[#e5b85a] mb-6"></div>
                  <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                    Photography & Cinematography <br /> Terms & Conditions
                  </h2>
                </div>

                <div className="space-y-10 max-w-3xl mx-auto">
                  {termsContent.map((section, idx) => (
                    <div key={idx}>
                      <h3 className="text-xl font-bold text-[#cf9c3b] mb-4">{section.title}</h3>
                      <ul className="space-y-3">
                        {section.items.map((item, i) => (
                          <li key={i} className="flex gap-4 items-start text-gray-800 leading-relaxed font-medium">
                            <span className="text-2xl leading-none mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
