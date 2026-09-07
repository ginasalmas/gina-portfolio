import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Instagram, Github, Download, Check, ArrowUpRight } from 'lucide-react';
import { useData } from '../context/DataContext';
import { SparkleStar, TinyFlower, FloralBranch, RoseSprig, BotanicalHeaderFlourish } from './common/BotanicalDecorations';

const Footer = () => {
  const { settings } = useData();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (settings.email) {
      navigator.clipboard.writeText(settings.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <footer className="bg-deep-navy text-warm-beige relative overflow-hidden pt-20 pb-12 border-t border-soft-gold/30">
      
      {/* Background Botanical Sprigs */}
      <div className="absolute top-8 right-10 opacity-30 pointer-events-none">
        <FloralBranch className="w-36 h-36 text-soft-gold" />
      </div>
      <div className="absolute bottom-12 left-6 opacity-25 pointer-events-none">
        <RoseSprig className="w-28 h-28 text-botanical-sage-light" />
      </div>
      <div className="absolute top-1/2 left-8 opacity-20 pointer-events-none">
        <TinyFlower className="w-8 h-8 text-soft-gold" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Main CTA Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-soft-gold/30 text-[11px] uppercase tracking-widest text-soft-gold font-semibold">
            <TinyFlower className="w-3.5 h-3.5 text-soft-gold animate-spin-slow" /> Contact & Collaboration
          </div>

          <h2 className="text-3xl md:text-5xl font-display font-bold leading-tight">
            "Let's create something meaningful."
          </h2>

          <p className="text-warm-beige/80 font-light text-base md:text-lg max-w-xl mx-auto">
            Whether you're looking for a UI/UX designer, brand strategist, or informatics collaborator, I'd love to chat about your vision.
          </p>

          <BotanicalHeaderFlourish />

          {/* Email Copy CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopyEmail}
              className="px-6 py-3.5 rounded-full bg-soft-gold text-deep-navy font-semibold text-sm hover:bg-soft-gold-400 transition-all flex items-center gap-2 shadow-lg"
            >
              <Mail className="w-4 h-4" />
              {settings.email || 'hello.gina@example.com'}
              {copied && (
                <span className="ml-2 text-xs bg-deep-navy text-soft-gold px-2 py-0.5 rounded flex items-center gap-1">
                  <Check className="w-3 h-3" /> Copied!
                </span>
              )}
            </motion.button>

            {settings.cvUrl && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={settings.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full border border-warm-beige/30 text-warm-beige font-medium text-sm hover:bg-warm-beige/10 transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-soft-gold" />
                Download CV
              </motion.a>
            )}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12 border-t border-warm-beige/15">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="text-2xl font-display font-bold tracking-tight text-warm-beige flex items-center gap-1.5 group">
              <TinyFlower className="w-5 h-5 text-soft-gold group-hover:rotate-45 transition-transform" />
              <span>{settings.name || 'Gina'}.</span>
            </Link>
            <p className="text-warm-beige/70 text-sm max-w-md font-light leading-relaxed">
              {settings.subtitle || 'UI/UX Designer, Graphic Designer, and Informatics Graduate crafting digital experiences with purpose.'}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-soft-gold font-semibold mb-4 flex items-center gap-1">
              <SparkleStar className="w-3 h-3 text-soft-gold" /> Navigation
            </h4>
            <ul className="space-y-2 text-sm text-warm-beige/80">
              <li><Link to="/portfolio" className="hover:text-soft-gold transition-colors">Portfolio Case Studies</Link></li>
              <li><Link to="/blog" className="hover:text-soft-gold transition-colors">Notes & Journal</Link></li>
              <li><Link to="/certificates" className="hover:text-soft-gold transition-colors">Certificates & Certifications</Link></li>
              <li><Link to="/achievements" className="hover:text-soft-gold transition-colors">Achievements & Awards</Link></li>
              <li><Link to="/writings" className="hover:text-soft-gold transition-colors">Academic Writings</Link></li>
              <li><Link to="/about" className="hover:text-soft-gold transition-colors">About Gina</Link></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-soft-gold font-semibold mb-4 flex items-center gap-1">
              <SparkleStar className="w-3 h-3 text-soft-gold" /> Connect
            </h4>
            <div className="flex flex-col space-y-2 text-sm text-warm-beige/80">
              {settings.linkedin && (
                <a href={settings.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-soft-gold transition-colors flex items-center gap-2 group">
                  <Linkedin className="w-4 h-4 text-soft-gold" /> LinkedIn <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
              {settings.instagram && (
                <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-soft-gold transition-colors flex items-center gap-2 group">
                  <Instagram className="w-4 h-4 text-soft-gold" /> Instagram <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
              {settings.github && (
                <a href={settings.github} target="_blank" rel="noopener noreferrer" className="hover:text-soft-gold transition-colors flex items-center gap-2 group">
                  <Github className="w-4 h-4 text-soft-gold" /> GitHub <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-warm-beige/15 text-center md:flex md:justify-between items-center text-xs text-warm-beige/60 font-light">
          <p>© {new Date().getFullYear()} {settings.fullName || 'Gina Rahma'}. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

