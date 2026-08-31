import React from 'react';

// Tiny Star Sparkle SVG
export const SparkleStar = ({ className = "w-4 h-4 text-soft-gold/70 animate-pulse-subtle", style }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);

// Delicate Petal Flower SVG
export const TinyFlower = ({ className = "w-6 h-6 text-soft-gold/60", style }) => (
  <svg viewBox="0 0 100 100" fill="currentColor" className={className} style={style}>
    <circle cx="50" cy="50" r="8" className="text-soft-gold" />
    <path d="M50 12 C44 28 44 28 50 38 C56 28 56 28 50 12 Z" fill="currentColor" opacity="0.8" />
    <path d="M50 88 C44 72 44 72 50 62 C56 72 56 72 50 88 Z" fill="currentColor" opacity="0.8" />
    <path d="M12 50 C28 44 28 44 38 50 C28 56 28 56 12 50 Z" fill="currentColor" opacity="0.8" />
    <path d="M88 50 C72 44 72 44 62 50 C72 56 72 56 88 50 Z" fill="currentColor" opacity="0.8" />
    <path d="M23 23 C36 34 36 34 42 42 C34 36 34 36 23 23 Z" fill="currentColor" opacity="0.6" />
    <path d="M77 77 C64 66 64 66 58 58 C66 64 66 64 77 77 Z" fill="currentColor" opacity="0.6" />
  </svg>
);

// Rich Botanical Branch with Leaves & Berries
export const FloralBranch = ({ className = "w-28 h-28 text-botanical-sage/60 stroke-current fill-none", style }) => (
  <svg viewBox="0 0 120 120" className={className} style={style} strokeWidth="1.5">
    <path d="M15 105 Q 60 85 95 15" strokeLinecap="round" />
    <path d="M35 88 Q 20 70 36 68 Q 44 80 35 88 Z" fill="currentColor" fillOpacity="0.15" />
    <path d="M55 68 Q 42 50 58 48 Q 64 60 55 68 Z" fill="currentColor" fillOpacity="0.15" />
    <path d="M75 45 Q 62 28 78 26 Q 84 38 75 45 Z" fill="currentColor" fillOpacity="0.15" />
    <path d="M48 76 Q 62 65 65 74 Q 56 86 48 76 Z" fill="currentColor" fillOpacity="0.15" />
    <path d="M68 55 Q 82 45 85 54 Q 76 65 68 55 Z" fill="currentColor" fillOpacity="0.15" />
    <circle cx="98" cy="18" r="3.5" fill="#C59B4E" fillOpacity="0.8" stroke="none" />
    <circle cx="90" cy="10" r="2.5" fill="#C48377" fillOpacity="0.8" stroke="none" />
    <circle cx="104" cy="26" r="2.5" fill="#C59B4E" fillOpacity="0.8" stroke="none" />
  </svg>
);

// Elegant Wildflower Corner Illustration
export const WildflowerCorner = ({ className = "w-36 h-36 text-botanical-sage/50 stroke-current fill-none" }) => (
  <svg viewBox="0 0 160 160" className={className} strokeWidth="1.2">
    <path d="M10 150 Q 15 60 150 10" strokeLinecap="round" />
    <g transform="translate(135, 20)">
      <circle cx="0" cy="0" r="4" fill="#C59B4E" stroke="none" />
      <path d="M0 -12 C-3 -6 -3 -6 0 0 C3 -6 3 -6 0 -12 Z" fill="#FAF5ED" stroke="currentColor" />
      <path d="M0 12 C-3 6 -3 6 0 0 C3 6 3 6 0 12 Z" fill="#FAF5ED" stroke="currentColor" />
      <path d="M-12 0 C-6 -3 -6 -3 0 0 C-6 3 -6 3 -12 0 Z" fill="#FAF5ED" stroke="currentColor" />
      <path d="M12 0 C6 -3 6 -3 0 0 C6 3 6 3 12 0 Z" fill="#FAF5ED" stroke="currentColor" />
    </g>
    <g transform="translate(65, 80)">
      <circle cx="0" cy="0" r="3" fill="#C48377" stroke="none" />
      <circle cx="-6" cy="0" r="2.5" fill="currentColor" opacity="0.3" stroke="none" />
      <circle cx="6" cy="0" r="2.5" fill="currentColor" opacity="0.3" stroke="none" />
      <circle cx="0" cy="-6" r="2.5" fill="currentColor" opacity="0.3" stroke="none" />
      <circle cx="0" cy="6" r="2.5" fill="currentColor" opacity="0.3" stroke="none" />
    </g>
    <path d="M25 120 Q 10 105 28 100 Q 35 110 25 120 Z" fill="currentColor" fillOpacity="0.2" />
    <path d="M40 95 Q 25 80 43 75 Q 50 85 40 95 Z" fill="currentColor" fillOpacity="0.2" />
    <path d="M75 55 Q 60 40 78 35 Q 85 45 75 55 Z" fill="currentColor" fillOpacity="0.2" />
    <path d="M105 32 Q 95 15 110 18 Q 115 28 105 32 Z" fill="currentColor" fillOpacity="0.2" />
  </svg>
);

// Rose Sprig Line Art Illustration
export const RoseSprig = ({ className = "w-20 h-20 text-soft-gold/60 stroke-current fill-none" }) => (
  <svg viewBox="0 0 100 100" className={className} strokeWidth="1.2">
    <path d="M50 90 Q 48 50 50 15" strokeLinecap="round" />
    <path d="M50 25 C40 10 60 10 50 25 Z" fill="#C48377" fillOpacity="0.25" />
    <path d="M42 22 C32 15 42 5 50 15 C58 5 68 15 58 22 Z" strokeLinecap="round" />
    <path d="M38 30 C30 25 35 18 45 22" />
    <path d="M62 30 C70 25 65 18 55 22" />
    <path d="M49 55 Q 30 45 42 42 Q 50 48 49 55 Z" fill="currentColor" fillOpacity="0.15" />
    <path d="M51 68 Q 70 58 58 55 Q 50 61 51 68 Z" fill="currentColor" fillOpacity="0.15" />
  </svg>
);

// Botanical Header Flourish Line with Flower Center
export const BotanicalHeaderFlourish = ({ className = "my-5" }) => (
  <div className={`flex items-center justify-center gap-3 opacity-80 ${className}`}>
    <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-botanical-sage/40 to-soft-gold" />
    <FloralBranch className="w-6 h-6 text-soft-gold animate-sway" />
    <TinyFlower className="w-5 h-5 text-botanical-sage" />
    <SparkleStar className="w-3.5 h-3.5 text-soft-gold" />
    <div className="h-[1px] w-16 bg-gradient-to-l from-transparent via-botanical-sage/40 to-soft-gold" />
  </div>
);

// Also export EditorialFlourish alias for backward compatibility
export const EditorialFlourish = BotanicalHeaderFlourish;

// Floating Botanical Petal
export const FloatingPetal = ({ className = "w-4 h-4 text-muted-rose/40 animate-float-slow", style }) => (
  <svg viewBox="0 0 40 40" fill="currentColor" className={className} style={style}>
    <path d="M20 5 C10 15 5 25 20 35 C35 25 30 15 20 5 Z" opacity="0.6" />
  </svg>
);
