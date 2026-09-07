import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { 
  ArrowLeft, Calendar, User, Layout, 
  MapPin, Clock, PenTool, ExternalLink,
  ChevronRight, Sparkles, Layers, Target,
  Image as ImageIcon, List
} from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';
import SEO from '../components/SEO';

// ─── Animation Wrappers ───
const FadeIn = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    className={className}
  >
    {children}
  </motion.div>
);

// ─── Base Components ───
const SectionLabel = ({ number, title, icon: Icon }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-soft-gold/20 border border-soft-gold/30">
      {Icon && <Icon className="w-3.5 h-3.5 text-soft-gold-700" />}
      <span className="text-xs font-black text-soft-gold-800 tracking-widest uppercase">{number}</span>
    </div>
    <div className="h-px bg-warm-beige-300 flex-1"></div>
  </div>
);

const SectionTitle = ({ children }) => (
  <h2 className="text-3xl md:text-5xl font-display font-bold text-deep-navy mb-8 leading-tight tracking-tight">
    {children}
  </h2>
);

const HighlightCard = ({ title, children, icon: Icon, color = 'gold' }) => {
  const themes = {
    gold: 'bg-gradient-to-br from-warm-beige-50 to-warm-beige-100 border-soft-gold/20',
    navy: 'bg-gradient-to-br from-deep-navy/5 to-deep-navy/10 border-deep-navy/10',
    white: 'bg-white border-warm-beige-200'
  };
  return (
    <div className={`${themes[color]} border rounded-[2rem] p-8 md:p-10 shadow-lg hover:shadow-xl transition-all duration-500`}>
      <div className="flex items-center gap-4 mb-6">
        {Icon && (
          <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-deep-navy">
            <Icon className="w-6 h-6" />
          </div>
        )}
        <h3 className="text-xl md:text-2xl font-display font-bold text-deep-navy">{title}</h3>
      </div>
      <div className="text-deep-navy/80 font-light leading-relaxed text-base md:text-lg">
        {children}
      </div>
    </div>
  );
};

const FullImage = ({ src, alt, caption }) => {
  if (!src) return null;
  // Handle caption whether it's a string or array
  const displayCaption = Array.isArray(caption) ? caption[0] : caption;
  
  return (
    <figure className="my-16 group">
      <div className="rounded-[2.5rem] overflow-hidden bg-warm-beige-100 shadow-2xl border border-warm-beige-200 relative">
        <img src={src} alt={alt || "Project Image"} className="w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
        <div className="absolute inset-0 bg-deep-navy/0 group-hover:bg-deep-navy/5 transition-colors duration-500"></div>
      </div>
      {displayCaption && (
        <figcaption className="text-center text-sm font-light text-deep-navy/60 mt-6 max-w-2xl mx-auto italic">
          {displayCaption}
        </figcaption>
      )}
    </figure>
  );
};

