import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { 
  ArrowLeft, Calendar, User, Layout, 
  MapPin, Clock, PenTool, ExternalLink,
  ChevronRight, Sparkles, Layers, Target,
  Image as ImageIcon
} from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';

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

const InfoPill = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-4">
    <div className="w-10 h-10 rounded-xl bg-warm-beige-100 flex items-center justify-center flex-shrink-0 text-deep-navy">
      <Icon className="w-5 h-5" />
    </div>
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-deep-navy/50 mb-1">{label}</p>
      <p className="font-bold text-deep-navy text-sm">{value}</p>
    </div>
  </div>
);

const FullImage = ({ src, alt, caption }) => {
  if (!src) return null;
  return (
    <figure className="my-16 group">
      <div className="rounded-[2.5rem] overflow-hidden bg-warm-beige-100 shadow-2xl border border-warm-beige-200 relative">
        <img src={src} alt={alt} className="w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
        <div className="absolute inset-0 bg-deep-navy/0 group-hover:bg-deep-navy/5 transition-colors duration-500"></div>
      </div>
      {caption && (
        <figcaption className="text-center text-sm font-light text-deep-navy/60 mt-6 max-w-2xl mx-auto italic">
          {caption}
        </figcaption>
      )}
    </figure>
  );
};

const ImageGrid = ({ images = [], captions, cols = 2 }) => {
  const imgArray = Array.isArray(images) ? images : (images ? images.split('\n') : []);
  if (!imgArray || imgArray.length === 0) return null;
  const captionArray = captions ? captions.split('\n') : [];
  
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${cols} gap-6 md:gap-8 my-16`}>
      {imgArray.map((url, i) => {
        if (!url.trim()) return null;
        return (
          <figure key={i} className="group">
            <div className="rounded-3xl overflow-hidden bg-warm-beige-100 shadow-lg border border-warm-beige-200 h-full relative">
              <img src={url.trim()} alt={`Gallery ${i}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
            </div>
            {captionArray[i] && (
              <figcaption className="text-sm font-light text-deep-navy/60 mt-4 px-2">
                {captionArray[i]}
              </figcaption>
            )}
          </figure>
        );
      })}
    </div>
  );
};

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

  if (!project) {
    return (
      <div className="min-h-screen bg-paper-cream flex items-center justify-center flex-col">
        <div className="w-16 h-16 border-4 border-soft-gold border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-deep-navy/60 font-light tracking-widest uppercase">Memuat Case Study...</p>
      </div>
    );
  }

  const isDesign = project.templateType === 'graphic-design' || (project.category === 'Graphic Design' && !project.templateType);
  const isGallery = project.templateType === 'gallery';
  const isUIUX = project.templateType === 'ui-ux' || (!isDesign && !isGallery);

  const renderText = (text) => {
    if (!text) return null;
    return text.split('\n').map((paragraph, idx) => (
      <p key={idx} className="mb-6 last:mb-0">
        {paragraph}
      </p>
    ));
  };

  // Current project index (for recommendation filtering)
  const currentIndex = projects.findIndex(p => p.id === id);

  return (
    <main className="bg-paper-cream min-h-screen selection:bg-soft-gold selection:text-deep-navy">
      {/* Scroll Progress Bar */}
      <motion.div style={{ scaleX, transformOrigin: "0%" }} className="fixed top-0 left-0 right-0 h-1.5 bg-soft-gold z-50 rounded-r-full" />

      {/* Floating Back Button */}
      <div className="fixed top-6 left-6 md:top-10 md:left-10 z-40">
        <button onClick={() => navigate('/portfolio')} 
          className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md shadow-lg border border-white flex items-center justify-center text-deep-navy hover:bg-deep-navy hover:text-warm-beige transition-all duration-300 group">
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
        </button>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 01: HERO & META (IMMERSIVE IMAGE BACKGROUND)
      ────────────────────────────────────────────────────────────── */}
      <header className="relative pt-40 pb-20 md:pt-56 md:pb-32 px-6 min-h-[80vh] flex flex-col justify-end overflow-hidden mb-20">
        {(() => {
          const heroSrc = project.heroImage || project.thumbnail || (project.gallery && project.gallery[0]);
          return heroSrc ? (
            <>
              <div className="absolute inset-0">
                <img src={heroSrc} alt={`${project.title} Hero`} className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-deep-navy/80 to-deep-navy/30" />
            </>
          ) : (
            <div className="absolute inset-0 bg-deep-navy" />
          );
        })()}
        
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-sm mb-8">
              <span className="w-2 h-2 rounded-full bg-soft-gold animate-pulse"></span>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-white/90">
                {project.category} {project.subcategory ? `— ${project.subcategory}` : ''}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white leading-[1.1] tracking-tight mb-8 max-w-4xl">
              {project.title}
            </h1>
            {project.shortDescription && (
              <p className="text-xl md:text-2xl text-white/70 font-light max-w-3xl leading-relaxed">
                {project.shortDescription}
              </p>
            )}
          </FadeIn>

          <FadeIn delay={0.2} className="mt-12 md:mt-16">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 p-6 md:p-8 rounded-[2rem] bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
              
              {/* Custom Info Pills for Dark Background */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-white/50 mb-1">
                  <User className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Role</span>
                </div>
                <span className="text-sm font-bold text-white">{project.role || 'Designer'}</span>
              </div>
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-white/50 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Timeline</span>
                </div>
                <span className="text-sm font-bold text-white">{project.timeline || project.date}</span>
              </div>
              
              {project.platform && (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-white/50 mb-1">
                    <Layout className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Platform</span>
                  </div>
                  <span className="text-sm font-bold text-white">{project.platform}</span>
                </div>
              )}
              
              {project.team && (
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-white/50 mb-1">
                    <Target className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Team</span>
                  </div>
                  <span className="text-sm font-bold text-white">{project.team}</span>
                </div>
              )}

              {project.tools && project.tools.length > 0 && (
                <div className="col-span-2 lg:col-span-1 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-white/50 mb-1">
                    <PenTool className="w-4 h-4" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Tools</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tools.map(tool => (
                      <span key={tool} className="px-2 py-1 bg-white/10 rounded-md text-[10px] font-bold text-white">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          TEMPLATE 1: SIMPLE GALLERY
      ────────────────────────────────────────────────────────────── */}
      {isGallery && (
        <article className="max-w-4xl mx-auto px-6 pb-40">
           {project.overview && (
             <FadeIn className="max-w-4xl mx-auto mb-20 text-center">
                <p className="text-xl md:text-3xl text-deep-navy font-light leading-relaxed">
                  {project.overview}
                </p>
             </FadeIn>
           )}

           {project.gallery && project.gallery.length > 0 && (
             <FadeIn>
               {/* Masonry-like grid using columns */}
               <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                 {project.gallery.map((url, i) => {
                   if (!url.trim()) return null;
                   return (
                     <div key={i} className="break-inside-avoid group rounded-3xl overflow-hidden bg-warm-beige-100 shadow-lg border border-warm-beige-200 relative">
                       <img src={url.trim()} alt={`Gallery ${i}`} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                       <div className="absolute inset-0 bg-deep-navy/0 group-hover:bg-deep-navy/10 transition-colors duration-500"></div>
                     </div>
                   );
                 })}
               </div>
             </FadeIn>
           )}
        </article>
      )}


      {/* ─────────────────────────────────────────────────────────────
          TEMPLATE 2: GRAPHIC DESIGN
      ────────────────────────────────────────────────────────────── */}
      {isDesign && !isGallery && (
        <article className="max-w-4xl mx-auto px-6 pb-40 space-y-32 md:space-y-48">
          
          {project.overview && (
            <FadeIn>
              <SectionLabel number="01" title="Overview" />
              <SectionTitle>Project Overview</SectionTitle>
              <div className="text-lg md:text-2xl text-deep-navy/80 font-light leading-relaxed mb-12">
                {renderText(project.overview)}
              </div>
              <FullImage src={project.overviewImageGD} />
            </FadeIn>
          )}

          {project.creativeBrief && (
            <FadeIn>
              <SectionLabel number="02" title="Brief" />
              <HighlightCard title="The Creative Brief" color="white">
                {renderText(project.creativeBrief)}
              </HighlightCard>
              <FullImage src={project.briefImage} />
            </FadeIn>
          )}

          {(project.designDirection || project.moodboardImage) && (
            <FadeIn>
              <SectionLabel number="03" title="Direction" />
              <SectionTitle>Design Direction</SectionTitle>
              {project.designDirection && (
                <div className="text-lg md:text-xl text-deep-navy/80 font-light leading-relaxed mb-12">
                  {renderText(project.designDirection)}
                </div>
              )}
              <FullImage src={project.moodboardImage} caption="Moodboard & Visual Reference" />
            </FadeIn>
          )}

          {(project.visualExploration || project.explorationImages) && (
            <FadeIn>
              <SectionLabel number="04" title="Exploration" />
              <SectionTitle>Visual Exploration</SectionTitle>
              {project.visualExploration && (
                <div className="text-lg md:text-xl text-deep-navy/80 font-light leading-relaxed mb-12">
                  {renderText(project.visualExploration)}
                </div>
              )}
              <ImageGrid images={project.explorationImages} captions={project.explorationCaptions} cols={2} />
            </FadeIn>
          )}

          {(project.designDevelopment || project.devBeforeImage) && (
            <FadeIn>
              <SectionLabel number="05" title="Development" />
              <SectionTitle>Design Development</SectionTitle>
              {project.designDevelopment && (
                <div className="text-lg md:text-xl text-deep-navy/80 font-light leading-relaxed mb-12">
                  {renderText(project.designDevelopment)}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
                {project.devBeforeImage && (
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-deep-navy/50 mb-4">Initial Draft</h4>
                    <img src={project.devBeforeImage} alt="Draft" className="w-full rounded-[2rem] shadow-lg border border-warm-beige-200" />
                  </div>
                )}
                {project.devAfterImage && (
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-widest text-deep-navy/50 mb-4">Refinement</h4>
                    <img src={project.devAfterImage} alt="Refined" className="w-full rounded-[2rem] shadow-lg border border-warm-beige-200" />
                  </div>
                )}
              </div>
            </FadeIn>
          )}

          {(project.finalDesign || project.finalHeroImage) && (
            <FadeIn>
              <SectionLabel number="06" title="Final" />
              <SectionTitle>The Final Design</SectionTitle>
              {project.finalDesign && (
                <div className="text-lg md:text-xl text-deep-navy/80 font-light leading-relaxed mb-12">
                  {renderText(project.finalDesign)}
                </div>
              )}
              <FullImage src={project.finalHeroImage} />
              <ImageGrid images={project.finalGalleryImages} captions={project.finalGalleryCaptions} cols={2} />
            </FadeIn>
          )}

          {(project.mockups || project.mockupImages) && (
            <FadeIn>
              <SectionLabel number="07" title="Context" />
              <SectionTitle>Design in Context</SectionTitle>
              {project.mockups && (
                <div className="text-lg md:text-xl text-deep-navy/80 font-light leading-relaxed mb-12">
                  {renderText(project.mockups)}
                </div>
              )}
              <ImageGrid images={project.mockupImages} captions={project.mockupCaptions} cols={1} />
            </FadeIn>
          )}

          {(project.designAssets || project.assetsImage) && (
            <FadeIn>
              <SectionLabel number="08" title="Assets" />
              <HighlightCard title="Design System & Assets" color="navy">
                {renderText(project.designAssets)}
              </HighlightCard>
              <FullImage src={project.assetsImage} />
            </FadeIn>
          )}

          {(project.deliverables || project.deliverablesImages) && (
            <FadeIn>
              <SectionLabel number="09" title="Deliverables" />
              <SectionTitle>Final Deliverables</SectionTitle>
              {project.deliverables && (
                <div className="text-lg md:text-xl text-deep-navy/80 font-light leading-relaxed mb-12">
                  {renderText(project.deliverables)}
                </div>
              )}
              <ImageGrid images={project.deliverablesImages} captions={project.deliverablesCaptions} cols={2} />
            </FadeIn>
          )}

          {(project.outcome || project.reflection) && (
            <FadeIn>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {project.outcome && (
                  <HighlightCard title="Outcome & Impact" color="gold">
                    {renderText(project.outcome)}
                  </HighlightCard>
                )}
                {project.reflection && (
                  <HighlightCard title="Reflection" color="white">
                    {renderText(project.reflection)}
                  </HighlightCard>
                )}
              </div>
              <FullImage src={project.outcomeImageGD || project.reflectionImageGD} />
            </FadeIn>
          )}

        </article>
      )}

      {/* ─────────────────────────────────────────────────────────────
          TEMPLATE 3: UI/UX
      ────────────────────────────────────────────────────────────── */}
      {isUIUX && !isGallery && (
        <article className="max-w-4xl mx-auto px-6 pb-40 space-y-32 md:space-y-48">
          
          {/* Phase 1: Discover */}
          <section className="space-y-32">
            <FadeIn>
              <div className="mb-20 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-deep-navy text-warm-beige">
                <Sparkles className="w-5 h-5 text-soft-gold" />
                <span className="font-bold tracking-widest uppercase text-sm">Phase 1: Discover & Empathize</span>
              </div>
              
              {project.overview && (
                <div className="mb-32">
                  <SectionLabel number="01" title="Overview" />
                  <SectionTitle>Project Overview</SectionTitle>
                  <div className="text-lg md:text-2xl text-deep-navy/80 font-light leading-relaxed">
                    {renderText(project.overview)}
                  </div>
                  <FullImage src={project.overviewImage} />
                </div>
              )}

              {(project.problem || project.designGoals) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                  {project.problem && (
                    <HighlightCard title="The Problem" color="navy">
                      {renderText(project.problem)}
                    </HighlightCard>
                  )}
                  {project.designGoals && (
                    <HighlightCard title="Design Goals" color="gold">
                      {renderText(project.designGoals)}
                    </HighlightCard>
                  )}
                </div>
              )}
              <FullImage src={project.problemImage || project.goalsImage} />
            </FadeIn>

            {(project.userResearch || project.researchFindings) && (
              <FadeIn>
                <SectionLabel number="02" title="Research" />
                <SectionTitle>User Research</SectionTitle>
                <div className="text-lg md:text-xl text-deep-navy/80 font-light leading-relaxed mb-12">
                  {renderText(project.userResearch)}
                </div>
                <FullImage src={project.researchImage} />
                
                {project.researchFindings && (
                  <div className="mt-20">
                    <HighlightCard title="Key Findings & Insights" color="white">
                      {renderText(project.researchFindings)}
                    </HighlightCard>
                    <FullImage src={project.findingsImage} />
                  </div>
                )}
              </FadeIn>
            )}

            {(project.userPersona) && (
              <FadeIn>
                <SectionLabel number="03" title="Persona" />
                <SectionTitle>User Persona</SectionTitle>
                <div className="text-lg md:text-xl text-deep-navy/80 font-light leading-relaxed mb-12">
                  {renderText(project.userPersona)}
                </div>
                <FullImage src={project.personaImage} />
              </FadeIn>
            )}
          </section>

          {/* Phase 2: Define & Ideate */}
          <section className="space-y-32">
            <FadeIn>
              <div className="mb-20 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-deep-navy text-warm-beige">
                <Layers className="w-5 h-5 text-soft-gold" />
                <span className="font-bold tracking-widest uppercase text-sm">Phase 2: Define & Ideate</span>
              </div>

              {project.defineProblem && (
                <div className="mb-32">
                  <SectionLabel number="04" title="Define" />
                  <HighlightCard title="How Might We...?" color="gold">
                    {renderText(project.defineProblem)}
                  </HighlightCard>
                  <FullImage src={project.defineImage} />
                </div>
              )}

              {(project.infoArchitecture || project.userFlow) && (
                <div className="mb-32">
                  <SectionLabel number="05" title="Architecture" />
                  <SectionTitle>Information Architecture & User Flow</SectionTitle>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {project.infoArchitecture && (
                      <div className="text-lg text-deep-navy/80 font-light">
                        <h4 className="font-bold text-deep-navy mb-4">Sitemap</h4>
                        {renderText(project.infoArchitecture)}
                      </div>
                    )}
                    {project.userFlow && (
                      <div className="text-lg text-deep-navy/80 font-light">
                        <h4 className="font-bold text-deep-navy mb-4">User Flow</h4>
                        {renderText(project.userFlow)}
                      </div>
                    )}
                  </div>
                  <FullImage src={project.sitemapImage} caption="Information Architecture" />
                  <FullImage src={project.userFlowImage} caption="Key User Flows" />
                </div>
              )}
            </FadeIn>
          </section>

          {/* Phase 3: Design & Prototype */}
          <section className="space-y-32">
            <FadeIn>
              <div className="mb-20 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-deep-navy text-warm-beige">
                <PenTool className="w-5 h-5 text-soft-gold" />
                <span className="font-bold tracking-widest uppercase text-sm">Phase 3: Design & Prototype</span>
              </div>

              {project.wireframes && (
                <div className="mb-32">
                  <SectionLabel number="06" title="Wireframing" />
                  <SectionTitle>Wireframes</SectionTitle>
                  <div className="text-lg md:text-xl text-deep-navy/80 font-light leading-relaxed mb-12">
                    {renderText(project.wireframes)}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
                    {project.wireframeLowImage && (
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-deep-navy/50 mb-4">Lo-Fi</h4>
                        <img src={project.wireframeLowImage} className="w-full rounded-[2rem] shadow-lg border border-warm-beige-200" alt="Lo-Fi" />
                      </div>
                    )}
                    {project.wireframeHighImage && (
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-deep-navy/50 mb-4">Mid/Hi-Fi</h4>
                        <img src={project.wireframeHighImage} className="w-full rounded-[2rem] shadow-lg border border-warm-beige-200" alt="Hi-Fi" />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {(project.designSystem || project.designSystemImage) && (
                <div className="mb-32">
                  <SectionLabel number="07" title="Design System" />
                  <HighlightCard title="Design System" color="white">
                    {renderText(project.designSystem)}
                  </HighlightCard>
                  <FullImage src={project.designSystemImage} />
                </div>
              )}

              {(project.highFidelity || project.hifiHeroImage) && (
                <div className="mb-32">
                  <SectionLabel number="08" title="High Fidelity" />
                  <SectionTitle>High-Fidelity Interface</SectionTitle>
                  <div className="text-lg md:text-xl text-deep-navy/80 font-light leading-relaxed mb-12">
                    {renderText(project.highFidelity)}
                  </div>
                  <FullImage src={project.hifiHeroImage} />
                  <ImageGrid images={project.hifiScreenImages} captions={project.hifiScreenCaptions} cols={2} />
                </div>
              )}
            </FadeIn>
          </section>

          {/* Phase 4: Test & Iterate */}
          <section className="space-y-32">
            <FadeIn>
              <div className="mb-20 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-deep-navy text-warm-beige">
                <Target className="w-5 h-5 text-soft-gold" />
                <span className="font-bold tracking-widest uppercase text-sm">Phase 4: Test & Iterate</span>
              </div>

              {(project.usabilityTesting || project.testingImage) && (
                <div className="mb-32">
                  <SectionLabel number="09" title="Testing" />
                  <SectionTitle>Usability Testing</SectionTitle>
                  <div className="text-lg md:text-xl text-deep-navy/80 font-light leading-relaxed mb-12">
                    {renderText(project.usabilityTesting)}
                  </div>
                  <FullImage src={project.testingImage} />
                </div>
              )}

              {(project.designIteration) && (
                <div className="mb-32">
                  <SectionLabel number="10" title="Iteration" />
                  <HighlightCard title="Design Iteration" color="navy">
                    {renderText(project.designIteration)}
                  </HighlightCard>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
                    {project.iterationBeforeImage && (
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-deep-navy/50 mb-4 text-rose-500">Before</h4>
                        <img src={project.iterationBeforeImage} className="w-full rounded-[2rem] shadow-lg border border-warm-beige-200" alt="Before" />
                      </div>
                    )}
                    {project.iterationAfterImage && (
                      <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-deep-navy/50 mb-4 text-emerald-500">After</h4>
                        <img src={project.iterationAfterImage} className="w-full rounded-[2rem] shadow-lg border border-warm-beige-200" alt="After" />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </FadeIn>
          </section>

          {/* Phase 5: Final & Outcome */}
          <section className="space-y-32">
            <FadeIn>
              <div className="mb-20 inline-flex items-center gap-3 px-6 py-3 rounded-full bg-deep-navy text-warm-beige">
                <Sparkles className="w-5 h-5 text-soft-gold" />
                <span className="font-bold tracking-widest uppercase text-sm">Final Delivery</span>
              </div>

              {(project.finalSolution || project.finalSolutionImage || project.showcaseImages) && (
                <div className="mb-32">
                  <SectionLabel number="11" title="Final Solution" />
                  <SectionTitle>The Final Product</SectionTitle>
                  <div className="text-lg md:text-xl text-deep-navy/80 font-light leading-relaxed mb-12">
                    {renderText(project.finalSolution)}
                  </div>
                  <FullImage src={project.finalSolutionImage} />
                  <ImageGrid images={project.showcaseImages} captions={project.showcaseCaptions} cols={1} />
                </div>
              )}

              {(project.outcome || project.keyLearnings || project.futureImprovements || project.reflection) && (
                <div>
                  <SectionLabel number="12" title="Conclusion" />
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {project.outcome && (
                      <HighlightCard title="Impact & Outcome" color="gold">
                        {renderText(project.outcome)}
                      </HighlightCard>
                    )}
                    {project.keyLearnings && (
                      <HighlightCard title="Key Learnings" color="white">
                        {renderText(project.keyLearnings)}
                      </HighlightCard>
                    )}
                    {project.futureImprovements && (
                      <HighlightCard title="Future Improvements" color="navy">
                        {renderText(project.futureImprovements)}
                      </HighlightCard>
                    )}
                    {project.reflection && (
                      <HighlightCard title="Final Reflection" color="white">
                        {renderText(project.reflection)}
                      </HighlightCard>
                    )}
                  </div>
                </div>
              )}
            </FadeIn>
          </section>

        </article>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MORE PROJECTS — Recommendation Cards
      ────────────────────────────────────────────────────────────── */}
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
                        <span className="px-3 py-1 rounded-full bg-deep-navy/80 backdrop-blur-sm text-warm-beige text-[10px] font-bold uppercase tracking-widest">
                          {p.category}
                        </span>
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
