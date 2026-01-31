import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
  scale: number;
}

const FinalPromise: React.FC = () => {
  const [isExploding, setIsExploding] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showFinalText, setShowFinalText] = useState(false);

  const colors = ['#f43f5e', '#fb7185', '#fda4af', '#facc15', '#fff'];

  const triggerExplosion = () => {
    if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
    setIsExploding(true);
    
    // Generate particles
    const newParticles: Particle[] = [];
    for (let i = 0; i < 100; i++) {
      newParticles.push({
        id: i,
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        scale: Math.random() * 1 + 0.5
      });
    }
    setParticles(newParticles);
    
    setTimeout(() => {
      setShowFinalText(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center relative overflow-hidden text-center px-6">
      
      {/* Dynamic Golden Particles Background (Simple CSS based) */}
      <div className="absolute inset-0 z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gold-400 rounded-full blur-[1px]"
            style={{ width: Math.random() * 4 + 1, height: Math.random() * 4 + 1 }}
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: window.innerHeight,
              opacity: 0
            }}
            animate={{ 
              y: -100,
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 5 + Math.random() * 5, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-2xl">
        {!isExploding ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h1 className="font-serif text-3xl md:text-5xl text-white/90 leading-tight mb-12">
              “I am not perfect for you… <br/>
              <span className="text-rose-300 font-script mt-4 block text-5xl md:text-7xl">but I promise to become better for you.”</span>
            </h1>
            
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={triggerExplosion}
              className="px-10 py-5 bg-rose-600 text-white rounded-full font-bold text-xl shadow-[0_0_30px_rgba(225,29,72,0.6)] border border-rose-400 hover:bg-rose-500 transition-colors"
            >
              Say Yes to My Promise ❤️
            </motion.button>
          </motion.div>
        ) : (
          <div className="relative h-screen w-full flex items-center justify-center">
             {/* Particles Animation */}
             {particles.map((p) => (
               <motion.div
                  key={p.id}
                  className="absolute w-3 h-3 rounded-sm"
                  style={{ backgroundColor: p.color }}
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{ 
                    x: (Math.random() - 0.5) * window.innerWidth, 
                    y: (Math.random() - 0.5) * window.innerHeight,
                    rotate: p.rotation + 720,
                    opacity: 0
                  }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
               />
             ))}

             {showFinalText && (
               <motion.div
                 initial={{ scale: 0.5, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 transition={{ duration: 1, type: "spring" }}
                 className="bg-white/10 backdrop-blur-xl p-12 rounded-3xl border border-white/20 shadow-2xl"
               >
                 <Heart className="w-20 h-20 text-rose-500 mx-auto mb-6 fill-current animate-pulse-slow" />
                 <h2 className="font-script text-6xl text-white mb-4">I Love You</h2>
                 <p className="font-serif text-rose-200 text-xl tracking-widest uppercase">This promise is forever</p>
               </motion.div>
             )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FinalPromise;