const ImageGrid = ({ images = [], captions, cols = 2 }) => {
  const imgArray = Array.isArray(images) ? images : (images ? String(images).split('\n') : []);
  if (!imgArray || imgArray.length === 0) return null;
  
  const captionArray = Array.isArray(captions) ? captions : (captions ? String(captions).split('\n') : []);
  
  return (
    <div className="my-16">
      {imgArray.length <= 2 ? (
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
          {imgArray.map((url, i) => {
            if (!url || typeof url !== 'string' || !url.trim()) return null;
            return (
              <figure key={i} className="group relative">
                <div className="rounded-3xl overflow-hidden bg-warm-beige-100 shadow-lg border border-warm-beige-200">
                  <img src={url.trim()} alt={`Gallery ${i + 1}`} className="max-w-full h-auto max-h-[700px] object-contain transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                </div>
                {captionArray[i] && (
                  <figcaption className="text-sm font-light text-deep-navy/60 mt-4 px-2 text-center">
                    {captionArray[i]}
                  </figcaption>
                )}
              </figure>
            );
          })}
        </div>
      ) : (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {imgArray.map((url, i) => {
            if (!url || typeof url !== 'string' || !url.trim()) return null;
            return (
              <figure key={i} className="break-inside-avoid group relative">
                <div className="rounded-3xl overflow-hidden bg-warm-beige-100 shadow-lg border border-warm-beige-200">
                  <img src={url.trim()} alt={`Gallery ${i + 1}`} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                </div>
                {captionArray[i] && (
                  <figcaption className="text-sm font-light text-deep-navy/60 mt-4 px-2 text-center">
                    {captionArray[i]}
                  </figcaption>
                )}
              </figure>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ─── Section Navigation Hook ───
const useSectionNavigation = (sectionIds) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds]);

  return activeSection;
};

// ─── Sidebar Info Item ───
const SidebarInfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="w-8 h-8 rounded-lg bg-warm-beige-100 flex items-center justify-center flex-shrink-0 text-deep-navy/70">
      <Icon className="w-4 h-4" />
    </div>
    <div className="min-w-0">
      <p className="text-[10px] font-black uppercase tracking-widest text-deep-navy/40 mb-0.5">{label}</p>
      <p className="font-semibold text-deep-navy text-sm leading-snug">{value}</p>
    </div>
  </div>
);

// ─── Main Component ───
const PortfolioDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects } = useData();
  const [project, setProject] = useState(null);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    window.scrollTo(0, 0);
    const found = projects.find(p => p.id === id);
    if (found) setProject(found);
  }, [id, projects]);

  // Build sections list for navigation and rendering (auto-migrating legacy formats)
  const normalizedSections = useMemo(() => {
    if (!project) return [];
    
    // If it's a dynamic template (saved from the new CMS), strictly use its sections array, even if empty.
    if (project.templateType === 'dynamic') {
      return Array.isArray(project.sections) ? project.sections : [];
    }
    
    // For legacy templates, if they somehow already have sections, prioritize them
    if (project.sections && Array.isArray(project.sections) && project.sections.length > 0) {
      return project.sections;
    }

    const s = [];
    const pushSection = (id, title, content, images, highlight = false, color = 'white') => {
      const validImages = (images || []).filter(Boolean);
      if (!content && validImages.length === 0) return;
      s.push({
        id, title, content, images: validImages, useHighlight: highlight, highlightColor: color
      });
    };

    if (project.templateType === 'graphic-design' || (!project.templateType && project.category === 'Graphic Design')) {
      pushSection('sec-overview', 'Overview', project.overview, [project.overviewImageGD]);
      pushSection('sec-brief', 'Creative Brief', project.creativeBrief, [project.briefImage], true, 'white');
      pushSection('sec-direction', 'Design Direction', project.designDirection, [project.moodboardImage]);
      pushSection('sec-exploration', 'Visual Exploration', project.visualExploration, project.explorationImages);
      pushSection('sec-dev', 'Design Development', project.designDevelopment, [project.devBeforeImage, project.devAfterImage]);
      pushSection('sec-final', 'Final Design', project.finalDesign, [project.finalHeroImage, ...(project.finalGalleryImages || [])]);
      pushSection('sec-context', 'Design in Context', project.mockups, project.mockupImages);
      pushSection('sec-assets', 'Assets & System', project.designAssets, [project.assetsImage], true, 'navy');
      pushSection('sec-deliverables', 'Deliverables', project.deliverables, project.deliverablesImages);
      pushSection('sec-outcome', 'Outcome', project.outcome, [project.outcomeImageGD], true, 'gold');
      pushSection('sec-reflection', 'Reflection', project.reflection, [project.reflectionImageGD], true, 'white');
    } else if (project.templateType === 'ui-ux' || (!project.templateType && project.category !== 'Graphic Design' && project.templateType !== 'gallery')) {
      pushSection('sec-overview', 'Overview', project.overview, [project.overviewImage]);
      pushSection('sec-problem', 'The Problem', project.problem, [project.problemImage], true, 'navy');
      pushSection('sec-goals', 'Design Goals', project.designGoals, [project.goalsImage], true, 'gold');
      pushSection('sec-research', 'User Research', project.userResearch, [project.researchImage]);
      pushSection('sec-findings', 'Research Findings', project.researchFindings, [project.findingsImage], true, 'white');
      pushSection('sec-persona', 'User Persona', project.userPersona, [project.personaImage]);
      pushSection('sec-define', 'Define (HMW)', project.defineProblem, [project.defineImage], true, 'gold');
      pushSection('sec-architecture', 'Architecture & Flow', project.infoArchitecture || project.userFlow, [project.sitemapImage, project.userFlowImage]);
      pushSection('sec-wireframes', 'Wireframes', project.wireframes, [project.wireframeLowImage, project.wireframeHighImage]);
      pushSection('sec-designsystem', 'Design System', project.designSystem, [project.designSystemImage], true, 'white');
      pushSection('sec-hifi', 'High Fidelity', project.highFidelity, [project.hifiHeroImage, ...(project.hifiScreenImages || [])]);
      pushSection('sec-testing', 'Usability Testing', project.usabilityTesting, [project.testingImage]);
      pushSection('sec-iteration', 'Design Iteration', project.designIteration, [project.iterationBeforeImage, project.iterationAfterImage], true, 'navy');
      pushSection('sec-finalsolution', 'Final Solution', project.finalSolution, [project.finalSolutionImage, ...(project.showcaseImages || [])]);
      pushSection('sec-outcome', 'Outcome', project.outcome, [project.outcomeImage], true, 'gold');
      pushSection('sec-reflection', 'Reflection', project.reflection, [project.reflectionImage], true, 'white');
    }
    
    return s;
  }, [project]);

  const sections = useMemo(() => {
    if (project?.templateType === 'gallery') {
      const s = [];
      if (project.overview) s.push({ id: 'sec-overview', label: 'Overview' });
      if (project.gallery?.length) s.push({ id: 'sec-gallery', label: 'Gallery' });
      return s;
    }
    return normalizedSections.map((sec, i) => ({
      id: sec.id || `sec-${i}`,
      label: sec.title
    }));
  }, [project, normalizedSections]);

  const sectionIds = useMemo(() => sections.map(s => s.id), [sections]);
  const activeSection = useSectionNavigation(sectionIds);

  const scrollToSection = useCallback((sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen bg-paper-cream flex items-center justify-center flex-col">
        <div className="w-16 h-16 border-4 border-soft-gold border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-deep-navy/60 font-light tracking-widest uppercase">Memuat Case Study...</p>
      </div>
    );
  }

  const isGallery = project.templateType === 'gallery';

  const renderText = (text) => {
    if (!text) return null;
    return text.split('\n').map((paragraph, idx) => (
      <p key={idx} className="mb-6 last:mb-0">
        {paragraph}
      </p>
    ));
  };

  // ─── Sidebar Component ───
  const Sidebar = () => (
    <aside className="hidden lg:block w-64 flex-shrink-0">
      <div className="sticky top-28 space-y-8">
        {/* Project Info */}
        <div className="bg-white rounded-2xl border border-warm-beige-200 p-6 shadow-sm space-y-5">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-deep-navy/40 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-soft-gold"></div>
            Project Info
          </h4>
          <div className="space-y-4">
            <SidebarInfoItem icon={User} label="Role" value={project.role || 'Designer'} />
            <SidebarInfoItem icon={Calendar} label="Timeline" value={project.timeline || project.date} />
            {project.platform && (
              <SidebarInfoItem icon={Layout} label="Platform" value={project.platform} />
            )}
            {project.team && (
              <SidebarInfoItem icon={Target} label="Team" value={project.team} />
            )}
          </div>
          {project.tools && project.tools.length > 0 && (
            <div className="pt-4 border-t border-warm-beige-200">
              <p className="text-[10px] font-black uppercase tracking-widest text-deep-navy/40 mb-3 flex items-center gap-2">
                <PenTool className="w-3 h-3" /> Tools
              </p>
              <div className="flex flex-wrap gap-1.5">
                {Array.isArray(project.tools) ? project.tools.map(tool => (
                  <span key={tool} className="px-2.5 py-1 bg-warm-beige-100 rounded-lg text-[11px] font-semibold text-deep-navy/80 border border-warm-beige-200">
                    {tool}
                  </span>
                )) : (
                  <span className="px-2.5 py-1 bg-warm-beige-100 rounded-lg text-[11px] font-semibold text-deep-navy/80 border border-warm-beige-200">
                    {project.tools}
                  </span>
                )}
              </div>
            </div>
          )}
          {project.liveUrl && (
            <div className="pt-4 border-t border-warm-beige-200">
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-bold text-deep-navy hover:text-soft-gold-600 transition-colors">
                <ExternalLink className="w-3.5 h-3.5 text-soft-gold" /> View Live Project
              </a>
            </div>
          )}
        </div>

        {/* Section Navigation */}
        {sections.length > 0 && (
          <div className="bg-white rounded-2xl border border-warm-beige-200 p-6 shadow-sm">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-deep-navy/40 mb-4 flex items-center gap-2">
              <List className="w-3 h-3" /> On This Page
            </h4>
            <nav className="space-y-1">
              {sections.map((section, i) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-2 group ${
                    activeSection === section.id
                      ? 'bg-soft-gold/15 text-deep-navy font-bold border-l-2 border-soft-gold'
                      : 'text-deep-navy/55 hover:text-deep-navy hover:bg-warm-beige-100'
                  }`}
                >
                  <span className={`text-[9px] font-black w-5 ${activeSection === section.id ? 'text-soft-gold-600' : 'text-deep-navy/30'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {section.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </aside>
  );

  // ─── Mobile Section Nav (sticky horizontal) ───
  const MobileSectionNav = () => {
    if (sections.length === 0) return null;
    return (
      <div className="lg:hidden sticky top-[60px] z-30 bg-paper-cream/95 backdrop-blur-md border-b border-warm-beige-200 -mx-6 px-4 py-2.5 mb-8 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 min-w-max">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all ${
                activeSection === section.id
                  ? 'bg-deep-navy text-warm-beige shadow-sm'
                  : 'text-deep-navy/50 bg-warm-beige-100 hover:bg-warm-beige-200'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // ─── Mobile Info Panel ───
  const MobileInfoPanel = () => (
    <div className="lg:hidden bg-white rounded-2xl border border-warm-beige-200 p-5 shadow-sm mb-10">
      <div className="grid grid-cols-2 gap-4">
        <SidebarInfoItem icon={User} label="Role" value={project.role || 'Designer'} />
        <SidebarInfoItem icon={Calendar} label="Timeline" value={project.timeline || project.date} />
        {project.platform && <SidebarInfoItem icon={Layout} label="Platform" value={project.platform} />}
        {project.team && <SidebarInfoItem icon={Target} label="Team" value={project.team} />}
      </div>
      {project.tools && project.tools.length > 0 && (
        <div className="mt-4 pt-4 border-t border-warm-beige-200">
          <div className="flex flex-wrap gap-1.5">
            {project.tools.map(tool => (
              <span key={tool} className="px-2.5 py-1 bg-warm-beige-100 rounded-lg text-[11px] font-semibold text-deep-navy/80 border border-warm-beige-200">
                {tool}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <main className="bg-paper-cream min-h-screen selection:bg-soft-gold selection:text-deep-navy">
      <SEO 
        title={`${project.title} | Gina — UI/UX Designer`} 
        description={project.shortDescription || project.overview} 
        image={project.heroImage || project.thumbnail} 
      />
      {/* Scroll Progress Bar */}
      <motion.div style={{ scaleX, transformOrigin: "0%" }} className="fixed top-0 left-0 right-0 h-1 bg-soft-gold z-50 rounded-r-full" />

      {/* Floating Back Button */}
      <div className="fixed top-6 left-6 md:top-10 md:left-10 z-40">
        <button onClick={() => navigate('/portfolio')} 
          className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-white flex items-center justify-center text-deep-navy hover:bg-deep-navy hover:text-warm-beige transition-all duration-300 group">
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
        </button>
      </div>

      {/* ═══════ CLEAN HERO SECTION ═══════ */}
      <header className="relative pt-32 pb-16 md:pt-44 md:pb-24 px-6 min-h-[60vh] flex flex-col justify-end overflow-hidden">
        {(() => {
          const heroSrc = project.heroImage || project.thumbnail || (project.gallery && project.gallery[0]);
          return heroSrc ? (
            <>
              <div className="absolute inset-0">
                <img src={heroSrc} alt={`${project.title} Hero`} className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/70 to-deep-navy/20" />
            </>
          ) : (
            <div className="absolute inset-0 bg-deep-navy" />
          );
        })()}
        
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm mb-6 flex-wrap max-w-full">
              <span className="w-2 h-2 rounded-full bg-soft-gold animate-pulse flex-shrink-0"></span>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-white/90">
                {Array.isArray(project.tags) ? project.tags.join(' • ') : (project.tags || 'Portfolio Project')}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.1] tracking-tight mb-6 max-w-4xl">
              {project.title}
            </h1>
            {project.shortDescription && (
              <p className="text-lg md:text-xl text-white/70 font-light max-w-3xl leading-relaxed">
                {project.shortDescription}
              </p>
            )}
          </FadeIn>
        </div>
      </header>

      {/* ═══════ CONTENT WITH SIDEBAR ═══════ */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex gap-12">
        {/* Sticky Sidebar (Desktop) */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Mobile Info Panel */}
          <MobileInfoPanel />
          
          {/* Mobile Section Nav */}
          <MobileSectionNav />

          {/* ═══════ GALLERY TEMPLATE ═══════ */}
          {isGallery && (
            <article className="pb-20 space-y-20">
              {project.overview && (
                <FadeIn>
                  <div id="sec-overview" className="scroll-mt-28">
                    <p className="text-xl md:text-3xl text-deep-navy font-light leading-relaxed text-center">
                      {project.overview}
                    </p>
                  </div>
                </FadeIn>
              )}

              {project.gallery && project.gallery.length > 0 && (
                <FadeIn>
                  <div id="sec-gallery" className="scroll-mt-28">
                    <div className="columns-1 md:columns-2 gap-6 space-y-6">
                      {(Array.isArray(project.gallery) ? project.gallery : [project.gallery]).map((url, i) => {
                        if (!url || typeof url !== 'string' || !url.trim()) return null;
                        return (
                          <div key={i} className="break-inside-avoid group rounded-3xl overflow-hidden bg-warm-beige-100 shadow-lg border border-warm-beige-200 relative">
                            <img src={url.trim()} alt={`Gallery ${i}`} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                            <div className="absolute inset-0 bg-deep-navy/0 group-hover:bg-deep-navy/10 transition-colors duration-500"></div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </FadeIn>
              )}
            </article>
          )}

          {/* ═══════ DYNAMIC TEMPLATE ═══════ */}
          {project.templateType !== 'gallery' && normalizedSections.length > 0 && (
            <article className="pb-20 space-y-28 md:space-y-40">
              {normalizedSections.map((section, idx) => (
                <FadeIn key={section.id || idx}>
                  <div id={section.id || `sec-${idx}`} className="scroll-mt-28">
                    <SectionLabel number={String(idx + 1).padStart(2, '0')} title={section.title} />
                    
                    {section.useHighlight ? (
                      <HighlightCard title={section.title} color={section.highlightColor || 'white'}>
                        {renderText(section.content)}
                      </HighlightCard>
                    ) : (
                      <>
                        <SectionTitle>{section.title}</SectionTitle>
                        <div className="text-lg md:text-xl text-deep-navy/80 font-light leading-relaxed mb-12">
                          {renderText(section.content)}
                        </div>
                      </>
                    )}

                    {section.images && section.images.length === 1 && (
                      <FullImage src={section.images[0]} caption={section.captions?.[0]} />
                    )}
                    
                    {section.images && section.images.length > 1 && (
                      <ImageGrid images={section.images} captions={section.captions} cols={section.images.length === 2 ? 2 : 2} />
                    )}
                  </div>
                </FadeIn>
              ))}
            </article>
          )}
        </div>
      </div>

      {/* ═══════ MORE PROJECTS ═══════ */}
      <section className="bg-paper-cream py-24 md:py-32 px-6 border-t border-warm-beige-300">
        <FadeIn>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-soft-gold font-bold tracking-[0.3em] uppercase text-xs mb-3">Explore More</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-deep-navy">Project Lainnya</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(() => {
                const others = projects.filter(p => p.id !== id && p.status !== 'draft');
                const recommended = others.slice(0, 3);
                return recommended.map(p => (
                  <button
                    key={p.id}
                    onClick={() => { window.scrollTo(0, 0); navigate(`/portfolio/${p.id}`); }}
                    className="group text-left editorial-card rounded-2xl overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className="relative h-48 overflow-hidden bg-warm-beige-200">
                      <img
                        src={p.thumbnail || (p.gallery && p.gallery[0])}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-3 left-3">
                        {p.tags && p.tags.length > 0 && (
                          <span className="px-3 py-1 rounded-full bg-deep-navy/80 backdrop-blur-sm text-warm-beige text-[10px] font-bold uppercase tracking-widest">
                            {p.tags[0]}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-5 flex-grow flex flex-col justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-display font-bold text-deep-navy group-hover:text-soft-gold-600 transition-colors leading-snug mb-2">
                          {p.title}
                        </h3>
                        <p className="text-xs text-deep-navy/60 line-clamp-2 font-light leading-relaxed">
                          {p.shortDescription || p.overview}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-soft-gold text-xs font-bold mt-2">
                        <span>Lihat Project</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </button>
                ));
              })()}
            </div>
          </div>
        </FadeIn>
      </section>

    </main>
  );
};

export default PortfolioDetail;
