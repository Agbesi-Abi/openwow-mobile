import React from 'react';
import { motion } from 'framer-motion';
import { Page } from '../types';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.8, ease: [0.6, 0.01, 0.35, 1] } 
    }
  };

  const imageReveal = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { duration: 1.5, ease: [0.6, 0.01, 0.35, 1] } 
    }
  };

  const partnerImages = [
    {
      url: "https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770206155/_K2A6866_nowpow.jpg",
      shape: "rounded-t-full aspect-[3/5]",
      label: "Global Vision",
      offset: "md:mt-0"
    },
    {
      url: "https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770206155/1Y3A6629_ozf2mz.jpg",
      shape: "aspect-[16/9] md:skew-y-1",
      label: "Culture Pulse",
      offset: "md:mt-48"
    },
    {
      url: "https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770206155/1Y3A4697_x5zbwu.jpg",
      shape: "rounded-full aspect-square",
      label: "Authentic Growth",
      offset: "md:-mt-32"
    }
  ];

  const reviews = [
    {
      quote: "Rebirth doesn't just make content; they define the cultural pulse of our brand. Their strategic approach is unlike anything we've seen in the digital space.",
      author: "Marcus Chen",
      role: "Global Marketing Director, Tech Innovators",
      featured: true
    },
    {
      quote: "Working with the Rebirth team was a masterclass in intentional creativity. They brought a level of depth that translated directly into record engagement.",
      author: "Sarah J. Boateng",
      role: "Founder, Bloom Luxury",
      featured: false
    },
    {
      quote: "A visionary partner. They understood our community better than we did, bridging the gap between legacy and the next generation seamlessly.",
      author: "David Olufemi",
      role: "Head of Strategy, Urban Pulse",
      featured: false
    }
  ];

  return (
    <div className="px-6 md:px-12 lg:px-24 max-w-screen-2xl mx-auto overflow-hidden">
      {/* Hero Section */}
      <section className="min-h-[85vh] md:min-h-screen flex flex-col justify-center pt-24 md:pt-32 pb-24 md:pb-40">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24 items-start">
          <motion.div 
            className="md:col-span-8 order-2 md:order-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="overflow-visible relative">
              <motion.h1 
                variants={itemVariants}
                className="text-6xl sm:text-7xl md:text-[8.5vw] lg:text-[8vw] font-bold leading-[0.85] tracking-tighter"
              >
                Redefining <br />
                <span className="relative inline-block">
                  <span className="text-rebirth-green font-serif italic font-normal">content, culture</span>
                  <motion.svg 
                    initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 1, duration: 0.8, type: "spring" }}
                    viewBox="0 0 100 100" 
                    className="absolute -top-8 -right-6 w-14 h-14 md:-top-16 md:-right-12 md:w-40 md:h-40 text-rebirth-green/20 fill-current"
                  >
                    <path d="M50 0L55.8 35.8L90 25L65.8 50L90 75L55.8 64.2L50 100L44.2 64.2L10 75L34.2 50L10 25L44.2 35.8L50 0Z" />
                  </motion.svg>
                </span>
                <br />
                <span className="text-rebirth-green font-serif italic font-normal">& creativity</span> <br />
                for the digital <br />
                generation.
              </motion.h1>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:col-span-4 order-1 md:order-2 self-center max-w-sm md:max-w-none ml-auto"
            initial="hidden"
            animate="visible"
            variants={imageReveal}
          >
            <div className="relative group overflow-hidden bg-rebirth-grey shadow-3xl">
              <img 
                src="https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1600/v1770130192/_W6A7206_pino4p.jpg" 
                alt="Culture & Creative Studio Vision" 
                className="w-full aspect-[3/4] object-cover transition-all duration-[2.5s] ease-out group-hover:scale-105"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Manifesto Intro - Isolated for maximum impact */}
      <motion.section 
        className="py-40 md:py-80 grid grid-cols-1 md:grid-cols-12 gap-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.div className="md:col-span-7 md:col-start-6 lg:col-span-5 lg:col-start-7" variants={itemVariants}>
          <p className="text-2xl md:text-3xl lg:text-4xl text-neutral-800 leading-[1.15] tracking-tight font-light mb-12">
            Rebirth Creative Studio blends storytelling, digital production, and creator strategy to build impactful brands for the digital age.
          </p>
          <div className="w-24 h-[1px] bg-rebirth-green/30"></div>
        </motion.div>
      </motion.section>

      {/* Capabilities Section - Dynamic Staggering */}
      <section className="space-y-48 md:space-y-[70vh] pb-64">
        {/* Layout 01 */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-150px" }}
          variants={containerVariants}
        >
          <div className="md:col-span-7 relative">
            <motion.div variants={imageReveal} className="overflow-hidden bg-rebirth-grey">
              <img 
                src="https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770130189/_K2A7045_xptwf1.jpg" 
                className="w-full aspect-[16/9] object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-[1.5s]"
                alt="Studio Management"
              />
            </motion.div>
          </div>
          <div className="md:col-span-4 md:col-start-9">
            <motion.span variants={itemVariants} className="text-[10px] font-bold tracking-[0.4em] text-rebirth-green uppercase mb-8 block">01 / STUDIO</motion.span>
            <motion.h3 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-8 leading-[0.9]">
              Creative Studio <br /> <span className="text-rebirth-green font-serif italic font-normal">Management.</span>
            </motion.h3>
            <motion.p variants={itemVariants} className="text-base text-neutral-500 leading-relaxed font-light">
              High-quality production, storytelling, and creative management for brands and creators who dare to lead.
            </motion.p>
          </div>
        </motion.div>

        {/* Layout 02 */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-150px" }}
          variants={containerVariants}
        >
          <div className="md:col-span-4 md:col-start-1 order-2 md:order-1">
            <motion.span variants={itemVariants} className="text-[10px] font-bold tracking-[0.4em] text-rebirth-green uppercase mb-8 block">02 / TALENT</motion.span>
            <motion.h3 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-8 leading-[0.9]">
              Influencer <br /> <span className="text-rebirth-green font-serif italic font-normal">Management.</span>
            </motion.h3>
            <motion.p variants={itemVariants} className="text-base text-neutral-500 leading-relaxed font-light">
              Connecting creators with brands, managing collaborations, and growing authentic audiences.
            </motion.p>
          </div>
          <div className="md:col-span-6 md:col-start-6 order-1 md:order-2">
             <motion.div variants={imageReveal} className="overflow-hidden bg-rebirth-grey rounded-full aspect-square md:aspect-[4/5] max-w-md mx-auto md:ml-auto">
              <img 
                src="https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1200/v1770130196/_W6A7297_rapyvy.jpg" 
                className="w-full h-full object-cover grayscale brightness-95 hover:grayscale-0 transition-all duration-[1.5s]"
                alt="Influencer Strategy"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Typographic Pause */}
      <motion.section 
        className="py-64 md:py-[50vh] flex flex-col items-center justify-center border-t border-neutral-100"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.h2 variants={itemVariants} className="text-[14vw] md:text-[16vw] font-bold tracking-tighter text-center leading-[0.75] flex flex-col items-center">
          <span className="opacity-10">CREATIVITY</span>
          <span className="text-rebirth-green font-serif italic font-light relative">
            with Purpose.
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-1/3 h-[1px] bg-rebirth-green/20"></div>
          </span>
        </motion.h2>
      </motion.section>

      {/* Selective Partners Grid - Enhanced Spacing */}
      <motion.section 
        className="py-48 md:py-80 border-t border-neutral-100"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 md:mb-40 gap-8">
          <motion.h2 variants={itemVariants} className="text-5xl md:text-8xl font-bold tracking-tighter leading-none">
            Selective <br />
            <span className="text-rebirth-green font-serif italic font-normal">Partners</span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-[10px] uppercase tracking-[0.5em] text-neutral-400 font-bold">
            — COLLABORATING WITH EXCELLENCE
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-24 md:gap-16 items-center">
          {partnerImages.map((partner, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              className={`flex flex-col items-center ${partner.offset}`}
            >
              <div className={`w-full overflow-hidden bg-rebirth-grey group relative ${partner.shape}`}>
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.5 }}
                  src={partner.url} 
                  alt={partner.label} 
                  className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-[1s]"
                />
              </div>
              <motion.span 
                variants={itemVariants} 
                className="mt-10 text-[10px] uppercase tracking-ultra-widest font-bold text-neutral-300"
              >
                {partner.label}
              </motion.span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Review Section - Fluid Height */}
      <motion.section 
        className="py-48 md:py-80 bg-neutral-50 -mx-6 md:-mx-12 lg:-mx-24 px-6 md:px-12 lg:px-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="max-w-screen-2xl mx-auto">
          <div className="mb-24 flex items-center gap-6">
            <span className="w-12 h-[1px] bg-rebirth-green"></span>
            <h2 className="text-[10px] uppercase tracking-ultra-widest font-bold text-rebirth-green">Voices of the Network</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-24 items-start">
            <motion.div className="md:col-span-8 lg:col-span-7" variants={itemVariants}>
              <p className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif italic text-rebirth-black leading-[0.95] tracking-tighter mb-12">
                "{reviews[0].quote}"
              </p>
              <div className="flex flex-col gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-rebirth-black">{reviews[0].author}</span>
                <span className="text-[10px] uppercase tracking-widest text-neutral-400">{reviews[0].role}</span>
              </div>
            </motion.div>

            <div className="md:col-span-4 lg:col-span-3 lg:col-start-10 space-y-32 md:mt-24">
              {reviews.slice(1).map((review, idx) => (
                <motion.div key={idx} variants={itemVariants} className="group">
                  <p className="text-xl md:text-2xl font-light text-neutral-600 leading-snug mb-8">
                    "{review.quote}"
                  </p>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-rebirth-green">{review.author}</span>
                    <span className="text-[9px] uppercase tracking-widest text-neutral-400">{review.role}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Final Call to Action */}
      <section className="py-64 md:py-[50vh] flex flex-col items-center text-center">
        <motion.div 
          className="mb-12 w-[1px] h-32 bg-gradient-to-b from-transparent via-rebirth-green to-transparent"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 1.5 }}
        ></motion.div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          onClick={() => onNavigate('contact')}
          className="group relative"
        >
          <span className="text-5xl sm:text-6xl md:text-9xl lg:text-[10vw] font-bold tracking-tighter block hover:text-rebirth-green transition-colors duration-500">
            Start a project.
          </span>
          <motion.div 
            className="h-1 md:h-2 bg-rebirth-green mx-auto mt-6"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.6, ease: [0.6, 0.01, 0.35, 1] }}
          ></motion.div>
        </motion.button>
      </section>
    </div>
  );
};

export default Home;