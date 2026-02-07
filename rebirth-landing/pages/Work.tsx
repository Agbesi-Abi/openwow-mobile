import React from 'react';
import { motion } from 'framer-motion';
import { Page, Project } from '../types';

interface WorkProps {
  onNavigate: (page: Page) => void;
}

const projects: Project[] = [
  { id: 1, title: 'The Sound of Tomorrow', category: 'Creative Direction', imageUrl: 'https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1000/v1770130192/_W6A7206_pino4p.jpg' },
  { id: 2, title: 'Global Identity Reset', category: 'Brand Strategy', imageUrl: 'https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770206155/_K2A6866_nowpow.jpg' },
  { id: 3, title: 'Creator Summit 2024', category: 'Activations', imageUrl: 'https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770206155/1Y3A6629_ozf2mz.jpg' },
  { id: 4, title: 'Digital First Vision', category: 'Digital Production', imageUrl: 'https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770206155/1Y3A4697_x5zbwu.jpg' },
  { id: 5, title: 'Culture Pulse', category: 'Community Building', imageUrl: 'https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770206176/1Y3A6944_e6qsrj.jpg' },
];

const Work: React.FC<WorkProps> = ({ onNavigate }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.6, 0.01, 0.35, 1] } }
  };

  return (
    <div className="px-6 md:px-12 lg:px-24 max-w-screen-2xl mx-auto overflow-hidden">
      <section className="pt-32 pb-64 md:pb-80">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-40"
        >
          <h1 className="text-7xl md:text-9xl lg:text-[10rem] font-bold tracking-tighter leading-[0.85] mb-12">
            Selected <br />Portfolios
          </h1>
          <p className="text-neutral-300 uppercase text-[10px] tracking-[0.6em] font-bold">— ARCHIVE INDEX 2024</p>
        </motion.div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-64 md:space-y-96"
        >
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              variants={item}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-16 md:gap-32 items-start`}
            >
              <div className="w-full md:w-8/12 group relative overflow-hidden bg-neutral-50 shadow-xl">
                <motion.img 
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 1.5 }}
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full aspect-video md:aspect-[16/9] object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[1.2s]"
                />
                <div className="absolute top-8 right-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center gap-6">
                   <span className="text-[10px] uppercase tracking-[0.4em] font-bold hidden sm:block">Case Study 0{project.id}</span>
                   <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center bg-white/10 backdrop-blur-md">→</div>
                </div>
              </div>
              <div className="w-full md:w-3/12 pt-8 md:pt-16">
                <span className="text-[10px] uppercase tracking-[0.4em] text-rebirth-green mb-8 block font-bold italic">{project.category}</span>
                <h3 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8 leading-[1.1]">{project.title}</h3>
                <div className="w-16 h-[1px] bg-neutral-200 mb-8"></div>
                <p className="text-base text-neutral-400 font-light leading-relaxed mb-10">
                  Pushing boundaries of digital engagement through immersive experiences.
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Large Scale CTA */}
      <section className="py-64 md:py-[50vh] flex flex-col items-center text-center border-t border-neutral-50">
        <motion.h2 
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          className="text-5xl sm:text-6xl md:text-[8vw] font-bold tracking-tighter mb-24 leading-[0.8] max-w-6xl px-4"
        >
          You like what you see? <br />
          <span className="text-rebirth-green font-serif italic font-light opacity-60">Manifest your vision.</span>
        </motion.h2>
        <motion.button 
          whileHover={{ scale: 1.1, rotate: 5 }}
          onClick={() => onNavigate('contact')}
          className="relative w-32 h-32 md:w-48 md:h-48 rounded-full border border-rebirth-green flex items-center justify-center overflow-hidden group"
        >
          <span className="relative z-10 text-4xl md:text-5xl group-hover:text-white transition-colors duration-700">↗</span>
          <div className="absolute inset-0 bg-rebirth-green transform scale-0 group-hover:scale-100 transition-transform duration-700 rounded-full"></div>
        </motion.button>
      </section>
    </div>
  );
};

export default Work;