import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Volume2, VolumeX, ArrowRight, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Gentle romantic piano loop (Royalty free placeholder)
  const MUSIC_URL = "https://cdn.pixabay.com/audio/2022/02/07/audio_102f902409.mp3"; 

  useEffect(() => {
    audioRef.current = new Audio(MUSIC_URL);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio autoplay prevented", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const getNextPath = () => {
    switch(location.pathname) {
      case '/': return '/timeline';
      case '/timeline': return '/interactive';
      case '/interactive': return '/memories';
      case '/memories': return '/final';
      default: return null;
    }
  };

  const nextPath = getNextPath();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-rose-50 text-slate-800 font-sans selection:bg-rose-200">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-rose-50 via-purple-50 to-orange-50 opacity-80" />
        <FloatingHearts />
      </div>

      {/* Music Control */}
      <div className="fixed top-6 right-6 z-50">
        <button 
          onClick={toggleMusic}
          className="p-3 bg-white/40 backdrop-blur-md border border-white/50 rounded-full shadow-lg hover:scale-105 transition-all duration-300 text-rose-800"
        >
          {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
      </div>

      {/* Main Content */}
      <main className="relative z-10 w-full min-h-screen flex flex-col">
        {children}
      </main>

      {/* Navigation Footer (Conditional) */}
      {nextPath && location.pathname !== '/' && location.pathname !== '/final' && (
        <div className="fixed bottom-8 left-0 w-full flex justify-center z-40 pointer-events-none">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(nextPath)}
            className="pointer-events-auto flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-md border border-rose-200 rounded-full shadow-xl text-rose-900 font-serif italic text-lg hover:bg-rose-100 transition-colors"
          >
            Next Chapter <ArrowRight size={18} />
          </motion.button>
        </div>
      )}
    </div>
  );
};

// Helper component for background hearts
const FloatingHearts = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-rose-200/40"
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: window.innerHeight + 100,
            scale: 0.5 + Math.random() * 1
          }}
          animate={{ 
            y: -100,
            x: Math.random() * window.innerWidth 
          }}
          transition={{ 
            duration: 10 + Math.random() * 20, 
            repeat: Infinity, 
            ease: "linear",
            delay: Math.random() * 10
          }}
        >
          <Heart fill="currentColor" size={20 + Math.random() * 40} />
        </motion.div>
      ))}
    </div>
  );
};

export default Layout;