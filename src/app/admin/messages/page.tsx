"use client";

import { motion } from "framer-motion";
import { MailOpen, Mail, Trash2, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { getMessages, markMessageRead, deleteMessage } from "@/app/actions/contact";

export default function MessageManager() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);

  const fetchMessages = async () => {
    setLoading(true);
    const data = await getMessages();
    setMessages(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleRead = async (id: string) => {
    await markMessageRead(id);
    fetchMessages();
    if (selectedMessage && selectedMessage.id === id) {
      setSelectedMessage({ ...selectedMessage, is_read: true });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this message?")) {
      await deleteMessage(id);
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage(null);
      }
      fetchMessages();
    }
  };

  return (
    <div className="h-full flex flex-col">
      <h1 className="text-3xl font-bold mb-8 shrink-0">Inbox</h1>
      
      {loading ? (
        <p>Loading messages...</p>
      ) : messages.length === 0 ? (
        <div className="glass p-12 rounded-3xl text-center border border-white/5">
          <MailOpen className="w-16 h-16 mx-auto mb-4 text-foreground/20" />
          <h2 className="text-xl font-bold mb-2">You're all caught up!</h2>
          <p className="text-foreground/50">There are no messages in your inbox.</p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6 flex-grow min-h-0">
          {/* Message List */}
          <div className="w-full lg:w-1/3 glass rounded-2xl border border-white/5 overflow-y-auto flex flex-col h-[600px] lg:h-full">
            {messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => {
                  setSelectedMessage(msg);
                  if (!msg.is_read) handleRead(msg.id);
                }}
                className={`p-6 border-b border-white/5 text-left transition-colors flex items-start gap-4 ${
                  selectedMessage?.id === msg.id ? "bg-white/10" : "hover:bg-white/5"
                }`}
              >
                <div className="mt-1 shrink-0">
                  {msg.is_read ? (
                    <MailOpen className="w-5 h-5 text-foreground/40" />
                  ) : (
                    <div className="relative">
                      <Mail className="w-5 h-5 text-primary" />
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border border-[#050505]"></span>
                    </div>
                  )}
                </div>
                <div className="overflow-hidden">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className={`font-medium truncate pr-2 ${!msg.is_read ? "text-white font-bold" : "text-foreground/80"}`}>
                      {msg.name}
                    </h3>
                    <span className="text-xs text-foreground/40 shrink-0">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className={`text-sm truncate mb-1 ${!msg.is_read ? "text-white/90" : "text-foreground/60"}`}>
                    {msg.subject}
                  </p>
                  <p className="text-xs text-foreground/40 truncate">
                    {msg.content}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Message Detail View */}
          <div className="w-full lg:w-2/3 glass rounded-2xl border border-white/5 p-8 flex flex-col h-[600px] lg:h-full overflow-y-auto">
            {selectedMessage ? (
              <motion.div
                key={selectedMessage.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-8 border-b border-white/10 pb-6 shrink-0">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{selectedMessage.subject}</h2>
                    <div className="flex items-center gap-2 text-foreground/60 text-sm">
                      <span className="font-medium text-white">{selectedMessage.name}</span>
                      <span>&lt;{selectedMessage.email}&gt;</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(selectedMessage.created_at).toLocaleString()}</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDelete(selectedMessage.id)}
                    className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                    title="Delete Message"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex-grow text-foreground/90 whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.content}
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 shrink-0">
                  <a 
                    href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors"
                  >
                    Reply via Email
                  </a>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-foreground/40">
                <Mail className="w-12 h-12 mb-4 opacity-50" />
                <p>Select a message to read</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
