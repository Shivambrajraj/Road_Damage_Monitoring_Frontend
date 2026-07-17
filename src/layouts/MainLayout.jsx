// frontend/src/layouts/MainLayout.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '../shared/components/Navbar';
import Footer from '../shared/components/Footer';
import CommandPalette from '../shared/components/CommandPalette';

const MainLayout = () => {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const location = useLocation();

  const openCommandPalette = useCallback(() => setCommandPaletteOpen(true), []);
  const closeCommandPalette = useCallback(() => setCommandPaletteOpen(false), []);

  // Global Ctrl+K / Cmd+K shortcut for the command palette
  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col antialiased selection:bg-sky-500/30 selection:text-sky-200">

      {/* Primary Global Header Anchor Navigation Matrix */}
      <Navbar onOpenCommandPalette={openCommandPalette} />

      {/* Enterprise command palette — Ctrl+K anywhere in the app */}
      <CommandPalette open={commandPaletteOpen} onClose={closeCommandPalette} />

      {/* Dynamic Viewport View Slot */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-2 sm:p-6 min-h-[calc(100vh-12rem)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Premium enterprise footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
