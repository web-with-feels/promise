import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Timeline from './pages/Timeline';
import Interactive from './pages/Interactive';
import MemoryRoom from './pages/MemoryRoom';
import FinalPromise from './pages/FinalPromise';

const PageWrapper: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
    className="w-full h-full"
  >
    {children}
  </motion.div>
);

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Landing /></PageWrapper>} />
        <Route path="/timeline" element={<PageWrapper><Timeline /></PageWrapper>} />
        <Route path="/interactive" element={<PageWrapper><Interactive /></PageWrapper>} />
        <Route path="/memories" element={<PageWrapper><MemoryRoom /></PageWrapper>} />
        <Route path="/final" element={<PageWrapper><FinalPromise /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </Router>
  );
};

export default App;