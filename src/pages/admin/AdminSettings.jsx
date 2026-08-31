import React, { useState } from 'react';
import { Save, RefreshCw, Check, Settings, AlertTriangle } from 'lucide-react';
import { useData } from '../../context/DataContext';

const AdminSettings = () => {
  const { settings, updateSettings, resetData } = useData();
  const [formData, setFormData] = useState({ ...settings });
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    if (window.confirm('Reset all website data to initial sample seed content? This will restore original sample projects, articles, and settings.')) {
      resetData();
      alert('Website data reset to defaults successfully!');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-deep-navy/10 pb-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-deep-navy">Website Settings & Profile CMS</h1>
          <p className="text-xs text-deep-navy/70 font-light mt-1">Configure profile information, hero text, email, social links, and CV download.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="editorial-card rounded-3xl p-8 bg-white space-y-6 border border-warm-beige-300">
        
        {saved && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <Check className="w-4 h-4" /> Settings updated successfully! All public pages reflect these changes.
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-base font-display font-bold text-soft-gold-600 uppercase tracking-widest border-b border-deep-navy/10 pb-2">Profile & Branding</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
            <div className="space-y-1">
              <label className="font-bold uppercase tracking-wider text-deep-navy/80">Brand / First Name *</label>
              <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300" />
            </div>
            <div className="space-y-1">
              <label className="font-bold uppercase tracking-wider text-deep-navy/80">Full Legal Name *</label>
              <input type="text" required value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300" />
            </div>
          </div>

          <div className="space-y-1 text-xs font-medium">
            <label className="font-bold uppercase tracking-wider text-deep-navy/80">Hero Title / Headline *</label>
            <input type="text" required value={formData.heroTitle} onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })} className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300" />
          </div>

          <div className="space-y-1 text-xs font-medium">
            <label className="font-bold uppercase tracking-wider text-deep-navy/80">Hero Short Introduction</label>
            <textarea rows="3" value={formData.intro} onChange={(e) => setFormData({ ...formData, intro: e.target.value })} className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300" />
          </div>

          <div className="space-y-1 text-xs font-medium">
            <label className="font-bold uppercase tracking-wider text-deep-navy/80">About Me Detailed Text</label>
            <textarea rows="4" value={formData.aboutText} onChange={(e) => setFormData({ ...formData, aboutText: e.target.value })} className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300" />
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-deep-navy/10">
          <h2 className="text-base font-display font-bold text-soft-gold-600 uppercase tracking-widest border-b border-deep-navy/10 pb-2">Contact & Social Links</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
            <div className="space-y-1">
              <label className="font-bold uppercase tracking-wider">Contact Email *</label>
              <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300" />
            </div>
            <div className="space-y-1">
              <label className="font-bold uppercase tracking-wider">Location / City</label>
              <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium">
            <div className="space-y-1">
              <label className="font-bold uppercase tracking-wider">LinkedIn URL</label>
              <input type="text" value={formData.linkedin} onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })} className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300" />
            </div>
            <div className="space-y-1">
              <label className="font-bold uppercase tracking-wider">Instagram URL</label>
              <input type="text" value={formData.instagram} onChange={(e) => setFormData({ ...formData, instagram: e.target.value })} className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300" />
            </div>
            <div className="space-y-1">
              <label className="font-bold uppercase tracking-wider">GitHub URL</label>
              <input type="text" value={formData.github} onChange={(e) => setFormData({ ...formData, github: e.target.value })} className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
            <div className="space-y-1">
              <label className="font-bold uppercase tracking-wider">Downloadable CV URL</label>
              <input type="text" value={formData.cvUrl} onChange={(e) => setFormData({ ...formData, cvUrl: e.target.value })} className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300" />
            </div>
            <div className="space-y-1">
              <label className="font-bold uppercase tracking-wider">Profile Photo URL</label>
              <input type="text" value={formData.profileImage} onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })} className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300" />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-deep-navy/10 flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2.5 rounded-full border border-rose-200 text-rose-700 text-xs font-semibold hover:bg-rose-50 flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Restore Default Seed Content
          </button>

          <button
            type="submit"
            className="px-7 py-3 rounded-full bg-deep-navy text-warm-beige text-xs font-semibold uppercase tracking-wider hover:bg-deep-navy-800 flex items-center gap-2 shadow-md"
          >
            <Save className="w-4 h-4 text-soft-gold" /> Save All Settings
          </button>
        </div>

      </form>
    </div>
  );
};

export default AdminSettings;
