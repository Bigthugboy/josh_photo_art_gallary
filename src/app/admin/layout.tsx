"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LayoutDashboard, Image as ImageIcon, MessageSquare, LogOut, Camera, Mail } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (!isLoggedIn && pathname !== "/admin/login") {
      router.push("/admin/login");
    } else {
      setIsAuthorized(true);
    }
  }, [pathname, router]);

  if (!isAuthorized) {
    return null; // or a loading spinner
  }

  // Hide sidebar on login page
  const isLoginPage = pathname === "/admin/login";

  return (
    <div className="min-h-screen bg-[#020202] text-foreground flex flex-col md:flex-row">
      {/* Sidebar */}
      {!isLoginPage && (
      <aside className="w-full md:w-64 bg-black border-r border-white/5 flex flex-col p-6 shadow-2xl z-40 md:min-h-screen">
        <div className="flex items-center gap-2 mb-12">
          <Link href="/" className="inline-block">
            <img src="/images/logo.png" alt="Retro Imprint" className="h-12 w-auto object-contain" />
          </Link>
        </div>

        <nav className="flex-grow space-y-2">
          <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-foreground/80 hover:text-white">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link href="/admin/gallery" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-foreground/80 hover:text-white">
            <ImageIcon className="w-5 h-5" />
            <span className="font-medium">Gallery</span>
          </Link>
          <Link href="/admin/pricing" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-foreground/80 hover:text-white">
            <span className="w-5 h-5 flex items-center justify-center font-bold border rounded-full border-current text-sm">$</span>
            <span className="font-medium">Pricing</span>
          </Link>
          <Link href="/admin/reviews" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-foreground/80 hover:text-white">
            <MessageSquare className="w-5 h-5" />
            <span className="font-medium">Reviews</span>
          </Link>
          <Link href="/admin/messages" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors text-foreground/80 hover:text-white">
            <Mail className="w-5 h-5" />
            <span className="font-medium">Inbox</span>
          </Link>
        </nav>

        <div className="mt-8 pt-8 border-t border-white/5">
          <button 
            onClick={() => {
              localStorage.removeItem("adminLoggedIn");
              router.push("/admin/login");
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-colors text-foreground/60"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>
      )}

      {/* Main Content Area */}
      <main className="flex-grow p-6 md:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
