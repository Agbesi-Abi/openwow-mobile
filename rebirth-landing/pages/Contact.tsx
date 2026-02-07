import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', company: '', email: '', message: '', services: [] as string[] });
  const [activeStep, setActiveStep] = useState(0);

  const services = [
    'Creative Studio Mgmt', 'Influencer Strategy', 'Brand Campaigns', 
    'Events & Activation', 'Digital Community', 'Workshops'
  ];

  const backgrounds = [
    "https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1600/v1770130192/_W6A7206_pino4p.jpg",
    "https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1600/v1770130190/_K2A7094_mcqvli.jpg",
    "https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1600/v1770206155/_K2A6866_nowpow.jpg",
    "https://res.cloudinary.com/dnz71cs9x/image/upload/f_auto,q_auto,w_1600/v1770206160/_W6A6885_nghepk.jpg"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const toggleService = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service) 
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const currentBg = backgrounds[activeStep % backgrounds.length];

  const inputClasses = "bg-transparent border-b border-white/20 text-rebirth-green placeholder:text-white/10 focus:outline-none focus:border-rebirth-green transition-all duration-700 py-2 w-full font-sans font-medium tracking-tight";

  if (submitted) {
    return (
      <motion.div 
        className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="absolute inset-0 bg-black z-0 flex flex-col justify-between"
          initial={{ height: 0 }}
          animate={{ height: "100%" }}
          transition={{ duration: 1.5, ease: [0.8, 0, 0.2, 1] }}
        >
          <div className="h-12 md:h-24 bg-white w-full"></div>
          <div className="h-12 md:h-24 bg-white w-full"></div>
        </motion.div>

        <div className="relative z-10 text-center px-6">
          <p className="text-[10px] uppercase tracking-ultra-widest text-rebirth-green font-bold mb-6">Archive Entry Recorded</p>
          <h1 className="text-white text-5xl md:text-[10vw] font-bold tracking-tighter leading-none mb-12">
            See you <span className="font-serif italic font-light text-rebirth-green">Soon.</span>
          </h1>
          <button 
            onClick={() => setSubmitted(false)}
            className="text-white text-[10px] uppercase tracking-ultra-widest border border-white/20 px-10 py-4 hover:bg-white hover:text-black transition-all"
          >
            Return
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black overflow-hidden selection:bg-rebirth-green selection:text-white">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img 
            key={currentBg}
            src={currentBg}
            className="w-full h-full object-cover grayscale brightness-[0.2]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          />
        </AnimatePresence>
      </div>

      {/* Side Status Bar - Desktop only */}
      <div className="fixed right-12 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end space-y-12">
        <div className="text-right">
          <span className="text-[9px] uppercase tracking-ultra-widest text-white/40 block mb-1">Status</span>
          <span className="text-xs font-bold text-rebirth-green animate-pulse">TRANSMITTING</span>
        </div>
        <div className="flex flex-col gap-4">
          {[0, 1, 2, 3].map((step) => (
            <div key={step} className={`w-1 h-8 transition-all duration-700 ${activeStep === step ? 'bg-rebirth-green h-12' : 'bg-white/10'}`} />
          ))}
        </div>
      </div>

      {/* Form Content */}
      <main className="relative z-10 px-6 md:px-12 lg:px-24 pt-32 pb-48">
        <form onSubmit={handleSubmit} className="max-w-5xl mx-auto space-y-48 md:space-y-64">
          
          <motion.div onViewportEnter={() => setActiveStep(0)}>
            <h2 className="text-white leading-[1.1] tracking-tighter">
              <span className="font-serif italic text-3xl md:text-5xl block mb-6 opacity-60">I am</span>
              <input 
                required
                type="text"
                placeholder="[Name]"
                className={`${inputClasses} text-4xl md:text-7xl lg:text-[7vw]`}
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <span className="font-serif italic text-2xl md:text-4xl block mt-12 mb-6 opacity-60">representing</span>
              <input 
                type="text"
                placeholder="[Entity]"
                className={`${inputClasses} text-3xl md:text-5xl lg:text-[5vw]`}
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
              />
            </h2>
          </motion.div>

          <motion.div onViewportEnter={() => setActiveStep(1)}>
            <h2 className="text-white leading-[1.1] tracking-tighter">
              <span className="font-serif italic text-3xl md:text-5xl block mb-6 opacity-60">Reach me at</span>
              <input 
                required
                type="email"
                placeholder="[Email Address]"
                className={`${inputClasses} text-4xl md:text-7xl lg:text-[7vw]`}
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </h2>
          </motion.div>

          <motion.div onViewportEnter={() => setActiveStep(2)} className="space-y-12">
            <h2 className="text-white tracking-tighter">
              <span className="font-serif italic text-3xl md:text-5xl block opacity-60">Seeking expertise in</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => toggleService(s)}
                  className={`px-6 py-4 text-[10px] uppercase tracking-widest font-bold border text-left transition-all ${
                    formData.services.includes(s) 
                      ? 'border-rebirth-green bg-rebirth-green/10 text-white' 
                      : 'border-white/10 text-white/40'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div onViewportEnter={() => setActiveStep(3)} className="space-y-12">
            <h2 className="text-white tracking-tighter">
              <span className="font-serif italic text-3xl md:text-5xl block mb-8 opacity-60">To build</span>
              <textarea 
                required
                rows={2}
                placeholder="[Manifest your vision...]"
                className="bg-transparent border-b border-white/20 text-rebirth-green placeholder:text-white/10 focus:outline-none w-full text-2xl md:text-5xl lg:text-[5vw] font-medium py-4 resize-none"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
            </h2>
            
            <div className="pt-24 flex flex-col md:flex-row items-center justify-between gap-12 border-t border-white/5">
              <div className="text-white/20 text-[9px] md:text-[10px] uppercase tracking-widest max-w-sm font-bold">
                Inquiries are strictly confidential within the Rebirth network.
              </div>
              <button 
                type="submit"
                className="w-full md:w-auto bg-rebirth-green px-16 py-6 text-white text-[10px] uppercase tracking-[0.4em] font-bold"
              >
                Transmit Inquire
              </button>
            </div>
          </motion.div>

        </form>
      </main>

      {/* Mobile-Friendly Live Summary */}
      <AnimatePresence>
        {formData.name && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-0 left-0 right-0 z-[60] p-4 bg-black/80 backdrop-blur-xl border-t border-white/10 md:hidden"
          >
            <div className="flex justify-between items-center text-[8px] uppercase tracking-ultra-widest text-rebirth-green font-bold">
              <span>LIVE DOSSIER: {formData.name}</span>
              <span className="w-1 h-1 bg-rebirth-green animate-ping"></span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contact;