import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const fullText = "I promise to choose you — today, tomorrow, always.";
  const [displayedText, setDisplayedText] = useState("");
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => {
        if (index >= fullText.length) {
          clearInterval(interval);
          setShowButton(true);
          return prev;
        }
        const nextChar = fullText.charAt(index);
        index++;
        return prev + nextChar;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
        className="mb-12 relative"
      >
        <div className="absolute -inset-4 bg-rose-200/30 blur-3xl rounded-full" />
        <h1 className="relative font-script text-5xl md:text-7xl text-rose-900 leading-tight">
          On this Promise Day, <br/>
          I didn’t bring flowers... <br/>
          <span className="text-rose-500">I brought my heart.</span>
        </h1>
      </motion.div>

      

      {showButton && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgb(244 63 94 / 0.3)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/timeline')}
          className="group relative px-8 py-4 bg-gradient-to-r from-rose-400 to-rose-500 text-white text-lg rounded-full font-serif shadow-xl overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-3">
            Open My Promises <Heart className="fill-current w-5 h-5 animate-pulse" />
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        </motion.button>
      )}
    </div>
  );
};

export default Landing;
