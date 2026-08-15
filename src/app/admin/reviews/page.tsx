"use client";

import { motion } from "framer-motion";
import { Check, X, Star, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { getReviews, updateReviewStatus, deleteReview } from "@/app/actions/reviews";

export default function ReviewManager() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = async () => {
    setLoading(true);
    const data = await getReviews();
    setReviews(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    await updateReviewStatus(id, status);
    fetchReviews();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      await deleteReview(id);
      fetchReviews();
    }
  };

  const pendingReviews = reviews.filter(r => r.status === 'pending');
  const publishedReviews = reviews.filter(r => r.status === 'approved');

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Review Management</h1>
      
      <div className="mb-12">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          Pending Approval 
          <span className="bg-yellow-500/20 text-yellow-500 text-xs px-2 py-1 rounded-full">{pendingReviews.length} New</span>
        </h2>
        
        {loading ? <p>Loading reviews...</p> : pendingReviews.length === 0 ? <p className="text-foreground/60">No pending reviews.</p> : (
          <div className="space-y-4">
            {pendingReviews.map((review) => (
              <motion.div 
                key={review.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass p-6 rounded-2xl border border-white/5 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center"
              >
                <div className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="font-bold text-lg">{review.name}</div>
                    <div className="text-sm text-foreground/40 px-2 border-l border-white/10">{new Date(review.created_at).toLocaleDateString()}</div>
                    <div className="flex text-primary ml-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? "fill-primary" : "text-white/20"}`} />
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-foreground/60 mb-2">{review.email}</div>
                  <p className="italic text-foreground/90">"{review.content}"</p>
                </div>
                
                <div className="flex items-center gap-3 shrink-0">
                  <button onClick={() => handleStatusChange(review.id, 'approved')} className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 rounded-lg font-medium transition-colors">
                    <Check className="w-4 h-4" /> Approve
                  </button>
                  <button onClick={() => handleStatusChange(review.id, 'rejected')} className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg font-medium transition-colors">
                    <X className="w-4 h-4" /> Reject
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4">Published Reviews</h2>
        <div className="glass rounded-2xl border border-white/5 overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-black/20 border-b border-white/5 text-sm uppercase tracking-wider text-foreground/60">
                <th className="p-4 font-medium">Client</th>
                <th className="p-4 font-medium">Rating</th>
                <th className="p-4 font-medium">Review Snippet</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {publishedReviews.map((review) => (
                <tr key={review.id} className="border-b border-white/5 last:border-none hover:bg-white/5 transition-colors">
                  <td className="p-4 font-medium">{review.name}</td>
                  <td className="p-4">
                    <div className="flex text-primary">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < review.rating ? "fill-primary" : "text-white/20"}`} />
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-foreground/70 truncate max-w-xs">
                    "{review.content}"
                  </td>
                  <td className="p-4 text-right">
                    <button onClick={() => handleDelete(review.id)} className="text-red-400 hover:text-red-300 text-sm font-medium flex items-center gap-1 justify-end w-full"><Trash2 className="w-4 h-4"/> Remove</button>
                  </td>
                </tr>
              ))}
              {publishedReviews.length === 0 && (
                <tr><td colSpan={4} className="p-4 text-center text-foreground/50">No published reviews yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
