import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Helper to determine active state
  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 mix-blend-difference text-white">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link to="/" className="z-50" onClick={closeMenu}>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold tracking-tighter font-['Syne']"
            >
              NEON<span className="text-fuchsia-500">FLUX</span>
            </motion.div>
          </Link>
          
          <button onClick={toggleMenu} className="lg:hidden z-50">
            {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>

          <div className="hidden lg:flex gap-8 font-medium tracking-wide text-sm items-center">
            <Link 
              to="/" 
              className={`hover:text-fuchsia-400 transition-colors ${isActive('/') ? 'text-fuchsia-500' : ''}`}
            >
              AGENCY
            </Link>
            <Link 
              to="/services" 
              className={`hover:text-fuchsia-400 transition-colors ${isActive('/services') ? 'text-fuchsia-500' : ''}`}
            >
              SERVICES
            </Link>
            <Link 
              to="/work" 
              className={`hover:text-fuchsia-400 transition-colors ${isActive('/work') ? 'text-fuchsia-500' : ''}`}
            >
              WORK
            </Link>
            <Link 
              to="/contact" // Assuming we use a contact section or page later, for now we can scroll or link
              className="px-6 py-2 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all duration-300"
            >
              LET'S TALK
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed inset-0 z-[40] bg-black flex flex-col justify-center items-center gap-8"
          >
            {[
              { label: 'Agency', path: '/' },
              { label: 'Services', path: '/services' },
              { label: 'Work', path: '/work' },
              { label: 'Contact', path: '/contact' }
            ].map((item) => (
              <Link 
                key={item.label} 
                to={item.path} 
                onClick={closeMenu}
                className={`text-3xl font-['Syne'] font-bold hover:text-fuchsia-500 transition-colors ${isActive(item.path) ? 'text-fuchsia-500' : 'text-white'}`}
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};