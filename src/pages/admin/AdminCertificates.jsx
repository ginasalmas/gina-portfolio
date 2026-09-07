import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Award } from 'lucide-react';
import { useData } from '../../context/DataContext';

const AdminCertificates = () => {
  const { certificates, addCertificate, updateCertificate, deleteCertificate } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    issuer: '',
    category: '',
    date: '2024-04',
    credentialId: '',
    credentialUrl: '',
    image: '',
    description: ''
  });

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      name: '',
      issuer: '',
      category: '',
      date: '2024-04',
      credentialId: '',
      credentialUrl: '',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
      description: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cert) => {
    setEditingId(cert.id);
    setFormData({ ...cert });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateCertificate(editingId, formData);
    } else {
      addCertificate(formData);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this certificate?')) {
      deleteCertificate(id);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-deep-navy/10 pb-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-deep-navy">Certificates Management</h1>
          <p className="text-xs text-deep-navy/70 font-light mt-1">Add, edit, or remove professional credentials and licenses.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="px-5 py-2.5 rounded-full bg-deep-navy text-warm-beige text-xs font-semibold uppercase tracking-wider hover:bg-deep-navy-800 transition-all flex items-center gap-2 self-start"
        >
          <Plus className="w-4 h-4 text-soft-gold" /> Add Certificate
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert) => (
          <div key={cert.id} className="editorial-card rounded-2xl p-5 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <img src={cert.image} alt={cert.name} className="w-full h-36 object-cover rounded-xl border border-warm-beige-300" />
              <div>
                <span className="text-xs font-semibold text-soft-gold-600">{cert.issuer} • {cert.date}</span>
                <h3 className="text-base font-display font-bold text-deep-navy">{cert.name}</h3>
                {cert.category && (
                  <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-warm-beige-200 text-deep-navy text-[10px] font-bold tracking-wider uppercase">
                    {cert.category}
                  </span>
                )}
                <p className="text-xs text-deep-navy/70 font-light mt-2 line-clamp-2">{cert.description}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-deep-navy/10 flex items-center justify-between">
              <span className="text-[11px] font-mono text-deep-navy/50">{cert.credentialId}</span>
              <div className="flex gap-1">
                <button onClick={() => handleOpenEdit(cert)} className="p-1.5 rounded bg-warm-beige-200 text-deep-navy hover:bg-warm-beige-300">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button onClick={() => handleDelete(cert.id)} className="p-1.5 rounded bg-rose-100 text-rose-700 hover:bg-rose-200">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-deep-navy/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-6 border border-warm-beige-400 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-deep-navy/10 pb-3">
              <h2 className="text-xl font-display font-bold text-deep-navy">{editingId ? 'Edit Certificate' : 'Add Certificate'}</h2>
              <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-deep-navy/50" /></button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-medium text-deep-navy">
              <div>
                <label className="font-bold uppercase tracking-wider">Certificate Name *</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300 mt-1" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold uppercase tracking-wider">Issuer *</label>
                  <input type="text" required value={formData.issuer} onChange={(e) => setFormData({ ...formData, issuer: e.target.value })} className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300 mt-1" />
                </div>
                <div>
                  <label className="font-bold uppercase tracking-wider">Category</label>
                  <input type="text" placeholder="e.g. UI/UX, Programming" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300 mt-1" />
                </div>
              </div>
              
              <div>
                <label className="font-bold uppercase tracking-wider">Date *</label>
                <input type="text" required value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300 mt-1" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold uppercase tracking-wider">Credential ID</label>
                  <input type="text" value={formData.credentialId} onChange={(e) => setFormData({ ...formData, credentialId: e.target.value })} className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300 mt-1" />
                </div>
                <div>
                  <label className="font-bold uppercase tracking-wider">Credential URL</label>
                  <input type="text" value={formData.credentialUrl} onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })} className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300 mt-1" />
                </div>
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

export default AdminCertificates;
