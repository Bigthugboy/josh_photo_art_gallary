"use server";
import { supabase } from "@/lib/supabase";

export async function submitMessage(name: string, email: string, subject: string, content: string) {
  const { error } = await supabase.from('messages').insert([{
    name,
    email,
    subject,
    content,
    is_read: false
  }]);
  return !error;
}

export async function getMessages() {
  const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
  return data || [];
}

export async function markMessageRead(id: string) {
  const { error } = await supabase.from('messages').update({ is_read: true }).eq('id', id);
  return !error;
}

export async function deleteMessage(id: string) {
  const { error } = await supabase.from('messages').delete().eq('id', id);
  return !error;
}
