import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, Calendar, ShieldCheck, Search, X } from 'lucide-react';
import { useData } from '../context/DataContext';
import { SparkleStar, EditorialFlourish } from '../components/common/BotanicalDecorations';

const CertificateModal = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-deep-navy/80 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-2xl bg-paper-cream rounded-[2rem] shadow-2xl flex flex-col overflow-hidden border border-warm-beige-300"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/30 hover:bg-rose-100 text-deep-navy hover:text-rose-600 rounded-full transition-colors z-10 backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="h-64 sm:h-80 bg-warm-beige-200 relative overflow-hidden flex-shrink-0">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/80 via-deep-navy/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2 leading-tight drop-shadow-md">
              {item.name}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-warm-beige/90 text-sm font-medium drop-shadow-sm">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-soft-gold" /> {item.issuer}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-soft-gold" /> {item.date}</span>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[50vh]">
          <div>
            <h4 className="text-xs uppercase tracking-widest text-soft-gold-700 font-bold mb-3">Deskripsi Sertifikat</h4>
            <p className="text-sm sm:text-base text-deep-navy/80 font-light leading-relaxed">
              {item.description || "Tidak ada deskripsi tersedia."}
            </p>
          </div>

          {item.credentialId && (
            <div className="pt-6 border-t border-warm-beige-300">
              <h4 className="text-xs uppercase tracking-widest text-soft-gold-700 font-bold mb-2">Credential ID</h4>
              <p className="text-sm font-mono text-deep-navy bg-warm-beige-200 px-3 py-2 rounded-lg inline-block border border-warm-beige-300 shadow-inner">
                {item.credentialId}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const CertificatesPage = () => {
  const { certificates } = useData();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCert, setSelectedCert] = useState(null);

  // Build dynamic categories from category field
  const categories = useMemo(() => {
    const cats = [...new Set(certificates.map(c => c.category).filter(Boolean))];
    return ['All', ...cats];
  }, [certificates]);

  // Filter certificates
  const filteredCertificates = certificates.filter(cert => {
    const matchesCategory = selectedCategory === 'All' || 
      cert.category === selectedCategory;

    const matchesSearch = searchQuery === '' ||
      cert.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.issuer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.description?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

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

      {/* Filter & Search */}
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
            placeholder="Search certificates by name, issuer, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-warm-beige-300 text-sm focus:outline-none focus:border-soft-gold text-deep-navy shadow-sm transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all ${
                selectedCategory === cat
                  ? 'bg-deep-navy text-warm-beige shadow-md'
                  : 'bg-white text-deep-navy/70 border border-warm-beige-300 hover:border-soft-gold hover:text-deep-navy'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Grid */}
      {filteredCertificates.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-warm-beige-300 space-y-3">
          <SparkleStar className="w-8 h-8 text-soft-gold mx-auto" />
          <p className="text-lg font-display font-bold text-deep-navy">No certificates found</p>
          <p className="text-xs text-deep-navy/60">Try searching for a different keyword or switching categories.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCertificates.map((cert, index) => (
            <motion.div 
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedCert(cert)}
              className="editorial-card rounded-2xl overflow-hidden flex flex-col justify-between p-6 space-y-6 cursor-pointer group"
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
                  <h3 className="text-lg font-display font-bold text-deep-navy group-hover:text-soft-gold-600 transition-colors">{cert.name}</h3>
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
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedCert && (
          <CertificateModal item={selectedCert} onClose={() => setSelectedCert(null)} />
        )}
      </AnimatePresence>

    </div>
  );
};

export default CertificatesPage;
