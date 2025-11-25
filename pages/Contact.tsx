import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Linkedin, Twitter, ArrowRight } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    budget: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    alert("Message sent to the future! We'll be in touch.");
    setFormState({ name: '', email: '', company: '', budget: '', message: '' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-[#050505] pt-24 pb-12">
      {/* Header */}
      <section className="container mx-auto px-4 mb-16 md:mb-24 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-8xl font-black font-['Syne'] text-white mb-6 tracking-tighter uppercase"
        >
          Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-500">Talk</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto"
        >
          Ready to accelerate? Tell us about your project, timeline, and vision.
        </motion.p>
      </section>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Contact Info & Socials */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            <div className="space-y-8">
              <motion.div variants={itemVariants} className="flex items-start gap-4 group">
                <div className="p-3 rounded-full bg-zinc-900 border border-white/10 group-hover:border-fuchsia-500 transition-colors">
                  <Mail className="w-6 h-6 text-fuchsia-500" />
                </div>
                <div>
                  <h3 className="text-zinc-500 text-sm font-mono uppercase tracking-wider mb-1">Email Us</h3>
                  <a href="mailto:hello@neonflux.agency" className="text-2xl md:text-3xl font-bold text-white hover:text-cyan-400 transition-colors font-['Syne'] break-all">
                    hello@neonflux.agency
                  </a>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-start gap-4 group">
                <div className="p-3 rounded-full bg-zinc-900 border border-white/10 group-hover:border-cyan-500 transition-colors">
                  <Phone className="w-6 h-6 text-cyan-500" />
                </div>
                <div>
                  <h3 className="text-zinc-500 text-sm font-mono uppercase tracking-wider mb-1">Call Us</h3>
                  <a href="tel:+15550003589" className="text-2xl md:text-3xl font-bold text-white hover:text-fuchsia-400 transition-colors font-['Syne']">
                    +1 (555) 000-FLUX
                  </a>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="flex items-start gap-4 group">
                <div className="p-3 rounded-full bg-zinc-900 border border-white/10 group-hover:border-purple-500 transition-colors">
                  <MapPin className="w-6 h-6 text-purple-500" />
                </div>
                <div>
                  <h3 className="text-zinc-500 text-sm font-mono uppercase tracking-wider mb-1">Visit HQ</h3>
                  <p className="text-xl md:text-2xl font-bold text-white font-['Syne']">
                    123 Future Ave, <br/>
                    Neon District, NY 10001
                  </p>
                </div>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="pt-12 border-t border-white/10">
              <h3 className="text-white font-bold mb-6">CONNECT WITH US</h3>
              <div className="flex gap-4">
                {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 hover:bg-white hover:text-black transition-all duration-300">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-zinc-900/50 p-8 md:p-10 rounded-3xl border border-white/5 backdrop-blur-sm"
          >
             <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-xs font-mono text-zinc-400 uppercase">Name</label>
                     <input 
                       type="text" 
                       required
                       className="w-full bg-[#050505] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-fuchsia-500 transition-colors"
                       placeholder="John Doe"
                       value={formState.name}
                       onChange={e => setFormState({...formState, name: e.target.value})}
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs font-mono text-zinc-400 uppercase">Email</label>
                     <input 
                       type="email" 
                       required
                       className="w-full bg-[#050505] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-cyan-500 transition-colors"
                       placeholder="john@company.com"
                       value={formState.email}
                       onChange={e => setFormState({...formState, email: e.target.value})}
                     />
                   </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                     <label className="text-xs font-mono text-zinc-400 uppercase">Company</label>
                     <input 
                       type="text" 
                       className="w-full bg-[#050505] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-fuchsia-500 transition-colors"
                       placeholder="Flux Industries"
                       value={formState.company}
                       onChange={e => setFormState({...formState, company: e.target.value})}
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs font-mono text-zinc-400 uppercase">Budget Range</label>
                     <select 
                       className="w-full bg-[#050505] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-cyan-500 transition-colors appearance-none"
                       value={formState.budget}
                       onChange={e => setFormState({...formState, budget: e.target.value})}
                     >
                        <option value="">Select Range</option>
                        <option value="10-25k">$10k - $25k</option>
                        <option value="25-50k">$25k - $50k</option>
                        <option value="50-100k">$50k - $100k</option>
                        <option value="100k+">$100k+</option>
                     </select>
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-xs font-mono text-zinc-400 uppercase">Message</label>
                   <textarea 
                     required
                     rows={4}
                     className="w-full bg-[#050505] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
                     placeholder="Tell us about your project..."
                     value={formState.message}
                     onChange={e => setFormState({...formState, message: e.target.value})}
                   />
                </div>

                <button 
                  type="submit"
                  className="w-full py-5 bg-white text-black font-bold rounded-xl hover:bg-gradient-to-r hover:from-cyan-400 hover:to-fuchsia-400 hover:text-white transition-all transform hover:-translate-y-1 shadow-lg flex items-center justify-center gap-2"
                >
                  SEND MESSAGE <ArrowRight className="w-5 h-5" />
                </button>
             </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};