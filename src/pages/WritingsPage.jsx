import React from 'react';
import { BookOpen, ExternalLink, Calendar, FileText } from 'lucide-react';
import { useData } from '../context/DataContext';
import { SparkleStar, EditorialFlourish } from '../components/common/BotanicalDecorations';

const WritingsPage = () => {
  const { writings } = useData();

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <p className="text-xs uppercase tracking-widest text-soft-gold font-semibold">Academic & Professional Writings</p>
        <h1 className="text-4xl md:text-5xl font-display font-bold text-deep-navy">
          Writings & Research Publications
        </h1>
        <p className="text-base text-deep-navy/70 font-light leading-relaxed">
          Peer-reviewed journal papers, undergraduate thesis abstracts, and design research essays exploring HCI, WCAG accessibility, and visual micro-interactions.
        </p>
        <EditorialFlourish />
      </div>

      {/* List */}
      <div className="space-y-6 max-w-4xl mx-auto">
        {writings.map((paper) => (
          <div key={paper.id} className="editorial-card rounded-2xl p-6 md:p-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-deep-navy/10 pb-3">
              <span className="px-3 py-1 rounded-full badge-gold text-xs font-semibold self-start">
                {paper.category || 'Research Paper'}
              </span>
              <span className="text-xs text-deep-navy/60 font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-soft-gold" /> {paper.date}
              </span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-display font-bold text-deep-navy">{paper.title}</h3>
              <p className="text-xs font-semibold text-soft-gold-600">Published in: {paper.publication}</p>
              <p className="text-sm text-deep-navy/80 font-light leading-relaxed">{paper.summary}</p>
            </div>

            {paper.link && (
              <div className="pt-2">
                <a
                  href={paper.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-deep-navy hover:text-soft-gold inline-flex items-center gap-1"
                >
                  Read Full Publication / DOI <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default WritingsPage;
