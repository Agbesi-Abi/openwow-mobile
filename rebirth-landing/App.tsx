import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Expertise from './pages/Expertise';
import Work from './pages/Work';
import ProjectPage from './pages/ProjectPage';
import Contact from './pages/Contact';
import { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 250 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.onclick ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setCursorVariant('pointer');
      } else {
        setCursorVariant('default');
      }
    };

    if (!isTouchDevice) {
      window.addEventListener('mousemove', moveCursor);
      window.addEventListener('mouseover', handleMouseOver);
    }

    window.scrollTo(0, 0);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [currentPage, isTouchDevice]);

  const renderPage = () => {
    return (
      <motion.div
        key={currentPage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.6, 0.01, 0.35, 1] }}
      >
        {(() => {
          switch (currentPage) {
            case 'home': return <Home onNavigate={setCurrentPage} />;
            case 'expertise': return <Expertise onNavigate={setCurrentPage} />;
            case 'work': return <Work onNavigate={setCurrentPage} />;
            case 'project': return <ProjectPage onNavigate={setCurrentPage} />;
            case 'contact': return <Contact />;
            default: return <Home onNavigate={setCurrentPage} />;
          }
        })()}
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-rebirth-green selection:text-white">
      {/* Custom Cursor - Fine Pointer Only */}
      {!isTouchDevice && (
        <motion.div
          className="fixed top-0 left-0 w-4 h-4 bg-rebirth-green rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{
            scale: cursorVariant === 'pointer' ? 4 : 1,
          }}
        />
      )}

      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="flex-grow pt-16 md:pt-24">
        <AnimatePresence mode="wait">
          {renderPage()}
        </AnimatePresence>
      </main>
      
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
};

export default App;