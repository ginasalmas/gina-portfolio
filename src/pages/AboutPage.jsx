import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Briefcase,
  Target,
  HeartHandshake,
  Download,
  ArrowRight,
  Mail
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { SparkleStar, EditorialFlourish } from '../components/common/BotanicalDecorations';
import SEO from '../components/SEO';

const AboutPage = () => {
  const { settings, experiences, skills } = useData();

  const education = [
    {
      institution: "Universitas Indraprasta PGRI",
      degree: "S1 Informatics Engineering (S.Kom)",
      gpa: "GPA: 3.64",
      period: "Sep 2021 - Aug 2025",
      details: "Focused studies in Software Development, Human–Computer Interaction (HCI), Database Systems, and Information Systems."
    },
    {
      institution: "SMK Negeri 24 Jakarta",
      degree: "Culinary Arts",
      gpa: "Vocational Graduate",
      period: "Jul 2018 - Jun 2021",
      details: "Cultivated discipline, operational precision, teamwork, and professional-grade time management."
    }
  ];

  const trainings = [
    { title: "IndonesiaNEXT – Telkomsel", period: "Apr 2025 – Jul 2025", role: "Top 33 Hipster / Designer Talent" },
    { title: "UI/UX Designer Bootcamp – Luarsekolah", period: "Feb 2025 – Oct 2025", role: "UI/UX Intensive Bootcamp" },
    { title: "Junior Graphic Designer – Politeknik Negeri Jakarta", period: "Jul 2024 – Aug 2024", role: "Vocational Graphic Design" },
    { title: "MSIB Android Mobile App Dev – Infinite Learning", period: "Aug 2023 – Dec 2023", role: "Best Merge Product Awardee" },
    { title: "Women In Tech Python & Cybersecurity – DTS Kominfo", period: "May 2023 – Jun 2023", role: "Python & Cybersecurity Tech" }
  ];

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-32 overflow-hidden">
      <SEO title="About Me | Gina — UI/UX Designer & Admin" description="With an Informatics degree and a designer's mindset, I thrive at the intersection of technology, administration, and human-centered visuals." />
      
      {/* 1. HERO SECTION (Redesigned V2 - Animated & Clean) */}
      <section className="relative min-h-[80vh] flex items-center pt-10 pb-20">
        
        {/* Animated Background Ornaments */}
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 opacity-10 pointer-events-none"
        >
          <SparkleStar className="w-[500px] h-[500px] text-soft-gold" />
        </motion.div>
        
        <motion.div 
          animate={{ y: [0, -20, 0] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-10 opacity-20 pointer-events-none"
        >
          <SparkleStar className="w-16 h-16 text-deep-navy" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center w-full z-10">
          
          {/* Left: Animated Text */}
          <div className="space-y-8 order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-soft-gold/10 border border-soft-gold/30 text-xs font-bold uppercase tracking-widest text-soft-gold-700"
            >
              <Sparkles className="w-4 h-4" /> Get To Know Me
            </motion.div>

            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-deep-navy leading-[1.1]"
              >
                Blending <br/>
                <span className="text-soft-gold italic font-serif">Technology</span>,<br/>
                Administration & <br/>
                <span className="text-botanical-sage-dark relative inline-block">
                  Design.
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="absolute -bottom-2 left-0 w-full h-1.5 bg-botanical-sage-dark/30 origin-left"
                  />
                </span>
              </motion.h1>
            </div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-deep-navy/80 font-light leading-relaxed max-w-lg"
            >
              I am {settings.fullName}, a professional who integrates analytical logic, interface aesthetics, and operational management precision.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              {settings.cvUrl && (
                <a 
                  href={settings.cvUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="group px-8 py-4 rounded-full bg-deep-navy text-warm-beige font-semibold text-xs uppercase tracking-widest hover:bg-deep-navy-800 transition-all flex items-center gap-3 overflow-hidden relative"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Download className="w-4 h-4 text-soft-gold group-hover:-translate-y-1 transition-transform" /> Download My CV
                  </span>
                  <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </a>
              )}
            </motion.div>
          </div>

          {/* Right: Animated Image Gallery / Frame */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, type: "spring", bounce: 0.4 }}
              className="relative w-[280px] sm:w-[360px] lg:w-[420px]"
            >
              {/* Arch Image Frame */}
              <div className="aspect-[3/4] rounded-t-full rounded-b-3xl overflow-hidden border-8 border-white shadow-2xl bg-paper-cream relative z-10">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  src={settings.heroImage || "/gina-about.jpg"}
                  alt={settings.name}
                  className="w-full h-full object-cover filter contrast-[1.05] saturate-90"
                />
              </div>

              {/* Decorative Backdrop */}
              <div className="absolute -inset-4 bg-soft-gold/20 rounded-t-full rounded-b-3xl -z-10 blur-xl" />
              <motion.div 
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-2 border-2 border-deep-navy/10 rounded-t-full rounded-b-3xl -z-10" 
              />

              {/* Safe Floating Badge (No Overlap) */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute -bottom-8 -left-4 sm:-left-12 bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-xl border border-warm-beige-300 flex items-center gap-3 sm:gap-4 z-20"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-soft-gold text-white flex items-center justify-center shrink-0 shadow-inner">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-widest text-deep-navy/60 font-bold mb-0.5">Top Graduate</p>
                  <p className="text-sm sm:text-base font-display font-bold text-deep-navy">GPA 3.64</p>
                </div>
              </motion.div>

            </motion.div>
          </div>

        </div>
      </section>

      {/* 2. CORE PRINCIPLES / PHILOSOPHY */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
        className="relative"
      >
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <p className="text-xs uppercase tracking-widest text-soft-gold font-semibold">Work Approach</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-deep-navy">Philosophy & Professional Principles</h2>
          <EditorialFlourish />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Target, title: "Accuracy & Precision", desc: "Rooted in my operational and administrative background, I ensure every piece of data, report, and asset is managed with high precision — no detail goes unnoticed." },
            { icon: Sparkles, title: "Functional Aesthetics", desc: "As an interface designer, I believe great design is not merely beautiful visuals, but a system that genuinely helps people solve their problems with ease." },
            { icon: HeartHandshake, title: "Collaboration & Adaptability", desc: "Capable of deep independent focus while remaining communicative when coordinating operational activities and leading cross-functional teams (Agile/Scrum)." }
          ].map((principle, idx) => (
            <motion.div key={idx} variants={fadeUp} className="bg-white p-8 rounded-3xl border border-warm-beige-300 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-warm-beige-200 flex items-center justify-center mb-6">
                <principle.icon className="w-7 h-7 text-deep-navy" />
              </div>
              <h3 className="text-xl font-display font-bold text-deep-navy mb-3">{principle.title}</h3>
              <p className="text-sm text-deep-navy/70 leading-relaxed font-light">{principle.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 3. EXPERIENCE TIMELINE */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <p className="text-xs uppercase tracking-widest text-soft-gold font-semibold">Career Path</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-deep-navy">Professional Experience</h2>
            <EditorialFlourish />
          </div>

          <div className="relative border-l border-deep-navy/10 pl-8 md:pl-12 space-y-16 py-4">
            {experiences.map((exp, idx) => (
              <motion.div key={exp.id} variants={fadeUp} className="relative">
                {/* Timeline Dot */}
                <div className="absolute -left-[41px] md:-left-[57px] top-1 w-5 h-5 rounded-full bg-white border-4 border-soft-gold shadow-sm" />
                
                <div className="editorial-card rounded-3xl p-6 md:p-8 hover:shadow-xl transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl font-display font-bold text-deep-navy">{exp.position}</h3>
                      <p className="text-base font-semibold text-soft-gold-600 mt-1">{exp.company}</p>
                    </div>
                    <div className="flex flex-col md:items-end gap-1">
                      <span className="text-xs font-bold px-3 py-1.5 rounded-md bg-warm-beige-200 text-deep-navy inline-block w-fit">
                        {exp.startDate} — {exp.endDate}
                      </span>
                      <span className="text-[11px] uppercase tracking-widest text-deep-navy/50 font-bold">{exp.type}</span>
                    </div>
                  </div>

                  <p className="text-sm text-deep-navy/80 font-light leading-relaxed mb-6">
                    {exp.description}
                  </p>

                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <div className="space-y-3 bg-paper-cream p-5 rounded-2xl border border-warm-beige-300/50">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-deep-navy/60 mb-3">Key Responsibilities:</h4>
                      <ul className="space-y-2.5">
                        {exp.responsibilities.map((resp, i) => (
                          <li key={i} className="text-xs text-deep-navy/85 flex items-start gap-3">
                            <CheckCircle2 className="w-4 h-4 text-botanical-sage-dark flex-shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 4. EDUCATION & TRAININGS BENTO GRID */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
      >
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <p className="text-xs uppercase tracking-widest text-soft-gold font-semibold">Academic Background</p>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-deep-navy">Education & Professional Development</h2>
          <EditorialFlourish />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Education Column */}
          <div className="space-y-6">
            <h3 className="text-xl font-display font-bold text-deep-navy flex items-center gap-2 border-b border-deep-navy/10 pb-4">
              <GraduationCap className="w-5 h-5 text-soft-gold" /> Formal Education
            </h3>
            
            {education.map((edu, idx) => (
              <motion.div key={idx} variants={fadeUp} className="bg-white rounded-3xl p-6 border border-warm-beige-300 shadow-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-soft-gold/5 rounded-bl-full -z-10 group-hover:scale-110 transition-transform" />
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-bold text-deep-navy">{edu.institution}</h4>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-warm-beige-200 px-2 py-1 rounded text-deep-navy/70 whitespace-nowrap">
                    {edu.period}
                  </span>
                </div>
                <p className="text-sm font-semibold text-soft-gold-600 mb-3">{edu.degree} <span className="text-deep-navy/50 mx-1">•</span> <span className="text-deep-navy">{edu.gpa}</span></p>
                <p className="text-xs text-deep-navy/70 font-light leading-relaxed">{edu.details}</p>
              </motion.div>
            ))}
          </div>

          {/* Trainings Column */}
          <div className="space-y-6">
            <h3 className="text-xl font-display font-bold text-deep-navy flex items-center gap-2 border-b border-deep-navy/10 pb-4">
              <Award className="w-5 h-5 text-soft-gold" /> Certifications & Training
            </h3>
            
            <div className="space-y-4">
              {trainings.map((t, idx) => (
                <motion.div key={idx} variants={fadeUp} className="flex gap-4 items-center bg-white p-4 rounded-2xl border border-warm-beige-300 shadow-sm hover:border-soft-gold transition-colors">
                  <div className="w-10 h-10 rounded-full bg-deep-navy flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-warm-beige" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-deep-navy truncate">{t.title}</h4>
                    <p className="text-xs text-deep-navy/60 truncate mt-0.5">{t.role}</p>
                  </div>
                  <div className="hidden sm:block text-[10px] font-bold text-deep-navy/40 uppercase tracking-widest text-right whitespace-nowrap">
                    {t.period}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </motion.section>

      {/* 5. SKILLS MATRIX */}
      <motion.section 
        initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
      >
        <div className="bg-deep-navy rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 opacity-10 pointer-events-none">
            <SparkleStar className="w-64 h-64 text-warm-beige" />
          </div>
          
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16 relative z-10">
            <p className="text-xs uppercase tracking-widest text-soft-gold font-semibold">Core Capabilities</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-warm-beige">Skills & Technology Matrix</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {skills.map((skillGroup, idx) => (
              <motion.div key={idx} variants={fadeUp} className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <h3 className="text-base font-display font-bold text-warm-beige mb-4 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-soft-gold" />
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((item, i) => (
                    <span key={i} className="text-[11px] font-medium px-3 py-1.5 rounded-lg bg-deep-navy-800 text-warm-beige-200 border border-white/5">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 6. CONTACT BANNER */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center py-12"
      >
        <h2 className="text-2xl md:text-3xl font-display font-bold text-deep-navy mb-6">Looking for a talent who bridges operations and design?</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <a href={`mailto:${settings.email}`} className="px-8 py-3 rounded-full bg-deep-navy text-warm-beige font-semibold text-xs uppercase tracking-wider hover:bg-deep-navy-800 transition-all shadow-lg flex items-center gap-2">
            <Mail className="w-4 h-4" /> Contact via Email
          </a>
          <a href={settings.linkedin} target="_blank" rel="noreferrer" className="px-8 py-3 rounded-full bg-white border border-warm-beige-300 text-deep-navy font-semibold text-xs uppercase tracking-wider hover:border-soft-gold transition-all flex items-center gap-2">
            <Briefcase className="w-4 h-4" /> Visit LinkedIn
          </a>
        </div>
      </motion.section>

    </div>
  );
};

export default AboutPage;
