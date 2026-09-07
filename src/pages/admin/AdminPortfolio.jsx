import React, { useState } from 'react';
import { 
  Plus, Edit2, Trash2, X, Check, Layout, Sparkles, 
  Layers, ChevronRight, Image as ImageIcon,
  Info, FileText, MonitorPlay, Save, Grid, PlusCircle, ArrowUp, ArrowDown, Palette
} from 'lucide-react';
import { useData } from '../../context/DataContext';

// ─── Helper Components ───
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
  templateType: 'dynamic',
  title: '',
  tagsString: '',
  date: '2025-12',
  role: 'Designer',
  timeline: '',
  platform: '',
  team: '',
  client: '',
  toolsString: '',
  thumbnail: '',
  shortDescription: '',
  heroImage: '',
  sections: [],
  galleryString: '', // fallback for gallery template
  externalUrl: '',
  isFeatured: true,
  status: 'published'
};

const DEFAULT_SECTION = {
  id: '',
  title: 'New Section',
  useHighlight: false,
  highlightColor: 'white',
  content: '',
  imagesString: '',
  captionsString: ''
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
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Section Builder State
  const [editingSectionIndex, setEditingSectionIndex] = useState(null);

  const set = (key) => (e) => setFormData(f => ({ ...f, [key]: e.target.value }));
  const setVal = (key, val) => setFormData(f => ({ ...f, [key]: val }));

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({ 
      ...DEFAULT_FORM_DATA, 
      thumbnail: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
      sections: [
        { ...DEFAULT_SECTION, id: 'sec-1', title: 'Project Overview' }
      ]
    });
    setActiveTab('meta');
    setEditingSectionIndex(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (project) => {
    setEditingId(project.id);
    
    let processedSections = [];
    if (project.sections && Array.isArray(project.sections) && project.sections.length > 0) {
      // Convert arrays back to strings for editing
      processedSections = project.sections.map(sec => ({
        ...sec,
        imagesString: (sec.images || []).join('\n'),
        captionsString: (sec.captions || []).join('\n')
      }));
    } else {
      // Auto-migrate legacy fields to sections for the builder
      let idx = 1;
      const addSec = (title, content, images) => {
        const validImages = (images || []).filter(Boolean);
        if (!content && validImages.length === 0) return;
        
        processedSections.push({
          ...DEFAULT_SECTION,
          id: `sec-${Date.now()}-${idx++}`,
          title,
          content: content || '',
          imagesString: validImages.join('\n')
        });
      };

      if (project.templateType === 'graphic-design' || (!project.templateType && project.category === 'Graphic Design')) {
        addSec('Overview', project.overview, [project.overviewImageGD]);
        addSec('Problem & Goals', project.problem, [project.problemImageGD]);
        addSec('Design Process', project.process, [project.processImageGD]);
        addSec('Final Design', project.solution, [project.solutionImageGD, ...(Array.isArray(project.gallery) ? project.gallery : [])]);
      } else if (project.templateType === 'ui-ux' || (!project.templateType && project.category === 'UI/UX Design')) {
        addSec('Overview', project.overview, [project.overviewImage]);
        addSec('Problem Statement', project.problemStatement, []);
        addSec('Users & Audience', project.usersAndAudience, []);
        addSec('Roles & Responsibilities', project.roles, []);
        addSec('Scope & Constraints', project.scope, []);
        addSec('Process', project.process, [project.processImage]);
        addSec('Architecture & Flow', project.infoArchitecture || project.userFlow, [project.sitemapImage, project.userFlowImage]);
        addSec('Wireframes', project.wireframes, [project.wireframeLowImage, project.wireframeHighImage]);
        addSec('Visual Design', project.visualDesign, [project.styleGuideImage, project.hifiHeroImage]);
        addSec('Final Solution', project.finalSolution, [project.finalSolutionImage, ...(Array.isArray(project.showcaseImages) ? project.showcaseImages : [])]);
      }
    }

    setFormData({
      ...DEFAULT_FORM_DATA,
      ...project,
      templateType: (project.templateType === 'graphic-design' || project.templateType === 'ui-ux') ? 'dynamic' : (project.templateType || 'dynamic'),
      tagsString: Array.isArray(project.tags) ? project.tags.join(', ') : (project.tags || ''),
      toolsString: Array.isArray(project.tools) ? project.tools.join(', ') : (project.tools || ''),
      galleryString: Array.isArray(project.gallery) ? project.gallery.join('\n') : (project.gallery || ''),
      sections: processedSections
    });
    setActiveTab('meta');
    setEditingSectionIndex(null);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const tools = formData.toolsString?.split(',').map(t => t.trim()).filter(Boolean) ?? [];
    const tags = formData.tagsString?.split(',').map(t => t.trim()).filter(Boolean) ?? [];
    const gallery = formData.galleryString?.split('\n').map(g => g.trim()).filter(Boolean) ?? [];
    
    // Convert section strings back to arrays
    const sections = (formData.sections || []).map(sec => ({
      ...sec,
      images: sec.imagesString?.split('\n').map(s => s.trim()).filter(Boolean) ?? [],
      captions: sec.captionsString?.split('\n').map(s => s.trim()).filter(Boolean) ?? []
    }));

    // Clean up form-only fields before saving
    const { tagsString, toolsString, galleryString, ...cleanData } = formData;
    const projectData = { ...cleanData, tools, tags, gallery, sections };

    try {
      if (editingId) await updateProject(editingId, projectData);
      else await addProject(projectData);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        setIsModalOpen(false);
      }, 1200);
    } catch (err) {
      console.error('Failed to save project:', err);
      alert('Gagal menyimpan project. Silakan coba lagi.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Hapus case study ini? Tindakan ini tidak dapat dibatalkan.')) deleteProject(id);
  };

  // Section Management
  const addSection = () => {
    const newSec = { ...DEFAULT_SECTION, id: `sec-${Date.now()}` };
    setFormData(f => ({ ...f, sections: [...f.sections, newSec] }));
    setEditingSectionIndex(formData.sections.length);
  };

  const updateSection = (idx, key, value) => {
    const newSections = [...formData.sections];
    newSections[idx] = { ...newSections[idx], [key]: value };
    setFormData(f => ({ ...f, sections: newSections }));
  };

  const removeSection = (idx) => {
    if(window.confirm('Hapus section ini?')) {
      const newSections = formData.sections.filter((_, i) => i !== idx);
      setFormData(f => ({ ...f, sections: newSections }));
      if (editingSectionIndex === idx) setEditingSectionIndex(null);
    }
  };

  const moveSection = (idx, dir) => {
    const newSections = [...formData.sections];
    if (dir === 'up' && idx > 0) {
      [newSections[idx - 1], newSections[idx]] = [newSections[idx], newSections[idx - 1]];
    } else if (dir === 'down' && idx < newSections.length - 1) {
      [newSections[idx + 1], newSections[idx]] = [newSections[idx], newSections[idx + 1]];
    }
    setFormData(f => ({ ...f, sections: newSections }));
    setEditingSectionIndex(null);
  };

  const isGallery = formData.templateType === 'gallery';

  const currentTabs = isGallery ? [
    { id: 'meta', label: 'Info Utama', icon: Info, desc: 'Judul, tag, thumbnail' },
    { id: 'media', label: 'Images & Publish', icon: MonitorPlay, desc: 'Gambar gallery & status' },
  ] : [
    { id: 'meta', label: 'Info Utama', icon: Info, desc: 'Judul, tag, thumbnail' },
    { id: 'builder', label: 'Section Builder', icon: Layers, desc: 'Rancang bagian konten dinamis' },
    { id: 'media', label: 'Publish & Status', icon: MonitorPlay, desc: 'Status publish project' },
  ];

  if (!currentTabs.find(t => t.id === activeTab)) setActiveTab('meta');

  return (
    <div className="space-y-8 pb-20">
      {/* ─── Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-deep-navy/10 pb-8 bg-paper-cream rounded-t-3xl p-6">
        <div>
          <h1 className="text-4xl font-display font-bold text-deep-navy">Portfolio CMS</h1>
          <p className="text-sm text-deep-navy/60 mt-2 font-light">Kelola case study dengan Dynamic Section Builder.</p>
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
                const templ = p.templateType || 'dynamic';
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
                      ) : templ === 'ui-ux' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-black tracking-widest uppercase border bg-amber-50 text-amber-800 border-amber-200">
                           <Layers className="w-3.5 h-3.5" /> Legacy UI/UX
                        </span>
                      ) : templ === 'graphic-design' ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-black tracking-widest uppercase border bg-purple-50 text-purple-700 border-purple-200">
                           <Palette className="w-3.5 h-3.5" /> Legacy Graphic Design
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-black tracking-widest uppercase border bg-emerald-50 text-emerald-800 border-emerald-200">
                           <Layers className="w-3.5 h-3.5" /> Dynamic
                        </span>
                      )}
                    </td>
                    <td className="p-6 align-top text-deep-navy/80 space-y-2">
                      <p className="font-bold text-sm">{p.role}</p>
                      <div className="flex flex-wrap gap-1 max-w-[150px]">
                        {p.tags?.slice(0, 2).map((t, i) => (
                          <span key={i} className="text-[9px] px-1.5 py-0.5 bg-warm-beige-200 rounded font-bold uppercase text-deep-navy/70">{t}</span>
                        ))}
                      </div>
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

                      <button type="button" onClick={() => setVal('templateType', 'dynamic')}
                        className={`w-full p-3 rounded-xl border transition-all flex flex-col gap-1 items-start ${!isGallery ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-500/20' : 'border-warm-beige-200 hover:border-emerald-200'}`}>
                        <div className="flex items-center gap-2">
                          <Layers className={`w-4 h-4 ${!isGallery ? 'text-emerald-600' : 'text-deep-navy/40'}`} />
                          <span className={`text-xs font-bold ${!isGallery ? 'text-emerald-900' : 'text-deep-navy/70'}`}>Dynamic Sections</span>
                        </div>
                        <span className="text-[10px] text-deep-navy/50">Custom Section Builder</span>
                      </button>
                   </div>
                </div>
              </div>

              {/* Form Content Area */}
              <div className="flex-1 overflow-y-auto bg-white p-6 md:p-10 relative">
                <form id="portfolio-form" onSubmit={handleSubmit} className="max-w-4xl mx-auto pb-24">

                  {/* ═══════════ TAB 1: META & HERO ═══════════ */}
                  {activeTab === 'meta' && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <h3 className="text-xl font-display font-bold text-deep-navy mb-8 pb-4 border-b border-warm-beige-200">Informasi Dasar & Hero Section</h3>
                      
                      <Field label="Nama Project *">
                        <TextInput value={formData.title} onChange={set('title')} placeholder="e.g. Redesign Mobile App Bank..." />
                      </Field>
                      
                      <Field label="Tags / Keywords (Pisahkan dengan koma) *" hint="Dua tag pertama akan muncul sebagai chip di card portofolio.">
                        <TextInput value={formData.tagsString} onChange={set('tagsString')} placeholder="e.g. UI/UX, Web App, Fintech" />
                      </Field>

                      <Row2>
                        <Field label="Tanggal Project (Bulan & Tahun) *">
                          <input 
                            type="month"
                            value={formData.date} 
                            onChange={set('date')} 
                            className="w-full p-3.5 rounded-xl bg-warm-beige-50 border border-warm-beige-300 text-sm font-bold focus:outline-none focus:border-soft-gold focus:ring-4 focus:ring-soft-gold/10 transition-all"
                          />
                        </Field>
                        <Field label="Role Kamu *">
                          <TextInput value={formData.role} onChange={set('role')} placeholder="e.g. Product Designer" />
                        </Field>
                      </Row2>
                      <Row2>
                        <Field label="Timeline">
                          <TextInput value={formData.timeline} onChange={set('timeline')} placeholder="e.g. 3 Bulan (Agu – Nov 2024)" />
                        </Field>
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
                        <TextInput value={formData.toolsString} onChange={set('toolsString')} placeholder="Figma, Miro, Adobe Illustrator" />
                      </Field>
                      
                      <Field label="Deskripsi Singkat (Hero & Card)">
                        <Textarea rows={3} value={formData.shortDescription} onChange={set('shortDescription')} placeholder="Ringkasan singkat project untuk kartu portofolio dan teks hero..." />
                      </Field>

                      <ImageField label="Thumbnail URL *"
                        hint="Gambar kecil untuk card di halaman utama (rasio 4:3 atau 16:9)"
                        value={formData.thumbnail} onChange={set('thumbnail')} />
                      
                      {!isGallery && (
                        <ImageField label="Hero Visual Utama (Opsional)"
                          hint="Gambar besar beresolusi tinggi untuk header case study"
                          value={formData.heroImage} onChange={set('heroImage')} />
                      )}
                    </div>
                  )}

                  {/* ═══════════ TAB 2: SECTION BUILDER ═══════════ */}
                  {activeTab === 'builder' && !isGallery && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="flex items-center justify-between mb-8 pb-4 border-b border-warm-beige-200">
                        <h3 className="text-xl font-display font-bold text-deep-navy">Dynamic Section Builder</h3>
                        <button type="button" onClick={addSection} className="px-4 py-2 bg-soft-gold text-deep-navy text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-soft-gold-600 transition-colors flex items-center gap-2">
                          <PlusCircle className="w-4 h-4" /> Add Section
                        </button>
                      </div>

                      {formData.sections.length === 0 ? (
                        <div className="text-center py-16 bg-warm-beige-50 rounded-3xl border border-warm-beige-200 border-dashed">
                          <p className="text-deep-navy/60 font-light mb-4">Belum ada section yang dibuat.</p>
                          <button type="button" onClick={addSection} className="px-6 py-3 bg-deep-navy text-warm-beige text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-deep-navy-800 transition-colors inline-flex items-center gap-2">
                            <PlusCircle className="w-4 h-4" /> Buat Section Pertama
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {formData.sections.map((section, idx) => {
                            const isEditing = editingSectionIndex === idx;
                            return (
                              <div key={idx} className={`bg-white rounded-2xl border transition-all ${isEditing ? 'border-soft-gold ring-4 ring-soft-gold/10 shadow-lg' : 'border-warm-beige-200 shadow-sm hover:border-warm-beige-300'}`}>
                                
                                {/* Section Header (Collapsible) */}
                                <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => setEditingSectionIndex(isEditing ? null : idx)}>
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-warm-beige-100 flex items-center justify-center font-bold text-deep-navy text-sm">
                                      {idx + 1}
                                    </div>
                                    <span className="font-bold text-deep-navy">{section.title || 'Untitled Section'}</span>
                                    {section.useHighlight && (
                                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-emerald-100 text-emerald-800">Highlight Card</span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                                    <button type="button" onClick={() => moveSection(idx, 'up')} disabled={idx === 0} className="p-2 text-deep-navy/40 hover:text-deep-navy disabled:opacity-30"><ArrowUp className="w-4 h-4" /></button>
                                    <button type="button" onClick={() => moveSection(idx, 'down')} disabled={idx === formData.sections.length - 1} className="p-2 text-deep-navy/40 hover:text-deep-navy disabled:opacity-30"><ArrowDown className="w-4 h-4" /></button>
                                    <button type="button" onClick={() => removeSection(idx)} className="p-2 text-rose-400 hover:text-rose-600 ml-2"><Trash2 className="w-4 h-4" /></button>
                                  </div>
                                </div>

                                {/* Section Editor */}
                                {isEditing && (
                                  <div className="p-6 border-t border-warm-beige-100 bg-warm-beige-50/50 rounded-b-2xl space-y-6">
                                    <Row2>
                                      <Field label="Section Title *">
                                        <TextInput value={section.title} onChange={e => updateSection(idx, 'title', e.target.value)} placeholder="e.g. Project Overview" />
                                      </Field>
                                      <Field label="Highlight Card Style?">
                                        <div className="flex items-center gap-4 mt-2">
                                          <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" checked={section.useHighlight} onChange={e => updateSection(idx, 'useHighlight', e.target.checked)} className="w-4 h-4" />
                                            <span className="text-sm text-deep-navy/80">Use Highlight Card</span>
                                          </label>
                                          {section.useHighlight && (
                                            <select value={section.highlightColor} onChange={e => updateSection(idx, 'highlightColor', e.target.value)}
                                              className="p-2 rounded-lg bg-white border border-warm-beige-300 text-xs">
                                              <option value="white">White</option>
                                              <option value="gold">Gold</option>
                                              <option value="navy">Navy</option>
                                            </select>
                                          )}
                                        </div>
                                      </Field>
                                    </Row2>
                                    
                                    <Field label="Text Content">
                                      <Textarea rows={4} value={section.content} onChange={e => updateSection(idx, 'content', e.target.value)} placeholder="Write the content for this section..." />
                                    </Field>

                                    <MultiImageField label="Images (1 per line)" hint="If 1 image, full width. If >1, renders as a grid."
                                      value={section.imagesString} onChange={e => updateSection(idx, 'imagesString', e.target.value)} />
                                    
                                    <Field label="Image Captions (1 per line)">
                                      <Textarea rows={2} value={section.captionsString} onChange={e => updateSection(idx, 'captionsString', e.target.value)} placeholder="Caption 1&#10;Caption 2" />
                                    </Field>
                                    
                                    <div className="flex justify-end pt-2">
                                      <button type="button" onClick={() => setEditingSectionIndex(null)} className="px-4 py-2 bg-deep-navy text-warm-beige text-xs font-bold uppercase tracking-widest rounded-lg">Done Editing</button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  {/* ═══════════ TAB 4: PUBLISH ═══════════ */}
                  {activeTab === 'media' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <h3 className="text-xl font-display font-bold text-deep-navy mb-8 pb-4 border-b border-warm-beige-200">
                        {isGallery ? 'Gambar Gallery & Setting Publish' : 'Publish & Settings'}
                      </h3>
                      
                      {isGallery && (
                        <div className="bg-white p-6 rounded-3xl border border-warm-beige-200 shadow-sm hover:shadow-md transition-shadow mb-6">
                          <Field label="URL Gambar (1 per baris)" hint="Masukkan semua link gambar untuk ditampilkan.">
                            <textarea rows={10} value={formData.galleryString} onChange={set('galleryString')}
                              placeholder={'https://...\nhttps://...'}
                              className="w-full p-4 rounded-2xl bg-warm-beige-50 border border-warm-beige-300 text-xs font-mono focus:outline-none focus:border-soft-gold focus:ring-4 focus:ring-soft-gold/10 transition-all leading-relaxed" />
                          </Field>
                        </div>
                      )}

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
                            <span className="text-sm font-bold text-deep-navy group-hover:text-soft-gold-600 transition-colors">Tandai sebagai Featured</span>
                          </label>

                          <div className="flex items-center gap-4 border-l border-warm-beige-200 pl-6">
                            <label className="font-bold text-xs uppercase tracking-widest text-deep-navy/80">Status</label>
                            <select value={formData.status} onChange={set('status')}
                              className="px-4 py-2 rounded-xl bg-warm-beige-50 border border-warm-beige-300 text-sm font-bold focus:outline-none focus:border-soft-gold transition-all">
                              <option value="draft">Draft (Sembunyikan)</option>
                              <option value="published">Published (Tampilkan)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                </form>
              </div>
            </div>

            {/* Modal Footer (Sticky) */}
            <div className="flex-shrink-0 px-8 py-5 bg-white border-t border-warm-beige-300 flex items-center justify-end gap-4 relative z-10">
              {saveSuccess && (
                <span className="text-emerald-600 text-sm font-bold flex items-center gap-2 animate-pulse">
                  <Check className="w-4 h-4" /> Tersimpan!
                </span>
              )}
              <button type="button" onClick={() => setIsModalOpen(false)} disabled={isSaving} className="px-6 py-3 rounded-xl bg-warm-beige-100 text-deep-navy text-xs font-bold uppercase tracking-widest hover:bg-warm-beige-200 transition-all disabled:opacity-50">
                Batal
              </button>
              <button type="submit" form="portfolio-form" disabled={isSaving || saveSuccess} className="px-8 py-3 rounded-xl bg-deep-navy text-warm-beige text-xs font-bold uppercase tracking-widest hover:bg-soft-gold hover:text-deep-navy transition-all shadow-lg hover:shadow-xl flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                {isSaving ? (
                  <><span className="w-4 h-4 border-2 border-warm-beige border-t-transparent rounded-full animate-spin" /> Menyimpan...</>
                ) : saveSuccess ? (
                  <><Check className="w-4 h-4" /> Tersimpan!</>
                ) : (
                  <><Save className="w-4 h-4" /> Simpan Project</>
                )}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPortfolio;
