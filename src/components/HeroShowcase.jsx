import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Layout, 
  Play, 
  Users, 
  Bell, 
  Home as HomeIcon, 
  Bookmark, 
  User, 
  CheckCircle2, 
  Layers, 
  Code, 
  PenTool, 
  BookOpen, 
  Award, 
  Clock 
} from 'lucide-react';

// --- 4-Pointed Golden Sparkle Star ---
const SparkleStar4 = ({ className = "w-4 h-4 text-[#C59B4E]", style }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} style={style} aria-hidden="true">
    <path d="M12 0 L14.2 9.8 L24 12 L14.2 14.2 L12 24 L9.8 14.2 L0 12 L9.8 9.8 Z" />
  </svg>
);

// --- Botanical Branch Accent (Bottom-Right) - Master Vector Matching Reference ---
const BotanicalBranchBottomRight = ({ className = "" }) => (
  <svg viewBox="0 0 160 160" fill="none" className={className} aria-hidden="true">
    {/* Dark navy main curved stem */}
    <path d="M142 148 C118 132 98 98 88 44" stroke="#131F2E" strokeWidth="2.5" strokeLinecap="round" />
    
    {/* Top leaf */}
    <path d="M88 44 C78 28 80 8 94 4 C98 20 96 35 88 44 Z" fill="#131F2E" />
    {/* Upper middle navy leaf */}
    <path d="M94 78 C78 68 76 48 96 40 C102 56 100 70 94 78 Z" fill="#131F2E" />
    {/* Lower middle navy leaf */}
    <path d="M110 110 C92 100 90 78 112 70 C118 88 114 103 110 110 Z" fill="#131F2E" />
    {/* Bottom large navy leaf */}
    <path d="M136 130 C118 116 124 90 146 84 C148 106 143 120 136 130 Z" fill="#131F2E" />

    {/* Warm gold / ochre leaves */}
    <path d="M80 60 C68 62 66 48 80 44 C86 50 84 56 80 60 Z" fill="#C69B51" />
    <path d="M102 93 C86 96 84 80 100 76 C108 83 106 90 102 93 Z" fill="#C69B51" />
    <path d="M122 134 C106 134 102 118 120 114 C128 122 126 130 122 134 Z" fill="#C69B51" />
  </svg>
);

