import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-black pt-24 pb-12 relative z-10">
      <div className="container mx-auto px-4">
         <div className="flex flex-col md:flex-row justify-between items-start mb-16">
            <div className="mb-8 md:mb-0">
               <h2 className="text-3xl font-bold font-['Syne'] text-white">NEON<span className="text-fuchsia-500">FLUX</span></h2>
               <p className="text-zinc-500 mt-4 max-w-xs">
                 São Paulo • New York • Tokyo <br/>
                 EST. 2024
               </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-sm text-zinc-400">
              <div className="flex flex-col gap-4">
                <span className="text-white font-bold">SOCIAL</span>
                <a href="#" className="hover:text-cyan-400 transition-colors">Instagram</a>
                <a href="#" className="hover:text-cyan-400 transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-cyan-400 transition-colors">Twitter</a>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-white font-bold">LEGAL</span>
                <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-cyan-400 transition-colors">Terms of Service</a>
                <Link to="/admin" className="hover:text-fuchsia-400 transition-colors">Admin Access</Link>
              </div>
            </div>
         </div>
         <div className="flex justify-between items-center pt-8 border-t border-white/10 text-xs text-zinc-600">
            <span>© 2024 NEON FLUX AGENCY.</span>
            <span>ALL RIGHTS RESERVED.</span>
         </div>
      </div>
    </footer>
  );
};