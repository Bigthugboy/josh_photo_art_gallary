"use server";
import { supabase } from "@/lib/supabase";

export async function loginAdmin(email: string, password: string) {
  const { data, error } = await supabase
    .from('admins')
    .select('*')
    .eq('email', email)
    .eq('password', password)
    .single();
    
  if (error || !data) {
    return { success: false, message: "Invalid credentials" };
  }
  return { success: true };
}
