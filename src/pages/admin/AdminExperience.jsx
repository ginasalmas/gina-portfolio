import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Briefcase } from 'lucide-react';
import { useData } from '../../context/DataContext';

const AdminExperience = () => {
  const { experiences, addExperience, updateExperience, deleteExperience } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    company: '',
    position: '',
    type: 'Full-time',
    startDate: '2024-01',
    endDate: 'Present',
    description: '',
    responsibilitiesString: ''
  });

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      company: '',
      position: '',
      type: 'Full-time',
      startDate: '2024-01',
      endDate: 'Present',
      description: '',
      responsibilitiesString: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (exp) => {
    setEditingId(exp.id);
    setFormData({
      ...exp,
      responsibilitiesString: exp.responsibilities ? exp.responsibilities.join('\n') : ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const responsibilities = formData.responsibilitiesString.split('\n').map(r => r.trim()).filter(Boolean);
    const expData = { ...formData, responsibilities };

    if (editingId) {
      updateExperience(editingId, expData);
    } else {
      addExperience(expData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this experience entry?')) {
      deleteExperience(id);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-deep-navy/10 pb-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-deep-navy">Work Experience & Education CMS</h1>
          <p className="text-xs text-deep-navy/70 font-light mt-1">Manage career timeline roles, responsibilities, and academic degrees.</p>
        </div>
        <button onClick={handleOpenCreate} className="px-5 py-2.5 rounded-full bg-deep-navy text-warm-beige text-xs font-semibold uppercase tracking-wider flex items-center gap-2 self-start">
          <Plus className="w-4 h-4 text-soft-gold" /> Add Role / Experience
        </button>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp.id} className="editorial-card rounded-2xl p-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-deep-navy/10 pb-3">
              <div>
                <h3 className="text-xl font-display font-bold text-deep-navy">{exp.position}</h3>
                <p className="text-xs font-semibold text-soft-gold-600">{exp.company} • <span className="text-deep-navy/60 font-normal">{exp.type}</span></p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold px-3 py-1 rounded-full badge-navy">{exp.startDate} — {exp.endDate}</span>
                <button onClick={() => handleOpenEdit(exp)} className="p-1.5 rounded bg-warm-beige-200 text-deep-navy hover:bg-warm-beige-300"><Edit2 className="w-3.5 h-3.5" /></button>
                <button onClick={() => handleDelete(exp.id)} className="p-1.5 rounded bg-rose-100 text-rose-700 hover:bg-rose-200"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <p className="text-xs text-deep-navy/80 font-light leading-relaxed">{exp.description}</p>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-deep-navy/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-6 border border-warm-beige-400 shadow-2xl">
            <div className="flex items-center justify-between border-b border-deep-navy/10 pb-3">
              <h2 className="text-xl font-display font-bold text-deep-navy">{editingId ? 'Edit Experience' : 'Add Experience'}</h2>
              <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-deep-navy/50" /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium text-deep-navy">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold uppercase tracking-wider">Company / Institution *</label>
                  <input type="text" required value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300 mt-1" />
                </div>
                <div>
                  <label className="font-bold uppercase tracking-wider">Position / Degree *</label>
                  <input type="text" required value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300 mt-1" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="font-bold uppercase tracking-wider">Type</label>
                  <input type="text" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300 mt-1" placeholder="Full-time, Internship" />
                </div>
                <div>
                  <label className="font-bold uppercase tracking-wider">Start Date</label>
                  <input type="text" value={formData.startDate} onChange={(e) => setFormData({ ...formData, startDate: e.target.value })} className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300 mt-1" />
                </div>
                <div>
                  <label className="font-bold uppercase tracking-wider">End Date</label>
                  <input type="text" value={formData.endDate} onChange={(e) => setFormData({ ...formData, endDate: e.target.value })} className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300 mt-1" />
                </div>
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider">Summary Description</label>
                <textarea rows="2" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300 mt-1" />
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider">Responsibilities & Key Accomplishments (1 per line)</label>
                <textarea rows="4" value={formData.responsibilitiesString} onChange={(e) => setFormData({ ...formData, responsibilitiesString: e.target.value })} className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300 mt-1 font-mono text-[11px]" />
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

export default AdminExperience;
