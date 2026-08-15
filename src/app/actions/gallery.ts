"use server";
import { supabase } from "@/lib/supabase";

export async function getCategories() {
  const { data } = await supabase.from('categories').select('*').order('name');
  return data || [];
}

export async function addCategory(name: string) {
  const { data, error } = await supabase.from('categories').insert([{ name }]).select().single();
  if (error) console.error("Supabase Add Category Error:", error);
  return { success: !error, data };
}

export async function getMedia(categoryId?: string) {
  let query = supabase.from('media').select('*, categories(name)').order('created_at', { ascending: false });
  if (categoryId) query = query.eq('category_id', categoryId);
  const { data } = await query;
  return data || [];
}

export async function deleteMedia(id: string, url: string) {
  const { error } = await supabase.from('media').delete().eq('id', id);
  if (!error) {
    const path = url.split('/').pop();
    if (path) {
      await supabase.storage.from('gallery').remove([path]);
    }
  }
  return !error;
}

export async function addMediaRecord(url: string, type: string, category_id: string) {
  const { error } = await supabase.from('media').insert([{ url, type, category_id }]);
  return !error;
}
