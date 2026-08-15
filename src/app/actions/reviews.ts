"use server";
import { supabase } from "@/lib/supabase";

export async function getReviews(status?: string) {
  let query = supabase.from('reviews').select('*').order('created_at', { ascending: false });
  if (status) query = query.eq('status', status);
  const { data } = await query;
  return data || [];
}

export async function getApprovedReviews() {
  const { data } = await supabase.from('reviews').select('*').eq('status', 'approved').order('created_at', { ascending: false });
  return data || [];
}

export async function submitReview(name: string, email: string, content: string, rating: number) {
  const { error } = await supabase.from('reviews').insert([{
    name,
    email,
    content,
    rating,
    status: 'pending' // default status
  }]);
  return !error;
}

export async function updateReviewStatus(id: string, status: string) {
  const { error } = await supabase.from('reviews').update({ status }).eq('id', id);
  return !error;
}

export async function deleteReview(id: string) {
  const { error } = await supabase.from('reviews').delete().eq('id', id);
  return !error;
}
