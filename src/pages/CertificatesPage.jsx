import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, ShieldCheck } from 'lucide-react';
import { useData } from '../context/DataContext';
import { SparkleStar, EditorialFlourish } from '../components/common/BotanicalDecorations';

const CertificatesPage = () => {
  const { certificates } = useData();

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-12">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto space-y-4"
      >
        <p className="text-xs uppercase tracking-widest text-soft-gold font-semibold">Verified Credentials & Certifications</p>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-deep-navy">
          Certificates & Professional Licenses
        </h1>
        <p className="text-base text-deep-navy/70 font-light leading-relaxed">
          Sertifikasi resmi keahlian dalam perancangan antarmuka (UI/UX), sertifikasi kompetensi BNSP, pemrograman Python & Kotlin, basis data SQL, serta manajemen proyek Agile.
        </p>
        <EditorialFlourish />
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {certificates.map((cert, index) => (
          <motion.div 
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.06 }}
            whileHover={{ y: -6 }}
            className="editorial-card rounded-2xl overflow-hidden flex flex-col justify-between p-6 space-y-6"
          >
            
            <div className="space-y-4">
              {/* Image Frame */}
              <div className="relative h-48 rounded-xl overflow-hidden bg-warm-beige-200 border border-warm-beige-300">
                <img src={cert.image} alt={cert.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                <div className="absolute top-3 right-3 bg-paper-cream/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-soft-gold-600 flex items-center gap-1 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5" /> Terverifikasi
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-soft-gold-600 font-semibold">
                  <span>{cert.issuer}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {cert.date}</span>
                </div>
                <h3 className="text-lg font-display font-bold text-deep-navy">{cert.name}</h3>
                <p className="text-xs text-deep-navy/70 font-light leading-relaxed">{cert.description}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-deep-navy/10 flex items-center justify-between">
              {cert.credentialId && (
                <span className="text-[11px] font-mono text-deep-navy/50">ID: {cert.credentialId}</span>
              )}
              <span className="text-xs font-semibold text-deep-navy hover:text-soft-gold flex items-center gap-1">
                Official Credential <Award className="w-3.5 h-3.5 text-soft-gold" />
              </span>
            </div>

          </motion.div>
        ))}
      </div>

    </div>
  );
};

export default CertificatesPage;
