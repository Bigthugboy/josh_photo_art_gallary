"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  return (
    <div className="pt-32 pb-20 min-h-screen px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Get in <span className="text-primary">Touch</span></h1>
        <p className="text-foreground/70 max-w-2xl mx-auto">Have a project in mind or a question? We'd love to hear from you.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="glass p-8 rounded-3xl border border-white/5 flex items-start gap-6">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-primary">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-foreground/60 text-sm mb-2">For general inquiries and booking.</p>
              <a href="mailto:hello@joshgallery.com" className="text-primary font-medium hover:underline">hello@joshgallery.com</a>
            </div>
          </div>

          <div className="glass p-8 rounded-3xl border border-white/5 flex items-start gap-6">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-primary">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-foreground/60 text-sm mb-2">Mon-Fri from 9am to 6pm.</p>
              <a href="tel:+1234567890" className="text-primary font-medium hover:underline">+1 (234) 567-890</a>
            </div>
          </div>
          
          <div className="glass p-8 rounded-3xl border border-white/5 flex items-start gap-6">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 text-primary">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Studio</h3>
              <p className="text-foreground/60 text-sm leading-relaxed">
                123 Creative Avenue, Suite 400<br />
                New York, NY 10001
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <form className="glass p-8 md:p-10 rounded-3xl border border-white/5 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">First Name</label>
                <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-white" placeholder="John" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">Last Name</label>
                <input type="text" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-white" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">Email</label>
              <input type="email" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-white" placeholder="john@example.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">Message</label>
              <textarea rows={5} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors text-white resize-none" placeholder="Tell us about your project..."></textarea>
            </div>
            <button type="button" className="w-full py-4 bg-primary text-white font-bold uppercase tracking-wider rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
              Send Message
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
