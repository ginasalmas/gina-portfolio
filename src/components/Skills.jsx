import React from 'react';
import { motion } from 'framer-motion';
import { Award, Code, Palette, Layout, Sparkles } from 'lucide-react';
import { BotanicalHeaderFlourish, SparkleStar, TinyFlower } from './common/BotanicalDecorations';

const skillCategories = [
  {
    title: "UI/UX & Product Design",
    icon: Palette,
    accent: "bg-soft-gold/20 text-soft-gold-600",
    skills: ["Figma Design Systems", "User Research & Personas", "Wireframing & Prototyping", "Information Architecture", "Usability Testing", "Adobe Creative Suite"]
  },
  {
    title: "Front-End & Mobile Dev",
    icon: Code,
    accent: "bg-botanical-sage/20 text-botanical-sage-dark",
    skills: ["React & React Native", "TailwindCSS & PostCSS", "JavaScript (ES6+)", "HTML5 & Semantic Web", "Git & Version Control", "Vite & Modern Tooling"]
  },
  {
    title: "Methodologies & Logic",
    icon: Layout,
    accent: "bg-muted-rose/20 text-muted-rose-500",
    skills: ["Agile & SCRUM", "Design Thinking Framework", "User-Centered Design (UCD)", "Responsive Layout Design", "Structured SQL & Data"]
  }
];

const certificates = [
  "Certificate in Agile Scrum Fundamentals (2025)",
  "Junior Graphic Designer - BNSP (2024)",
  "Intro to UI/UX - Gold Distinction (2024)",
  "Data Science Basics Certification (2024)",
  "Structured Query Language (SQL) (2024)",
  "Google Data Analytics Certificate",
  "MSIB Android Mobile Application Development (2024)"
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-3"
        >
          <p className="text-xs uppercase tracking-widest text-soft-gold font-semibold">Technical & Visual Expertise</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-deep-navy">Skills & Capabilities</h2>
          <p className="text-deep-navy/70 max-w-2xl mx-auto font-light leading-relaxed">
            Merging <span className="text-soft-gold-600 font-medium">human-centered aesthetics</span> with <span className="text-botanical-sage-dark font-medium">informatics engineering precision</span>.
          </p>
          <BotanicalHeaderFlourish />
        </motion.div>

        {/* Skill Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {skillCategories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className="editorial-card rounded-2xl p-8 border border-warm-beige-300 relative group flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-xl ${cat.accent} group-hover:scale-110 transition-transform duration-300`}>
                    <cat.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-deep-navy">
                    {cat.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, idx) => (
                    <motion.span 
                      key={idx} 
                      whileHover={{ scale: 1.05 }}
                      className="px-3.5 py-1.5 rounded-full bg-warm-beige-200 text-xs font-medium text-deep-navy/85 border border-warm-beige-300 hover:border-soft-gold/60 transition cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-warm-beige-300/60 flex items-center justify-between opacity-60 group-hover:opacity-100 transition-opacity">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-soft-gold">Verified Proficiency</span>
                <SparkleStar className="w-4 h-4 text-soft-gold" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certificates Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="editorial-card rounded-3xl p-8 md:p-12 relative overflow-hidden bg-paper-cream border border-warm-beige-400 shadow-editorial"
        >
          <div className="relative z-10 space-y-8">
            <div className="flex items-center justify-between border-b border-warm-beige-300 pb-6">
              <h3 className="text-2xl md:text-3xl font-display font-bold text-deep-navy flex items-center gap-3">
                <Award className="text-soft-gold w-8 h-8" />
                Certifications & Achievements
              </h3>
              <TinyFlower className="w-6 h-6 text-soft-gold animate-spin-slow" />
            </div>

            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
              {certificates.map((cert, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-3.5 py-3 px-3 rounded-xl hover:bg-warm-beige-100 transition duration-200 border border-transparent hover:border-warm-beige-300"
                >
                  <div className="w-2 h-2 rounded-full bg-soft-gold flex-shrink-0" />
                  <span className="text-sm font-semibold text-deep-navy/85 hover:text-soft-gold-600 transition">
                    {cert}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Skills;
