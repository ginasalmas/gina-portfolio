import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Trophy, Calendar, ExternalLink, X } from 'lucide-react';
import { useData } from '../context/DataContext';
import { SparkleStar, EditorialFlourish } from '../components/common/BotanicalDecorations';

const AchievementModal = ({ item, onClose }) => {
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
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/80 via-deep-navy/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2 leading-tight drop-shadow-md">
              {item.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-warm-beige/90 text-sm font-medium drop-shadow-sm">
              <span className="flex items-center gap-1.5"><Trophy className="w-4 h-4 text-soft-gold" /> {item.issuer}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-soft-gold" /> {item.date}</span>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[50vh]">
          <div>
            <h4 className="text-xs uppercase tracking-widest text-soft-gold-700 font-bold mb-3">Deskripsi Pencapaian</h4>
            <p className="text-sm sm:text-base text-deep-navy/80 font-light leading-relaxed">
              {item.description || "Tidak ada deskripsi tersedia."}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const AchievementsPage = () => {
  const { achievements } = useData();
  const [selectedAch, setSelectedAch] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <p className="text-xs uppercase tracking-widest text-soft-gold font-semibold">Honors & Recognitions</p>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-deep-navy">
          Achievements & Awards
        </h1>
        <p className="text-base text-deep-navy/70 font-light leading-relaxed">
          National UI/UX design competitions, academic capstone awards, hackathon recognitions, and international delegate honors.
        </p>
        <EditorialFlourish />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {achievements.map((ach) => (
          <motion.div 
            key={ach.id} 
            whileHover={{ y: -6 }}
            onClick={() => setSelectedAch(ach)}
            className="editorial-card rounded-2xl overflow-hidden p-6 space-y-4 flex flex-col justify-between cursor-pointer group"
          >
            <div className="space-y-4">
              <div className="relative h-48 rounded-xl overflow-hidden bg-warm-beige-200 border border-warm-beige-300">
                <img src={ach.image} alt={ach.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-deep-navy text-warm-beige px-3 py-1 rounded-full text-xs font-semibold">
                  {ach.category || 'Award'}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-soft-gold-600 font-semibold">
                  <span>{ach.issuer}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {ach.date}</span>
                </div>
                <h3 className="text-xl font-display font-bold text-deep-navy group-hover:text-soft-gold-600 transition-colors">{ach.title}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedAch && (
          <AchievementModal item={selectedAch} onClose={() => setSelectedAch(null)} />
        )}
      </AnimatePresence>

    </div>
  );
};

export default AchievementsPage;
