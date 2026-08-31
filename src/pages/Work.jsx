import React from 'react';
import { motion } from 'framer-motion';

const Work = () => {
    // Placeholder data
    const projects = [
        {
            id: 1,
            title: "Project Alpha",
            description: "A comprehensive UI/UX case study for a fintech app.",
            tags: ["UI/UX", "Figma", "Fintech"],
            link: "#"
        },
        {
            id: 2,
            title: "Galaxy Portfolio",
            description: "My personal portfolio website built with React and Tailwind.",
            tags: ["React", "Tailwind", "Frontend"],
            link: "#"
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="max-w-4xl mx-auto"
        >
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-gold-300 to-purple-500">
                My Work
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.map((project) => (
                    <motion.div
                        key={project.id}
                        whileHover={{ y: -5 }}
                        className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-gold-500/30 transition-all duration-300"
                    >
                        <div className="h-48 bg-galaxy-800 rounded-xl mb-4 flex items-center justify-center text-gray-500">
                            Project Thumbnail
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                        <p className="text-gray-400 mb-4">{project.description}</p>
                        <div className="flex flex-wrap gap-2">
                            {project.tags.map(tag => (
                                <span key={tag} className="px-3 py-1 bg-purple-900/30 text-purple-200 text-xs rounded-full border border-purple-500/20">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default Work;
