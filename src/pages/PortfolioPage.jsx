import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, X, Sparkles } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
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
        className="relative w-full max-w-6xl max-h-[90vh] bg-paper-cream rounded-[2rem] shadow-2xl flex flex-col md:flex-row overflow-hidden border border-warm-beige-300"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/30 hover:bg-rose-100 text-deep-navy hover:text-rose-600 rounded-full transition-colors z-20 backdrop-blur-md shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left side: Images */}
        <div className="w-full md:w-3/5 bg-warm-beige-200 relative overflow-y-auto flex flex-col items-center p-6 md:p-8 border-b md:border-b-0 md:border-r border-warm-beige-300">
          {images.length > 0 ? (
            <div className="space-y-6 w-full max-w-3xl mx-auto">
              {images.map((url, idx) => (
                <div key={idx} className="rounded-xl overflow-hidden bg-white shadow-sm border border-warm-beige-300 w-full flex justify-center items-center">
                   <img src={url.trim()} alt={`${project.title} - Image ${idx + 1}`} className="w-full h-auto object-contain" loading="lazy" />
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full w-full flex items-center justify-center text-deep-navy/40 py-20">
              <p className="text-sm font-light">No images available for this project yet.</p>
            </div>
          )}
        </div>

        {/* Right side: Details */}
        <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col overflow-y-auto bg-paper-cream">
          <div className="mb-6 border-b border-warm-beige-300 pb-6 pr-8">
            <p className="text-xs text-deep-navy/60 uppercase tracking-widest font-bold mb-1">{project.category}</p>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-deep-navy leading-tight">
              {project.title}
            </h2>
          </div>

          <div className="flex-grow space-y-6">
            {(project.overview || project.shortDescription) && (
              <div>
                <h4 className="text-xs uppercase tracking-widest text-soft-gold-700 font-bold mb-3">Deskripsi Proyek</h4>
                <p className="text-sm sm:text-base text-deep-navy/80 font-light leading-relaxed">
                  {project.overview || project.shortDescription}
                </p>
              </div>
            )}
            
            {project.tools && project.tools.length > 0 && (
              <div className="pt-6 border-t border-warm-beige-300">
                <h4 className="text-xs uppercase tracking-widest text-soft-gold-700 font-bold mb-3">Tools & Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool, i) => (
                    <span key={i} className="text-xs px-3 py-1.5 rounded-full bg-warm-beige-200 text-deep-navy border border-warm-beige-300 shadow-sm font-medium">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {project.link && (
               <div className="pt-6 border-t border-warm-beige-300">
                 <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-deep-navy text-warm-beige hover:bg-soft-gold hover:text-deep-navy transition-colors text-sm font-semibold shadow-md">
                    Visit Live Project <ArrowRight className="w-4 h-4" />
                 </a>
               </div>
            )}
          </div>
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
      // Pin featured project to the top
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;

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
    <>
      <SEO
        title="Portfolio | Gina Salma Sabilla — UI/UX & Graphic Design Case Studies"
        description="Jelajahi kumpulan karya UI/UX Design, Graphic Design, dan Web Design oleh Gina Salma Sabilla. Case studies mencakup produk digital, brand identity, dan web applications."
        keywords="UI/UX Design Portfolio, Graphic Design Portfolio, Gina Salma Sabilla, Case Studies, Figma Design, Web Design, Jakarta Designer Portfolio"
        url="https://gina-portfolio-delta.vercel.app/portfolio"
        type="website"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": "https://gina-portfolio-delta.vercel.app/portfolio#collectionpage",
          "url": "https://gina-portfolio-delta.vercel.app/portfolio",
          "name": "Portfolio — Gina Salma Sabilla",
          "description": "Koleksi karya UI/UX Design, Graphic Design, dan Web Design oleh Gina Salma Sabilla.",
          "author": { "@id": "https://gina-portfolio-delta.vercel.app/#person" },
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://gina-portfolio-delta.vercel.app/" },
              { "@type": "ListItem", "position": 2, "name": "Portfolio", "item": "https://gina-portfolio-delta.vercel.app/portfolio" }
            ]
          }
        })}</script>
      </Helmet>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-12">
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

                  {project.isFeatured && (
                    <motion.div 
                      initial={{ rotate: -3 }}
                      animate={{ 
                        rotate: [-3, 3, -3],
                        y: [0, -3, 0]
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute bottom-4 right-4 z-20"
                    >
                      <div className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-gradient-to-br from-amber-200 via-yellow-300 to-orange-300 text-orange-950 text-[11px] font-black uppercase tracking-widest shadow-xl shadow-orange-500/20 border-2 border-white">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1], rotate: [0, 15, -15, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Sparkles className="w-4 h-4 text-orange-700" fill="currentColor" />
                        </motion.div>
                        <span className="drop-shadow-sm">Top Pick!</span>
                      </div>
                    </motion.div>
                  )}

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
    </>
  );
};

export default PortfolioPage;
