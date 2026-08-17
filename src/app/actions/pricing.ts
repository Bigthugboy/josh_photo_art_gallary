"use server";

import { supabase } from "@/lib/supabase";

export async function getPackages() {
  const { data, error } = await supabase
    .from('pricing_packages')
    .select('*')
    .order('created_at', { ascending: true }); 

  if (error) {
    console.error("Error fetching packages:", error);
    return [];
  }
  return data || [];
}

export async function updatePackage(id: string, updates: any) {
  const { data, error } = await supabase
    .from('pricing_packages')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error("Error updating package:", error);
    return { success: false, message: error.message };
  }
  return { success: true, data };
}
