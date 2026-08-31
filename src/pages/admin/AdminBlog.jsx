import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, FileText, Check } from 'lucide-react';
import { useData } from '../../context/DataContext';

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
    content: '',
    isFeatured: false,
    status: 'published'
  });

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
      content: '',
      isFeatured: false,
      status: 'published'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (post) => {
    setEditingId(post.id);
    setFormData({
      title: post.title || '',
      category: post.category || 'Design Articles',
      tagsString: post.tags ? post.tags.join(', ') : '',
      coverImage: post.coverImage || '',
      publishedAt: post.publishedAt || '',
      readTime: post.readTime || '5 min read',
      excerpt: post.excerpt || '',
      content: post.content || '',
      isFeatured: post.isFeatured || false,
      status: post.status || 'published'
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tags = formData.tagsString.split(',').map(t => t.trim()).filter(Boolean);

    const postData = {
      ...formData,
      tags,
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
          <div className="bg-white rounded-3xl max-w-3xl w-full p-6 md:p-8 space-y-6 max-h-[90vh] overflow-y-auto border border-warm-beige-400 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-deep-navy/10 pb-4">
              <h2 className="text-2xl font-display font-bold text-deep-navy">
                {editingId ? 'Edit Journal Post' : 'Create New Journal Post'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-deep-navy/50 hover:text-deep-navy">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 text-xs text-deep-navy font-medium">
              
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

              <div className="space-y-1">
                <label className="font-bold uppercase tracking-wider text-deep-navy/80">Article Content *</label>
                <textarea
                  rows="8"
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full p-4 rounded-xl bg-warm-beige-100 border border-warm-beige-300 font-sans leading-relaxed"
                  placeholder="Write post content..."
                />
              </div>

              {/* Status & Options */}
              <div className="flex items-center gap-6 pt-4 border-t border-deep-navy/10">
                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={formData.isFeatured}
                    onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded text-soft-gold"
                  />
                  <span>Feature on Journal Top Banner</span>
                </label>

                <div className="flex items-center gap-2">
                  <label className="font-bold">Status:</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="p-2 rounded-lg bg-warm-beige-100 border border-warm-beige-300 font-bold"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-deep-navy/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-deep-navy/20 text-deep-navy font-semibold hover:bg-warm-beige-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-deep-navy text-warm-beige font-semibold uppercase tracking-wider hover:bg-deep-navy-800 shadow-md"
                >
                  {editingId ? 'Save Changes' : 'Publish Article'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminBlog;
