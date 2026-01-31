import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TIMELINE_PROMISES } from '../constants';
import { PromiseItem } from '../types';
import { Heart, Sun, Moon, Star, X } from 'lucide-react';

const Timeline: React.FC = () => {
  const [selectedPromise, setSelectedPromise] = useState<PromiseItem | null>(null);

  const getIcon = (type: string) => {
    switch (type) {
      case 'heart': return <Heart className="w-8 h-8 text-rose-500" fill="currentColor" />;
      case 'sun': return <Sun className="w-8 h-8 text-amber-500" />;
      case 'moon': return <Moon className="w-8 h-8 text-indigo-500" />;
      case 'star': return <Star className="w-8 h-8 text-yellow-500" fill="currentColor" />;
      default: return <Heart className="w-8 h-8 text-rose-500" />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-20 px-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-10 text-center"
      >
        <h2 className="font-script text-4xl md:text-5xl text-rose-900 mb-2">Promises Through Time</h2>
        <p className="font-serif text-slate-500 italic">Scroll to discover what I vow to you</p>
      </motion.div>

      {/* Horizontal Scroll Container */}
      <div className="w-full max-w-6xl overflow-x-auto no-scrollbar py-10 px-4 md:px-20">
        <div className="flex gap-8 min-w-max">
          {TIMELINE_PROMISES.map((promise, index) => (
            <motion.div
              key={promise.id}
              layoutId={`card-${promise.id}`}
              onClick={() => setSelectedPromise(promise)}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10, rotate: index % 2 === 0 ? 1 : -1 }}
              className="cursor-pointer relative w-64 h-80 bg-white/60 backdrop-blur-sm border border-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-between group hover:shadow-rose-200/50 hover:shadow-2xl transition-all"
            >
              <div className="absolute -top-6 bg-white p-4 rounded-full shadow-md">
                {getIcon(promise.icon)}
              </div>
              
              <div className="mt-8 text-center">
                <h3 className="font-serif font-bold text-xl text-slate-800 mb-4">{promise.title}</h3>
                <div className="w-10 h-1 bg-rose-200 mx-auto rounded-full mb-4" />
                <p className="text-sm text-slate-600 leading-relaxed font-sans">{promise.shortText}</p>
              </div>

              <div className="text-rose-400 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                Read More
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Expanded Modal */}
      <AnimatePresence>
        {selectedPromise && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
            <motion.div
              layoutId={`card-${selectedPromise.id}`}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
               {/* Decorative Background */}
               <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-rose-100 to-white" />
               
               <button 
                onClick={() => setSelectedPromise(null)}
                className="absolute top-4 right-4 p-2 bg-white/50 hover:bg-white rounded-full transition-colors z-10"
              >
                <X size={20} className="text-slate-500" />
              </button>

              <div className="relative p-8 pt-12 flex flex-col items-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="bg-white p-5 rounded-full shadow-xl mb-6"
                >
                  {getIcon(selectedPromise.icon)}
                </motion.div>

                <h3 className="font-script text-4xl text-rose-900 mb-2 text-center">{selectedPromise.title}</h3>
                <h4 className="font-serif text-slate-500 italic mb-6 text-center text-sm">{selectedPromise.shortText}</h4>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-rose-50/50 p-6 rounded-xl border border-rose-100"
                >
                  <p className="font-sans text-slate-700 leading-relaxed text-justify">
                    {selectedPromise.fullStory}
                  </p>
                </motion.div>
                
                <div className="mt-8">
                  <span className="font-script text-2xl text-rose-300">Forever yours</span>
                </div>
              </div>
            </motion.div>
            
            {/* Backdrop click to close */}
            <div 
              className="absolute inset-0 -z-10"
              onClick={() => setSelectedPromise(null)}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Timeline;
