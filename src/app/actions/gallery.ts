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

export async function getMedia(categoryId?: string, onlyHighlights = false) {
  let query = supabase.from('media').select('*, categories(name)').order('created_at', { ascending: false });
  if (categoryId) query = query.eq('category_id', categoryId);
  if (onlyHighlights) query = query.eq('is_highlight', true);
  const { data } = await query;
  return data || [];
}

export async function deleteMedia(id: string, url: string) {
  const { error } = await supabase.from('media').delete().eq('id', id);
  // Note: We are no longer deleting from Supabase Storage.
  // The file remains in Cloudinary unless deleted from the Cloudinary dashboard.
  return !error;
}

export async function addMediaRecord(url: string, type: string, category_id: string, is_highlight: boolean = false) {
  const { error } = await supabase.from('media').insert([{ url, type, category_id, is_highlight }]);
  return !error;
}

export async function deleteCategory(id: string) {
  const { error } = await supabase.from('categories').delete().eq('id', id);
  return !error;
}

export async function deleteMediaBulk(ids: string[]) {
  const { error } = await supabase.from('media').delete().in('id', ids);
  return !error;
}

export async function toggleHighlight(id: string, is_highlight: boolean) {
  const { error } = await supabase.from('media').update({ is_highlight }).eq('id', id);
  return !error;
}
