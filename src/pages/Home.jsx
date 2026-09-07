import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Award, Layers, Code, Palette, Smartphone, Compass, Eye, TrendingUp } from 'lucide-react';
import { useData } from '../context/DataContext';
import { 
  SparkleStar, 
  TinyFlower, 
  FloralBranch, 
  WildflowerCorner, 
  RoseSprig, 
  BotanicalHeaderFlourish, 
  FloatingPetal 
} from '../components/common/BotanicalDecorations';
import HeroOrbitPhoto from '../components/HeroOrbitPhoto';
import SEO from '../components/SEO';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

const SectionHeader = ({ eyebrow, title, className = '' }) => (
  <div className={`text-center max-w-2xl mx-auto space-y-3 ${className}`}>
    <p className="text-[11px] uppercase tracking-[0.2em] text-soft-gold-600 font-bold flex items-center justify-center gap-2">
      <span className="w-6 h-px bg-soft-gold-300 inline-block" />
      {eyebrow}
      <span className="w-6 h-px bg-soft-gold-300 inline-block" />
    </p>
    <h2 className="text-3xl md:text-4xl font-display font-bold text-deep-navy leading-tight">{title}</h2>
    <BotanicalHeaderFlourish />
  </div>
);

const Home = () => {
  const { settings, projects, blogPosts, certificates, achievements, skills } = useData();

  const featuredProjects = projects.filter(p => p.isFeatured || p.status === 'published').slice(0, 3);
  const latestPosts = blogPosts.filter(b => b.status === 'published').slice(0, 3);
  const recentCerts = certificates.slice(0, 3);
  const recentAchievements = achievements.slice(0, 2);

  const skillIcons = {
    'UI/UX Design':          Layers,
    'Graphic Design':        Palette,
    'Web Design':            Compass,
    'Front-End Development': Code,
    'Digital Product':       Smartphone,
    'Visual Design':         Eye,
  };

  const stats = [
    { value: `${projects.filter(p => p.status === 'published').length || 12}+`, label: 'Projects' },
    { value: `${certificates.length || 8}+`, label: 'Certificates' },
    { value: '3.64', label: 'GPA' },
    { value: `${achievements.length || 5}+`, label: 'Awards' },
  ];

  return (
    <div className="space-y-32 pb-24 relative overflow-hidden">
      <SEO />
      {/* ═══════════════════ HERO SECTION ═══════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-center pt-28 pb-16 md:pt-36 md:pb-24 px-5 md:px-10 max-w-7xl mx-auto">

        {/* Decorative background blobs */}
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-soft-gold/10 blur-3xl pointer-events-none" />
        <div className="absolute top-40 -right-20 w-72 h-72 rounded-full bg-botanical-sage/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-muted-rose/8 blur-3xl pointer-events-none" />

        {/* Botanical illustrations */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.75, rotate: -10 }} 
          animate={{ opacity: 0.65, scale: 1, rotate: 0 }} 
          transition={{ duration: 1.4, ease: 'backOut' }} 
          className="absolute -top-4 left-0 pointer-events-none"
        >
          <WildflowerCorner className="w-52 h-52 text-botanical-sage/50 animate-sway" />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 30 }} 
          animate={{ opacity: 0.6, x: 0 }} 
          transition={{ duration: 1.3, delay: 0.4 }} 
          className="absolute top-16 right-4 pointer-events-none"
        >
          <FloralBranch className="w-40 h-40 text-soft-gold-400" />
        </motion.div>
        <div className="absolute top-1/2 left-8 opacity-30 pointer-events-none">
          <FloatingPetal className="w-5 h-5 text-muted-rose animate-float-slow" style={{ animationDelay: '1s' }} />
        </div>
        <div className="absolute top-1/3 right-1/4 opacity-25 pointer-events-none">
          <FloatingPetal className="w-6 h-6 text-soft-gold animate-float-slow" style={{ animationDelay: '3.5s' }} />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center relative z-10"
        >
          {/* ── Left: Text Content ── */}
          <div className="lg:col-span-7 space-y-7">

            {/* Availability badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-paper-cream border border-warm-beige-300 shadow-editorial text-xs font-semibold text-botanical-sage-dark">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Open for Opportunities
              <span className="w-px h-3 bg-warm-beige-400" />
              <TinyFlower className="w-3.5 h-3.5 text-soft-gold animate-spin-slow" />
              Informatics Graduate & Digital Creator
            </motion.div>

            {/* Headline */}
            <motion.div variants={itemVariants} className="space-y-2">
              <p className="text-xl md:text-2xl font-serif italic text-soft-gold-600 flex items-center gap-2">
                Hi, I'm {settings.name || 'Gina'}.
                <SparkleStar className="w-5 h-5 text-soft-gold animate-pulse-subtle" />
              </p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-deep-navy leading-[1.08] tracking-tight">
                <span className="shimmer-text">
                  {settings.heroTitle || 'UI/UX Designer & Graphic Designer'}
                </span>
              </h1>
            </motion.div>

            <motion.p variants={itemVariants} className="text-base md:text-lg text-deep-navy/75 font-light leading-relaxed max-w-xl">
              {settings.intro || "I blend human-centered design, visual aesthetics, and informatics logic to create thoughtful digital products, elegant brand identities, and delightful interactive web experiences."}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 pt-2">
              <motion.div whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/portfolio"
                  className="px-7 py-3.5 rounded-full bg-deep-navy text-warm-beige font-bold text-sm hover:bg-deep-navy-800 transition-all shadow-editorial hover:shadow-glow-gold flex items-center gap-2 group"
                >
                  View My Work
                  <ArrowRight className="w-4 h-4 text-soft-gold transition-transform group-hover:translate-x-1.5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/about"
                  className="px-7 py-3.5 rounded-full border-2 border-deep-navy/20 text-deep-navy font-semibold text-sm hover:border-soft-gold/50 hover:bg-soft-gold/5 transition-all"
                >
                  About Me
                </Link>
              </motion.div>
              <Link
                to="/blog"
                className="px-5 py-3.5 rounded-full text-deep-navy/60 hover:text-soft-gold-600 font-medium text-sm transition-all animated-underline"
              >
                Read Journal →
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div variants={itemVariants} className="grid grid-cols-4 gap-3 pt-4 border-t border-warm-beige-300">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl font-display font-extrabold text-deep-navy">{s.value}</p>
                  <p className="text-[10px] font-semibold text-deep-navy/50 uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Orbit Photo ── */}
          <motion.div variants={itemVariants} className="lg:col-span-5 relative">
            <HeroOrbitPhoto profileImage={settings.profileImage} heroImage={settings.heroImage} />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════ FEATURED PORTFOLIO ═══════════════════ */}
      <section className="px-5 md:px-10 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
          className="space-y-14"
        >
          <SectionHeader eyebrow="Curated Work" title="Featured Case Studies" />

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {featuredProjects.length === 0 ? (
              <div className="col-span-3 text-center py-20 bg-paper-cream/80 rounded-3xl border border-warm-beige-300 text-deep-navy/50 font-medium">
                No published projects yet.
              </div>
            ) : (
              featuredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  className="editorial-card card-shine rounded-2xl overflow-hidden flex flex-col group relative"
                >
                  {/* Image Container with overlay */}
                  <div className="relative h-56 overflow-hidden bg-warm-beige-300">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                    {/* Dark overlay on hover */}
                    <div className="portfolio-card-overlay absolute inset-0" />
                    {/* Hover overlay content */}
                    <div className="absolute inset-0 flex items-end p-4">
                      <div className="overlay-content opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-350">
                        <Link
                          to={`/portfolio/${project.id}`}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-bold"
                        >
                          View Case Study <ArrowRight className="w-3.5 h-3.5 text-soft-gold" />
                        </Link>
                      </div>
                    </div>

                    {/* Top badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="px-2.5 py-0.5 rounded-full badge-navy text-[10px] font-bold backdrop-blur-md">
                        {project.category}
                      </span>
                    </div>
                    {idx === 0 && (
                      <div className="absolute top-3 right-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-soft-gold text-deep-navy text-[10px] font-extrabold tracking-wider shadow">
                          ✦ FEATURED
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-lg font-display font-bold text-deep-navy group-hover:text-soft-gold-600 transition-colors leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-xs text-deep-navy/65 line-clamp-2 leading-relaxed font-light">
                        {project.shortDescription || project.overview}
                      </p>
                    </div>

                    {project.tools && project.tools.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {project.tools.slice(0, 3).map((tool, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-warm-beige-200 text-deep-navy/80 border border-warm-beige-300 font-medium">
                            {tool}
                          </span>
                        ))}
                        {project.tools.length > 3 && (
                          <span className="text-[10px] px-2 py-0.5 rounded bg-soft-gold/10 text-soft-gold-600 border border-soft-gold/20 font-medium">
                            +{project.tools.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    <div className="pt-3 border-t border-deep-navy/8 flex items-center justify-between">
                      <span className="text-[10px] text-deep-navy/50 font-semibold uppercase tracking-wider">{project.role || project.subcategory}</span>
                      <Link
                        to={`/portfolio/${project.id}`}
                        className="text-xs font-bold text-deep-navy flex items-center gap-1 group-hover:gap-2 transition-all hover:text-soft-gold-600"
                      >
                        View <ArrowRight className="w-3.5 h-3.5 text-soft-gold" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          <div className="text-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider px-8 py-3.5 rounded-full bg-deep-navy text-warm-beige hover:bg-deep-navy-800 transition-all shadow-editorial hover:shadow-glow-gold"
              >
                Explore All Projects <ArrowRight className="w-3.5 h-3.5 text-soft-gold" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════ ABOUT PREVIEW ═══════════════════ */}
      <section className="px-5 md:px-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75 }}
          className="relative rounded-3xl overflow-hidden border border-warm-beige-300 shadow-editorial"
          style={{ background: 'linear-gradient(135deg, rgba(252,247,240,0.97) 0%, rgba(245,237,224,0.95) 100%)' }}
        >
          {/* Decorative BG */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-soft-gold/6 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-botanical-sage/6 blur-3xl pointer-events-none" />
          <div className="absolute top-4 right-4 opacity-25 pointer-events-none">
            <WildflowerCorner className="w-44 h-44 text-botanical-sage" />
          </div>
          <div className="absolute bottom-4 left-4 opacity-20 pointer-events-none">
            <FloralBranch className="w-36 h-36 text-soft-gold" />
          </div>

          <div className="relative z-10 p-8 md:p-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-4 space-y-4">
              <p className="text-[11px] uppercase tracking-[0.2em] text-soft-gold-600 font-bold flex items-center gap-2">
                <span className="w-5 h-px bg-soft-gold-300" /> About The Designer
              </p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-deep-navy leading-tight">
                {settings.aboutTitle || "Designing with purpose, precision & personal touch."}
              </h2>
              <BotanicalHeaderFlourish className="justify-start" />
            </div>

            <div className="lg:col-span-8 space-y-6">
              <p className="text-base text-deep-navy/80 font-light leading-relaxed">
                {settings.aboutText || "With an Informatics degree and a designer's mindset, I thrive at the intersection of technology and human-centered visuals. I create intuitive digital interfaces, cohesive brand identities, and clean front-end code."}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: 'Education', value: 'S.Kom Informatics' },
                  { label: 'Core Focus', value: 'UI/UX & Visual Design' },
                  { label: 'Status', value: 'Open to Work 🟢' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -3, scale: 1.02 }}
                    className="p-4 rounded-xl bg-white/70 border border-warm-beige-300 shadow-sm"
                  >
                    <p className="text-[10px] font-bold text-soft-gold-600 uppercase tracking-wider">{item.label}</p>
                    <p className="text-sm font-bold text-deep-navy mt-1">{item.value}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="inline-block pt-1">
                <Link
                  to="/about"
                  className="px-6 py-3 rounded-full bg-deep-navy text-warm-beige font-bold text-xs uppercase tracking-wider hover:bg-deep-navy-800 transition-all inline-flex items-center gap-2 shadow-editorial"
                >
                  More About Me <ArrowRight className="w-3.5 h-3.5 text-soft-gold" />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════ SKILLS / EXPERTISE ═══════════════════ */}
      <section className="px-5 md:px-10 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          className="space-y-14"
        >
          <SectionHeader eyebrow="Capabilities" title="Skills & Expertise" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {skills.map((skillGroup, idx) => {
              const IconComponent = skillIcons[skillGroup.category] || Palette;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                  className="editorial-card card-shine rounded-2xl p-6 space-y-4 group cursor-default"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-soft-gold/15 to-soft-gold/5 text-soft-gold-600 flex items-center justify-center group-hover:from-deep-navy group-hover:to-deep-navy-800 group-hover:text-soft-gold transition-all duration-400 shadow-sm">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-display font-bold text-deep-navy">{skillGroup.category}</h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((item, i) => (
                      <motion.span
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className="text-xs px-3 py-1 rounded-full bg-warm-beige-200 text-deep-navy/80 border border-warm-beige-300 hover:bg-soft-gold/12 hover:border-soft-gold/30 hover:text-soft-gold-700 transition-colors cursor-default"
                      >
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════ CERTIFICATES & ACHIEVEMENTS ═══════════════════ */}
      <section className="px-5 md:px-10 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Certificates */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-warm-beige-300">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-soft-gold/15 flex items-center justify-center">
                  <Award className="w-4 h-4 text-soft-gold-600" />
                </div>
                <h3 className="text-xl font-display font-bold text-deep-navy">Certificates</h3>
              </div>
              <Link to="/certificates" className="text-xs font-bold text-deep-navy hover:text-soft-gold transition-colors flex items-center gap-1 animated-underline">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-3">
              {recentCerts.map((cert) => (
                <motion.div
                  key={cert.id}
                  whileHover={{ x: 5, scale: 1.01 }}
                  className="editorial-card rounded-xl p-4 flex items-center gap-4"
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden border border-warm-beige-300 flex-shrink-0 shadow-sm bg-warm-beige-100">
                    <img src={cert.image} alt={cert.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <h4 className="text-sm font-bold text-deep-navy line-clamp-1">{cert.name}</h4>
                    <p className="text-xs text-soft-gold-600 font-semibold">{cert.issuer} · {cert.date}</p>
                    <p className="text-xs text-deep-navy/60 line-clamp-1">{cert.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-warm-beige-300">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-soft-gold/15 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-soft-gold-600" />
                </div>
                <h3 className="text-xl font-display font-bold text-deep-navy">Achievements</h3>
              </div>
              <Link to="/achievements" className="text-xs font-bold text-deep-navy hover:text-soft-gold transition-colors flex items-center gap-1 animated-underline">
                View All <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="space-y-3">
              {recentAchievements.map((ach) => (
                <motion.div
                  key={ach.id}
                  whileHover={{ x: 5, scale: 1.01 }}
                  className="editorial-card rounded-xl p-4 flex items-center gap-4"
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden border border-warm-beige-300 flex-shrink-0 shadow-sm bg-warm-beige-100">
                    <img src={ach.image} alt={ach.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-0.5 min-w-0">
                    <h4 className="text-sm font-bold text-deep-navy line-clamp-1">{ach.title}</h4>
                    <p className="text-xs text-soft-gold-600 font-semibold">{ach.issuer} · {ach.date}</p>
                    <p className="text-xs text-deep-navy/60 line-clamp-2">{ach.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats highlight */}
            <div className="p-5 rounded-2xl bg-deep-navy relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-soft-gold/10 to-transparent pointer-events-none" />
              <div className="relative flex items-center gap-4">
                <TrendingUp className="w-6 h-6 text-soft-gold flex-shrink-0" />
                <div>
                  <p className="text-warm-beige font-bold text-sm">Top 33 Hipster/Designer Talent</p>
                  <p className="text-warm-beige/60 text-xs mt-0.5">IndonesiaNEXT – Telkomsel · 2025</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════ LATEST JOURNAL ═══════════════════ */}
      {latestPosts.length > 0 && (
        <section className="px-5 md:px-10 max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={containerVariants}
            className="space-y-14"
          >
            <SectionHeader eyebrow="Notes & Thoughts" title="Latest Journal Articles" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {latestPosts.map((post) => (
                <motion.div
                  key={post.id}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="editorial-card card-shine rounded-2xl overflow-hidden flex flex-col group"
                >
                  <div className="relative h-48 overflow-hidden bg-warm-beige-300">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                    <div className="portfolio-card-overlay absolute inset-0" />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-0.5 rounded-full badge-gold text-[10px] font-bold backdrop-blur-md">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <p className="text-[10px] text-deep-navy/55 font-semibold uppercase tracking-wider">
                        {post.publishedAt} · {post.readTime}
                      </p>
                      <h3 className="text-base font-display font-bold text-deep-navy group-hover:text-soft-gold-600 transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-xs text-deep-navy/65 line-clamp-3 leading-relaxed font-light">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-deep-navy/8">
                      <Link to={`/blog/${post.id}`} className="text-xs font-bold text-deep-navy group-hover:text-soft-gold flex items-center gap-1.5 transition-colors animated-underline">
                        Read Article <ArrowRight className="w-3.5 h-3.5 text-soft-gold group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      )}

    </div>
  );
};

export default Home;
