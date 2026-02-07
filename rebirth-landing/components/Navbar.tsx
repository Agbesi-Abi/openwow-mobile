import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Page } from '../types';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems: { label: string; value: Page }[] = [
    { label: 'Work', value: 'work' },
    { label: 'Project', value: 'project' },
    { label: 'Expertise', value: 'expertise' },
    { label: 'Contact', value: 'contact' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavigate = (page: Page) => {
    onNavigate(page);
    setIsOpen(false);
  };

  const menuVariants = {
    closed: { y: '-100%', transition: { duration: 0.8, ease: [0.6, 0.01, 0.35, 1] } },
    open: { y: 0, transition: { duration: 0.8, ease: [0.6, 0.01, 0.35, 1] } }
  };

  const linkVariants = {
    closed: { y: 100, opacity: 0 },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: 0.4 + i * 0.1, duration: 0.8, ease: [0.6, 0.01, 0.35, 1] }
    })
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-md px-6 py-4 md:py-6 md:px-12 flex items-center justify-between border-b border-neutral-50 lg:border-none">
        <button 
          onClick={() => handleNavigate('home')}
          className="text-base md:text-lg font-bold tracking-tighter flex items-center gap-2 group"
        >
          <span className="w-2 h-2 bg-rebirth-green group-hover:scale-150 transition-transform"></span>
          REBIRTH STUDIO
        </button>
        
        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-12">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => handleNavigate(item.value)}
              className={`text-sm uppercase tracking-widest hover:text-rebirth-green transition-colors ${
                currentPage === item.value ? 'text-rebirth-green font-bold' : 'text-rebirth-black'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => handleNavigate('contact')}
            className="px-6 py-2 border border-rebirth-black text-xs uppercase tracking-widest hover:bg-rebirth-green hover:border-rebirth-green hover:text-white transition-all"
          >
            Start a project
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={toggleMenu}
          className="lg:hidden flex flex-col gap-1.5 p-2 z-[110]"
          aria-label="Toggle Menu"
        >
          <motion.span 
            animate={isOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
            className="w-6 h-[1.5px] bg-rebirth-black block origin-center"
          />
          <motion.span 
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-6 h-[1.5px] bg-rebirth-black block"
          />
          <motion.span 
            animate={isOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
            className="w-6 h-[1.5px] bg-rebirth-black block origin-center"
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-[90] bg-white flex flex-col px-6 pt-32 pb-12 lg:hidden"
          >
            <div className="flex flex-col space-y-6">
              <span className="text-[10px] uppercase tracking-ultra-widest text-neutral-300 font-bold mb-4">— MENU</span>
              {navItems.map((item, i) => (
                <div key={item.value} className="overflow-hidden">
                  <motion.button
                    custom={i}
                    variants={linkVariants}
                    onClick={() => handleNavigate(item.value)}
                    className="text-5xl md:text-7xl font-bold tracking-tighter hover:text-rebirth-green transition-colors"
                  >
                    {item.label}
                  </motion.button>
                </div>
              ))}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                onClick={() => handleNavigate('contact')}
                className="mt-8 text-lg font-serif italic text-rebirth-green hover:text-rebirth-black transition-colors"
              >
                Let's create something together →
              </motion.button>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-auto flex justify-between items-end border-t border-neutral-100 pt-8"
            >
              <div className="flex flex-col gap-2">
                <span className="text-[9px] uppercase tracking-ultra-widest text-neutral-400 font-bold">ACCRA</span>
                <span className="text-[9px] uppercase tracking-ultra-widest text-neutral-400 font-bold">LONDON</span>
              </div>
              <div className="text-[10px] uppercase tracking-widest text-neutral-300 font-bold">
                © 2024
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;