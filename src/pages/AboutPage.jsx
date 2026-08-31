import React from 'react';
import { motion } from 'framer-motion';
import { Download, GraduationCap, Briefcase, Award, Sparkles, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';
import { useData } from '../context/DataContext';
import { SparkleStar, EditorialFlourish } from '../components/common/BotanicalDecorations';

const AboutPage = () => {
  const { settings, experiences, skills } = useData();

  const education = [
    {
      institution: "Universitas Indraprasta PGRI",
      degree: "S1 Teknik Informatika (S.Kom)",
      gpa: "IPK: 3,64",
      period: "Sep 2021 - Aug 2025",
      details: "Fokus studi pada Pengembangan Perangkat Lunak, Interaksi Manusia & Komputer (HCI), Basis Data, dan Sistem Informasi."
    },
    {
      institution: "SMK Negeri 24 Jakarta",
      degree: "Tata Boga",
      gpa: "Lulusan Kejuruan",
      period: "Jul 2018 - Jun 2021",
      details: "Melatih kedisiplinan, ketelitian operasional, kerja sama tim, dan manajemen waktu berstandar profesional."
    }
  ];

  const trainings = [
    { title: "IndonesiaNEXT – Telkomsel", period: "Apr 2025 – Jul 2025", role: "Top 33 Hipster / Designer Talent" },
    { title: "Belajar Bekerja Bootcamp UI/UX Designer – Luarsekolah", period: "Feb 2025 – Okt 2025", role: "UI/UX Intensive Bootcamp" },
    { title: "Junior Graphic Designer – Politeknik Negeri Jakarta", period: "Jul 2024 – Agu 2024", role: "Vocational Graphic Design" },
    { title: "MSIB Android Mobile App Dev – Infinite Learning", period: "Agu 2023 – Des 2023", role: "Best Merge Product Awardee" },
    { title: "Women In Tech Python & Cybersecurity – DTS Kominfo", period: "Mei 2023 – Jun 2023", role: "Python & Cybersecurity Tech" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-20">
      
      {/* Hero Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
      >
        
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-md">
            <div className="absolute -inset-3 rounded-3xl border border-soft-gold/30 rotate-2 pointer-events-none" />
            <div className="rounded-2xl overflow-hidden shadow-editorial bg-paper-cream p-3 border border-warm-beige-300">
              <img
                src={settings.profileImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"}
                alt={settings.name}
                className="w-full h-[420px] object-cover rounded-xl"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-gold text-xs font-semibold uppercase tracking-wider">
            <SparkleStar className="w-3.5 h-3.5 text-soft-gold" />
            Teknik Informatika & Digital Specialist
          </div>

          <h1 className="text-4xl md:text-5xl font-display font-bold text-deep-navy">
            {settings.fullName || 'Gina Salma Sabilla, S.Kom.'}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-deep-navy/75">
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-muted-rose" /> Depok, Jawa Barat</span>
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-soft-gold" /> +6285117231817</span>
            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-botanical-sage-dark" /> gina.s.sabilla18@gmail.com</span>
          </div>

          <p className="text-base text-deep-navy/85 font-light leading-relaxed">
            {settings.aboutText}
          </p>

          <EditorialFlourish className="justify-start" />

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-paper-cream border border-warm-beige-300">
              <p className="text-xs font-semibold text-soft-gold-600 uppercase">Pendidikan</p>
              <p className="text-sm font-bold text-deep-navy">S.Kom (IPK 3,64)</p>
            </div>
            <div className="p-4 rounded-xl bg-paper-cream border border-warm-beige-300">
              <p className="text-xs font-semibold text-soft-gold-600 uppercase">Domisili</p>
              <p className="text-sm font-bold text-deep-navy">Depok, Jawa Barat</p>
            </div>
            <div className="p-4 rounded-xl bg-paper-cream border border-warm-beige-300 col-span-2 sm:col-span-1">
              <p className="text-xs font-semibold text-soft-gold-600 uppercase">Status Karir</p>
              <p className="text-sm font-bold text-deep-navy">Tersedia untuk Kerja</p>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-4">
            <a
              href={`mailto:${settings.email}`}
              className="px-7 py-3.5 rounded-full bg-deep-navy text-warm-beige font-semibold text-xs uppercase tracking-wider hover:bg-deep-navy-800 transition-all inline-flex items-center gap-2 shadow-sm"
            >
              <Mail className="w-4 h-4 text-soft-gold" /> Hubungi Gina
            </a>
          </div>

        </div>

      </motion.div>

      {/* Education & Academic Background */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <p className="text-xs uppercase tracking-widest text-soft-gold font-semibold">Pendidikan</p>
          <h2 className="text-3xl font-display font-bold text-deep-navy">Riwayat Pendidikan</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {education.map((edu, idx) => (
            <motion.div 
              key={idx} 
              whileHover={{ y: -4 }}
              className="editorial-card rounded-2xl p-6 space-y-3 relative border border-warm-beige-300"
            >
              <div className="flex items-center justify-between border-b border-warm-beige-300/60 pb-3">
                <div className="flex items-center gap-2.5">
                  <GraduationCap className="w-5 h-5 text-soft-gold" />
                  <h3 className="text-lg font-display font-bold text-deep-navy">{edu.institution}</h3>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full badge-gold">{edu.period}</span>
              </div>
              <p className="text-sm font-bold text-soft-gold-600">{edu.degree} • <span className="text-deep-navy/80 font-semibold">{edu.gpa}</span></p>
              <p className="text-xs text-deep-navy/70 leading-relaxed font-light">{edu.details}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <p className="text-xs uppercase tracking-widest text-soft-gold font-semibold">Pengalaman Kerja</p>
          <h2 className="text-3xl font-display font-bold text-deep-navy">Pengalaman Profesional & Magang</h2>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {experiences.map((exp) => (
            <motion.div key={exp.id} whileHover={{ y: -4 }} className="editorial-card rounded-2xl p-6 md:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-deep-navy/10 pb-4">
                <div>
                  <h3 className="text-xl font-display font-bold text-deep-navy">{exp.position}</h3>
                  <p className="text-sm font-semibold text-soft-gold-600">{exp.company} • <span className="text-deep-navy/60 font-normal">{exp.type}</span></p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full badge-navy self-start sm:self-center">
                  {exp.startDate} — {exp.endDate}
                </span>
              </div>

              <p className="text-sm text-deep-navy/80 font-light leading-relaxed">{exp.description}</p>

              {exp.responsibilities && exp.responsibilities.length > 0 && (
                <ul className="space-y-2 pt-2">
                  {exp.responsibilities.map((resp, i) => (
                    <li key={i} className="text-xs text-deep-navy/85 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-soft-gold flex-shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Training & Bootcamps */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <p className="text-xs uppercase tracking-widest text-soft-gold font-semibold">Pengembangan Diri</p>
          <h2 className="text-3xl font-display font-bold text-deep-navy">Pelatihan & Bootcamp</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {trainings.map((t, idx) => (
            <motion.div key={idx} whileHover={{ scale: 1.02 }} className="editorial-card rounded-xl p-5 space-y-2">
              <div className="flex items-center justify-between">
                <Sparkles className="w-4 h-4 text-soft-gold" />
                <span className="text-[11px] font-semibold text-soft-gold-600">{t.period}</span>
              </div>
              <h4 className="text-sm font-bold text-deep-navy">{t.title}</h4>
              <p className="text-xs text-deep-navy/65 font-medium">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills Matrix */}
      <section className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <p className="text-xs uppercase tracking-widest text-soft-gold font-semibold">Matriks Keahlian</p>
          <h2 className="text-3xl font-display font-bold text-deep-navy">Keahlian & Alat Kerja</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skillGroup, idx) => (
            <motion.div key={idx} whileHover={{ y: -4 }} className="editorial-card rounded-2xl p-6 space-y-3">
              <h3 className="text-base font-display font-bold text-deep-navy border-b border-deep-navy/10 pb-2">
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-2 pt-1">
                {skillGroup.items.map((item, i) => (
                  <span key={i} className="text-xs px-3 py-1 rounded-full bg-warm-beige-200 text-deep-navy/85 border border-warm-beige-300">
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default AboutPage;
