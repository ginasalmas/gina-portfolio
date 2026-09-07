import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, PlusCircle, ArrowUp, ArrowDown } from 'lucide-react';
import { useData } from '../../context/DataContext';

const DEFAULT_SECTION = {
  id: '',
  content: '',
  imagesString: ''
};

const AdminBlog = () => {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Design Articles',
    tagsString: 'UI/UX, Editorial, Design Philosophy',
    coverImage: '',
    publishedAt: new Date().toISOString().split('T')[0],
    readTime: '5 min read',
    excerpt: '',
    sections: [],
    isFeatured: false,
    status: 'published'
  });

  const [editingSectionIndex, setEditingSectionIndex] = useState(null);

  const handleOpenCreate = () => {
    setEditingId(null);
    setFormData({
      title: '',
      category: 'Design Articles',
      tagsString: 'UI/UX, Editorial, Design Philosophy',
      coverImage: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=800&q=80',
      publishedAt: new Date().toISOString().split('T')[0],
      readTime: '5 min read',
      excerpt: '',
      sections: [{ ...DEFAULT_SECTION, id: `sec-${Date.now()}` }],
      isFeatured: false,
      status: 'published'
    });
    setEditingSectionIndex(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (post) => {
    setEditingId(post.id);
    
    let processedSections = [];
    if (post.sections && Array.isArray(post.sections) && post.sections.length > 0) {
      processedSections = post.sections.map(sec => ({
        ...sec,
        imagesString: (sec.images || []).join('\n')
      }));
    } else {
      // Migrate legacy content
      if (post.content) {
        processedSections = [{
          ...DEFAULT_SECTION,
          id: `sec-${Date.now()}`,
          content: post.content
        }];
      }
    }

    setFormData({
      title: post.title || '',
      category: post.category || 'Design Articles',
      tagsString: post.tags ? post.tags.join(', ') : '',
      coverImage: post.coverImage || '',
      publishedAt: post.publishedAt || '',
      readTime: post.readTime || '5 min read',
      excerpt: post.excerpt || '',
      sections: processedSections,
      isFeatured: post.isFeatured || false,
      status: post.status || 'published'
    });
    setEditingSectionIndex(null);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tags = formData.tagsString.split(',').map(t => t.trim()).filter(Boolean);

    // Convert section strings back to arrays
    const sections = (formData.sections || []).map(sec => ({
      ...sec,
      images: sec.imagesString?.split('\n').map(s => s.trim()).filter(Boolean) ?? []
    }));

    const { tagsString, ...cleanData } = formData;
    const postData = {
      ...cleanData,
      tags,
      sections
    };

    if (editingId) {
      updateBlogPost(editingId, postData);
    } else {
      addBlogPost(postData);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this journal post?')) {
      deleteBlogPost(id);
    }
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

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-deep-navy/10 pb-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-deep-navy">Journal & Notes CMS</h1>
          <p className="text-xs text-deep-navy/70 font-light mt-1">Manage articles, design notes, tags, and publication schedules.</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="px-5 py-2.5 rounded-full bg-deep-navy text-warm-beige text-xs font-semibold uppercase tracking-wider hover:bg-deep-navy-800 transition-all flex items-center gap-2 self-start"
        >
          <Plus className="w-4 h-4 text-soft-gold" /> Write New Journal Post
        </button>
      </div>

      {/* Table */}
      <div className="editorial-card rounded-2xl overflow-hidden bg-white border border-warm-beige-300">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-warm-beige-100 border-b border-warm-beige-300 text-[11px] uppercase tracking-wider text-deep-navy/70">
                <th className="p-4 font-bold">Cover & Title</th>
                <th className="p-4 font-bold">Category</th>
                <th className="p-4 font-bold">Date & Read Time</th>
                <th className="p-4 font-bold">Featured</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-warm-beige-200 text-xs">
              {blogPosts.map((post) => (
                <tr key={post.id} className="hover:bg-warm-beige-50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={post.coverImage} alt={post.title} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                      <div>
                        <p className="font-bold text-deep-navy text-sm line-clamp-1">{post.title}</p>
                        <p className="text-[11px] text-deep-navy/60 line-clamp-1">{post.excerpt}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-deep-navy">
                    <span className="px-2.5 py-0.5 rounded badge-gold">{post.category}</span>
                  </td>
                  <td className="p-4 text-deep-navy/80">
                    <p className="font-semibold">{post.publishedAt}</p>
                    <p className="text-[11px] text-deep-navy/60">{post.readTime}</p>
                  </td>
                  <td className="p-4">
                    {post.isFeatured ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">★ Featured</span>
                    ) : (
                      <span className="text-[10px] text-deep-navy/40">Standard</span>
                    )}
                  </td>
                  <td className="p-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${post.status === 'published' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'}`}>
                      {post.status || 'published'}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleOpenEdit(post)}
                      className="p-1.5 rounded bg-warm-beige-200 hover:bg-warm-beige-300 text-deep-navy transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="p-1.5 rounded bg-rose-100 hover:bg-rose-200 text-rose-700 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Editor Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-deep-navy/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto border border-warm-beige-400 shadow-2xl relative">
            
            <div className="flex items-center justify-between border-b border-deep-navy/10 pb-4">
              <h2 className="text-2xl font-display font-bold text-deep-navy">
                {editingId ? 'Edit Journal Post' : 'Create New Journal Post'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-deep-navy/50 hover:text-deep-navy">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 text-xs text-deep-navy font-medium pb-20">
              
              <div className="space-y-5">
                <h3 className="text-xl font-display font-bold text-deep-navy pb-2 border-b border-warm-beige-200">Article Info</h3>
                <div className="space-y-1">
                  <label className="font-bold uppercase tracking-wider text-deep-navy/80">Article Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300 focus:outline-none focus:border-soft-gold"
                    placeholder="e.g. Designing for Intentionality: How Whitespace Shapes Digital Emotion"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold uppercase tracking-wider text-deep-navy/80">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300 focus:outline-none focus:border-soft-gold"
                    >
                      <option value="Design Articles">Design Articles</option>
                      <option value="UI/UX Case Studies">UI/UX Case Studies</option>
                      <option value="Career Journey">Career Journey</option>
                      <option value="Learning Notes">Learning Notes</option>
                      <option value="Technology">Technology</option>
                      <option value="Personal Reflections">Personal Reflections</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold uppercase tracking-wider text-deep-navy/80">Cover Image URL *</label>
                    <input
                      type="text"
                      required
                      value={formData.coverImage}
                      onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                      className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="font-bold uppercase tracking-wider text-deep-navy/80">Publication Date</label>
                    <input
                      type="text"
                      value={formData.publishedAt}
                      onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                      className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold uppercase tracking-wider text-deep-navy/80">Read Time Estimate</label>
                    <input
                      type="text"
                      value={formData.readTime}
                      onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                      className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold uppercase tracking-wider text-deep-navy/80">Tags (comma separated)</label>
                    <input
                      type="text"
                      value={formData.tagsString}
                      onChange={(e) => setFormData({ ...formData, tagsString: e.target.value })}
                      className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300"
                      placeholder="UI/UX, Editorial, Career"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-bold uppercase tracking-wider text-deep-navy/80">Short Excerpt *</label>
                  <textarea
                    rows="2"
                    required
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300"
                    placeholder="Summary for article card preview..."
                  />
                </div>
              </div>

              {/* Section Builder */}
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-warm-beige-200">
                  <h3 className="text-xl font-display font-bold text-deep-navy">Content Sections (with Media)</h3>
                  <button type="button" onClick={addSection} className="px-4 py-2 bg-soft-gold text-deep-navy text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-soft-gold-600 transition-colors flex items-center gap-2">
                    <PlusCircle className="w-4 h-4" /> Add Section
                  </button>
                </div>

                {formData.sections.length === 0 ? (
                  <div className="text-center py-10 bg-warm-beige-50 rounded-2xl border border-warm-beige-200 border-dashed">
                    <p className="text-deep-navy/60 font-light mb-4">No content sections yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {formData.sections.map((section, idx) => {
                      const isEditing = editingSectionIndex === idx;
                      return (
                        <div key={idx} className={`bg-white rounded-2xl border transition-all ${isEditing ? 'border-soft-gold ring-4 ring-soft-gold/10 shadow-lg' : 'border-warm-beige-200 shadow-sm hover:border-warm-beige-300'}`}>
                          <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => setEditingSectionIndex(isEditing ? null : idx)}>
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-warm-beige-100 flex items-center justify-center font-bold text-deep-navy text-sm">
                                {idx + 1}
                              </div>
                              <span className="font-bold text-deep-navy">Section {idx + 1} {section.imagesString ? '(Includes Media)' : ''}</span>
                            </div>
                            <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                              <button type="button" onClick={() => moveSection(idx, 'up')} disabled={idx === 0} className="p-2 text-deep-navy/40 hover:text-deep-navy disabled:opacity-30"><ArrowUp className="w-4 h-4" /></button>
                              <button type="button" onClick={() => moveSection(idx, 'down')} disabled={idx === formData.sections.length - 1} className="p-2 text-deep-navy/40 hover:text-deep-navy disabled:opacity-30"><ArrowDown className="w-4 h-4" /></button>
                              <button type="button" onClick={() => removeSection(idx)} className="p-2 text-rose-400 hover:text-rose-600 ml-2"><Trash2 className="w-4 h-4" /></button>
                            </div>
                          </div>

                          {isEditing && (
                            <div className="p-6 border-t border-warm-beige-100 bg-warm-beige-50/50 rounded-b-2xl space-y-4">
                              <div className="space-y-1">
                                <label className="font-bold uppercase tracking-wider text-deep-navy/80">Text Content</label>
                                <textarea
                                  rows="6"
                                  value={section.content}
                                  onChange={e => updateSection(idx, 'content', e.target.value)}
                                  className="w-full p-4 rounded-xl bg-white border border-warm-beige-300 font-sans leading-relaxed text-sm focus:outline-none focus:border-soft-gold"
                                  placeholder="Write paragraph content..."
                                />
                              </div>
                              
                              <div className="space-y-1">
                                <label className="font-bold uppercase tracking-wider text-deep-navy/80">Media URLs (1 per line, Max 3)</label>
                                <p className="text-[10px] text-deep-navy/60">Photos inserted here will appear below the text content in a Masonry Grid layout.</p>
                                <textarea
                                  rows="3"
                                  value={section.imagesString}
                                  onChange={e => updateSection(idx, 'imagesString', e.target.value)}
                                  className="w-full p-3 rounded-xl bg-white border border-warm-beige-300 font-mono text-xs focus:outline-none focus:border-soft-gold"
                                  placeholder="https://..."
                                />
                              </div>
                              
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

              {/* Status & Options */}
              <div className="flex items-center justify-between pt-6 border-t border-deep-navy/10">
                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-5 h-5 rounded text-soft-gold"
                  />
                  <span>Feature on Journal Top Banner</span>
                </label>

                <div className="flex items-center gap-3">
                  <label className="font-bold">Status:</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="px-4 py-2 rounded-xl bg-warm-beige-100 border border-warm-beige-300 font-bold focus:outline-none focus:border-soft-gold"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

            </form>
            
            {/* Sticky Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur border-t border-warm-beige-300 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] flex justify-end gap-3 rounded-b-3xl">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-3 rounded-full border border-deep-navy/20 text-deep-navy font-semibold hover:bg-warm-beige-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-8 py-3 rounded-full bg-deep-navy text-warm-beige font-semibold uppercase tracking-wider hover:bg-deep-navy-800 shadow-md"
              >
                {editingId ? 'Save Changes' : 'Publish Article'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminBlog;

