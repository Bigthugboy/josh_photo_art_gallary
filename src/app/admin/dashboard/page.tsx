"use client";

import { motion } from "framer-motion";
import { Users, Image as ImageIcon, Calendar, Star, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getDashboardStats } from "@/app/actions/dashboard";

export default function Dashboard() {
  const [statsData, setStatsData] = useState<{ mediaCount: number; pendingReviews: number; recentReviews: any[] }>({
    mediaCount: 0,
    pendingReviews: 0,
    recentReviews: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const data = await getDashboardStats();
      setStatsData(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const stats = [
    { label: "Total Media", value: loading ? "..." : statsData.mediaCount.toString(), icon: ImageIcon, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "Pending Reviews", value: loading ? "..." : statsData.pendingReviews.toString(), icon: Star, color: "text-yellow-400", bg: "bg-yellow-400/10" },
    { label: "New Bookings", value: "0", icon: Calendar, color: "text-green-400", bg: "bg-green-400/10" },
    { label: "Site Visitors", value: "0", icon: Users, color: "text-purple-400", bg: "bg-purple-400/10" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-6 rounded-2xl border border-white/5 flex items-center gap-4"
          >
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-7 h-7" />
            </div>
            <div>
              <div className="text-sm text-foreground/60 font-medium">{stat.label}</div>
              <div className="text-2xl font-bold mt-1">{stat.value}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass p-8 rounded-3xl border border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Recent Activity</h2>
            <TrendingUp className="w-5 h-5 text-foreground/40" />
          </div>
          <div className="space-y-6">
            {loading ? (
              <div className="text-sm text-foreground/50">Loading activity...</div>
            ) : statsData.recentReviews.length === 0 ? (
              <div className="text-sm text-foreground/50">No recent activity.</div>
            ) : (
              statsData.recentReviews.map((review) => (
                <div key={review.id} className="flex items-start gap-4">
                  <div className={`w-2 h-2 rounded-full mt-2 ${review.status === 'pending' ? 'bg-yellow-400' : 'bg-primary'}`}></div>
                  <div>
                    <p className="text-sm font-medium">
                      {review.status === 'pending' ? 'New review submitted by' : 'Review approved for'} {review.name}
                    </p>
                    <p className="text-xs text-foreground/50 mt-1">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="glass p-8 rounded-3xl border border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Quick Actions</h2>
          </div>
          <div className="space-y-4 flex flex-col">
            <Link href="/admin/gallery" className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl font-medium transition-colors text-left px-6 border border-white/5 inline-block">
              + Upload New Photos
            </Link>
            <Link href="/admin/reviews" className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl font-medium transition-colors text-left px-6 border border-white/5 inline-block">
              Review Pending Testimonials
            </Link>
            <Link href="/admin/gallery" className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl font-medium transition-colors text-left px-6 border border-white/5 inline-block">
              Manage Categories
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
