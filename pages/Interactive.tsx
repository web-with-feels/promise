import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserPromise } from '../types';
import { Send, Star } from 'lucide-react';

const PROMISE_TYPES = ['Love', 'Support', 'Growth', 'Forever'] as const;

const Interactive: React.FC = () => {
  const [promises, setPromises] = useState<UserPromise[]>([]);
  const [inputText, setInputText] = useState("");
  const [selectedType, setSelectedType] = useState<typeof PROMISE_TYPES[number]>('Love');

  useEffect(() => {
    const saved = localStorage.getItem('user-promises');
    if (saved) {
      setPromises(JSON.parse(saved));
    } else {
      // Add one default start promise
      const initial: UserPromise = {
        id: 'init',
        text: 'I promise to love you always.',
        type: 'Forever',
        x: 50,
        y: 50,
        createdAt: Date.now()
      };
      setPromises([initial]);
    }
  }, []);

  const handleAddPromise = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newPromise: UserPromise = {
      id: Date.now().toString(),
      text: inputText,
      type: selectedType,
      x: 10 + Math.random() * 80, // Random position within 10-90%
      y: 10 + Math.random() * 60,
      createdAt: Date.now()
    };

    const updated = [...promises, newPromise];
    setPromises(updated);
    localStorage.setItem('user-promises', JSON.stringify(updated));
    setInputText("");
  };

  return (
    <div className="min-h-screen relative bg-slate-900 overflow-hidden text-white flex flex-col items-center">
      
      {/* Background Night Sky */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-slate-900 to-black z-0"></div>
      
      {/* Stars Container */}
      <div className="absolute inset-0 z-0">
        {promises.map((p, i) => (
          <React.Fragment key={p.id}>
            {/* Connection Lines */}
            {i > 0 && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <motion.line
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.2 }}
                  transition={{ duration: 2 }}
                  x1={`${promises[i-1].x}%`}
                  y1={`${promises[i-1].y}%`}
                  x2={`${p.x}%`}
                  y2={`${p.y}%`}
                  stroke="white"
                  strokeWidth="1"
                />
              </svg>
            )}
            
            {/* The Star */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring" }}
              className="absolute group"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
            >
              <div className="relative flex items-center justify-center">
                <Star className={`w-4 h-4 ${p.type === 'Love' ? 'text-rose-400' : p.type === 'Growth' ? 'text-green-300' : p.type === 'Support' ? 'text-blue-300' : 'text-amber-200'} fill-current animate-pulse`} />
                <div className={`absolute inset-0 blur-md ${p.type === 'Love' ? 'bg-rose-500' : 'bg-white'} opacity-50`}></div>
                
                {/* Tooltip */}
                <div className="absolute top-6 left-1/2 -translate-x-1/2 w-48 bg-white/10 backdrop-blur-md border border-white/20 p-2 rounded text-xs text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                   <p className="font-bold mb-1 text-rose-200">{p.type}</p>
                   "{p.text}"
                </div>
              </div>
            </motion.div>
          </React.Fragment>
        ))}
      </div>

      {/* Input UI */}
      <div className="relative z-20 mt-auto mb-24 w-full max-w-md px-6">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl">
          <h2 className="font-script text-3xl text-center mb-4 text-rose-200">Make a Promise With Me</h2>
          
          <form onSubmit={handleAddPromise}>
            <div className="flex gap-2 mb-4 justify-center">
              {PROMISE_TYPES.map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setSelectedType(type)}
                  className={`text-xs px-3 py-1 rounded-full transition-colors ${selectedType === type ? 'bg-rose-500 text-white' : 'bg-white/10 hover:bg-white/20'}`}
                >
                  {type}
                </button>
              ))}
            </div>

            <div className="relative flex items-center">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="I promise to..."
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-rose-400 focus:bg-black/40 transition-all placeholder:text-white/30"
              />
              <button 
                type="submit"
                disabled={!inputText.trim()}
                className="absolute right-2 p-2 bg-rose-500 rounded-lg hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={16} />
              </button>
            </div>
            <p className="text-[10px] text-center mt-3 text-white/40">
              Your promises become stars in our shared sky.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Interactive;
