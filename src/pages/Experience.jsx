import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto"
        >
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-gold-300 to-purple-500">
                Professional Experience
            </h1>

            <div className="space-y-12">
                {/* Placeholder Item */}
                <div className="relative pl-8 border-l-2 border-white/10">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gold-500 shadow-[0_0_10px_rgba(255,197,26,0.5)]"></div>
                    <h3 className="text-2xl font-bold text-white">Senior UI Designer</h3>
                    <p className="text-gold-400 font-medium mb-2">Tech Company • 2023 - Present</p>
                    <p className="text-gray-300 leading-relaxed">
                        Leading the design system initiative and managing a team of 3 junior designers. Focused on improving accessibility and user retention.
                    </p>
                </div>

                <div className="relative pl-8 border-l-2 border-white/10">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500"></div>
                    <h3 className="text-2xl font-bold text-white">Junior Developer</h3>
                    <p className="text-purple-300 font-medium mb-2">Agency XYZ • 2021 - 2023</p>
                    <p className="text-gray-300 leading-relaxed">
                        Collaborated with clients to deliver responsive websites. Specialized in React and animation libraries.
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default Experience;
