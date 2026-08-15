"use client";

import { useState, useEffect, useRef } from "react";
import { UploadCloud, X, Trash2, CheckSquare, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { getCategories, addCategory, getMedia, deleteMedia, addMediaRecord } from "@/app/actions/gallery";
import { supabase } from "@/lib/supabase";

export default function GalleryManager() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [categories, setCategories] = useState<any[]>([]);
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [newCatName, setNewCatName] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadCategory, setUploadCategory] = useState("");

  const fetchData = async () => {
    setLoading(true);
    const cats = await getCategories();
    setCategories(cats);
    
    // fetch media
    const catId = selectedCategory !== "All" ? cats.find(c => c.name === selectedCategory)?.id : undefined;
    const items = await getMedia(catId);
    setMedia(items);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [selectedCategory]);

  const handleAddCategory = async () => {
    if (!newCatName) return;
    const res = await addCategory(newCatName);
    if (!res.success) {
      alert("Failed to add category. It might already exist or there was a DB error.");
    } else {
      setNewCatName("");
      fetchData();
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadCategory) {
      alert("Please select a file and a category first.");
      return;
    }
    
    setUploading(true);
    setUploadProgress(10);
    
    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) return prev;
        return prev + 10;
      });
    }, 500);

    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage.from('gallery').upload(filePath, file);
    
    clearInterval(progressInterval);
    setUploadProgress(100);

    if (uploadError) {
      alert("Upload failed: " + uploadError.message);
      setUploading(false);
      setUploadProgress(0);
      return;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage.from('gallery').getPublicUrl(filePath);

    // Save record to DB
    const isVideo = file.type.startsWith('video');
    await addMediaRecord(publicUrl, isVideo ? 'video' : 'image', uploadCategory);
    
    setTimeout(() => {
      setUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) fileInputRef.current.value = '';
      fetchData();
    }, 500); // give the user 500ms to see 100% completion
  };

  const handleDelete = async (id: string, url: string) => {
    if (confirm("Delete this media?")) {
      await deleteMedia(id, url);
      fetchData();
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Gallery Management</h1>
      </div>

      {/* Category Management */}
      <div className="glass p-6 rounded-2xl border border-white/5 flex gap-4 items-center mb-6">
        <input 
          type="text" 
          value={newCatName}
          onChange={(e) => setNewCatName(e.target.value)}
          placeholder="New Category Name" 
          className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary text-white"
        />
        <button onClick={handleAddCategory} className="flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary hover:bg-primary/30 rounded-lg font-medium transition-colors">
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      {/* Upload Zone */}
      <div className="glass p-10 rounded-3xl border border-white/10 border-dashed mb-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 z-0" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-4">
            <UploadCloud className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold mb-2">Upload Photos or Videos</h3>
          <p className="text-sm text-foreground/60 max-w-md mx-auto mb-6">
            Ensure you have created the "gallery" public bucket in Supabase.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <select 
              value={uploadCategory}
              onChange={(e) => setUploadCategory(e.target.value)}
              className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-primary"
            >
              <option value="">Select Category First</option>
              {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
            </select>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              className="hidden" 
              accept="image/*,video/*"
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading || !uploadCategory}
              className="px-6 py-2 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Browse Files"}
            </button>
          </div>
          
          {/* Progress Bar */}
          {uploading && (
            <div className="w-full max-w-md mt-8">
              <div className="flex justify-between text-xs text-foreground/60 mb-2 font-medium">
                <span>Uploading...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full h-2 bg-black/50 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Management Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 bg-black/20 p-4 rounded-xl border border-white/5">
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setSelectedCategory("All")}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === "All" ? "bg-white/10 text-white" : "text-foreground/60 hover:text-white hover:bg-white/5"
            }`}
          >
            All
          </button>
          {categories.map(cat => (
            <button 
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === cat.name ? "bg-white/10 text-white" : "text-foreground/60 hover:text-white hover:bg-white/5"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {loading ? <p>Loading media...</p> : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {media.map((item) => (
            <div key={item.id} className="group relative aspect-square rounded-2xl overflow-hidden glass border border-white/5">
              {item.type === 'video' ? (
                <video src={item.url} className="w-full h-full object-cover" muted autoPlay loop />
              ) : (
                <img src={item.url} alt="Gallery Item" className="w-full h-full object-cover" />
              )}
              
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => handleDelete(item.id, item.url)} className="w-8 h-8 rounded-full bg-red-500/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-red-500">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/80 to-transparent">
                <span className="text-xs font-bold uppercase tracking-wider text-white">{item.categories?.name}</span>
              </div>
            </div>
          ))}
          {media.length === 0 && <p className="col-span-full text-foreground/50">No media found in this category.</p>}
        </div>
      )}
    </div>
  );
}