// --- UX Process Badges ---
const UXProcessBadge = ({ label, iconType, className = "", delay = 0 }) => {
  const renderIcon = () => {
    switch (iconType) {
      case 'research':
        return (
          <span className="w-7 h-7 rounded-full bg-[#111C2B] flex items-center justify-center text-white shrink-0 shadow-sm">
            <Search className="w-3.5 h-3.5" strokeWidth={2.5} />
          </span>
        );
      case 'wireframe':
        return (
          <span className="w-7 h-7 rounded-lg border border-[#D5C7B5] bg-[#F7F4EE] flex items-center justify-center text-[#111C2B] shrink-0">
            <Layout className="w-3.5 h-3.5" strokeWidth={2} />
          </span>
        );
      case 'prototype':
        return (
          <span className="w-7 h-7 rounded-full bg-[#111C2B] flex items-center justify-center text-white shrink-0 shadow-sm pl-0.5">
            <Play className="w-3.5 h-3.5 fill-current" />
          </span>
        );
      case 'usability':
        return (
          <span className="w-7 h-7 rounded-full bg-[#111C2B] flex items-center justify-center text-white shrink-0 shadow-sm">
            <Users className="w-3.5 h-3.5" strokeWidth={2.2} />
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full select-none bg-white border border-[#E0D7CB] shadow-[0_6px_20px_-3px_rgba(17,28,43,0.12),0_2px_6px_rgba(17,28,43,0.06)] ${className}`}
      whileHover={{ scale: 1.07, y: -2, boxShadow: '0 12px 28px -4px rgba(17,28,43,0.18)' }}
      animate={{ y: [0, -3.5, 0] }}
      transition={{
        y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay },
        scale: { type: 'spring', stiffness: 400, damping: 20 }
      }}
    >
      {renderIcon()}
      <span className="text-[12px] font-bold text-[#111C2B] whitespace-nowrap tracking-tight pr-1">
        {label}
      </span>
    </motion.div>
  );
};

// --- Screen 1: Mobile Recipe App Screen ---
const MobileAppScreen = () => (
  <div className="w-full h-full bg-[#FCFBFA] flex flex-col justify-between select-none text-[#121B28] font-sans overflow-hidden">
    {/* Status Bar */}
    <div className="pt-2 px-5 pb-1 flex justify-between items-center text-[10px] font-semibold text-gray-800">
      <span>9:41</span>
      <div className="flex items-center gap-1.5 text-[9px]">
        <span>5G</span>
        <div className="w-4 h-2 rounded-sm border border-gray-700 p-0.5 flex items-center">
          <div className="w-full h-full bg-gray-800 rounded-2xs" />
        </div>
      </div>
    </div>

    {/* Main Content Area */}
    <div className="px-3.5 flex-1 flex flex-col justify-between py-1">
      {/* Top Greeting */}
      <div>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[9px] text-gray-500 font-medium">Good Morning,</p>
            <p className="text-[13px] font-display font-bold text-[#121B28] flex items-center gap-1">
              Gina <span className="text-amber-500 text-[11px]">☀️</span>
            </p>
          </div>
          <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
            <Bell className="w-3 h-3" />
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-2 flex items-center gap-2 px-2.5 py-1.5 bg-[#F2EFE9]/90 rounded-full border border-[#E5DFD5]">
          <Search className="w-3 h-3 text-gray-400 shrink-0" />
          <span className="text-[8.5px] text-gray-400 font-normal truncate">
            Search recipes, ingredients...
          </span>
        </div>
      </div>

      {/* Featured Banner Card */}
      <div className="my-1.5 p-2.5 bg-[#EFF5ED] rounded-xl border border-[#DCE8D8] flex items-center justify-between">
        <div className="space-y-0.5 max-w-[100px]">
          <p className="text-[9.5px] font-bold text-[#172E19] leading-tight font-display">
            Healthy Recipes
          </p>
          <p className="text-[7.5px] text-[#2D5A32] font-medium">
            for a Better You
          </p>
        </div>
        <div className="w-11 h-11 rounded-lg overflow-hidden shrink-0 shadow-xs border border-white">
          <img
            src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=150&q=80"
            alt="Salad Bowl"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>

      {/* Popular Categories */}
      <div>
        <p className="text-[9px] font-bold text-[#121B28] mb-1 font-display">
          Popular Categories
        </p>
        <div className="grid grid-cols-4 gap-1 text-center">
          {[
            { label: 'Breakfast', emoji: '🍳', bg: 'bg-amber-100/80' },
            { label: 'Lunch', emoji: '🥗', bg: 'bg-emerald-100/80' },
            { label: 'Dinner', emoji: '🍲', bg: 'bg-rose-100/80' },
            { label: 'Snacks', emoji: '🍪', bg: 'bg-orange-100/80' },
          ].map((cat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full ${cat.bg} flex items-center justify-center text-[12px] shadow-2xs`}>
                {cat.emoji}
              </div>
              <span className="text-[7px] font-medium text-gray-600 mt-0.5">
                {cat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended For You */}
      <div className="mt-1">
        <p className="text-[9px] font-bold text-[#121B28] mb-1 font-display">
          Recommended for You
        </p>
        <div className="p-1.5 bg-white rounded-xl border border-[#ECE5DC] flex items-center gap-2 shadow-2xs">
          <img
            src="https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=120&q=80"
            alt="Avocado Toast"
            className="w-9 h-9 rounded-lg object-cover shrink-0"
            loading="lazy"
          />
          <div className="flex-1 min-w-0">
            <p className="text-[8.5px] font-bold text-gray-900 truncate">
              Avocado Toast
            </p>
            <div className="flex items-center gap-1.5 mt-0.5 text-[6.5px] text-gray-500 font-medium">
              <span className="text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded-full">● Healthy</span>
              <span className="text-amber-700 bg-amber-50 px-1 py-0.2 rounded-full">⏱ Quick</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Nav Bar */}
    <div className="bg-white/95 border-t border-gray-100 px-4 py-1.5 flex justify-around items-center">
      <div className="flex flex-col items-center text-[#121B28]">
        <HomeIcon className="w-3.5 h-3.5" />
        <span className="text-[6.5px] font-bold mt-0.5">Home</span>
      </div>
      <div className="flex flex-col items-center text-gray-400">
        <Bookmark className="w-3.5 h-3.5" />
        <span className="text-[6.5px] font-medium mt-0.5">Saved</span>
      </div>
      <div className="flex flex-col items-center text-gray-400">
        <User className="w-3.5 h-3.5" />
        <span className="text-[6.5px] font-medium mt-0.5">Profile</span>
      </div>
    </div>
  </div>
);

// --- Screen 2: Desktop Dashboard Screen ---
const DesktopDashboardScreen = () => (
  <div className="w-full h-full bg-[#FAF8F5] flex select-none text-[#121B28] font-sans overflow-hidden">
    {/* Left Mini Sidebar */}
    <div className="w-[84px] bg-[#F5F1EB] border-r border-[#E8E1D5] p-2 flex flex-col justify-between shrink-0">
      <div className="space-y-1">
        <div className="px-2 py-1 rounded-md bg-white text-[#121B28] font-bold text-[7.5px] shadow-2xs flex items-center gap-1.5 border border-[#E5DDD2]">
          <HomeIcon className="w-2.5 h-2.5 text-[#C59B4E]" />
          <span>Home</span>
        </div>
        <div className="px-2 py-1 rounded-md text-gray-500 text-[7.5px] font-medium flex items-center gap-1.5">
          <BookOpen className="w-2.5 h-2.5" />
          <span>Courses</span>
        </div>
        <div className="px-2 py-1 rounded-md text-gray-500 text-[7.5px] font-medium flex items-center gap-1.5">
          <CheckCircle2 className="w-2.5 h-2.5" />
          <span>Progress</span>
        </div>
        <div className="px-2 py-1 rounded-md text-gray-500 text-[7.5px] font-medium flex items-center gap-1.5">
          <Award className="w-2.5 h-2.5" />
          <span>Certificates</span>
        </div>
      </div>
      <div className="px-2 py-1 text-gray-400 text-[7px] flex items-center gap-1">
        <span>Settings</span>
      </div>
    </div>

    {/* Main Content Area */}
    <div className="flex-1 p-3 flex flex-col justify-between overflow-hidden">
      {/* Top Greeting Header */}
      <div className="flex justify-between items-center mb-1">
        <div>
          <h4 className="text-[10.5px] font-display font-bold text-[#121B28] leading-tight">
            Good morning, Gina 👋
          </h4>
          <p className="text-[6.5px] text-gray-500 font-medium">
            Keep going! You're doing great today.
          </p>
        </div>
      </div>

      {/* Top 2 Cards: Progress & Metrics */}
      <div className="grid grid-cols-12 gap-2">
        {/* Progress Card (Dark Navy) */}
        <div className="col-span-7 bg-[#101A29] text-white rounded-xl p-2.5 flex flex-col justify-between shadow-xs relative overflow-hidden">
          <p className="text-[7.5px] text-gray-300 font-medium">Your Progress</p>
          
          <div className="flex items-center gap-3 my-1">
            {/* Circular Gauge */}
            <div className="relative w-11 h-11 shrink-0 flex items-center justify-center">
              <svg className="w-11 h-11 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="14" fill="none" stroke="#23354C" strokeWidth="3.5" />
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#C59B4E"
                  strokeWidth="3.5"
                  strokeDasharray="88"
                  strokeDashoffset="28"
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-[8.5px] font-bold text-white">68%</span>
            </div>
            <div>
              <p className="text-[7px] text-gray-400">Completed</p>
              <p className="text-[8px] font-bold text-white">8 of 8 modules</p>
            </div>
          </div>

          <button className="w-full py-1 bg-[#E7CA8E] text-[#101A29] font-bold text-[7px] rounded-md transition-colors text-center shadow-2xs">
            Continue Learning
          </button>
        </div>

        {/* Quick Metrics Card (Right) */}
        <div className="col-span-5 bg-white rounded-xl p-2 border border-[#EBE4D8] flex flex-col justify-between shadow-2xs relative">
          {/* Subtle botanical accent */}
          <div className="absolute top-1 right-1.5 opacity-40 pointer-events-none">
            <svg width="22" height="22" viewBox="0 0 30 30" fill="none">
              <path d="M22 6 C16 12 14 18 10 24" stroke="#131F2E" strokeWidth="1.5" />
              <path d="M22 6 C18 6 16 10 18 14 Z" fill="#131F2E" />
              <path d="M16 12 C12 12 10 15 13 18 Z" fill="#C69B51" />
            </svg>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[7px] text-gray-600 border-b border-gray-100 pb-1">
              <span className="flex items-center gap-1 font-medium">
                <BookOpen className="w-2.5 h-2.5 text-[#C59B4E]" />
                Total Courses
              </span>
              <span className="font-bold text-gray-900">8 &gt;</span>
            </div>
            <div className="flex items-center justify-between text-[7px] text-gray-600 border-b border-gray-100 pb-1">
              <span className="flex items-center gap-1 font-medium">
                <Award className="w-2.5 h-2.5 text-emerald-600" />
                Certificates
              </span>
              <span className="font-bold text-gray-900">3 &gt;</span>
            </div>
            <div className="flex items-center justify-between text-[7px] text-gray-600">
              <span className="flex items-center gap-1 font-medium">
                <Clock className="w-2.5 h-2.5 text-blue-600" />
                Study Hours
              </span>
              <span className="font-bold text-gray-900">24h &gt;</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: My Courses */}
      <div className="mt-1.5">
        <p className="text-[8px] font-bold font-display text-[#121B28] mb-1">
          My Courses
        </p>
        <div className="grid grid-cols-3 gap-1.5">
          {/* Course 1 */}
          <div className="p-1.5 bg-white rounded-lg border border-[#ECE5DA] flex items-center gap-1.5 shadow-2xs">
            <div className="w-5 h-5 rounded-md bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <Layers className="w-3 h-3" />
            </div>
            <div className="min-w-0">
              <p className="text-[6.5px] font-bold text-gray-900 truncate">UI/UX Design Basics</p>
              <p className="text-[5.5px] text-gray-500 font-medium">In Progress • 68%</p>
            </div>
          </div>

          {/* Course 2 */}
          <div className="p-1.5 bg-white rounded-lg border border-[#ECE5DA] flex items-center gap-1.5 shadow-2xs">
            <div className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <Code className="w-3 h-3" />
            </div>
            <div className="min-w-0">
              <p className="text-[6.5px] font-bold text-gray-900 truncate">Web Development</p>
              <p className="text-[5.5px] text-gray-500 font-medium">Not Started • 0%</p>
            </div>
          </div>

          {/* Course 3 */}
          <div className="p-1.5 bg-white rounded-lg border border-[#ECE5DA] flex items-center gap-1.5 shadow-2xs">
            <div className="w-5 h-5 rounded-md bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <PenTool className="w-3 h-3" />
            </div>
            <div className="min-w-0">
              <p className="text-[6.5px] font-bold text-gray-900 truncate">Product Design</p>
              <p className="text-[5.5px] text-gray-500 font-medium">Not Started • 0%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- Main HeroShowcase Component ---
const HeroShowcase = ({
  items = [],
  showcaseItems = [],
  interval = 25,
  autoRotate = true,
  animationEnabled = true,
}) => {
  const rawItems = items && items.length > 0 ? items : showcaseItems;
  const activeItems = Array.isArray(rawItems) ? rawItems.filter(it => it && it.active !== false) : [];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  const totalSlides = activeItems.length > 0 ? activeItems.length : 1;
  const currentItem = activeItems[currentIndex] || null;

  useEffect(() => {
    if (!autoRotate || isHovered || totalSlides <= 1) return;
    const duration = Math.max(10, interval) * 1000;
    timerRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % totalSlides);
    }, duration);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoRotate, isHovered, interval, totalSlides]);

  return (
    <div
      className="relative w-full max-w-[650px] mx-auto select-none"
      style={{ minHeight: 480 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="region"
      aria-label="UI/UX Interactive Showcase"
    >
      {/* ─── SVG Golden Dashed Orbital Path ─── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        viewBox="0 0 650 480"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <path
          d="M 230,45 
             C 340,10 460,30 520,60
             C 620,110 650,260 580,390
             C 530,480 370,490 270,440
             C 170,390 100,280 130,160
             C 150,80 180,60 230,45 Z"
          stroke="#C8A058"
          strokeWidth="1.5"
          strokeDasharray="5 7"
          strokeOpacity="0.8"
          strokeLinecap="round"
        />
        
        {/* Secondary inner swoosh for depth */}
        <path
          d="M 270,440 C 370,380 440,320 480,240"
          stroke="#C8A058"
          strokeWidth="1.5"
          strokeDasharray="4 6"
          strokeOpacity="0.4"
          strokeLinecap="round"
        />
      </svg>

      {/* ─── Sparkle Stars in Background ─── */}
      <div className="absolute top-12 right-4 z-0 pointer-events-none">
        <SparkleStar4 className="w-5 h-5 text-[#C8A058] animate-pulse" />
      </div>
      <div className="absolute bottom-24 left-4 z-0 pointer-events-none">
        <SparkleStar4 className="w-3.5 h-3.5 text-[#C8A058]/70 animate-pulse" />
      </div>
      <div className="absolute top-36 left-12 z-0 pointer-events-none">
        <SparkleStar4 className="w-3 h-3 text-[#C8A058]/50" />
      </div>

      {/* ─── Botanical Leaf Accent (Bottom-Right) ─── */}
      <div className="absolute bottom-[-10px] right-[-20px] w-32 h-32 z-0 pointer-events-none opacity-95">
        <BotanicalBranchBottomRight className="w-full h-full" />
      </div>

      {/* ─── Background Blobs (3 Warm Orange Radiant Glows) ─── */}
      <div className="absolute top-[5%] right-[0%] w-[380px] h-[380px] rounded-full bg-[#F0D4A8] opacity-65 blur-[65px] pointer-events-none -z-10" />
      <div className="absolute bottom-[0%] left-[5%] w-[320px] h-[320px] rounded-full bg-[#E6CCA0] opacity-55 blur-[60px] pointer-events-none -z-10" />
      <div className="absolute top-[28%] left-[25%] w-[340px] h-[340px] rounded-full bg-[#F2DCBA] opacity-65 blur-[55px] pointer-events-none -z-10" />

      {/* ─── Top Center Badge: Research ─── */}
      <div className="absolute top-2 left-[32%] -translate-x-1/2 z-30">
        <UXProcessBadge label="Research" iconType="research" delay={0.2} />
      </div>

      {/* ─── Top Right Badge: Wireframe ─── */}
      <div className="absolute top-2 right-4 z-30">
        <UXProcessBadge label="Wireframe" iconType="wireframe" delay={0.5} />
      </div>

      {/* ─── Bottom Center-Left Badge: Prototype (Directly Below Phone) ─── */}
      <div className="absolute bottom-2 left-[38%] -translate-x-1/2 z-30">
        <UXProcessBadge label="Prototype" iconType="prototype" delay={0.8} />
      </div>

      {/* ─── Bottom Right Badge: Usability Test ─── */}
      <div className="absolute bottom-8 right-12 z-30">
        <UXProcessBadge label="Usability Test" iconType="usability" delay={1.1} />
      </div>

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* ─── DEVICE COMPOSITION CONTAINER (3D Tilts & Realistic Shadows) ─── */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <div className="relative w-full h-[450px] flex items-center justify-center pt-16">

        {/* ── 1. DESKTOP / TABLET MOCKUP (Rotated +4.2°, Behind Phone) ── */}
        <motion.div
          className="absolute right-[-30px] sm:right-[-50px] top-14 z-10 origin-bottom-right"
          style={{
            width: 'min(480px, 75vw)',
            height: '300px',
          }}
          animate={animationEnabled ? {
            y: [0, 8, 0],
            rotate: [4.2, 3.4, 4.2],
          } : { rotate: 4.2 }}
          transition={{
            duration: 6.8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Multi-layered Soft Ambient Shadow */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none -z-10"
            style={{
              boxShadow: '0 30px 70px -15px rgba(15, 26, 41, 0.18), 0 12px 28px -5px rgba(15, 26, 41, 0.1), 0 2px 6px rgba(15, 26, 41, 0.05)',
              transform: 'translateY(10px) scale(0.98)',
            }}
          />

          {/* Desktop Frame Shell */}
          <div
            className="w-full h-full rounded-2xl bg-white border border-[#E3DBD0] overflow-hidden flex flex-col"
            style={{
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 1px 3px rgba(0,0,0,0.04)',
            }}
          >
            {/* macOS Top Bar */}
            <div className="h-7 bg-[#F4EFE8] border-b border-[#E7E0D4] px-3.5 flex items-center justify-between shrink-0">
              {/* Traffic Light Dots */}
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
              </div>
              {/* User Profile Avatar */}
              <div className="w-5 h-5 rounded-full overflow-hidden border border-gray-300 shadow-2xs">
                <img
                  src="/gina-profile.jpg"
                  alt="Gina"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80";
                  }}
                />
              </div>
            </div>

            {/* Desktop Screen Content */}
            <div className="flex-1 relative overflow-hidden bg-[#FAF8F5]">
              <AnimatePresence mode="wait">
                {currentItem && currentItem.desktopImage ? (
                  <motion.img
                    key={currentItem.id + '-desktop'}
                    src={currentItem.desktopImage}
                    alt={currentItem.title || "Project desktop preview"}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  />
                ) : (
                  <motion.div
                    key="default-desktop-dashboard"
                    className="w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <DesktopDashboardScreen />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* ── 2. PHONE MOCKUP (Rotated -9°, Overlapping Desktop sidebar only) ── */}
        <motion.div
          className="absolute left-[-30px] sm:left-[-20px] top-14 z-20 origin-center"
          style={{
            width: '190px',
            height: '380px',
          }}
          animate={animationEnabled ? {
            y: [0, -12, 0],
            rotate: [-9, -10.2, -9],
          } : { rotate: -9 }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Realistic Multi-Layer 3D Drop Shadow for Phone */}
          <div
            className="absolute inset-0 rounded-[40px] pointer-events-none -z-10"
            style={{
              boxShadow: '0 30px 60px -15px rgba(20, 15, 10, 0.25), 0 15px 25px -5px rgba(20, 15, 10, 0.1), 0 5px 10px rgba(20, 15, 10, 0.05)',
              transform: 'translateY(15px) scale(0.95)',
            }}
          />

          {/* Phone Hardware Body - Premium Cream Bezel */}
          <div
            className="w-full h-full rounded-[40px] bg-gradient-to-br from-[#FFFDF9] to-[#F3EDE0] p-[9px] relative"
            style={{
              boxShadow: 'inset 0 0 0 1px rgba(220, 205, 185, 0.8), inset 2px 2px 5px rgba(255,255,255,1), inset -2px -2px 5px rgba(210,195,170,0.3)',
            }}
          >
            {/* Inner Phone Screen */}
            <div className="w-full h-full rounded-[31px] overflow-hidden bg-white relative shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)]">
              <AnimatePresence mode="wait">
                {currentItem && currentItem.mobileImage ? (
                  <motion.img
                    key={currentItem.id + '-mobile'}
                    src={currentItem.mobileImage}
                    alt={currentItem.title || "Project mobile preview"}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  />
                ) : (
                  <motion.div
                    key="default-mobile-app"
                    className="w-full h-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <MobileAppScreen />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Slide Indicator Dots (Only if multiple slides exist in Admin) ── */}
      {totalSlides > 1 && (
        <div className="flex justify-center items-center gap-1.5 mt-3 relative z-30">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? 'w-6 bg-[#C69B51]' : 'w-1.5 bg-[#D5C7B5] hover:bg-[#C69B51]/60'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HeroShowcase;
