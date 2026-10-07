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
        className="relative w-full max-w-5xl bg-paper-cream rounded-[2rem] shadow-2xl flex flex-col md:flex-row overflow-hidden border border-warm-beige-300 max-h-[90vh]"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-white/30 hover:bg-rose-100 text-deep-navy hover:text-rose-600 rounded-full transition-colors z-10 backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-full md:w-1/2 bg-warm-beige-200 relative flex items-center justify-center p-6 md:p-8 flex-shrink-0">
          <img src={item.image} alt={item.title} className="w-full h-auto max-h-[40vh] md:max-h-[80vh] object-contain rounded-lg shadow-sm" />
        </div>

        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col overflow-y-auto">
          <div className="mb-8 border-b border-warm-beige-300 pb-6">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-deep-navy mb-4 leading-tight">
              {item.title}
            </h2>
            <div className="flex flex-col gap-3 text-deep-navy/80 text-sm font-medium">
              <span className="flex items-center gap-2"><Trophy className="w-4 h-4 text-soft-gold" /> {item.issuer}</span>
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-soft-gold" /> {item.date}</span>
            </div>
          </div>

          <div className="flex-grow space-y-6">
            <div>
              <h4 className="text-xs uppercase tracking-widest text-soft-gold-700 font-bold mb-3">Deskripsi Pencapaian</h4>
              <p className="text-sm sm:text-base text-deep-navy/80 font-light leading-relaxed">
                {item.description || "Tidak ada deskripsi tersedia."}
              </p>
            </div>
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
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
        {achievements.map((ach) => (
          <motion.div 
            key={ach.id} 
            whileHover={{ y: -6 }}
            onClick={() => setSelectedAch(ach)}
            className="editorial-card rounded-2xl overflow-hidden p-6 space-y-4 flex flex-col justify-between cursor-pointer group break-inside-avoid mb-8 inline-block w-full"
          >
            <div className="space-y-4">
              <div className="relative rounded-xl overflow-hidden bg-warm-beige-200 border border-warm-beige-300">
                <img src={ach.image} alt={ach.title} className="w-full h-auto object-contain transition-transform duration-700 hover:scale-105" />
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
