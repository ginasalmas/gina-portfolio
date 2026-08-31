import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Check, Copy } from 'lucide-react';
import { BotanicalHeaderFlourish, SparkleStar, TinyFlower } from './common/BotanicalDecorations';

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const email = "gina.s.sabilla18@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="editorial-card p-10 md:p-16 rounded-3xl bg-paper-cream/95 backdrop-blur-xl border border-warm-beige-400 relative overflow-hidden shadow-editorial"
        >
          {/* Subtle floral accents */}
          <div className="absolute top-4 right-4 opacity-40 pointer-events-none">
            <TinyFlower className="w-12 h-12 text-soft-gold animate-spin-slow" />
          </div>

          <p className="text-xs uppercase tracking-widest text-soft-gold font-semibold mb-2">Get In Touch</p>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-deep-navy mb-4 relative z-10">
            Let's Build Something Beautiful
          </h2>
          <BotanicalHeaderFlourish />

          <p className="text-base text-deep-navy/80 mb-10 max-w-xl mx-auto font-light leading-relaxed relative z-10">
            Currently available for freelance UI/UX projects, design consultation, and full-time opportunities.
            Feel free to send a message or request my full resume.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-10 relative z-10">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              onClick={handleCopy}
              className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-warm-beige-100 border border-warm-beige-300 hover:border-soft-gold text-deep-navy font-semibold text-sm cursor-pointer transition w-full sm:w-auto justify-center shadow-sm"
            >
              <Mail className="w-4 h-4 text-soft-gold" />
              <span>{email}</span>
              {copied ? (
                <Check className="w-4 h-4 text-botanical-sage-dark ml-1" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-deep-navy/40 ml-1 hover:text-deep-navy" />
              )}
            </motion.div>

            <div className="flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-warm-beige-100 border border-warm-beige-300 text-deep-navy/75 font-medium text-sm w-full sm:w-auto justify-center">
              <MapPin className="w-4 h-4 text-muted-rose" />
              <span>Depok, Jawa Barat, Indonesia</span>
            </div>
          </div>

          <motion.a
            href={`mailto:${email}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-9 py-4 rounded-full bg-deep-navy text-warm-beige font-semibold text-sm uppercase tracking-wider shadow-editorial hover:shadow-editorial-hover transition duration-300 relative z-10"
          >
            Send An Email
            <Send className="w-4 h-4 text-soft-gold" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
