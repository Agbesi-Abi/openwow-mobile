import React, { useState, useEffect } from 'react';
import { Page } from '../types';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [times, setTimes] = useState({ london: '', accra: '' });

  useEffect(() => {
    const updateTimes = () => {
      const formatter = (zone: string) => 
        new Intl.DateTimeFormat('en-GB', {
          timeZone: zone,
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }).format(new Date());

      setTimes({
        london: formatter('Europe/London'),
        accra: formatter('Africa/Accra')
      });
    };

    updateTimes();
    const interval = setInterval(updateTimes, 60000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { label: 'Work', value: 'work' as Page },
    { label: 'Project', value: 'project' as Page },
    { label: 'Expertise', value: 'expertise' as Page },
    { label: 'Contact', value: 'contact' as Page },
  ];

  const socialLinks = [
    { label: 'X / Twitter', href: 'https://twitter.com/RebirthCStudio' },
    { label: 'YouTube', href: 'https://www.youtube.com/channel/UCA0tjWDRF0j2KMlzHp1xnkA' },
    { label: 'Instagram', href: '#' },
    { label: 'LinkedIn', href: '#' },
  ];

  return (
    <footer className="bg-rebirth-black text-white px-6 pt-32 pb-12 md:px-12 md:pt-48 md:pb-16 lg:px-24">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start">
          
          {/* Brand & Times Column */}
          <div className="lg:col-span-6 space-y-16">
            <div>
              <button 
                onClick={() => onNavigate('home')}
                className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter block hover:text-rebirth-green transition-colors duration-500"
              >
                REBIRTH <br />STUDIO
              </button>
            </div>
            
            <div className="flex flex-wrap gap-12 md:gap-24">
              <div className="space-y-3">
                <span className="text-[9px] uppercase tracking-[0.5em] text-white/30 font-bold block">CURRENT_LOC / ACCRA</span>
                <span className="text-2xl md:text-3xl font-mono tracking-tighter">{times.accra} <span className="text-xs text-white/20 ml-2">GMT</span></span>
              </div>
              <div className="space-y-3">
                <span className="text-[9px] uppercase tracking-[0.5em] text-white/30 font-bold block">CURRENT_LOC / LONDON</span>
                <span className="text-2xl md:text-3xl font-mono tracking-tighter">{times.london} <span className="text-xs text-white/20 ml-2">BST</span></span>
              </div>
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-5 lg:col-start-8 grid grid-cols-2 md:grid-cols-2 gap-16 md:gap-32">
            <div className="space-y-8">
              <span className="text-[10px] uppercase tracking-[0.6em] text-rebirth-green font-bold block">NAVIGATION</span>
              <ul className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <li key={link.value}>
                    <button 
                      onClick={() => onNavigate(link.value)} 
                      className="text-[11px] md:text-xs uppercase tracking-[0.4em] font-bold hover:text-rebirth-green transition-colors text-white/60 hover:text-white"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-8">
              <span className="text-[10px] uppercase tracking-[0.6em] text-rebirth-green font-bold block">CONNECT</span>
              <ul className="flex flex-col space-y-4">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a 
                      href={link.href} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[11px] md:text-xs uppercase tracking-[0.4em] font-bold hover:text-rebirth-green transition-colors text-white/60 hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-32 md:mt-48 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12">
            <p className="text-[9px] uppercase tracking-[0.5em] text-white/20 font-bold">
              © 2024 REBIRTH CREATIVE STUDIO
            </p>
            <span className="hidden md:block w-1 h-1 bg-white/10 rounded-full"></span>
            <p className="text-[9px] uppercase tracking-[0.5em] text-white/20 font-bold italic">
              REDESIGNING THE CULTURAL LANDSCAPE
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="text-[9px] uppercase tracking-[0.4em] text-white/20 hover:text-white transition-colors font-bold">Privacy</button>
            <button className="text-[9px] uppercase tracking-[0.4em] text-white/20 hover:text-white transition-colors font-bold">Terms</button>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="ml-6 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all group"
            >
              <span className="text-lg transform group-hover:-translate-y-1 transition-transform">↑</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;