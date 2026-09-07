import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, X } from 'lucide-react';
import { useData } from '../context/DataContext';
import { SparkleStar, EditorialFlourish } from '../components/common/BotanicalDecorations';
import SEO from '../components/SEO';

// ─── Modal for Gallery Template ───
const GalleryModal = ({ project, onClose }) => {
  if (!project) return null;

  // Build the image list from multiple possible sources
  let images = [];
  if (Array.isArray(project.gallery) && project.gallery.length > 0) {
    images = project.gallery.filter(url => url && url.trim());
  } else if (typeof project.gallery === 'string' && project.gallery.trim()) {
    images = project.gallery.split('\n').filter(url => url && url.trim());
  }
  // Always add thumbnail as first image if it exists and isn't already in the list
  if (project.thumbnail && !images.includes(project.thumbnail)) {
    images.unshift(project.thumbnail);
  }
  // Also add heroImage if available
  if (project.heroImage && !images.includes(project.heroImage)) {
    images.unshift(project.heroImage);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
      <div className="absolute inset-0 bg-deep-navy/80 backdrop-blur-md" onClick={onClose} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-5xl max-h-[90vh] bg-paper-cream rounded-[2rem] shadow-2xl flex flex-col overflow-hidden border border-warm-beige-300"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 md:p-8 border-b border-warm-beige-200 bg-white/50 backdrop-blur-sm z-10 flex-shrink-0">
          <div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-deep-navy mb-1">{project.title}</h2>
            <p className="text-xs text-deep-navy/60 uppercase tracking-widest font-bold">{project.category}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-3 bg-warm-beige-100 hover:bg-rose-100 text-deep-navy hover:text-rose-600 rounded-full transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 md:p-10 space-y-10">
          {(project.overview || project.shortDescription) && (
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <div className="w-12 h-1 bg-soft-gold/40 mx-auto rounded-full"></div>
              <p className="text-base md:text-xl text-deep-navy/80 font-light leading-relaxed">
                {project.overview || project.shortDescription}
              </p>
            </div>
          )}

          {images.length > 0 ? (
            <div className="space-y-8">
              {/* Featured First Image */}
              <div className="rounded-2xl overflow-hidden bg-deep-navy/5 shadow-inner border border-warm-beige-200 relative group flex justify-center items-center">
                <img src={images[0].trim()} alt={`${project.title} - Main`} className="w-full h-auto max-h-[75vh] object-contain object-center transition-transform duration-700 group-hover:scale-[1.02]" loading="lazy" />
              </div>

              {/* Remaining Images in Columns */}
              {images.length > 1 && (
                <div className="columns-1 sm:columns-2 lg:columns-2 gap-8 space-y-8">
                  {images.slice(1).map((url, idx) => (
                    <div key={idx} className="break-inside-avoid rounded-2xl overflow-hidden bg-deep-navy/5 shadow-sm border border-warm-beige-200 group flex justify-center items-center">
                      <img src={url.trim()} alt={`${project.title} - ${idx + 2}`} className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]" loading="lazy" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-20 text-deep-navy/40">
              <p className="text-sm font-light">Belum ada gambar untuk project ini.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const PortfolioPage = () => {
  const { projects } = useData();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for gallery modal
  const [selectedGalleryProject, setSelectedGalleryProject] = useState(null);

  // Generate dynamic categories from tags
  const tagsSet = new Set(['All']);
  projects.forEach(p => {
    if (p.tags && Array.isArray(p.tags)) {
      p.tags.forEach(tag => tagsSet.add(tag));
    }
  });
  const categories = Array.from(tagsSet);

  // Filter projects based on category and search query, and sort by date descending
  const filteredProjects = [...projects]
    .filter(project => {
      if (project.status === 'draft') return false;
      
      const hasSelectedTag = selectedCategory === 'All' || 
        (project.tags && project.tags.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase()));

      const matchesSearch = searchQuery === '' ||
        project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.shortDescription?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.tags && project.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))) ||
        project.tools?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return hasSelectedTag && matchesSearch;
    })
    .sort((a, b) => {
      // Sort by date (newest first)
      const dateA = new Date(a.date || 0).getTime();
      const dateB = new Date(b.date || 0).getTime();
      return dateB - dateA;
    });

  const handleProjectClick = (project) => {
    if (project.templateType === 'gallery') {
      setSelectedGalleryProject(project);
    } else {
      navigate(`/portfolio/${project.id}`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-12">
      <SEO title="Portfolio | Gina — UI/UX Designer" description="Explore my selected case studies, UI/UX design, and graphic design projects." />
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }} 
        className="text-center max-w-3xl mx-auto space-y-4"
      >
        <p className="text-xs uppercase tracking-widest text-soft-gold font-semibold">Curated Portfolio</p>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-deep-navy">
          Selected Works & Case Studies
        </h1>
        <p className="text-base text-deep-navy/70 font-light leading-relaxed">
          A showcase of UI/UX product designs, editorial typography, brand identities, and front-end web applications crafted with clarity and intention.
        </p>
        <EditorialFlourish />
      </motion.div>

      {/* Filter Tabs & Search Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, delay: 0.2 }} 
        className="space-y-6"
      >
        
        {/* Search */}
        <div className="max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-deep-navy/40 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects by title, tool, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-full bg-paper-cream/90 backdrop-blur-md border border-warm-beige-300 text-sm focus:outline-none focus:border-soft-gold text-deep-navy shadow-sm transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
                  active
                    ? 'bg-deep-navy text-warm-beige shadow-md'
                    : 'bg-white text-deep-navy/70 border border-warm-beige-300 hover:border-soft-gold hover:text-deep-navy'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Projects Grid */}
      <AnimatePresence mode="popLayout">
        {filteredProjects.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-center py-20 bg-white rounded-3xl border border-warm-beige-300 space-y-3"
          >
            <SparkleStar className="w-8 h-8 text-soft-gold mx-auto" />
            <p className="text-lg font-display font-bold text-deep-navy">No projects found</p>
            <p className="text-xs text-deep-navy/60">Try searching for a different keyword or switching categories.</p>
          </motion.div>
        ) : (
          <motion.div 
            layout 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project) => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={project.id} 
                whileHover={{ y: -8 }}
                onClick={() => handleProjectClick(project)}
                className="editorial-card rounded-2xl overflow-hidden flex flex-col group cursor-pointer"
              >
                
                {/* Thumbnail */}
                <div className="relative h-64 overflow-hidden bg-warm-beige-300">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 flex gap-2 flex-wrap max-w-[80%]">
                    {project.tags && project.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md ${idx === 0 ? 'badge-navy' : 'badge-gold'}`}>
                        {tag}
                      </span>
                    ))}
                    {project.tags && project.tags.length > 2 && (
                      <span className="px-3 py-1 rounded-full badge-white text-xs font-semibold backdrop-blur-md">
                        +{project.tags.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-xs text-soft-gold-600 font-semibold">{project.date}</span>
                    <h3 className="text-xl font-display font-bold text-deep-navy group-hover:text-soft-gold-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-deep-navy/70 line-clamp-3 leading-relaxed font-light">
                      {project.shortDescription || project.overview}
                    </p>
                  </div>

                  {/* Tools */}
                  {project.tools && project.tools.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tools.map((tool, i) => (
                        <span key={i} className="text-[11px] px-2.5 py-0.5 rounded bg-warm-beige-200 text-deep-navy/80 border border-warm-beige-300">
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Read / View CTA */}
                  <div className="pt-4 border-t border-deep-navy/5 flex items-center justify-between">
                    <span className="text-xs text-deep-navy/50 font-medium">{project.role || 'Case Study'}</span>
                    <span className="text-xs font-semibold text-deep-navy flex items-center gap-1 group-hover:gap-2 transition-all group-hover:text-soft-gold">
                      {project.templateType === 'gallery' ? 'View Gallery' : 'View Project'} <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gallery Modal */}
      <AnimatePresence>
        {selectedGalleryProject && (
          <GalleryModal 
            project={selectedGalleryProject} 
            onClose={() => setSelectedGalleryProject(null)} 
          />
        )}
      </AnimatePresence>

    </div>
  );
};

export default PortfolioPage;
