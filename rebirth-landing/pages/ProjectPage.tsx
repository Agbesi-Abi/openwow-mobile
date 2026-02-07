import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Page } from '../types';

interface ProjectPageProps {
  onNavigate?: (page: Page) => void;
}

const ProjectPage: React.FC<ProjectPageProps> = ({ onNavigate }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const images = [
    { 
      id: 'fragment-01',
      url: 'https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1000/v1770130175/1Y3A4626_b0jeme.jpg', 
      classes: 'md:col-span-8 md:col-start-1', 
      aspect: 'aspect-video md:aspect-[16/9]',
      label: 'SEQ / 01',
      meta: 'ISO 400 | f/2.8'
    },
    { 
      id: 'fragment-02',
      url: 'https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770130177/1Y3A5832_fevflj.jpg', 
      classes: 'md:col-span-5 md:col-start-8 md:-mt-[20vh] z-10', 
      aspect: 'aspect-[3/4] md:aspect-[2/3]',
      label: 'SEQ / 02',
      meta: 'ISO 800 | f/4.0'
    },
    { 
      id: 'fragment-03',
      url: 'https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1000/v1770130195/_W6A7468_tc2nxw.jpg', 
      classes: 'md:col-span-6 md:col-start-2 md:mt-32 lg:mt-64', 
      aspect: 'aspect-square md:aspect-[3/2]',
      label: 'SEQ / 03',
      meta: 'ISO 200 | f/1.8'
    },
    { 
      id: 'fragment-04',
      url: 'https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1000/v1770130176/1Y3A5491_xfiqac.jpg', 
      classes: 'md:col-span-4 md:col-start-9 md:mt-12 lg:-mt-32', 
      aspect: 'aspect-[4/5]',
      label: 'SEQ / 04',
      meta: 'ISO 1600 | f/5.6'
    },
    { 
      id: 'fragment-05',
      url: 'https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770206157/_K2A6888_p8zcd7.jpg', 
      classes: 'md:col-span-12 md:col-start-1 md:mt-48 lg:mt-80 px-12 md:px-24', 
      aspect: 'aspect-video md:aspect-[21/9]',
      label: 'SEQ / 05',
      meta: 'ISO 100 | f/11.0'
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const ctaWords = ["You", "like", "what", "you", "see?"];

  return (
    <div className="px-6 md:px-12 lg:px-24 max-w-screen-2xl mx-auto overflow-hidden relative">
      {/* Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-rebirth-green z-[100] origin-left" style={{ scaleX }} />

      <section className="pt-32 md:pt-48 pb-64">
        {/* Header Section */}
        <motion.div 
          className="mb-48 md:mb-96 flex flex-col items-start"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center gap-6 mb-12">
            <span className="w-1.5 h-1.5 bg-rebirth-green"></span>
            <span className="text-[10px] font-bold tracking-[0.5em] text-neutral-400 uppercase">ARCHIVE_001_v24</span>
          </div>
          <h1 className="text-7xl sm:text-8xl md:text-[14vw] font-bold tracking-tighter leading-[0.75] mb-12">
            Unti<span className="text-rebirth-green font-serif italic font-normal">tled</span>
          </h1>
          <div className="flex flex-col lg:flex-row lg:items-end gap-12 lg:gap-32 w-full pt-12 border-t border-neutral-100">
            <div className="flex items-center gap-6">
              <div className="w-16 h-[1px] bg-rebirth-green/30"></div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-400 font-bold italic">
                A Visual Study / 2024
              </p>
            </div>
            <div className="max-w-md text-[11px] uppercase tracking-[0.2em] text-neutral-300 leading-relaxed font-medium">
              Capturing the raw intersection of light and digital texture. No narrative, just presence.
            </div>
          </div>
        </motion.div>

        {/* Asymmetrical Grid Fragments */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-32 md:gap-y-80 items-start relative">
          {images.map((img, idx) => (
            <motion.div 
              key={idx} 
              id={img.id}
              className={`${img.classes} group relative overflow-hidden scroll-mt-32`}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.4, delay: idx * 0.1, ease: [0.6, 0.01, 0.35, 1] }}
            >
              <div className="overflow-hidden bg-neutral-100 shadow-3xl">
                <img 
                  src={img.url} 
                  alt={`Fragment ${idx}`}
                  className={`w-full ${img.aspect} object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-[2.5s] group-hover:scale-110`}
                />
              </div>
              <div className="absolute top-6 left-6 pointer-events-none">
                <span className="text-[9px] font-bold tracking-widest text-neutral-100 bg-rebirth-black/90 px-4 py-1.5 uppercase shadow-xl">
                  {img.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Narrative High Point */}
      <motion.section 
        className="py-64 md:py-[60vh] flex flex-col items-center justify-center border-t border-neutral-100 relative gap-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <p className="text-5xl md:text-[10vw] font-serif italic text-neutral-900 leading-[0.8] tracking-tighter text-center max-w-5xl">
          "The silence <br /><span className="text-rebirth-green opacity-40">between</span> <br /> frames."
        </p>
        <button 
           onClick={scrollToTop}
           className="text-[10px] uppercase tracking-[0.5em] font-bold text-rebirth-green border border-rebirth-green/20 px-10 py-5 hover:bg-rebirth-green hover:text-white transition-all duration-700"
         >
           Top
         </button>
      </motion.section>

      {/* Massive Scale Contact CTA */}
      <motion.section 
        className="py-64 md:py-96 flex flex-col items-center text-center border-t border-neutral-100"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl w-full">
          <div className="flex flex-wrap justify-center gap-x-6 md:gap-x-12 mb-20">
            {ctaWords.map((word, i) => (
              <div key={i} className="overflow-hidden">
                <motion.h2 
                  variants={{ hidden: { y: "100%" }, visible: { y: 0 } }}
                  transition={{ duration: 1, delay: i * 0.1, ease: [0.6, 0.01, 0.35, 1] }}
                  className="text-5xl sm:text-7xl md:text-[12vw] font-bold tracking-tighter leading-none text-rebirth-black"
                >
                  {word}
                </motion.h2>
              </div>
            ))}
          </div>
          
          <motion.div
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            transition={{ duration: 1.5, delay: 0.8 }}
          >
            <p className="text-2xl md:text-5xl font-serif italic font-light text-rebirth-green mb-24 opacity-40">
              Protocol Invitation Only
            </p>
            <button 
              onClick={() => onNavigate?.('contact')}
              className="group relative inline-flex items-center justify-center gap-10 bg-rebirth-black px-12 py-8 md:px-24 md:py-12 overflow-hidden"
            >
              <span className="relative z-10 text-white text-[11px] md:text-[12px] uppercase tracking-[0.6em] font-bold">
                Transcribe Manifest
              </span>
              <div className="absolute inset-0 bg-rebirth-green transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[0.6, 0.01, 0.35, 1]"></div>
            </button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default ProjectPage;