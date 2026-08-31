import { motion } from 'framer-motion';
import { Mail, Linkedin, Globe, ChevronDown, Sparkles } from 'lucide-react';

import HeroOrbitPhoto from './HeroOrbitPhoto';

const Hero = () => {
    return (
        <section id="hero" className="min-h-screen flex flex-col justify-center items-center text-center py-20 relative px-4 overflow-hidden">

            {/* Background Glows */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.6, scale: 1 }}
                transition={{ duration: 1.5, type: "spring" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/30 rounded-full blur-[120px] -z-10 animate-pulse-slow"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 0.4, scale: 1.2 }}
                transition={{ duration: 2, delay: 0.5 }}
                className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-gold-600/20 rounded-full blur-[100px] -z-10 animate-float"
            />

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="z-10 flex flex-col items-center relative"
            >
                {/* Orbit Photo Animation */}
                <div className="mb-10 w-full max-w-sm">
                    <HeroOrbitPhoto />
                </div>

                <motion.h1
                    className="text-6xl md:text-8xl font-heading font-extrabold tracking-tighter mb-6"
                    initial={{ backgroundPosition: "0% 50%" }}
                    animate={{ backgroundPosition: "100% 50%" }}
                    transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                    style={{
                        backgroundImage: "linear-gradient(to right, #ffc51a, #a855f7, #ffd24d, #a855f7)",
                        backgroundSize: "200% auto",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                    }}
                >
                    GINA SALMA SABILLA
                </motion.h1>

                <h2 className="text-xl md:text-3xl text-gray-300 font-light tracking-wide mb-8 flex items-center gap-3">
                    <span className="h-px w-8 bg-gold-500/50"></span>
                    UI/UX Designer <span className="text-gold-500 mx-1">•</span> Mobile Dev Enthusiast
                    <span className="h-px w-8 bg-gold-500/50"></span>
                </h2>

                <p className="max-w-xl mx-auto text-gray-400 leading-relaxed mb-10 text-lg">
                    Crafting digital experiences that merge <span className="text-gold-300 font-medium">technical precision</span> with <span className="text-purple-300 font-medium">creative innovation</span>.
                </p>

                <div className="flex gap-6 justify-center">
                    {[
                        { icon: Mail, href: "mailto:gina.s.sabilla18@gmail.com", label: "Email" },
                        { icon: Linkedin, href: "https://www.linkedin.com/in/ginasalmas", label: "LinkedIn" },
                        { icon: Globe, href: "https://dribbble.com/ginasalmas", label: "Dribbble" }
                    ].map((item, index) => (
                        <motion.a
                            key={index}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ y: -5, scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-4 rounded-full bg-white/5 border border-white/10 hover:border-gold-500/50 hover:bg-gold-500/10 hover:shadow-[0_0_20px_rgba(255,197,26,0.3)] transition duration-300 group relative"
                        >
                            <item.icon className="w-6 h-6 text-gray-300 group-hover:text-gold-300 transition-colors" />
                        </motion.a>
                    ))}
                </div>
            </motion.div>

            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold-500/50"
            >
                <ChevronDown className="w-8 h-8" />
            </motion.div>
        </section>
    );
};

export default Hero;
