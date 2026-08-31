import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BotanicalHeaderFlourish } from './common/BotanicalDecorations';

const experiences = [
  {
    role: "Pengelola Fasilitas Umum - Teknik Informatika",
    company: "Rumah Tahanan Negara Kelas 1 Depok",
    period: "Sep 2025 - Present",
    type: "Full-time",
    description: "Managing public facilities with a focus on IT infrastructure, digital operations, and technical user support."
  },
  {
    role: "UI/UX Designer (Intern)",
    company: "HRDBacot - Jakarta",
    period: "Jun 2025 - Aug 2025",
    type: "Internship",
    description: "Designed user-centric mobile and web interfaces, created design systems, and collaborated with cross-functional teams to improve product usability."
  },
  {
    role: "Desain Grafis (Part time)",
    company: "SKENA LITERASI - Gorontalo (WFH)",
    period: "Sep 2024 - Nov 2024",
    type: "Part-time",
    description: "Created visual content for social media branding and marketing materials to promote regional literacy programs."
  },
  {
    role: "Desain Grafis (Part time)",
    company: "Rumah Teras Baca - Gorontalo (WFH)",
    period: "Aug 2024 - Nov 2024",
    type: "Part-time",
    description: "Designed engaging Instagram carousel posts and community graphics to support community library outreach."
  }
];

const Experience = ({ isPreview = false }) => {
  const displayExperiences = isPreview ? experiences.slice(0, 2) : experiences;

  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-3"
        >
          <p className="text-xs uppercase tracking-widest text-soft-gold font-semibold">Career History</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-deep-navy">
            Professional Journey
          </h2>
          <BotanicalHeaderFlourish />
        </motion.div>

        <div className="relative">
          {/* Central Animated Timeline Line for Desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-transparent via-soft-gold/40 to-transparent -translate-x-1/2" />

          <div className="space-y-12">
            {displayExperiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`flex flex-col md:flex-row gap-8 relative ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Spacer for alternate layout */}
                <div className="flex-1 hidden md:block" />

                {/* Animated Timeline Node */}
                <motion.div 
                  whileHover={{ scale: 1.4 }}
                  className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-8 w-4 h-4 rounded-full bg-paper-cream border-2 border-soft-gold shadow-[0_0_12px_rgba(197,155,78,0.5)] z-10 items-center justify-center"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-soft-gold animate-ping" />
                </motion.div>

                {/* Experience Card */}
                <div className="flex-1">
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="editorial-card p-8 rounded-2xl border border-warm-beige-300 relative overflow-hidden group shadow-editorial"
                  >
                    <div className="flex flex-col gap-2 mb-4">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <h3 className="text-2xl font-display font-bold text-deep-navy group-hover:text-soft-gold-600 transition-colors">
                          {exp.role}
                        </h3>
                        <span className="text-xs font-semibold px-3 py-1 rounded-full badge-gold">
                          {exp.type}
                        </span>
                      </div>
                      <p className="text-base text-soft-gold-600 font-semibold">{exp.company}</p>
                    </div>

                    <p className="text-deep-navy/80 font-light leading-relaxed mb-6 text-sm">
                      {exp.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs font-semibold text-deep-navy/60 pt-4 border-t border-warm-beige-300/60">
                      <Calendar className="w-3.5 h-3.5 text-soft-gold" />
                      {exp.period}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {isPreview && (
            <div className="text-center mt-12 relative z-10">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-deep-navy text-warm-beige font-semibold text-xs uppercase tracking-wider hover:bg-deep-navy-800 transition shadow-editorial"
              >
                View Full Experience Journey
                <ChevronRight size={16} className="text-soft-gold" />
              </Link>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default Experience;
