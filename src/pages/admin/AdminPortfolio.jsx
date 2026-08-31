import React, { useState } from 'react';
import { 
  Plus, Edit2, Trash2, X, Check, Layout, Sparkles, 
  Layers, Palette, ChevronRight, Image as ImageIcon,
  Info, FileText, MonitorPlay, Save, Grid
} from 'lucide-react';
import { useData } from '../../context/DataContext';

// ─── Helper: Input field component ───
const Field = ({ label, hint, children }) => (
  <div className="space-y-1.5 mb-5">
    <label className="font-bold text-xs uppercase tracking-widest text-deep-navy/80">{label}</label>
    {hint && <p className="text-[11px] text-deep-navy/50 font-light leading-snug mb-2">{hint}</p>}
    {children}
  </div>
);

const TextInput = ({ value, onChange, placeholder, className = '' }) => (
  <input type="text" value={value} onChange={onChange} placeholder={placeholder}
    className={`w-full p-3.5 rounded-xl bg-warm-beige-50 border border-warm-beige-300 focus:outline-none focus:border-soft-gold focus:ring-4 focus:ring-soft-gold/10 text-sm transition-all ${className}`} />
);

const Textarea = ({ value, onChange, placeholder, rows = 3 }) => (
  <textarea rows={rows} value={value} onChange={onChange} placeholder={placeholder}
    className="w-full p-3.5 rounded-xl bg-warm-beige-50 border border-warm-beige-300 focus:outline-none focus:border-soft-gold focus:ring-4 focus:ring-soft-gold/10 text-sm leading-relaxed transition-all" />
);

const ImageField = ({ label, hint, value, onChange }) => (
  <div className="mb-6 bg-white p-5 rounded-2xl border border-warm-beige-200 shadow-sm hover:shadow-md transition-shadow">
    <Field label={`🖼️ ${label}`} hint={hint || 'Paste URL gambar (Unsplash, Cloudinary, dll.)'}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 w-full relative">
          <ImageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-soft-gold-600" />
          <input type="text" value={value || ''} onChange={onChange} placeholder="https://..."
            className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-warm-beige-50 border border-warm-beige-300 focus:outline-none focus:border-soft-gold focus:ring-4 focus:ring-soft-gold/10 text-sm transition-all" />
        </div>
        {value && (
          <div className="w-full sm:w-32 h-20 rounded-lg overflow-hidden border border-warm-beige-300 flex-shrink-0 bg-warm-beige-100">
            <img src={value} alt="preview" className="w-full h-full object-cover" onError={(e) => e.target.style.display='none'} />
          </div>
        )}
      </div>
    </Field>
  </div>
);

const MultiImageField = ({ label, hint, value, onChange }) => (
  <div className="mb-6 bg-white p-5 rounded-2xl border border-warm-beige-200 shadow-sm hover:shadow-md transition-shadow">
    <Field label={`📸 ${label} (Multi-URL)`} hint={hint || 'Satu URL per baris'}>
      <textarea
        rows={4}
        value={value || ''}
        onChange={onChange}
        placeholder={'https://...\nhttps://...'}
        className="w-full p-3.5 rounded-xl bg-warm-beige-50 border border-warm-beige-300 focus:outline-none focus:border-soft-gold focus:ring-4 focus:ring-soft-gold/10 text-xs font-mono transition-all leading-relaxed"
      />
    </Field>
  </div>
);

const Row2 = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">{children}</div>
);

// ─── DEFAULT FORM DATA ───
const DEFAULT_FORM_DATA = {
  templateType: 'ui-ux',
  title: '',
  category: 'UI/UX',
  subcategory: '',
  date: '2025-12',
  role: 'Lead UI/UX Designer',
  timeline: '3 Months',
  platform: 'Web & Mobile',
  team: 'Solo Project',
  client: '',
  toolsString: 'Figma, Illustrator',
  thumbnail: '',
  shortDescription: '',
  heroImage: '',        // Section 01 visual utama

  // ─── UI/UX Section text fields ───
  snapshotText: '',
  overview: '',
  problem: '',
  designGoals: '',
  userResearch: '',
  researchFindings: '',
  userPersona: '',
  defineProblem: '',
  infoArchitecture: '',
  userFlow: '',
  wireframes: '',
  designSystem: '',
  highFidelity: '',
  prototypeUrl: '',
  usabilityTesting: '',
  designIteration: '',
  finalSolution: '',
  productShowcase: '',
  outcome: '',
  keyLearnings: '',
  futureImprovements: '',
  reflection: '',

  // ─── UI/UX Section image fields ───
  overviewImage: '',
  problemImage: '',
  goalsImage: '',
  researchImage: '',
  findingsImage: '',
  personaImage: '',
  defineImage: '',
  sitemapImage: '',
  userFlowImage: '',
  wireframeLowImage: '',
  wireframeHighImage: '',
  designSystemImage: '',
  hifiHeroImage: '',
  hifiScreenImages: '',        // multi-line URLs
  hifiScreenCaptions: '',
  prototypeImage: '',
  testingImage: '',
  iterationBeforeImage: '',
  iterationAfterImage: '',
  finalSolutionImage: '',
  showcaseImages: '',           // multi-line URLs
  showcaseCaptions: '',
  outcomeImage: '',
  learningsImage: '',
  futureImage: '',
  reflectionImage: '',

  // ─── Graphic Design Section text fields ───
  creativeBrief: '',
  designDirection: '',
  visualExploration: '',
  designDevelopment: '',
  mockups: '',
  designAssets: '',
  deliverables: '',

  // ─── Graphic Design Section image fields ───
  overviewImageGD: '',
  briefImage: '',
  moodboardImage: '',
  explorationImages: '',        // multi-line
  explorationCaptions: '',
  devBeforeImage: '',
  devAfterImage: '',
  finalHeroImage: '',
  finalGalleryImages: '',       // multi-line
  finalGalleryCaptions: '',
  mockupImages: '',             // multi-line
  mockupCaptions: '',
  assetsImage: '',
  deliverablesImages: '',       // multi-line
  deliverablesCaptions: '',
  outcomeImageGD: '',
  reflectionImageGD: '',

  galleryString: '',
  externalUrl: '',
  isFeatured: false,
  status: 'published'
};

