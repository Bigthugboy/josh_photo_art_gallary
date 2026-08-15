"use client";

import { motion } from "framer-motion";
import { InlineWidget } from "react-calendly";
import { useEffect, useState } from "react";

export default function Booking() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="pt-32 pb-20 min-h-screen px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Book a <span className="text-primary">Session</span></h1>
        <p className="text-foreground/70 max-w-2xl mx-auto">Select a date and time that works for you. We can't wait to create art together.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-3xl overflow-hidden border border-white/10 p-2 md:p-6"
      >
        {/* We use a placeholder calendly url here. You should replace this with your actual Calendly link. */}
        {mounted && (
          <div className="min-h-[700px] flex flex-col items-center justify-center">
            {process.env.NEXT_PUBLIC_CALENDLY_URL ? (
              <InlineWidget 
                url={process.env.NEXT_PUBLIC_CALENDLY_URL} 
                styles={{ height: '700px', width: '100%' }}
                pageSettings={{
                  backgroundColor: '0a0a0a',
                  hideEventTypeDetails: false,
                  hideLandingPageDetails: false,
                  primaryColor: '3b82f6',
                  textColor: 'ffffff'
                }}
              />
            ) : (
              <div className="text-center p-10 glass rounded-2xl border border-white/10 max-w-md">
                <h3 className="text-2xl font-bold mb-4">Connect Your Calendar</h3>
                <p className="text-foreground/60 mb-6">
                  To accept bookings, please add your Calendly link to your `.env` file like this:
                </p>
                <code className="block bg-black/50 p-4 rounded-xl text-sm text-primary mb-6 break-all">
                  NEXT_PUBLIC_CALENDLY_URL="https://calendly.com/your-username"
                </code>
                <p className="text-xs text-foreground/40">Refresh the page after adding it.</p>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
