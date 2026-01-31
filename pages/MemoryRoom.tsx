import React from 'react';
import { motion } from 'framer-motion';
import { MEMORIES } from '../constants';

const MemoryRoom: React.FC = () => {
  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-b from-rose-50 to-purple-50 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="font-script text-5xl text-rose-900 mb-2">The Memory Room</h2>
        <p className="font-serif text-slate-500">Every moment with you is a promise kept.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 w-full max-w-6xl px-4">
        {MEMORIES.map((memory, index) => (
          <Polaroid key={memory.id} memory={memory} index={index} />
        ))}
      </div>
    </div>
  );
};

const Polaroid: React.FC<{ memory: any, index: number }> = ({ memory, index }) => {
  const rotation = index % 2 === 0 ? 3 : -3;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2 }}
      whileHover={{ y: -20, rotate: 0, zIndex: 10 }}
      className="group relative w-full aspect-[3/4] perspective-1000 cursor-pointer"
      style={{ rotate: rotation }}
    >
      <div className="relative w-full h-full transition-transform duration-700 transform-style-3d group-hover:rotate-y-180">
        
        {/* Front */}
        <div className="absolute inset-0 bg-white p-4 pb-12 shadow-xl backface-hidden flex flex-col items-center justify-start rounded-sm border border-slate-100">
          <div className="w-full h-4/5 overflow-hidden bg-slate-200 mb-4 relative">
             <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/10 to-transparent mix-blend-overlay z-10" />
             <img src={memory.imageUrl} alt="Memory" className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500" />
          </div>
          <div className="font-script text-xl text-slate-700">{memory.date}</div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 bg-[#fffdf5] p-6 shadow-xl backface-hidden rotate-y-180 rounded-sm border border-slate-100 flex flex-col items-center justify-center text-center">
          <div className="absolute inset-2 border-2 border-rose-100 border-dashed rounded-sm" />
          <p className="font-serif text-rose-900 text-lg leading-relaxed italic z-10">
            "{memory.caption}"
          </p>
          <div className="mt-4 text-xs font-sans text-slate-400 z-10 uppercase tracking-widest">
            Always & Forever
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MemoryRoom;