// ─────────────────────────────────────────────────────────────
// MAIN ADMIN PORTFOLIO COMPONENT
// ─────────────────────────────────────────────────────────────
const AdminPortfolio = () => {
  const { projects, addProject, updateProject, deleteProject } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [activeTab, setActiveTab] = useState('meta');

  const set = (key) => (e) => setFormData(f => ({ ...f, [key]: e.target.value }));
  const setVal = (key, val) => setFormData(f => ({ ...f, [key]: val }));

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({ ...DEFAULT_FORM_DATA, thumbnail: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80' });
    setActiveTab('meta');
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project) => {
    setEditingId(project.id);
    setFormData({
      ...DEFAULT_FORM_DATA,
      ...project,
      templateType: project.templateType || (project.category === 'Graphic Design' ? 'graphic-design' : 'ui-ux'),
      toolsString: project.tools ? project.tools.join(', ') : '',
      galleryString: project.gallery ? project.gallery.join('\n') : '',
    });
    setActiveTab('meta');
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tools = formData.toolsString?.split(',').map(t => t.trim()).filter(Boolean) ?? [];
    const gallery = formData.galleryString?.split('\n').map(g => g.trim()).filter(Boolean) ?? [];
    const projectData = { ...formData, tools, gallery };
    if (editingId) updateProject(editingId, projectData);
    else addProject(projectData);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Hapus case study ini? Tindakan ini tidak dapat dibatalkan.')) deleteProject(id);
  };

  const isDesign = formData.templateType === 'graphic-design';
  const isGallery = formData.templateType === 'gallery';
  const isUIUX = formData.templateType === 'ui-ux';

  // For Gallery mode, we hide text and images tabs
  const getTabs = () => {
    const allTabs = [
      { id: 'meta', label: 'Info Utama', icon: Info, desc: 'Judul, kategori, hero visual' },
      { id: 'text', label: 'Teks Section', icon: FileText, desc: 'Deskripsi tiap tahapan' },
      { id: 'images', label: 'Media Section', icon: ImageIcon, desc: 'URL gambar per bagian' },
      { id: 'media', label: 'Gallery & Publish', icon: MonitorPlay, desc: 'Status dan ekstensi' },
    ];
    if (isGallery) {
      return [
        { id: 'meta', label: 'Info Utama', icon: Info, desc: 'Judul, kategori, hero visual' },
        { id: 'media', label: 'Images & Publish', icon: MonitorPlay, desc: 'Gambar gallery & status' },
      ];
    }
    return allTabs;
  };

  const currentTabs = getTabs();

  // If a tab is selected but not available in current template (e.g. changing from UI to Gallery while on 'text' tab), reset to 'meta'
  if (!currentTabs.find(t => t.id === activeTab)) {
    setActiveTab('meta');
  }

  return (
    <div className="space-y-8 pb-20">

      {/* ─── Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-deep-navy/10 pb-8 bg-paper-cream rounded-t-3xl p-6">
        <div>
          <h1 className="text-4xl font-display font-bold text-deep-navy">Portfolio CMS</h1>
          <p className="text-sm text-deep-navy/60 mt-2 font-light">Kelola case study dengan template 🎨 Graphic Design, 🖥️ UI/UX, atau 🖼️ Simple Gallery.</p>
        </div>
        <button onClick={handleOpenCreate}
          className="px-6 py-3.5 rounded-2xl bg-deep-navy text-warm-beige text-sm font-bold uppercase tracking-widest hover:bg-deep-navy-800 transition-all shadow-xl hover:shadow-deep-navy/30 flex items-center gap-2 self-start transform hover:-translate-y-1">
          <Plus className="w-5 h-5 text-soft-gold" /> Tambah Case Study
        </button>
      </div>

      {/* ─── Table ─── */}
      <div className="bg-white rounded-[2rem] border border-warm-beige-300 shadow-xl overflow-hidden mx-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-warm-beige-50 border-b border-warm-beige-200 text-xs font-bold uppercase tracking-widest text-deep-navy/70">
                <th className="p-6">Project Info</th>
                <th className="p-6">Template</th>
                <th className="p-6">Details</th>
                <th className="p-6">Status</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-beige-100">
              {projects.map((p) => {
                const templ = p.templateType || (p.category === 'Graphic Design' ? 'graphic-design' : 'ui-ux');
                
                return (
                  <tr key={p.id} className="hover:bg-warm-beige-50/50 transition-colors group">
                    <td className="p-6 align-top">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm flex-shrink-0 bg-warm-beige-200">
                          <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-1">
                          <p className="font-bold text-deep-navy text-base leading-tight">{p.title}</p>
                          <p className="text-xs text-deep-navy/60 line-clamp-2 max-w-xs">{p.shortDescription || p.overview}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6 align-top">
                      {templ === 'gallery' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-black tracking-widest uppercase border bg-sky-50 text-sky-700 border-sky-200">
                           <Grid className="w-3.5 h-3.5" /> Gallery
                        </span>
                      ) : templ === 'graphic-design' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-black tracking-widest uppercase border bg-purple-50 text-purple-700 border-purple-200">
                           <Palette className="w-3.5 h-3.5" /> Design
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-black tracking-widest uppercase border bg-amber-50 text-amber-800 border-amber-200">
                           <Layers className="w-3.5 h-3.5" /> UI/UX
                        </span>
                      )}
                    </td>
                    <td className="p-6 align-top text-deep-navy/80 space-y-1">
                      <p className="font-bold text-sm">{p.role}</p>
                      <p className="text-xs text-deep-navy/60">{p.date}</p>
                      <p className="text-xs text-deep-navy/60">{p.category}</p>
                    </td>
                    <td className="p-6 align-top space-y-2">
                      <div>
                        <span className={`inline-flex px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${p.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'}`}>
                          {p.status || 'published'}
                        </span>
                      </div>
                      {p.isFeatured && (
                         <div>
                           <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-md bg-soft-gold/20 text-soft-gold-800 border border-soft-gold/30">
                             <Sparkles className="w-3 h-3" /> Featured
                           </span>
                         </div>
                      )}
                    </td>
                    <td className="p-6 align-top text-right">
                      <div className="flex justify-end gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleOpenEdit(p)} className="p-2.5 rounded-xl bg-warm-beige-100 hover:bg-warm-beige-300 text-deep-navy transition-all hover:scale-105 shadow-sm" title="Edit">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(p.id)} className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-all hover:scale-105 shadow-sm border border-rose-100" title="Hapus">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── Full-Screen Modal ─── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-deep-navy/80 backdrop-blur-md flex items-center justify-center p-0 sm:p-4 md:p-6 overflow-hidden">
          <div className="bg-paper-cream rounded-none sm:rounded-[2rem] w-full h-full max-w-7xl flex flex-col shadow-2xl overflow-hidden border border-warm-beige-400">

            {/* Modal Header */}
            <div className="flex-shrink-0 px-8 py-5 bg-white border-b border-warm-beige-300 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-deep-navy flex items-center justify-center">
                  <Layout className="w-6 h-6 text-soft-gold" />
                </div>
                <div>
                  <h2 className="text-2xl font-display font-bold text-deep-navy">
                    {editingId ? 'Edit Case Study' : 'Buat Case Study Baru'}
                  </h2>
                  <p className="text-xs text-deep-navy/60 mt-0.5">Isi detail project untuk portofolio.</p>
                </div>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-3 rounded-full bg-warm-beige-100 text-deep-navy hover:bg-rose-100 hover:text-rose-600 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              
              {/* Sidebar Navigation */}
              <div className="w-full md:w-72 bg-warm-beige-50 border-b md:border-b-0 md:border-r border-warm-beige-200 overflow-y-auto flex-shrink-0 p-4 space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-deep-navy/40 px-4 mb-4 mt-2">Navigasi Form</p>
                {currentTabs.map(t => {
                  const Icon = t.icon;
                  const isActive = activeTab === t.id;
                  return (
                    <button key={t.id} type="button" onClick={() => setActiveTab(t.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left group ${isActive ? 'bg-white shadow-sm border border-warm-beige-300' : 'hover:bg-warm-beige-100 border border-transparent'}`}>
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${isActive ? 'bg-deep-navy text-warm-beige' : 'bg-warm-beige-200 text-deep-navy group-hover:bg-white'}`}>
                         <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className={`text-sm font-bold ${isActive ? 'text-deep-navy' : 'text-deep-navy/70'}`}>{t.label}</p>
                        <p className="text-[10px] text-deep-navy/50">{t.desc}</p>
                      </div>
                    </button>
                  );
                })}

                <div className="pt-8 px-4">
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-deep-navy/40 mb-3">Template Terpilih</p>
                   <div className="p-4 rounded-2xl bg-white border border-warm-beige-300 space-y-3 shadow-sm">
                      <button type="button" onClick={() => setVal('templateType', 'gallery')}
                        className={`w-full p-3 rounded-xl border transition-all flex flex-col gap-1 items-start ${isGallery ? 'bg-sky-50 border-sky-300 ring-2 ring-sky-500/20' : 'border-warm-beige-200 hover:border-sky-200'}`}>
                        <div className="flex items-center gap-2">
                          <Grid className={`w-4 h-4 ${isGallery ? 'text-sky-600' : 'text-deep-navy/40'}`} />
                          <span className={`text-xs font-bold ${isGallery ? 'text-sky-900' : 'text-deep-navy/70'}`}>Simple Gallery</span>
                        </div>
                        <span className="text-[10px] text-deep-navy/50">Hanya Judul & Gambar</span>
                      </button>

                      <button type="button" onClick={() => setVal('templateType', 'graphic-design')}
                        className={`w-full p-3 rounded-xl border transition-all flex flex-col gap-1 items-start ${isDesign ? 'bg-purple-50 border-purple-300 ring-2 ring-purple-500/20' : 'border-warm-beige-200 hover:border-purple-200'}`}>
                        <div className="flex items-center gap-2">
                          <Palette className={`w-4 h-4 ${isDesign ? 'text-purple-600' : 'text-deep-navy/40'}`} />
                          <span className={`text-xs font-bold ${isDesign ? 'text-purple-900' : 'text-deep-navy/70'}`}>Graphic Design</span>
                        </div>
                        <span className="text-[10px] text-deep-navy/50">13 Sections</span>
                      </button>

                      <button type="button" onClick={() => setVal('templateType', 'ui-ux')}
                        className={`w-full p-3 rounded-xl border transition-all flex flex-col gap-1 items-start ${isUIUX ? 'bg-amber-50 border-amber-300 ring-2 ring-amber-500/20' : 'border-warm-beige-200 hover:border-amber-200'}`}>
                        <div className="flex items-center gap-2">
                          <Layers className={`w-4 h-4 ${isUIUX ? 'text-amber-600' : 'text-deep-navy/40'}`} />
                          <span className={`text-xs font-bold ${isUIUX ? 'text-amber-900' : 'text-deep-navy/70'}`}>UI/UX Product</span>
                        </div>
                        <span className="text-[10px] text-deep-navy/50">24 Sections</span>
                      </button>
                   </div>
                </div>
              </div>

              {/* Form Content Area */}
              <div className="flex-1 overflow-y-auto bg-white p-6 md:p-10">
                <form id="portfolio-form" onSubmit={handleSubmit} className="max-w-4xl mx-auto">

                  {/* ═══════════ TAB 1: META & HERO ═══════════ */}
                  {activeTab === 'meta' && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <h3 className="text-xl font-display font-bold text-deep-navy mb-8 pb-4 border-b border-warm-beige-200">Informasi Dasar & Hero Section</h3>
                      <Row2>
                        <Field label="Nama Project *">
                          <TextInput value={formData.title} onChange={set('title')} placeholder="e.g. Redesign Mobile App Bank..." />
                        </Field>
                        <Field label="Kategori Utama *">
                          <select value={formData.category} onChange={set('category')}
                            className="w-full p-3.5 rounded-xl bg-warm-beige-50 border border-warm-beige-300 text-sm font-bold focus:outline-none focus:border-soft-gold focus:ring-4 focus:ring-soft-gold/10 transition-all">
                            <option value="UI/UX">UI/UX</option>
                            <option value="Graphic Design">Graphic Design</option>
                            <option value="Web Design">Web Design</option>
                            <option value="Mobile App">Mobile App</option>
                            <option value="Branding">Branding</option>
                            <option value="Other">Other</option>
                          </select>
                        </Field>
                      </Row2>
                      <Row2>
                        <Field label="Subkategori / Tag">
                          <TextInput value={formData.subcategory} onChange={set('subcategory')} placeholder="e.g. Fintech App" />
                        </Field>
                        <Field label="Tanggal Project (Bulan & Tahun) *">
                          <input 
                            type="month"
                            value={formData.date} 
                            onChange={set('date')} 
                            className="w-full p-3.5 rounded-xl bg-warm-beige-50 border border-warm-beige-300 text-sm font-bold focus:outline-none focus:border-soft-gold focus:ring-4 focus:ring-soft-gold/10 transition-all"
                          />
                        </Field>
                      </Row2>
                      <Row2>
                        <Field label="Role Kamu *">
                          <TextInput value={formData.role} onChange={set('role')} placeholder="e.g. Product Designer" />
                        </Field>
                        <Field label="Timeline">
                          <TextInput value={formData.timeline} onChange={set('timeline')} placeholder="e.g. 3 Bulan (Agu – Nov 2024)" />
                        </Field>
                      </Row2>
                      <Row2>
                        <Field label="Platform">
                          <TextInput value={formData.platform} onChange={set('platform')} placeholder="e.g. iOS & Android" />
                        </Field>
                      </Row2>
                      
                      {!isGallery && (
                        <Row2>
                          <Field label="Client / Organisasi">
                            <TextInput value={formData.client} onChange={set('client')} placeholder="e.g. Internal Team" />
                          </Field>
                          <Field label="Team">
                            <TextInput value={formData.team} onChange={set('team')} placeholder="e.g. 2 Designers, 3 Devs" />
                          </Field>
                        </Row2>
                      )}
                      
                      <Field label="Tools Digunakan (pisahkan koma)">
                        <TextInput value={formData.toolsString} onChange={set('toolsString')} placeholder="Figma, Miro, FigJam" />
                      </Field>
                      
                      {isGallery ? (
                        <Field label="Deskripsi / Keterangan Project">
                          <Textarea rows={5} value={formData.overview} onChange={set('overview')} placeholder="Keterangan gambar atau project secara umum..." />
                        </Field>
                      ) : (
                        <Field label="Deskripsi Singkat (Hero & Card)">
                          <Textarea rows={3} value={formData.shortDescription} onChange={set('shortDescription')} placeholder="Ringkasan singkat project untuk kartu portofolio dan teks hero..." />
                        </Field>
                      )}

                      <ImageField label="Thumbnail URL *"
                        hint="Gambar kecil untuk card di halaman utama (rasio 4:3 atau 16:9)"
                        value={formData.thumbnail} onChange={set('thumbnail')} />
                      
                      {!isGallery && (
                        <ImageField label="Hero Visual Utama (Section 01)"
                          hint="Gambar besar beresolusi tinggi untuk header case study"
                          value={formData.heroImage} onChange={set('heroImage')} />
                      )}
                    </div>
                  )}

                  {/* ═══════════ TAB 2: TEKS SECTIONS (Hidden in Gallery Mode) ═══════════ */}
                  {activeTab === 'text' && !isGallery && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="flex items-center justify-between mb-8 pb-4 border-b border-warm-beige-200">
                        <h3 className="text-xl font-display font-bold text-deep-navy">Konten Teks Section</h3>
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${isDesign ? 'bg-purple-100 text-purple-800' : 'bg-amber-100 text-amber-800'}`}>
                          {isDesign ? 'Graphic Design Mode' : 'UI/UX Mode'}
                        </span>
                      </div>

                      {isDesign ? (
                        /* GRAPHIC DESIGN TEXT FIELDS */
                        <div className="space-y-6">
                          <Field label="02. Project Overview"><Textarea rows={4} value={formData.overview} onChange={set('overview')} placeholder="Latar belakang, tujuan, client..." /></Field>
                          <Field label="03. Creative Brief"><Textarea rows={4} value={formData.creativeBrief} onChange={set('creativeBrief')} placeholder="Background, objective, target audience..." /></Field>
                          <Field label="04. Design Direction"><Textarea rows={3} value={formData.designDirection} onChange={set('designDirection')} placeholder="Konsep, mood, style..." /></Field>
                          <Field label="05. Visual Exploration"><Textarea rows={3} value={formData.visualExploration} onChange={set('visualExploration')} placeholder="Eksplorasi warna, typography..." /></Field>
                          <Field label="06. Design Development"><Textarea rows={3} value={formData.designDevelopment} onChange={set('designDevelopment')} placeholder="Proses pengembangan layout..." /></Field>
                          <Field label="07. Final Design"><Textarea rows={3} value={formData.finalDesign} onChange={set('finalDesign')} placeholder="Penjelasan hasil akhir..." /></Field>
                          <Field label="08. Mockups & Context"><Textarea rows={3} value={formData.mockups} onChange={set('mockups')} placeholder="Penerapan di media nyata..." /></Field>
                          <Field label="09. Design Assets / System"><Textarea rows={3} value={formData.designAssets} onChange={set('designAssets')} placeholder="Color palette, fonts..." /></Field>
                          <Field label="10. Deliverables"><Textarea rows={3} value={formData.deliverables} onChange={set('deliverables')} placeholder="Daftar output..." /></Field>
                          <Field label="11. Outcome & Impact"><Textarea rows={3} value={formData.outcome} onChange={set('outcome')} placeholder="Hasil dan dampak..." /></Field>
                          <Field label="12. Reflection"><Textarea rows={3} value={formData.reflection} onChange={set('reflection')} placeholder="Pembelajaran & tantangan..." /></Field>
                        </div>
                      ) : (
                        /* UI/UX TEXT FIELDS */
                        <div className="space-y-6">
                          <Field label="02. Project Snapshot"><Textarea rows={2} value={formData.snapshotText} onChange={set('snapshotText')} placeholder="Ringkasan singkat role, timeline, scope..." /></Field>
                          <Field label="03. Project Overview"><Textarea rows={4} value={formData.overview} onChange={set('overview')} placeholder="Latar belakang project, tujuan bisnis..." /></Field>
                          <Row2>
                            <Field label="04. The Problem"><Textarea rows={4} value={formData.problem} onChange={set('problem')} placeholder="Kondisi awal, masalah utama..." /></Field>
                            <Field label="05. Design Goals"><Textarea rows={4} value={formData.designGoals} onChange={set('designGoals')} placeholder="Tujuan desain, metrik..." /></Field>
                          </Row2>
                          <Row2>
                            <Field label="06. User Research"><Textarea rows={4} value={formData.userResearch} onChange={set('userResearch')} placeholder="Metode riset, kualitatif/kuantitatif..." /></Field>
                            <Field label="07. Research Findings"><Textarea rows={4} value={formData.researchFindings} onChange={set('researchFindings')} placeholder="Insight, pain points..." /></Field>
                          </Row2>
                          <Row2>
                            <Field label="08. User Persona"><Textarea rows={3} value={formData.userPersona} onChange={set('userPersona')} placeholder="Profil pengguna target..." /></Field>
                            <Field label="09. Define (HMW)"><Textarea rows={3} value={formData.defineProblem} onChange={set('defineProblem')} placeholder="How Might We..." /></Field>
                          </Row2>
                          <Row2>
                            <Field label="10. Info Architecture"><Textarea rows={3} value={formData.infoArchitecture} onChange={set('infoArchitecture')} placeholder="Struktur navigasi..." /></Field>
                            <Field label="11. User Flow"><Textarea rows={3} value={formData.userFlow} onChange={set('userFlow')} placeholder="Step-by-step alur pengguna..." /></Field>
                          </Row2>
                          <Row2>
                            <Field label="12. Wireframing"><Textarea rows={3} value={formData.wireframes} onChange={set('wireframes')} placeholder="Eksplorasi layout..." /></Field>
                            <Field label="13. Design System"><Textarea rows={3} value={formData.designSystem} onChange={set('designSystem')} placeholder="Komponen, typography, warna..." /></Field>
                          </Row2>
                          <Field label="14. High-Fidelity Design"><Textarea rows={3} value={formData.highFidelity} onChange={set('highFidelity')} placeholder="Interface final..." /></Field>
                          <Field label="15. Prototype URL (Figma dll)"><TextInput value={formData.prototypeUrl} onChange={set('prototypeUrl')} placeholder="https://figma.com/proto/..." /></Field>
                          <Row2>
                            <Field label="16. Usability Testing"><Textarea rows={3} value={formData.usabilityTesting} onChange={set('usabilityTesting')} placeholder="Proses testing dan task..." /></Field>
                            <Field label="17. Design Iteration"><Textarea rows={3} value={formData.designIteration} onChange={set('designIteration')} placeholder="Perbaikan berdasarkan feedback..." /></Field>
                          </Row2>
                          <Field label="18. Final Solution"><Textarea rows={3} value={formData.finalSolution} onChange={set('finalSolution')} placeholder="Solusi akhir penyelesaian masalah..." /></Field>
                          <Row2>
                            <Field label="20. Outcome / Impact"><Textarea rows={3} value={formData.outcome} onChange={set('outcome')} placeholder="Hasil terhadap pengguna & bisnis..." /></Field>
                            <Field label="21. Key Learnings"><Textarea rows={3} value={formData.keyLearnings} onChange={set('keyLearnings')} placeholder="Pelajaran penting yang didapat..." /></Field>
                          </Row2>
                          <Row2>
                            <Field label="22. Future Improvements"><Textarea rows={3} value={formData.futureImprovements} onChange={set('futureImprovements')} placeholder="Fitur selanjutnya..." /></Field>
                            <Field label="23. Reflection"><Textarea rows={3} value={formData.reflection} onChange={set('reflection')} placeholder="Kesimpulan pribadi..." /></Field>
                          </Row2>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ═══════════ TAB 3: GAMBAR PER SECTION (Hidden in Gallery Mode) ═══════════ */}
                  {activeTab === 'images' && !isGallery && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="flex items-center justify-between mb-8 pb-4 border-b border-warm-beige-200">
                        <h3 className="text-xl font-display font-bold text-deep-navy">Media / Gambar Section</h3>
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${isDesign ? 'bg-purple-100 text-purple-800' : 'bg-amber-100 text-amber-800'}`}>
                          {isDesign ? 'Graphic Design Mode' : 'UI/UX Mode'}
                        </span>
                      </div>

                      {isDesign ? (
                        /* GRAPHIC DESIGN IMAGE FIELDS */
                        <>
                          <ImageField label="02. Project Overview" value={formData.overviewImageGD} onChange={set('overviewImageGD')} />
                          <ImageField label="03. Creative Brief" value={formData.briefImage} onChange={set('briefImage')} />
                          <ImageField label="04. Moodboard" value={formData.moodboardImage} onChange={set('moodboardImage')} />
                          <MultiImageField label="05. Visual Exploration (Sketsa/Draft)" value={formData.explorationImages} onChange={set('explorationImages')} />
                          <Field label="📝 Captions untuk Exploration"><Textarea rows={2} value={formData.explorationCaptions} onChange={set('explorationCaptions')} placeholder="Satu baris per gambar..." /></Field>
                          <Row2>
                            <ImageField label="06. Design Dev (Before)" value={formData.devBeforeImage} onChange={set('devBeforeImage')} />
                            <ImageField label="06. Design Dev (After)" value={formData.devAfterImage} onChange={set('devAfterImage')} />
                          </Row2>
                          <ImageField label="07. Final Design (Hero Image)" value={formData.finalHeroImage} onChange={set('finalHeroImage')} />
                          <MultiImageField label="07. Final Gallery Breakdown" value={formData.finalGalleryImages} onChange={set('finalGalleryImages')} />
                          <Field label="📝 Captions Final Gallery"><Textarea rows={2} value={formData.finalGalleryCaptions} onChange={set('finalGalleryCaptions')} /></Field>
                          <MultiImageField label="08. Mockups" value={formData.mockupImages} onChange={set('mockupImages')} />
                          <Field label="📝 Captions Mockups"><Textarea rows={2} value={formData.mockupCaptions} onChange={set('mockupCaptions')} /></Field>
                          <ImageField label="09. Design Assets" value={formData.assetsImage} onChange={set('assetsImage')} />
                          <MultiImageField label="10. Deliverables" value={formData.deliverablesImages} onChange={set('deliverablesImages')} />
                          <Field label="📝 Captions Deliverables"><Textarea rows={2} value={formData.deliverablesCaptions} onChange={set('deliverablesCaptions')} /></Field>
                          <ImageField label="11. Outcome" value={formData.outcomeImageGD} onChange={set('outcomeImageGD')} />
                          <ImageField label="12. Reflection" value={formData.reflectionImageGD} onChange={set('reflectionImageGD')} />
                        </>
                      ) : (
                        /* UI/UX IMAGE FIELDS */
                        <>
                          <ImageField label="03. Overview Visual" value={formData.overviewImage} onChange={set('overviewImage')} />
                          <ImageField label="04. The Problem Visual" value={formData.problemImage} onChange={set('problemImage')} />
                          <ImageField label="05. Design Goals Cards" value={formData.goalsImage} onChange={set('goalsImage')} />
                          <ImageField label="06. Research Photos" value={formData.researchImage} onChange={set('researchImage')} />
                          <ImageField label="07. Research Findings (Affinity)" value={formData.findingsImage} onChange={set('findingsImage')} />
                          <ImageField label="08. User Persona" value={formData.personaImage} onChange={set('personaImage')} />
                          <ImageField label="09. Define (HMW)" value={formData.defineImage} onChange={set('defineImage')} />
                          <ImageField label="10. Sitemap / IA" value={formData.sitemapImage} onChange={set('sitemapImage')} />
                          <ImageField label="11. User Flow Diagram" value={formData.userFlowImage} onChange={set('userFlowImage')} />
                          <Row2>
                            <ImageField label="12. Lo-Fi Wireframe" value={formData.wireframeLowImage} onChange={set('wireframeLowImage')} />
                            <ImageField label="12. Hi-Fi Wireframe" value={formData.wireframeHighImage} onChange={set('wireframeHighImage')} />
                          </Row2>
                          <ImageField label="13. Design System" value={formData.designSystemImage} onChange={set('designSystemImage')} />
                          <ImageField label="14. Hi-Fi Hero Screen" value={formData.hifiHeroImage} onChange={set('hifiHeroImage')} />
                          <MultiImageField label="14. Hi-Fi Screens Gallery" value={formData.hifiScreenImages} onChange={set('hifiScreenImages')} />
                          <Field label="📝 Captions Hi-Fi Gallery"><Textarea rows={2} value={formData.hifiScreenCaptions} onChange={set('hifiScreenCaptions')} /></Field>
                          <ImageField label="15. Prototype Interaction" value={formData.prototypeImage} onChange={set('prototypeImage')} />
                          <ImageField label="16. Usability Testing Photos" value={formData.testingImage} onChange={set('testingImage')} />
                          <Row2>
                            <ImageField label="17. Iteration BEFORE" value={formData.iterationBeforeImage} onChange={set('iterationBeforeImage')} />
                            <ImageField label="17. Iteration AFTER" value={formData.iterationAfterImage} onChange={set('iterationAfterImage')} />
                          </Row2>
                          <ImageField label="18. Final Solution Hero" value={formData.finalSolutionImage} onChange={set('finalSolutionImage')} />
                          <MultiImageField label="19. Product Showcase Screens" value={formData.showcaseImages} onChange={set('showcaseImages')} />
                          <Field label="📝 Captions Showcase"><Textarea rows={2} value={formData.showcaseCaptions} onChange={set('showcaseCaptions')} /></Field>
                          <ImageField label="20. Outcome Metrics / Chart" value={formData.outcomeImage} onChange={set('outcomeImage')} />
                          <ImageField label="21. Key Learnings Cards" value={formData.learningsImage} onChange={set('learningsImage')} />
                          <ImageField label="22. Future Concepts" value={formData.futureImage} onChange={set('futureImage')} />
                          <ImageField label="23. Reflection Photo" value={formData.reflectionImage} onChange={set('reflectionImage')} />
                        </>
                      )}
                    </div>
                  )}

                  {/* ═══════════ TAB 4: GALERI & PUBLISH ═══════════ */}
                  {activeTab === 'media' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <h3 className="text-xl font-display font-bold text-deep-navy mb-8 pb-4 border-b border-warm-beige-200">
                        {isGallery ? 'Gambar Gallery & Setting Publish' : 'Gallery Tambahan & Setting Publish'}
                      </h3>
                      
                      <div className="bg-white p-6 rounded-3xl border border-warm-beige-200 shadow-sm hover:shadow-md transition-shadow">
                        <Field label="URL Gambar (1 per baris)" hint={isGallery ? "Masukkan semua link gambar untuk ditampilkan." : "Gambar-gambar ini akan digunakan jika section images tidak diisi. 1 baris 1 URL."}>
                          <textarea rows={10} value={formData.galleryString} onChange={set('galleryString')}
                            placeholder={'https://...\nhttps://...'}
                            className="w-full p-4 rounded-2xl bg-warm-beige-50 border border-warm-beige-300 text-xs font-mono focus:outline-none focus:border-soft-gold focus:ring-4 focus:ring-soft-gold/10 transition-all leading-relaxed" />
                        </Field>
                      </div>

                      <div className="bg-white p-6 rounded-3xl border border-warm-beige-200 shadow-sm space-y-6 hover:shadow-md transition-shadow">
                        <Field label="External / Live Link (Opsional)">
                          <TextInput value={formData.externalUrl} onChange={set('externalUrl')} placeholder="https://behance.net/..." />
                        </Field>
                        
                        <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-4 border-t border-warm-beige-200">
                          <label className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative flex items-center justify-center w-6 h-6 rounded bg-warm-beige-100 border border-warm-beige-300 group-hover:border-soft-gold transition-colors">
                              <input type="checkbox" checked={formData.isFeatured}
                                onChange={(e) => setVal('isFeatured', e.target.checked)}
                                className="absolute opacity-0 w-full h-full cursor-pointer" />
                              {formData.isFeatured && <Check className="w-4 h-4 text-soft-gold-600" />}
                            </div>
                            <span className="font-bold text-sm text-deep-navy/90 select-none group-hover:text-deep-navy transition-colors">Featured di Beranda</span>
                          </label>
                          
                          <div className="flex items-center gap-4 sm:ml-auto">
                            <span className="text-sm font-bold text-deep-navy/60">Status Publikasi:</span>
                            <select value={formData.status} onChange={set('status')}
                              className="px-4 py-2.5 rounded-xl bg-warm-beige-50 border border-warm-beige-300 text-sm font-bold focus:outline-none focus:border-soft-gold text-deep-navy">
                              <option value="published">🟢 Published</option>
                              <option value="draft">🟡 Draft</option>
                            </select>
                          </div>
                        </div>
                      </div>

                    </div>
                  )}

                </form>
              </div>
            </div>

            {/* Modal Footer with Actions */}
            <div className="flex-shrink-0 px-8 py-5 bg-white border-t border-warm-beige-300 flex items-center justify-between">
              <div className="flex gap-2">
                 {/* Prev Next Buttons if needed, omitted for simplicity with sidebar */}
              </div>
              <div className="flex items-center gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 rounded-full border border-warm-beige-300 text-deep-navy text-sm font-bold hover:bg-warm-beige-100 transition-colors">
                  Batal
                </button>
                <button type="submit" form="portfolio-form"
                  className="px-8 py-3 rounded-full bg-deep-navy text-warm-beige text-sm font-bold uppercase tracking-widest hover:bg-deep-navy-800 shadow-xl flex items-center gap-2 transform hover:-translate-y-0.5 transition-all">
                  <Save className="w-5 h-5 text-soft-gold" />
                  {editingId ? 'Simpan Perubahan' : 'Publish Case Study'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminPortfolio;
