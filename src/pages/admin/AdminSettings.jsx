import React, { useState } from 'react';
import { Save, RefreshCw, Check, ImageIcon, User, Plus, Trash2, ChevronUp, ChevronDown, ToggleLeft, ToggleRight, Smartphone, Monitor, Film } from 'lucide-react';
import { useData } from '../../context/DataContext';



const AdminSettings = () => {
  const { settings, updateSettings, resetData } = useData();
  const [formData, setFormData] = useState({ ...settings });
  const [saved, setSaved] = useState(false);
  const [showcaseItems, setShowcaseItems] = useState(
    () => (settings.heroShowcase ? [...settings.heroShowcase] : [])
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings({ ...formData, heroShowcase: showcaseItems });
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

  // Showcase item helpers
  const addShowcaseItem = () => {
    setShowcaseItems(prev => [...prev, {
      id: `showcase-${Date.now()}`,
      title: '',
      category: 'UI/UX Design',
      mobileImage: '',
      desktopImage: '',
      projectUrl: '',
      order: prev.length + 1,
      active: true,
    }]);
  };
  const updateShowcaseItem = (id, field, value) =>
    setShowcaseItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  const deleteShowcaseItem = (id) => {
    if (window.confirm('Remove this showcase item?'))
      setShowcaseItems(prev => prev.filter(item => item.id !== id));
  };
  const moveShowcaseItem = (index, dir) => {
    const arr = [...showcaseItems];
    const ni = index + dir;
    if (ni < 0 || ni >= arr.length) return;
    [arr[index], arr[ni]] = [arr[ni], arr[index]];
    setShowcaseItems(arr.map((it, i) => ({ ...it, order: i + 1 })));
  };

  const cls = "w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300 font-sans text-xs focus:outline-none focus:ring-2 focus:ring-soft-gold/40";
  const lbl = "font-bold uppercase tracking-wider text-deep-navy/80 text-xs";

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-deep-navy/10 pb-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-deep-navy">Website Settings &amp; Profile CMS</h1>
          <p className="text-xs text-deep-navy/70 font-light mt-1">Configure profile, hero text, social links, CV download, and hero showcase carousel.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">

        {saved && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <Check className="w-4 h-4" /> Settings updated successfully! All public pages reflect these changes.
          </div>
        )}

        {/* ─── Profile & Branding ─── */}
        <div className="editorial-card rounded-3xl p-8 bg-white space-y-6 border border-warm-beige-300">
          <h2 className="text-base font-display font-bold text-soft-gold-600 uppercase tracking-widest border-b border-deep-navy/10 pb-2">Profile &amp; Branding</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
            <div className="space-y-1">
              <label className={lbl}>Brand / First Name *</label>
              <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className={cls} />
            </div>
            <div className="space-y-1">
              <label className={lbl}>Full Legal Name *</label>
              <input type="text" required value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} className={cls} />
            </div>
          </div>

          <div className="space-y-1 text-xs font-medium">
            <label className={lbl}>Hero Title — Line 1 (dark bold serif) *</label>
            <input type="text" required value={formData.heroTitle} onChange={e => setFormData({ ...formData, heroTitle: e.target.value })} className={cls} placeholder="UI/UX Designer" />
            <p className="text-deep-navy/40 text-[10px] pt-0.5">Displayed in shining gold serif. Use \n for line break. E.g. "UI/UX Designer &\nOperational Specialist"</p>
          </div>

          <div className="space-y-1 text-xs font-medium">
            <label className={lbl}>Hero Highlight — Line 2 (italic gold serif) *</label>
            <input type="text" required value={formData.heroHighlight || ''} onChange={e => setFormData({ ...formData, heroHighlight: e.target.value })} className={cls} placeholder="Crafting clear, useful digital experiences." />
            <p className="text-deep-navy/40 text-[10px] pt-0.5">Displayed in italic muted-gold. E.g. "Crafting clear, useful digital experiences."</p>
          </div>

          <div className="space-y-1 text-xs font-medium">
            <label className={lbl}>Availability Badge Text</label>
            <input type="text" value={formData.heroAvailabilityText || ''} onChange={e => setFormData({ ...formData, heroAvailabilityText: e.target.value })} className={cls} placeholder="Open to UI/UX Opportunities ✦" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
            <div className="space-y-1">
              <label className={lbl}>Primary CTA Button</label>
              <input type="text" value={formData.heroPrimaryBtn || ''} onChange={e => setFormData({ ...formData, heroPrimaryBtn: e.target.value })} className={cls} placeholder="View My Work" />
            </div>
            <div className="space-y-1">
              <label className={lbl}>Secondary CTA Button</label>
              <input type="text" value={formData.heroSecondaryBtn || ''} onChange={e => setFormData({ ...formData, heroSecondaryBtn: e.target.value })} className={cls} placeholder="About Me" />
            </div>
          </div>

          <div className="space-y-1 text-xs font-medium">
            <label className={lbl}>Hero Short Introduction</label>
            <textarea rows="3" value={formData.intro} onChange={e => setFormData({ ...formData, intro: e.target.value })} className={cls} />
          </div>

          <div className="space-y-1 text-xs font-medium">
            <label className={lbl}>About Me Detailed Text</label>
            <textarea rows="4" value={formData.aboutText} onChange={e => setFormData({ ...formData, aboutText: e.target.value })} className={cls} />
          </div>
        </div>

        {/* ─── Contact & Social ─── */}
        <div className="editorial-card rounded-3xl p-8 bg-white space-y-6 border border-warm-beige-300">
          <h2 className="text-base font-display font-bold text-soft-gold-600 uppercase tracking-widest border-b border-deep-navy/10 pb-2">Contact &amp; Social Links</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
            <div className="space-y-1">
              <label className={lbl}>Contact Email *</label>
              <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className={cls} />
            </div>
            <div className="space-y-1">
              <label className={lbl}>Location / City</label>
              <input type="text" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} className={cls} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium">
            <div className="space-y-1">
              <label className={lbl}>LinkedIn URL</label>
              <input type="text" value={formData.linkedin} onChange={e => setFormData({ ...formData, linkedin: e.target.value })} className={cls} />
            </div>
            <div className="space-y-1">
              <label className={lbl}>Instagram URL</label>
              <input type="text" value={formData.instagram} onChange={e => setFormData({ ...formData, instagram: e.target.value })} className={cls} />
            </div>
            <div className="space-y-1">
              <label className={lbl}>GitHub URL</label>
              <input type="text" value={formData.github} onChange={e => setFormData({ ...formData, github: e.target.value })} className={cls} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
            <div className="space-y-1">
              <label className={lbl}>Downloadable CV URL</label>
              <input type="text" value={formData.cvUrl} onChange={e => setFormData({ ...formData, cvUrl: e.target.value })} className={cls} />
            </div>
            <div className="space-y-1">
              <label className={lbl}>Profile Photo URL</label>
              <input type="text" value={formData.profileImage} onChange={e => setFormData({ ...formData, profileImage: e.target.value })} className={cls} />
            </div>
          </div>

          {/* Hero Image (legacy) */}
          <div className="space-y-3 p-4 rounded-2xl bg-warm-beige-100 border border-warm-beige-300">
            <div className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-soft-gold" />
              <label className={lbl}>Hero / About Page Photo URL</label>
            </div>
            <input type="text" placeholder="Paste photo URL (https://...) or relative path" value={formData.heroImage || ''} onChange={e => setFormData({ ...formData, heroImage: e.target.value })} className="w-full p-3 rounded-xl bg-white border border-warm-beige-300 font-sans text-xs" />
            {formData.heroImage && (
              <div className="flex items-start gap-4 pt-1">
                <img src={formData.heroImage} alt="Hero preview" className="w-24 h-28 object-cover rounded-xl border-2 border-warm-beige-300 shadow-sm" onError={e => { e.target.style.display = 'none'; }} />
                <div className="text-xs text-deep-navy/60 pt-1">
                  <p className="font-semibold text-deep-navy/80 mb-0.5">Preview</p>
                  <p>Ideal size: <strong>800×1000px</strong> (portrait).</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ─── Hero Showcase Carousel ─── */}
        <div className="editorial-card rounded-3xl p-8 bg-white space-y-6 border border-warm-beige-300">
          <div className="flex items-start justify-between border-b border-deep-navy/10 pb-3 gap-4">
            <div>
              <h2 className="text-base font-display font-bold text-soft-gold-600 uppercase tracking-widest flex items-center gap-2">
                <Film className="w-4 h-4" /> Hero Showcase Carousel
              </h2>
              <p className="text-xs text-deep-navy/50 font-light mt-1">Manage project screenshots shown in the hero device mockups. Saved changes appear live on the home page without code changes.</p>
            </div>
          </div>

          {/* Carousel settings */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium p-4 rounded-2xl bg-warm-beige-100 border border-warm-beige-300">
            <div className="space-y-1.5">
              <label className={lbl}>Auto Rotate</label>
              <button type="button" onClick={() => setFormData(f => ({ ...f, heroCarouselAutoRotate: !f.heroCarouselAutoRotate }))}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all ${formData.heroCarouselAutoRotate ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-white border-warm-beige-300 text-deep-navy/50'}`}
              >
                {formData.heroCarouselAutoRotate ? <><ToggleRight className="w-4 h-4" /> ON</> : <><ToggleLeft className="w-4 h-4" /> OFF</>}
              </button>
            </div>
            <div className="space-y-1.5">
              <label className={lbl}>Interval (seconds)</label>
              <select value={formData.heroCarouselInterval ?? 25} onChange={e => setFormData(f => ({ ...f, heroCarouselInterval: parseInt(e.target.value) }))} className={cls}>
                {[10, 15, 20, 25, 30, 45, 60].map(v => <option key={v} value={v}>{v}s</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className={lbl}>Float Animations</label>
              <button type="button" onClick={() => setFormData(f => ({ ...f, heroCarouselAnimation: !(f.heroCarouselAnimation !== false) }))}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all ${formData.heroCarouselAnimation !== false ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-white border-warm-beige-300 text-deep-navy/50'}`}
              >
                {formData.heroCarouselAnimation !== false ? <><ToggleRight className="w-4 h-4" /> ON</> : <><ToggleLeft className="w-4 h-4" /> OFF</>}
              </button>
            </div>
          </div>

          {/* Showcase items */}
          <div className="space-y-4">
            {showcaseItems.length === 0 && (
              <div className="text-center py-8 text-deep-navy/40 text-xs">No showcase items yet. Click "Add Showcase Project" below.</div>
            )}
            {showcaseItems.map((item, index) => (
              <div key={item.id} className={`rounded-2xl border p-5 space-y-4 transition-all ${item.active ? 'border-warm-beige-300 bg-warm-beige-50' : 'border-dashed border-warm-beige-300 bg-white opacity-60'}`}>
                {/* Header */}
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-deep-navy text-warm-beige text-[10px] font-bold flex items-center justify-center flex-shrink-0">{index + 1}</span>
                    <span className="text-xs font-bold text-deep-navy truncate max-w-[160px]">{item.title || 'Untitled Project'}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${item.active ? 'bg-emerald-100 text-emerald-700' : 'bg-warm-beige-200 text-deep-navy/40'}`}>
                      {item.active ? 'ACTIVE' : 'HIDDEN'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button type="button" onClick={() => moveShowcaseItem(index, -1)} disabled={index === 0} className="p-1.5 rounded-lg hover:bg-warm-beige-200 disabled:opacity-30 transition" title="Move up">
                      <ChevronUp className="w-3.5 h-3.5 text-deep-navy" />
                    </button>
                    <button type="button" onClick={() => moveShowcaseItem(index, 1)} disabled={index === showcaseItems.length - 1} className="p-1.5 rounded-lg hover:bg-warm-beige-200 disabled:opacity-30 transition" title="Move down">
                      <ChevronDown className="w-3.5 h-3.5 text-deep-navy" />
                    </button>
                    <button type="button" onClick={() => updateShowcaseItem(item.id, 'active', !item.active)} className={`p-1.5 rounded-lg transition ${item.active ? 'text-emerald-600 hover:bg-emerald-50' : 'text-deep-navy/40 hover:bg-warm-beige-200'}`} title={item.active ? 'Hide' : 'Show'}>
                      {item.active ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                    </button>
                    <button type="button" onClick={() => deleteShowcaseItem(item.id)} className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-50 transition" title="Delete">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-medium">
                  <div className="space-y-1">
                    <label className={lbl}>Project Title *</label>
                    <input type="text" value={item.title} onChange={e => updateShowcaseItem(item.id, 'title', e.target.value)} className={cls} placeholder="e.g. RecipeIn App" />
                  </div>
                  <div className="space-y-1">
                    <label className={lbl}>Category</label>
                    <input type="text" value={item.category || ''} onChange={e => updateShowcaseItem(item.id, 'category', e.target.value)} className={cls} placeholder="e.g. UI/UX Design" />
                  </div>
                </div>
                <div className="space-y-1 text-xs font-medium">
                  <label className={lbl}>Project URL (optional)</label>
                  <input type="text" value={item.projectUrl || ''} onChange={e => updateShowcaseItem(item.id, 'projectUrl', e.target.value)} className={cls} placeholder="https://..." />
                </div>

                {/* Mobile image */}
                <div className="space-y-2 p-3 rounded-xl bg-white border border-warm-beige-300">
                  <div className="flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-soft-gold-500" />
                    <label className="text-[10px] font-bold uppercase tracking-wider text-deep-navy/80">Mobile Screenshot URL</label>
                  </div>
                  <input type="text" value={item.mobileImage || ''} onChange={e => updateShowcaseItem(item.id, 'mobileImage', e.target.value)} className={cls} placeholder="https://... (portrait ~400×800px)" />
                  {item.mobileImage && (
                    <div className="flex items-start gap-3 pt-1">
                      <img src={item.mobileImage} alt="Mobile preview" className="w-14 h-20 object-cover rounded-xl border-2 border-warm-beige-300 shadow-sm flex-shrink-0" onError={e => { e.target.style.display = 'none'; }} />
                      <p className="text-[10px] text-deep-navy/50 pt-1">Preview · Portrait format · ~400×800px ideal</p>
                    </div>
                  )}
                </div>

                {/* Desktop image */}
                <div className="space-y-2 p-3 rounded-xl bg-white border border-warm-beige-300">
                  <div className="flex items-center gap-1.5">
                    <Monitor className="w-3.5 h-3.5 text-soft-gold-500" />
                    <label className="text-[10px] font-bold uppercase tracking-wider text-deep-navy/80">Desktop Screenshot URL</label>
                  </div>
                  <input type="text" value={item.desktopImage || ''} onChange={e => updateShowcaseItem(item.id, 'desktopImage', e.target.value)} className={cls} placeholder="https://... (landscape ~1200×700px)" />
                  {item.desktopImage && (
                    <div className="flex items-start gap-3 pt-1">
                      <img src={item.desktopImage} alt="Desktop preview" className="w-28 h-16 object-cover rounded-xl border-2 border-warm-beige-300 shadow-sm flex-shrink-0" onError={e => { e.target.style.display = 'none'; }} />
                      <p className="text-[10px] text-deep-navy/50 pt-1">Preview · Landscape format · ~1200×700px ideal</p>
                    </div>
                  )}
                </div>
              </div>
            ))}

            <button type="button" onClick={addShowcaseItem} className="w-full py-3.5 rounded-2xl border-2 border-dashed border-warm-beige-400 text-deep-navy/50 hover:border-soft-gold/50 hover:text-soft-gold-600 hover:bg-soft-gold/5 transition-all text-xs font-bold flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" /> Add Showcase Project
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-deep-navy/10 flex items-center justify-between">
          <button type="button" onClick={handleReset} className="px-4 py-2.5 rounded-full border border-rose-200 text-rose-700 text-xs font-semibold hover:bg-rose-50 flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5" /> Restore Default Seed Content
          </button>
          <button type="submit" className="px-7 py-3 rounded-full bg-deep-navy text-warm-beige text-xs font-semibold uppercase tracking-wider hover:bg-deep-navy-800 flex items-center gap-2 shadow-md">
            <Save className="w-4 h-4 text-soft-gold" /> Save All Settings
          </button>
        </div>

      </form>
    </div>
  );
};

export default AdminSettings;


