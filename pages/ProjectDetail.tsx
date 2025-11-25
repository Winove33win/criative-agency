import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useData } from '../context/DataContext';

export const ProjectDetail: React.FC = () => {
  const { projects } = useData();
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find(p => p.slug === slug);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-white">
        <h2 className="text-4xl font-bold mb-4">Project Not Found</h2>
        <Link to="/work" className="text-fuchsia-500 hover:underline">Back to Work</Link>
      </div>
    );
  }

  // Find next project for navigation
  const currentIndex = projects.findIndex(p => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div className="bg-[#050505] min-h-screen">
      {/* (1) HERO */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <img 
          src={project.heroImg} 
          alt={project.client} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-16 z-10">
          <div className="container mx-auto">
             <Link to="/work" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors text-sm md:text-base">
               <ArrowLeft className="w-4 h-4" /> Back to Work
             </Link>
             <motion.h1 
               initial={{ y: 50, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               className="text-3xl sm:text-4xl md:text-8xl font-black font-['Syne'] text-white mb-6 uppercase leading-none break-words"
             >
               {project.client}
             </motion.h1>
             
             <div className="flex flex-wrap gap-6 md:gap-8 text-xs md:text-base font-mono border-t border-white/20 pt-6">
                <div className="min-w-[80px]">
                   <span className="block text-zinc-500 mb-1">TYPE</span>
                   <span className="text-white">{project.type}</span>
                </div>
                <div className="min-w-[60px]">
                   <span className="block text-zinc-500 mb-1">YEAR</span>
                   <span className="text-white">{project.year}</span>
                </div>
                <div className="min-w-[120px]">
                   <span className="block text-zinc-500 mb-1">SERVICES</span>
                   <span className="text-white">{project.services.join(", ")}</span>
                </div>
                <div className="min-w-[100px]">
                   <span className="block text-zinc-500 mb-1">RESULT</span>
                   <span className="text-cyan-400 font-bold">{project.stats}</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* (2) ABOUT / CONTEXT */}
      <section className="py-16 md:py-24 container mx-auto px-4">
         <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <div>
               <h3 className="text-2xl md:text-3xl font-bold font-['Syne'] text-white mb-4 md:mb-6">The Challenge</h3>
               <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                 {project.challenge}
               </p>
            </div>
            <div>
               <h3 className="text-2xl md:text-3xl font-bold font-['Syne'] text-white mb-4 md:mb-6">Our Solution</h3>
               <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-8">
                 {project.solution}
               </p>
               
               <h4 className="text-sm font-bold text-white uppercase mb-4 tracking-widest">Deliverables</h4>
               <div className="flex flex-wrap gap-2">
                 {project.services.map(s => (
                   <span key={s} className="px-3 md:px-4 py-2 border border-white/10 rounded-full text-xs md:text-sm text-zinc-300">
                     {s}
                   </span>
                 ))}
               </div>
            </div>
         </div>
      </section>

      {/* (4) GALLERY */}
      <section className="py-12 bg-zinc-900/30 border-y border-white/5">
         <div className="container mx-auto px-4">
            <div className="grid gap-6 md:gap-8">
               {project.gallery?.map((img, i) => (
                 <motion.div
                   initial={{ opacity: 0, y: 50 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   key={i}
                   className="rounded-xl overflow-hidden shadow-2xl"
                 >
                   <img src={img} alt={`Gallery ${i}`} className="w-full h-auto" />
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* (5) RESULTS */}
      <section className="py-16 md:py-24 container mx-auto px-4">
         <div className="bg-zinc-900 rounded-3xl p-8 md:p-12 border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-fuchsia-900/20 blur-[100px] pointer-events-none" />
            
            <div className="relative z-10">
               <h3 className="text-2xl font-bold font-['Syne'] text-white mb-8 md:mb-12">KEY RESULTS</h3>
               <div className="grid md:grid-cols-3 gap-8">
                 {project.results?.map((res, i) => (
                   <div key={i}>
                      <span className="block text-4xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400 mb-2 font-['Syne']">
                        {res.value}
                      </span>
                      <span className="text-zinc-400 uppercase tracking-widest text-xs md:text-sm">{res.label}</span>
                   </div>
                 ))}
               </div>
            </div>
         </div>
      </section>

      {/* (6) NEXT PROJECT */}
      <section className="py-16 md:py-24 border-t border-white/10">
         <div className="container mx-auto px-4 text-center">
            <p className="text-zinc-500 mb-4 uppercase tracking-widest text-xs md:text-sm">Next Project</p>
            {nextProject ? (
              <Link to={`/work/${nextProject.slug}`} className="group inline-block w-full">
                <h2 className="text-3xl sm:text-4xl md:text-8xl font-black font-['Syne'] text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-fuchsia-500 group-hover:to-cyan-500 transition-all duration-300 break-words">
                  {nextProject.client}
                </h2>
                <div className="flex items-center justify-center gap-2 mt-4 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  View Case <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
            ) : (
               <Link to="/work" className="text-4xl font-black font-['Syne']">VIEW ALL WORK</Link>
            )}
         </div>
      </section>

      {/* (7) CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-[#050505] to-zinc-900 text-center">
         <h2 className="text-2xl md:text-5xl font-bold font-['Syne'] text-white mb-8">Have a project in mind?</h2>
         <Link to="/contact" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-cyan-400 transition-all">
            Let's Talk
         </Link>
      </section>
    </div>
  );
};
