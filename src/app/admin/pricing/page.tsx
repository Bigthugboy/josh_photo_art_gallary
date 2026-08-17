"use client";

import { useState, useEffect } from "react";
import { getPackages, updatePackage } from "@/app/actions/pricing";
import { Check, Edit2, Save, X } from "lucide-react";

export default function AdminPricing() {
  const [packages, setPackages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>(null);

  const fetchPackages = async () => {
    setLoading(true);
    const data = await getPackages();
    setPackages(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleEditClick = (pkg: any) => {
    setEditingId(pkg.id);
    setEditForm({ ...pkg, featuresStr: pkg.features.join('\n') });
  };

  const handleSave = async () => {
    if (!editForm) return;
    
    // Parse features back to array
    const features = editForm.featuresStr.split('\n').map((s: string) => s.trim()).filter((s: string) => s.length > 0);
    
    const updates = {
      name: editForm.name,
      price: editForm.price,
      description: editForm.description,
      image_url: editForm.image_url,
      is_popular: editForm.is_popular,
      features: features
    };

    const res = await updatePackage(editingId!, updates);
    if (res.success) {
      setEditingId(null);
      fetchPackages();
    } else {
      alert("Failed to update: " + res.message);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Manage Pricing Packages</h1>
      
      {loading ? <p>Loading packages...</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {packages.map(pkg => (
            <div key={pkg.id} className="glass p-6 rounded-3xl border border-white/5 flex flex-col relative">
              {editingId === pkg.id ? (
                // EDIT MODE
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold">Edit Package</h3>
                    <div className="flex gap-2">
                      <button onClick={handleSave} className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30">
                        <Save className="w-5 h-5" />
                      </button>
                      <button onClick={() => setEditingId(null)} className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30">
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <input type="text" value={editForm.name} onChange={e => setEditForm({...editForm, name: e.target.value})} className="bg-black/50 border border-white/10 rounded-lg p-3 text-white w-full" placeholder="Package Name" />
                  <input type="text" value={editForm.price} onChange={e => setEditForm({...editForm, price: e.target.value})} className="bg-black/50 border border-white/10 rounded-lg p-3 text-white w-full text-2xl font-bold" placeholder="Price (e.g. $299)" />
                  <textarea value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})} className="bg-black/50 border border-white/10 rounded-lg p-3 text-white w-full h-24" placeholder="Description" />
                  <input type="text" value={editForm.image_url} onChange={e => setEditForm({...editForm, image_url: e.target.value})} className="bg-black/50 border border-white/10 rounded-lg p-3 text-white w-full text-sm" placeholder="Image URL" />
                  
                  <div>
                    <label className="text-xs text-foreground/60 mb-1 block">Features (one per line)</label>
                    <textarea value={editForm.featuresStr} onChange={e => setEditForm({...editForm, featuresStr: e.target.value})} className="bg-black/50 border border-white/10 rounded-lg p-3 text-white w-full h-32" placeholder="Feature 1&#10;Feature 2" />
                  </div>
                  
                  <label className="flex items-center gap-2 text-sm cursor-pointer mt-2">
                    <input type="checkbox" checked={editForm.is_popular} onChange={e => setEditForm({...editForm, is_popular: e.target.checked})} className="w-4 h-4 rounded accent-primary" />
                    Mark as "Most Popular"
                  </label>
                </div>
              ) : (
                // VIEW MODE
                <>
                  <div className="absolute top-4 right-4 z-10 flex gap-2">
                    <button onClick={() => handleEditClick(pkg)} className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary transition-colors border border-white/10 shadow-xl">
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="h-48 -mx-6 -mt-6 mb-6 relative rounded-t-3xl overflow-hidden">
                    <img src={pkg.image_url} alt={pkg.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent"></div>
                    {pkg.is_popular && (
                      <div className="absolute bottom-4 right-4 bg-primary text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                        Popular
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <p className="text-foreground/60 text-sm mb-4">{pkg.description}</p>
                  <div className="text-3xl font-bold mb-6 text-primary">{pkg.price}</div>
                  
                  <ul className="space-y-3 mb-6">
                    {pkg.features.map((feature: string, i: number) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-foreground/80">
                        <Check className="w-4 h-4 text-primary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
        </div>
      )}
      
      {!loading && packages.length === 0 && (
        <div className="text-center p-12 glass rounded-2xl border border-white/5 mt-8">
          <p className="text-foreground/60">No pricing packages found. Did you run the SQL migration?</p>
        </div>
      )}
    </div>
  );
}
