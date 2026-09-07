import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Tag, Share2, Sparkles } from 'lucide-react';
import { useData } from '../context/DataContext';
import { SparkleStar, EditorialFlourish } from '../components/common/BotanicalDecorations';

const JournalDetail = () => {
  const { id } = useParams();
  const { blogPosts, settings } = useData();

  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center space-y-4">
        <h2 className="text-3xl font-display font-bold text-deep-navy">Article Not Found</h2>
        <p className="text-sm text-deep-navy/60">The journal article you requested could not be found.</p>
        <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-full bg-deep-navy text-warm-beige">
          <ArrowLeft className="w-4 h-4" /> Back to Journal
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-6 md:px-12 py-10 space-y-12">
      
      {/* Back Button */}
      <div>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-deep-navy/70 hover:text-deep-navy transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-soft-gold" /> All Journal Articles
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-6 text-center max-w-3xl mx-auto">
        <div className="inline-block px-4 py-1 rounded-full badge-gold text-xs font-semibold uppercase tracking-wider">
          {post.category}
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-deep-navy leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-deep-navy/60 font-medium">
          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Published: {post.publishedAt}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
          <span>•</span>
          <span>By {settings.name || 'Gina'}</span>
        </div>

        <EditorialFlourish />
      </div>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="rounded-3xl overflow-hidden shadow-editorial border border-warm-beige-300">
          <img src={post.coverImage} alt={post.title} className="w-full max-h-[460px] object-cover" />
        </div>
      )}

      {/* Article Content */}
      <div className="prose prose-lg max-w-2xl mx-auto text-deep-navy/85 font-light leading-relaxed space-y-6 pt-4">
        
        {post.excerpt && (
          <p className="text-lg md:text-xl font-serif italic text-deep-navy border-l-2 border-soft-gold pl-6 py-2 my-6">
            "{post.excerpt}"
          </p>
        )}

        {/* Content sections */}
        <div className="space-y-12">
          {post.sections && post.sections.length > 0 ? (
            post.sections.map((section, idx) => (
              <div key={idx} className="space-y-8">
                {section.content && (
                  <div className="whitespace-pre-line text-base md:text-lg leading-relaxed font-sans">
                    {section.content}
                  </div>
                )}
                {section.images && section.images.length > 0 && (
                  <div className="my-6">
                    {section.images.length <= 2 ? (
                      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        {section.images.slice(0, 2).map((img, i) => (
                          <div key={i} className="rounded-2xl overflow-hidden shadow-sm">
                            <img
                              src={img}
                              alt={`Section media ${i + 1}`}
                              className="max-w-full h-auto max-h-[500px] object-contain hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                        {section.images.slice(0, 3).map((img, i) => (
                          <div key={i} className="break-inside-avoid rounded-2xl overflow-hidden shadow-sm relative group">
                            <img
                              src={img}
                              alt={`Section media ${i + 1}`}
                              className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="whitespace-pre-line text-base md:text-lg leading-relaxed font-sans space-y-4">
              {post.content}
            </div>
          )}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="pt-8 border-t border-deep-navy/10 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-deep-navy/60 mr-2 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> Tags:
            </span>
            {post.tags.map((tag, idx) => (
              <span key={idx} className="text-xs px-3 py-1 rounded-full bg-warm-beige-200 text-deep-navy/80 border border-warm-beige-300">
                #{tag}
              </span>
            ))}
          </div>
        )}

      </div>

      {/* Author Bio Box */}
      <div className="max-w-2xl mx-auto p-6 md:p-8 rounded-2xl bg-white border border-warm-beige-300 shadow-editorial flex flex-col sm:flex-row items-center gap-6">
        <img
          src={settings.profileImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"}
          alt={settings.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-soft-gold"
        />
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-lg font-display font-bold text-deep-navy">Written by {settings.fullName || settings.name || 'Gina'}</h4>
          <p className="text-xs text-deep-navy/70 font-light leading-relaxed">
            {settings.subtitle || 'UI/UX Designer, Graphic Designer & Informatics Graduate crafting thoughtful digital experiences.'}
          </p>
        </div>
      </div>

    </article>
  );
};

export default JournalDetail;
