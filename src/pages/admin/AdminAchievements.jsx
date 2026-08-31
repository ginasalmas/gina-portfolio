import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Trophy } from 'lucide-react';
import { useData } from '../../context/DataContext';

const AdminAchievements = () => {
  const { achievements, addAchievement, updateAchievement, deleteAchievement } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    date: '2024-05',
    category: 'Competition',
    description: '',
    image: ''
  });

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      title: '',
      issuer: '',
      date: '2024-05',
      category: 'Competition',
      description: '',
      image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (ach) => {
    setEditingId(ach.id);
    setFormData({ ...ach });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateAchievement(editingId, formData);
    } else {
      addAchievement(formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this achievement?')) {
      deleteAchievement(id);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-deep-navy/10 pb-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-deep-navy">Achievements CMS</h1>
          <p className="text-xs text-deep-navy/70 font-light mt-1">Manage hackathon awards, honors, and recognitions.</p>
        </div>
        <button onClick={handleOpenCreate} className="px-5 py-2.5 rounded-full bg-deep-navy text-warm-beige text-xs font-semibold uppercase tracking-wider flex items-center gap-2 self-start">
          <Plus className="w-4 h-4 text-soft-gold" /> Add Achievement
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((ach) => (
          <div key={ach.id} className="editorial-card rounded-2xl p-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <img src={ach.image} alt={ach.title} className="w-full h-36 object-cover rounded-xl border border-warm-beige-300" />
              <div>
                <span className="text-xs font-semibold text-soft-gold-600">{ach.issuer} • {ach.date}</span>
                <h3 className="text-base font-display font-bold text-deep-navy">{ach.title}</h3>
                <p className="text-xs text-deep-navy/70 font-light mt-1 line-clamp-2">{ach.description}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-deep-navy/10 flex justify-end gap-1">
              <button onClick={() => handleOpenEdit(ach)} className="p-1.5 rounded bg-warm-beige-200 text-deep-navy hover:bg-warm-beige-300"><Edit2 className="w-3.5 h-3.5" /></button>
              <button onClick={() => handleDelete(ach.id)} className="p-1.5 rounded bg-rose-100 text-rose-700 hover:bg-rose-200"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-deep-navy/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-6 border border-warm-beige-400 shadow-2xl">
            <div className="flex items-center justify-between border-b border-deep-navy/10 pb-3">
              <h2 className="text-xl font-display font-bold text-deep-navy">{editingId ? 'Edit Achievement' : 'Add Achievement'}</h2>
              <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-deep-navy/50" /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium text-deep-navy">
              <div>
                <label className="font-bold uppercase tracking-wider">Achievement Title *</label>
                <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300 mt-1" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold uppercase tracking-wider">Issuer / Event *</label>
                  <input type="text" required value={formData.issuer} onChange={(e) => setFormData({ ...formData, issuer: e.target.value })} className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300 mt-1" />
                </div>
                <div>
                  <label className="font-bold uppercase tracking-wider">Date *</label>
                  <input type="text" required value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300 mt-1" />
                </div>
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider">Category</label>
                <input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300 mt-1" placeholder="Competition, Academic, Recognition" />
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider">Image URL</label>
                <input type="text" value={formData.image} onChange={(e) => setFormData({ ...formData, image: e.target.value })} className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300 mt-1" />
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider">Description</label>
                <textarea rows="3" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300 mt-1" />
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

export default AdminAchievements;
