import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const categories = ["All", "Branding", "Web", "Social", "Motion"];

export const Work: React.FC = () => {
  const { projects } = useData();
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="pt-20">
      {/* (1) HERO */}
      <section className="py-16 md:py-24 bg-[#050505] relative">
        <div className="container mx-auto px-4 relative z-10 text-center">
           <motion.h1 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-4xl md:text-9xl font-black font-['Syne'] mb-6 text-white tracking-tighter"
           >
             WORK
           </motion.h1>
           <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 px-4">
             Digital experiences, campaigns, and brands in motion.
           </p>
        </div>
      </section>

      {/* (2) FILTER */}
      <section className="pb-12 sticky top-20 z-30 bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-4 flex justify-center flex-wrap gap-3 md:gap-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-bold border transition-all ${
                activeFilter === cat 
                  ? 'bg-white text-black border-white' 
                  : 'bg-transparent text-zinc-500 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* (3) PROJECT GRID */}
      <section className="py-12 md:py-24 bg-[#050505] min-h-screen">
        <div className="container mx-auto px-4">
          <motion.div 
            layout
            className="grid md:grid-cols-2 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={project.id}
                >
                  <Link to={`/work/${project.slug}`} className="block group relative">
                    <div className="aspect-[16/9] bg-zinc-900 rounded-3xl overflow-hidden border border-white/10 relative mb-6">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                      <img 
                        src={project.heroImg} 
                        alt={project.client} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                      />
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                         <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full text-white font-bold flex items-center gap-2">
                           View Case Study <ArrowRight className="w-4 h-4" />
                         </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-start px-2">
                       <div>
                          <h3 className="text-xl md:text-3xl font-bold text-white mb-1 font-['Syne'] group-hover:text-fuchsia-500 transition-colors">
                            {project.client}
                          </h3>
                          <p className="text-zinc-500 text-xs md:text-sm uppercase tracking-wider">{project.type}</p>
                       </div>
                       <div className="text-right">
                          <span className="block text-cyan-400 font-bold text-sm md:text-base">{project.stats}</span>
                       </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
