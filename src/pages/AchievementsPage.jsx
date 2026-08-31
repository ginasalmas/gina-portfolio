import React from 'react';
import { Sparkles, Trophy, Calendar, ExternalLink } from 'lucide-react';
import { useData } from '../context/DataContext';
import { SparkleStar, EditorialFlourish } from '../components/common/BotanicalDecorations';

const AchievementsPage = () => {
  const { achievements } = useData();

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
          <div key={ach.id} className="editorial-card rounded-2xl overflow-hidden p-6 space-y-4 flex flex-col justify-between">
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
                <h3 className="text-xl font-display font-bold text-deep-navy">{ach.title}</h3>
                <p className="text-xs text-deep-navy/70 font-light leading-relaxed">{ach.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AchievementsPage;
