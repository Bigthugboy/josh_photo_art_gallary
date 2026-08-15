"use server";
import { supabase } from "@/lib/supabase";

export async function getDashboardStats() {
  // 1. Total Photos/Media
  const { count: mediaCount } = await supabase
    .from("media")
    .select("*", { count: "exact", head: true });

  // 2. Pending Reviews
  const { count: pendingReviews } = await supabase
    .from("reviews")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending");

  // 3. Recent Activity (Recent Reviews)
  const { data: recentReviews } = await supabase
    .from("reviews")
    .select("id, name, created_at, status")
    .order("created_at", { ascending: false })
    .limit(5);

  return {
    mediaCount: mediaCount || 0,
    pendingReviews: pendingReviews || 0,
    recentReviews: recentReviews || []
  };
}
