import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Layers, 
  Palette, 
  Database, 
  FileText, 
  Monitor, 
  Briefcase,
  Sparkles 
} from 'lucide-react';

const roles = [
  {
    id: 'ui-ux',
    title: 'UI/UX Designer',
    shortDesc: 'Product Design & User Research',
    icon: Layers,
    color: 'from-amber-400 to-amber-600',
    badgeBg: 'bg-amber-500/10 text-amber-800 border-amber-300',
    angle: 0,
  },
  {
    id: 'graphic',
    title: 'Design Grafis',
    shortDesc: 'Visual Branding & Media',
    icon: Palette,
    color: 'from-purple-400 to-indigo-600',
    badgeBg: 'bg-purple-500/10 text-purple-800 border-purple-300',
    angle: 60,
  },
  {
    id: 'data-entry',
    title: 'Data Entry',
    shortDesc: 'Accuracy & Database Admin',
    icon: Database,
    color: 'from-emerald-400 to-teal-600',
    badgeBg: 'bg-emerald-500/10 text-emerald-800 border-emerald-300',
    angle: 120,
  },
  {
    id: 'admin',
    title: 'Administrasi Staff',
    shortDesc: 'Office Management & Archiving',
    icon: FileText,
    color: 'from-blue-400 to-cyan-600',
    badgeBg: 'bg-blue-500/10 text-blue-800 border-blue-300',
    angle: 180,
  },
  {
    id: 'computer',
    title: 'Operator Komputer',
    shortDesc: 'IT Support & Systems Operator',
    icon: Monitor,
    color: 'from-rose-400 to-pink-600',
    badgeBg: 'bg-rose-500/10 text-rose-800 border-rose-300',
    angle: 240,
  },
  {
    id: 'ops',
    title: 'Staff Operasional',
    shortDesc: 'Field Logistics & Facilities',
    icon: Briefcase,
    color: 'from-yellow-500 to-amber-600',
    badgeBg: 'bg-yellow-500/10 text-yellow-800 border-yellow-300',
    angle: 300,
  },
];

const HeroOrbitPhoto = ({ profileImage, heroImage }) => {
  const [activeRole, setActiveRole] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  const imageSrc = heroImage || profileImage || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80";

  return (
    <div className="relative w-full max-w-[420px] sm:max-w-[480px] aspect-square mx-auto flex items-center justify-center select-none">
      
      {/* Outer Glow & Ambient Pulsing Rings */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-soft-gold/20 via-botanical-sage/20 to-muted-rose/20 blur-3xl animate-pulse-slow pointer-events-none" />
      
      {/* Dashed Orbit Track 1 (Outer) */}
      <div className="absolute inset-4 sm:inset-6 rounded-full border-2 border-dashed border-soft-gold/30 pointer-events-none animate-spin-slow" style={{ animationDuration: '40s' }} />

      {/* Dashed Orbit Track 2 (Inner Reverse) */}
      <div className="absolute inset-16 sm:inset-20 rounded-full border border-botanical-sage/40 pointer-events-none animate-spin-slow" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />

      {/* Orbit Container with Framer Motion Rotation */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        animate={{ rotate: isPaused ? 0 : 360 }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {roles.map((role) => {
          const radiusPercent = 42; // Radius in percentage from center
          const angleRad = (role.angle * Math.PI) / 180;
          const x = 50 + radiusPercent * Math.cos(angleRad);
          const y = 50 + radiusPercent * Math.sin(angleRad);
          const Icon = role.icon;
          const isHovered = activeRole?.id === role.id;

          return (
            <div
              key={role.id}
              className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${x}%`, top: `${y}%` }}
              onMouseEnter={() => {
                setActiveRole(role);
                setIsPaused(true);
              }}
              onMouseLeave={() => {
                setActiveRole(null);
                setIsPaused(false);
              }}
            >
              {/* Counter-rotate badge content so text stays upright */}
              <motion.div
                animate={{ rotate: isPaused ? 0 : -360 }}
                transition={{
                  duration: 35,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="relative group cursor-pointer"
              >
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-paper-cream/95 border shadow-editorial backdrop-blur-md transition-all duration-300 ${
                    isHovered
                      ? 'scale-110 shadow-xl border-soft-gold ring-2 ring-soft-gold/40 bg-white'
                      : 'border-warm-beige-300 hover:border-soft-gold/60'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center bg-gradient-to-tr ${role.color} text-white shadow-sm flex-shrink-0`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold text-deep-navy whitespace-nowrap">
                    {role.title}
                  </span>
                </div>

                {/* Hover Tooltip / Detail Callout */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.95 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 rounded-xl bg-deep-navy text-warm-beige text-[10px] sm:text-xs font-medium shadow-2xl z-40 whitespace-nowrap border border-soft-gold/30 flex items-center gap-1.5"
                  >
                    <Sparkles className="w-3 h-3 text-soft-gold" />
                    <span>{role.shortDesc}</span>
                  </motion.div>
                )}
              </motion.div>
            </div>
          );
        })}
      </motion.div>

      {/* Central Photo Container */}
      <div className="relative z-20 w-44 h-44 sm:w-56 sm:h-56 rounded-full p-2 bg-paper-cream border-2 border-warm-beige-300 shadow-editorial group">
        
        {/* Animated Rotating Gradient Border */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-soft-gold via-botanical-sage to-muted-rose opacity-60 group-hover:opacity-100 transition-opacity duration-500 animate-spin-slow" style={{ animationDuration: '8s' }} />

        <div className="relative w-full h-full rounded-full overflow-hidden bg-warm-beige-100 border-2 border-white shadow-inner">
          <img
            src={imageSrc}
            alt="Gina Salma Sabilla"
            className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-105"
          />

          {/* Shine effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/20 pointer-events-none" />
        </div>

        {/* Center Sparkle Badge */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-deep-navy text-warm-beige text-[10px] font-bold tracking-widest uppercase border border-soft-gold/50 shadow-lg flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-soft-gold" /> GINA S.S
        </div>
      </div>

    </div>
  );
};

export default HeroOrbitPhoto;
