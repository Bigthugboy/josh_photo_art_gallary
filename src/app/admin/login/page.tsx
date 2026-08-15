"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";

import { loginAdmin } from "@/app/actions/admin";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await loginAdmin(email, password);
    if (res.success) {
      localStorage.setItem("adminLoggedIn", "true");
      router.push("/admin/dashboard");
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-10 rounded-3xl border border-white/10 w-full max-w-md shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Access</h1>
          <p className="text-foreground/60 text-sm">Sign in to manage your portfolio</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2 relative">
            <label className="text-xs font-medium uppercase tracking-wider text-foreground/80">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-primary transition-colors text-white" 
                placeholder="admin@joshgallery.com" 
                required
              />
            </div>
          </div>
          
          <div className="space-y-2 relative">
            <label className="text-xs font-medium uppercase tracking-wider text-foreground/80">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:border-primary transition-colors text-white" 
                placeholder="••••••••" 
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full py-4 bg-primary text-white font-bold uppercase tracking-wider rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 mt-4"
          >
            Sign In
          </button>
        </form>
      </motion.div>
    </div>
  );
}
