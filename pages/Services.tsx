import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { processSteps, servicePacks } from '../data'; // Process and packs remain static for now
import { LottieAnimation } from '../components/ui/LottieAnimation';
import { useData } from '../context/DataContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, 
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Explicitly type as React.FC to include 'key' in props
const ServiceCard: React.FC<{ service: any }> = ({ service }) => {
  return (
    <motion.div
      variants={cardVariants}
      className="group p-8 md:p-10 border border-white/5 rounded-3xl bg-[#080808] hover:bg-zinc-900 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden shadow-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/0 via-transparent to-cyan-600/0 group-hover:from-fuchsia-600/10 group-hover:to-cyan-600/10 transition-all duration-500" />
      
      {/* Icon/Lottie Container */}
      <div className="w-16 h-16 bg-zinc-900 rounded-2xl mb-8 relative border border-white/5 group-hover:border-transparent overflow-hidden">
        {/* Static Icon - Fade out on hover */}
        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0">
          {service.icon ? <service.icon className="w-8 h-8 text-white transition-colors" /> : <div className="w-8 h-8 bg-zinc-700 rounded-full" />}
        </div>
        
        {/* Lottie Animation - Fade in on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-1 flex items-center justify-center">
           <div className="w-full h-full scale-125">
             <LottieAnimation animationUrl={service.lottieUrl} />
           </div>
        </div>
      </div>
      
      <h3 className="text-xl md:text-2xl font-bold mb-4 font-['Syne'] text-white group-hover:text-fuchsia-400 transition-colors relative z-10">
        {service.title}
      </h3>
      <p className="text-zinc-500 leading-relaxed group-hover:text-zinc-300 transition-colors relative z-10">
        {service.desc}
      </p>
    </motion.div>
  );
};

export const Services: React.FC = () => {
  const { services } = useData();
  
  return (
    <div className="pt-20">
      {/* (1) HERO */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-fuchsia-900/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-9xl font-black font-['Syne'] mb-6 text-white tracking-tighter break-words">
              SERVICES
            </h1>
            <p className="text-lg md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-10 font-light px-4">
              We combine radical creativity with deep-tech execution. <br className="hidden md:block"/>
              From day one strategy to worldwide scale.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-fuchsia-400 transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Let's Talk <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* (2) SERVICE GRID */}
      <section className="py-16 md:py-24 bg-zinc-900/20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={gridContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* (3) PROCESS SECTION */}
      <section className="py-24 md:py-32 bg-black relative border-y border-white/5 overflow-hidden">
        {/* Ambient Lottie Background */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-20 pointer-events-none mix-blend-screen">
          <LottieAnimation animationUrl="https://assets8.lottiefiles.com/packages/lf20_xrmk4pxc.json" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-20 text-center">
            <span className="text-cyan-400 font-mono tracking-widest uppercase mb-4 block">Our Method</span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold font-['Syne'] text-white break-words">THE FLUX PROCESS</h2>
          </div>

          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-fuchsia-500 to-transparent opacity-30"></div>
            
            <motion.div 
              className="grid md:grid-cols-4 gap-8 relative z-10"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {processSteps.map((step) => (
                 <motion.div 
                   key={step.step}
                   variants={itemVariants}
                   className="text-center md:text-left"
                 >
                   <div className="w-24 h-24 mx-auto md:mx-0 bg-[#0a0a0a] border border-white/10 rounded-full flex items-center justify-center mb-6 relative z-10 group hover:border-fuchsia-500 transition-colors shadow-lg shadow-black">
                     <span className="text-3xl font-bold font-mono text-zinc-600 group-hover:text-fuchsia-400 transition-colors">{step.step}</span>
                   </div>
                   <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                   <p className="text-zinc-500 text-sm leading-relaxed max-w-xs mx-auto md:max-w-none">{step.text}</p>
                 </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* (4) PACKS / COMBOS */}
      <section className="py-24 md:py-32 relative">
         <div className="container mx-auto px-4">
            <div className="text-center mb-16">
               <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-['Syne'] text-white mb-4 break-words">CURATED PACKS</h2>
               <p className="text-zinc-400">Streamlined solutions for speed and impact.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
               {servicePacks.map((pack, i) => (
                 <motion.div
                   key={pack.title}
                   initial={{ opacity: 0, scale: 0.95 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.15 }}
                   className={`p-8 rounded-3xl border border-white/10 relative overflow-hidden flex flex-col ${i === 1 ? 'bg-zinc-900/50 border-fuchsia-500/30 shadow-[0_0_40px_rgba(192,38,211,0.1)] scale-105 z-10' : 'bg-[#080808] hover:bg-zinc-900 transition-colors'}`}
                 >
                   {i === 1 && (
                     <div className="absolute top-0 right-0 bg-fuchsia-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
                   )}
                   <div className="mb-6">
                     <h3 className="text-2xl font-bold text-white mb-2">{pack.title}</h3>
                     <p className="text-zinc-400 text-sm h-10">{pack.desc}</p>
                   </div>
                   
                   <ul className="space-y-4 mb-8 flex-grow">
                     {pack.includes.map((item) => (
                       <li key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                         <Check className="w-5 h-5 text-cyan-500 shrink-0" />
                         {item}
                       </li>
                     ))}
                   </ul>

                   <Link 
                     to="/contact" 
                     className={`w-full py-4 rounded-xl font-bold text-center transition-all ${i === 1 ? 'bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white hover:scale-[1.02]' : 'bg-white/5 text-white hover:bg-white hover:text-black'}`}
                   >
                     Request Pack
                   </Link>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* (5) CTA */}
      <section className="py-24 bg-gradient-to-b from-transparent to-zinc-900">
         <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-['Syne'] text-white mb-8">Ready to start a project?</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
               <Link to="/contact" className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-cyan-400 transition-all">
                 Let's Talk
               </Link>
               <Link to="/work" className="px-8 py-4 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all">
                 See Our Work
               </Link>
            </div>
         </div>
      </section>
    </div>
  );
};
