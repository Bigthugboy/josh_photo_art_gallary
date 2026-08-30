"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-black text-accent-foreground py-12 border-t border-white/10">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <Link href="/" className="inline-block">
            <img src="/images/logo.png" alt="Retro Imprint" className="h-16 w-auto object-contain" />
          </Link>
          <p className="text-sm text-foreground/60 leading-relaxed">
            Capturing moments, creating art. A premium photography and creative media practice, backed by a trusted network of creatives dedicated to visual excellence.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-primary">Quick Links</h4>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li><Link href="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link></li>
            <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            <li><Link href="/booking" className="hover:text-primary transition-colors">Book Session</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-primary">Contact</h4>
          <ul className="space-y-2 text-sm text-foreground/70">
            <li className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <a href="mailto:retrographyimprint@gmail.com" className="hover:text-white transition-colors">retrographyimprint@gmail.com</a>
            </li>
            <li className="flex items-center gap-2 pt-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <a href="tel:07928894094" className="hover:text-white transition-colors">07928894094</a>
            </li>
            <li className="pt-2">London, UK</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-primary">Socials</h4>
          <div className="flex gap-4">
            {/* Instagram */}
            <a href="https://www.instagram.com/retro__graphy/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            {/* TikTok */}
            <a href="https://www.tiktok.com/@retro_graphy?_r=1&_t=ZS-98xHcsWinh3" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-white/5 text-center text-xs text-foreground/40">
        &copy; {new Date().getFullYear()} Retro Imprint. All rights reserved.
      </div>
    </footer>
  );
}
