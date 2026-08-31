import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Wrench, Save } from 'lucide-react';
import { useData } from '../../context/DataContext';

const AdminSkills = () => {
  const { skills, updateSkills } = useData();
  const [skillGroups, setSkillGroups] = useState(skills);
  const [isSaved, setIsSaved] = useState(false);

  const handleGroupChange = (index, field, value) => {
    const updated = [...skillGroups];
    updated[index][field] = value;
    setSkillGroups(updated);
  };

  const handleItemsChange = (index, itemsString) => {
    const updated = [...skillGroups];
    updated[index].items = itemsString.split(',').map(s => s.trim()).filter(Boolean);
    setSkillGroups(updated);
  };

  const handleAddGroup = () => {
    setSkillGroups([...skillGroups, { category: 'New Skill Category', items: ['Skill 1', 'Skill 2'] }]);
  };

  const handleDeleteGroup = (index) => {
    if (window.confirm('Delete this skill category?')) {
      const updated = skillGroups.filter((_, i) => i !== index);
      setSkillGroups(updated);
    }
  };

  const handleSaveAll = () => {
    updateSkills(skillGroups);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-deep-navy/10 pb-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-deep-navy">Skills & Capabilities CMS</h1>
          <p className="text-xs text-deep-navy/70 font-light mt-1">Manage skill categories (UI/UX, Graphic Design, Front-End, etc.) and item pills.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleAddGroup} className="px-4 py-2.5 rounded-full border border-deep-navy/20 text-deep-navy text-xs font-semibold hover:bg-warm-beige-200">
            + Add Category
          </button>
          <button onClick={handleSaveAll} className="px-5 py-2.5 rounded-full bg-deep-navy text-warm-beige text-xs font-semibold uppercase tracking-wider flex items-center gap-2">
            <Save className="w-4 h-4 text-soft-gold" /> {isSaved ? 'Saved!' : 'Save All Skills'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillGroups.map((group, idx) => (
          <div key={idx} className="editorial-card rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between gap-2 border-b border-deep-navy/10 pb-3">
              <input
                type="text"
                value={group.category}
                onChange={(e) => handleGroupChange(idx, 'category', e.target.value)}
                className="font-display font-bold text-base text-deep-navy bg-warm-beige-100 p-2 rounded-lg border border-warm-beige-300 w-full"
              />
              <button onClick={() => handleDeleteGroup(idx)} className="p-2 rounded bg-rose-100 text-rose-700 hover:bg-rose-200">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-bold uppercase tracking-wider text-deep-navy/70">Skill Items (comma separated)</label>
              <textarea
                rows="3"
                value={group.items.join(', ')}
                onChange={(e) => handleItemsChange(idx, e.target.value)}
                className="w-full p-3 rounded-xl bg-warm-beige-100 border border-warm-beige-300 font-sans"
              />
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {group.items.map((item, i) => (
                <span key={i} className="text-xs px-2.5 py-0.5 rounded-full bg-warm-beige-200 text-deep-navy font-medium border border-warm-beige-300">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSkills;
