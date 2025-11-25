import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Marquee } from '../components/ui/Marquee';
import { LottieAnimation } from '../components/ui/LottieAnimation';
import { useData } from '../context/DataContext';

export const Home: React.FC = () => {
  const { projects, services } = useData();
  const { scrollYProgress } = useScroll();
  
  // Parallax transform for Hero shapes
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  // Word flicker animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0, filter: "brightness(0) blur(5px)" },
    visible: { 
      opacity: [0, 1, 0.5, 1, 0.8, 1], 
      filter: ["brightness(0) blur(5px)", "brightness(2) blur(0px)", "brightness(1) blur(0px)"],
      transition: { 
        duration: 0.8, 
        ease: "easeInOut",
        times: [0, 0.2, 0.4, 0.6, 0.8, 1] 
      }
    }
  };

  return (
    <>
      {/* --- Hero Section --- */}
      <section className="relative h-screen flex flex-col justify-center items-center overflow-hidden">
        {/* Animated Background Shapes */}
        <motion.div style={{ y: y1, rotate }} className="absolute top-20 right-10 w-96 h-96 border border-fuchsia-500/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
        <motion.div style={{ y: y2 }} className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
        
        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.h1 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl md:text-9xl font-black leading-[0.9] tracking-tighter mb-6 font-['Syne'] text-white break-words"
          >
            <motion.span variants={wordVariants} className="inline-block mr-2 md:mr-6">BRANDING</motion.span>
            <br className="hidden md:block"/>
            <motion.span variants={wordVariants} className="inline-block mr-2 md:mr-6">IN</motion.span>
            <motion.span variants={wordVariants} className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 animate-gradient">MOTION</motion.span>
          </motion.h1>
          
          <motion.p 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-10 font-light px-4"
          >
            We define the future of digital experiences through strategy, design, and high-velocity performance.
          </motion.p>
          
          <motion.div 
             initial={{ y: 50, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 1 }}
             className="flex flex-col sm:flex-row gap-4 justify-center px-4"
          >
            <Link to="/contact" className="px-8 py-4 bg-fuchsia-600 text-white font-bold rounded-full hover:bg-fuchsia-500 transition-all hover:scale-105 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(192,38,211,0.5)]">
              WhatsApp Us <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/work" className="px-8 py-4 border border-white/20 text-white rounded-full hover:bg-white hover:text-black transition-all font-bold">
              View Portfolio
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator Lottie */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 w-12 h-12 md:w-16 md:h-16 pointer-events-none opacity-70"
        >
           <LottieAnimation animationUrl="https://assets10.lottiefiles.com/packages/lf20_w51pcehl.json" />
        </motion.div>

        {/* Bottom Marquee */}
        <div className="absolute bottom-10 w-full rotate-[-2deg] bg-black/50 backdrop-blur-sm py-2 border-y border-white/10 pointer-events-none">
          <Marquee text="STRATEGY • DESIGN • PERFORMANCE • MOTION • FUTURE" speed={30} className="text-white" />
        </div>
      </section>

      {/* --- About Section --- */}
      <section id="about" className="py-24 md:py-32 relative overflow-hidden">
        {/* Abstract Background Lottie */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] opacity-10 pointer-events-none -z-10 mix-blend-screen">
           <LottieAnimation animationUrl="https://assets2.lottiefiles.com/packages/lf20_1idqu1ac.json" />
        </div>

        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-8 leading-none text-white break-words">WHO <br/> WE ARE</h2>
              <p className="text-lg md:text-xl text-zinc-400 leading-relaxed mb-6">
                Neon Flux isn't just an agency; it's a movement. We reject the static. We believe brands must breathe, move, and evolve to survive the digital acceleration.
              </p>
              <div className="flex gap-8 mt-12">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-fuchsia-500">150+</h3>
                  <span className="text-xs md:text-sm text-zinc-500 uppercase tracking-widest">Projects</span>
                </div>
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold text-cyan-500">50M+</h3>
                  <span className="text-xs md:text-sm text-zinc-500 uppercase tracking-widest">Reach</span>
                </div>
              </div>
            </motion.div>

            <div className="space-y-4">
              {['Digital First DNA', 'Data-Driven Creativity', 'Radical Transparency', 'Future Proofing'].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 border border-white/10 rounded-xl hover:bg-white/5 hover:border-fuchsia-500/50 transition-all group cursor-default"
                >
                  <div className="flex items-center gap-4">
                    <CheckCircle2 className="text-fuchsia-500 group-hover:scale-110 transition-transform shrink-0" />
                    <span className="text-lg md:text-xl font-bold text-white">{item}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- Capabilities / Services Teaser --- */}
      <section className="py-24 bg-zinc-900/30 border-y border-white/5 relative backdrop-blur-sm">
        <div className="container mx-auto px-4">
           <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                 <span className="text-fuchsia-500 font-mono tracking-widest uppercase mb-2 block">Our Expertise</span>
                 <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white font-['Syne']">CAPABILITIES</h2>
              </div>
              <Link to="/services" className="text-zinc-400 hover:text-white flex items-center gap-2 group transition-colors">
                 View All Services <ArrowRight className="group-hover:translate-x-1 transition-transform"/>
              </Link>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
              {services.slice(0, 6).map((service, i) => (
                 <Link to="/services" key={service.id} className="group p-6 border border-white/10 rounded-2xl hover:bg-white/5 hover:border-fuchsia-500/50 transition-all flex flex-col justify-between h-full">
                    <div>
                       {/* Render icon if it exists as a component, otherwise generic */}
                      {service.icon ? <service.icon className="w-8 h-8 text-fuchsia-500 mb-4 group-hover:scale-110 transition-transform" /> : <div className="w-8 h-8 bg-fuchsia-500/20 rounded-full mb-4" />}
                      <h3 className="text-lg md:text-xl font-bold text-white mb-2 font-['Syne'] group-hover:text-fuchsia-400 transition-colors">{service.title}</h3>
                    </div>
                    <p className="text-zinc-500 text-sm line-clamp-2 group-hover:text-zinc-400 transition-colors mt-2">{service.desc}</p>
                 </Link>
              ))}
           </div>
        </div>
      </section>

      {/* --- Home Work Teaser (Animated Carousel) --- */}
      <section className="py-24 md:py-32 bg-[#0a0a0a] overflow-hidden">
        <div className="container mx-auto px-4 mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="max-w-full">
            <span className="text-cyan-400 font-mono tracking-widest uppercase mb-4 block">Selected Projects</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white break-words">RECENT <br/> WORK</h2>
          </div>
          <Link to="/work" className="text-white hover:text-fuchsia-400 font-mono flex items-center gap-2 group transition-colors">
            VIEW ALL <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
        
        {/* Infinite Carousel Container */}
        <div className="w-full relative">
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          
          <motion.div 
            className="flex gap-8 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ 
              ease: "linear", 
              duration: 40, // Slow, smooth movement
              repeat: Infinity 
            }}
          >
             {/* Render projects twice to create seamless loop */}
             {[...projects, ...projects, ...projects].map((item, index) => (
               <Link 
                  to={`/work/${item.slug}`} 
                  key={`${item.id}-${index}`} 
                  className="w-[85vw] md:w-[600px] aspect-[16/9] bg-zinc-900 rounded-3xl relative overflow-hidden group border border-white/10 shrink-0 block"
               >
                  <img 
                    src={item.heroImg} 
                    alt={item.client} 
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105 transform grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent p-6 md:p-10 flex flex-col justify-end">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="text-cyan-400 font-mono text-xs md:text-sm uppercase tracking-wider mb-2 block">{item.type}</span>
                      <h3 className="text-2xl md:text-4xl font-bold mb-2 font-['Syne'] text-white">{item.client}</h3>
                      <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/10 text-white font-mono text-xs md:text-sm">
                         RESULT: {item.stats}
                      </div>
                    </div>
                  </div>
               </Link>
             ))}
          </motion.div>
        </div>
      </section>

      {/* --- Creative Banners --- */}
      <section className="py-24 bg-fuchsia-600 text-black overflow-hidden relative">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-20"></div>
         <Marquee text="WE MAKE IT POP • NO BORING BRANDS • PURE ENERGY •" speed={15} className="text-black" />
         <div className="h-12"></div>
         <Marquee text="DIGITAL REVOLUTION • NEXT GEN MARKETING •" direction="right" speed={15} className="text-black" />
      </section>

      {/* --- CTA Section --- */}
      <section className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-900/20 pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black mb-8 font-['Syne'] uppercase text-white break-words">
            Ready to <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">Ignite?</span>
          </h2>
          <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-2xl mx-auto px-4">
            Stop blending in. Let's build a brand that demands attention.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center px-6">
            <Link to="/contact" className="px-10 py-5 bg-white text-black font-black text-lg rounded-full hover:bg-cyan-400 transition-all hover:-translate-y-1 shadow-xl whitespace-nowrap">
              START PROJECT
            </Link>
            <Link to="/contact" className="px-10 py-5 border-2 border-white/20 text-white font-bold text-lg rounded-full hover:bg-white/10 transition-all whitespace-nowrap">
              CONTACT SALES
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
