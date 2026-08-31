import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, BookOpen } from 'lucide-react';
import { useData } from '../../context/DataContext';

const AdminWritings = () => {
  const { writings, addWriting, updateWriting, deleteWriting } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    publication: '',
    date: '2024-02',
    category: 'Research Paper',
    link: '',
    summary: ''
  });

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      title: '',
      publication: '',
      date: '2024-02',
      category: 'Research Paper',
      link: '',
      summary: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (w) => {
    setEditingId(w.id);
    setFormData({ ...w });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateWriting(editingId, formData);
    } else {
      addWriting(formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this writing entry?')) {
      deleteWriting(id);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-deep-navy/10 pb-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-deep-navy">Academic & Professional Writings CMS</h1>
          <p className="text-xs text-deep-navy/70 font-light mt-1">Manage journal publications, essays, and undergraduate thesis abstracts.</p>
        </div>
        <button onClick={handleOpenCreate} className="px-5 py-2.5 rounded-full bg-deep-navy text-warm-beige text-xs font-semibold uppercase tracking-wider flex items-center gap-2 self-start">
          <Plus className="w-4 h-4 text-soft-gold" /> Add Writing Entry
        </button>
      </div>

      <div className="space-y-4">
        {writings.map((w) => (
          <div key={w.id} className="editorial-card rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-soft-gold-600">{w.category} • {w.date}</span>
              <h3 className="text-lg font-display font-bold text-deep-navy">{w.title}</h3>
              <p className="text-xs font-semibold text-deep-navy/60">Published in: {w.publication}</p>
              <p className="text-xs text-deep-navy/80 font-light mt-1 line-clamp-2">{w.summary}</p>
            </div>
            <div className="flex gap-2 self-end md:self-center">
              <button onClick={() => handleOpenEdit(w)} className="p-2 rounded bg-warm-beige-200 text-deep-navy hover:bg-warm-beige-300"><Edit2 className="w-4 h-4" /></button>
              <button onClick={() => handleDelete(w.id)} className="p-2 rounded bg-rose-100 text-rose-700 hover:bg-rose-200"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-deep-navy/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-6 border border-warm-beige-400 shadow-2xl">
            <div className="flex items-center justify-between border-b border-deep-navy/10 pb-3">
              <h2 className="text-xl font-display font-bold text-deep-navy">{editingId ? 'Edit Writing' : 'Add Writing'}</h2>
              <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-deep-navy/50" /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium text-deep-navy">
              <div>
                <label className="font-bold uppercase tracking-wider">Title *</label>
                <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300 mt-1" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold uppercase tracking-wider">Publication / Journal *</label>
                  <input type="text" required value={formData.publication} onChange={(e) => setFormData({ ...formData, publication: e.target.value })} className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300 mt-1" />
                </div>
                <div>
                  <label className="font-bold uppercase tracking-wider">Date *</label>
                  <input type="text" required value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300 mt-1" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold uppercase tracking-wider">Category</label>
                  <input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300 mt-1" placeholder="Research Paper, UX Essay" />
                </div>
                <div>
                  <label className="font-bold uppercase tracking-wider">Publication / DOI Link</label>
                  <input type="text" value={formData.link} onChange={(e) => setFormData({ ...formData, link: e.target.value })} className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300 mt-1" />
                </div>
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider">Summary / Abstract</label>
                <textarea rows="4" value={formData.summary} onChange={(e) => setFormData({ ...formData, summary: e.target.value })} className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300 mt-1" />
              </div>

              <div className="pt-3 border-t border-deep-navy/10 flex justify-end gap-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-full border border-deep-navy/20">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-full bg-deep-navy text-warm-beige font-semibold uppercase">{editingId ? 'Save' : 'Add'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminWritings;
