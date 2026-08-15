"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, X } from "lucide-react";
import { useState, useEffect } from "react";
import { getApprovedReviews, submitReview } from "@/app/actions/reviews";

export default function Reviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", content: "", rating: 5 });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    async function fetchReviews() {
      const data = await getApprovedReviews();
      setReviews(data);
      setLoading(false);
    }
    fetchReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const success = await submitReview(formData.name, formData.email, formData.content, formData.rating);
    setSubmitting(false);
    if (success) {
      setSubmitted(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setSubmitted(false);
        setFormData({ name: "", email: "", content: "", rating: 5 });
      }, 3000);
    } else {
      alert("Failed to submit review. Please try again.");
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen px-6 md:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Client <span className="text-primary">Love</span></h1>
        <p className="text-foreground/70 max-w-2xl mx-auto">Don't just take our word for it. Here's what our clients have to say.</p>
      </motion.div>

      {loading ? (
        <div className="text-center text-foreground/50">Loading testimonials...</div>
      ) : reviews.length === 0 ? (
        <div className="text-center text-foreground/50 mb-16">No reviews yet. Be the first to share your experience!</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass p-8 rounded-3xl border border-white/5 relative"
            >
              <div className="flex gap-1 mb-4 text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < review.rating ? "fill-primary" : "text-white/20"}`} />
                ))}
              </div>
              <p className="text-lg text-foreground/90 italic mb-6">"{review.content}"</p>
              <div>
                <div className="font-bold">{review.name}</div>
                <div className="text-sm text-foreground/50 uppercase tracking-wider mt-1">{review.email}</div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="text-center">
        <div className="inline-block p-[1px] rounded-2xl bg-gradient-to-r from-primary/50 to-transparent">
          <div className="glass px-8 py-8 rounded-2xl">
            <h3 className="text-xl font-bold mb-2">Want to leave a review?</h3>
            <p className="text-foreground/60 mb-6 text-sm">We'd love to hear about your experience.</p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all"
            >
              Write a Review
            </button>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-background glass p-8 rounded-3xl border border-white/10 w-full max-w-lg relative"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-foreground/50 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 fill-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                  <p className="text-foreground/60">Your review has been submitted and is pending approval.</p>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-6">Write a Review</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Your Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary"
                        placeholder="John & Jane Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Event Type / Role</label>
                      <input 
                        required
                        type="text" 
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary"
                        placeholder="Wedding Client, Creative Director, etc."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Rating</label>
                      <div className="flex gap-2 mb-4 cursor-pointer">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            onClick={() => setFormData({...formData, rating: star})}
                            className={`w-8 h-8 transition-colors ${star <= formData.rating ? 'fill-primary text-primary' : 'text-white/20'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Your Review</label>
                      <textarea 
                        required
                        rows={4}
                        value={formData.content}
                        onChange={e => setFormData({...formData, content: e.target.value})}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary resize-none"
                        placeholder="Tell us about your experience..."
                      ></textarea>
                    </div>
                    <button 
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50"
                    >
                      {submitting ? "Submitting..." : "Submit Review"}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
