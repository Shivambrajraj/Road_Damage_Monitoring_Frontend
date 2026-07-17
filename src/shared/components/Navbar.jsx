// frontend/src/shared/components/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { useAuth } from '../../features/auth/context/AuthContext';
import { RoadMarkIcon, MenuIcon, CloseIcon, SearchIcon, CommandIcon } from './Icons';
import LanguageSelector from './LanguageSelector';
import RegionSelector from './RegionSelector';
import NotificationBell from './NotificationBell';
import UserMenu from './UserMenu';

const Navbar = ({ onOpenCommandPalette }) => {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const mobileNavRef = useRef(null);

  // Close mobile menu on escape for accessibility
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const handleLogoutClick = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { to: '/', label: 'Home', end: true, show: true },
    { to: '/dashboard', label: 'Console', show: isAuthenticated },
    { to: '/upload', label: 'Deploy Run', show: isAuthenticated },
    { to: '/map', label: 'GIS Map', show: isAuthenticated },
    { to: '/analytics', label: 'Analytics', show: isAuthenticated },
    { to: '/admin', label: 'Admin', show: isAuthenticated && isAdmin },
  ].filter((item) => item.show);

  return (
    <nav className="bg-slate-950/85 backdrop-blur-md border-b border-slate-800/60 sticky top-0 z-40 supports-[backdrop-filter]:bg-slate-950/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* Platform Identity Branding */}
          <div className="flex items-center shrink-0">
            <Link
              to="/"
              className="flex items-center space-x-2 text-white font-black tracking-tight text-sm uppercase group focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-md px-1"
            >
              <RoadMarkIcon className="w-4 h-4 text-sky-400 transition-transform duration-300 group-hover:rotate-12" />
              <span>RoadAnomalyAI</span>
            </Link>
          </div>

          {/* Desktop Nav Links with active indicator */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `relative px-3 py-2 text-xs font-semibold tracking-wide rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                    isActive ? 'text-sky-400' : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900/70'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-indicator"
                        className="absolute left-2 right-2 -bottom-[1px] h-[2px] rounded-full bg-sky-400"
                        transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right cluster: search, language, region, notifications, profile */}
          <div className="hidden md:flex items-center gap-1">
            <button
              type="button"
              onClick={onOpenCommandPalette}
              title="Search (Ctrl+K)"
              className="flex items-center gap-2 text-slate-500 hover:text-slate-200 bg-slate-900/60 hover:bg-slate-900 border border-slate-800/70 rounded-lg pl-2.5 pr-2 py-1.5 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <SearchIcon className="w-3.5 h-3.5" />
              <span className="text-[11px] font-medium hidden lg:inline">Search…</span>
              <kbd className="hidden lg:flex items-center gap-0.5 text-[9px] font-mono text-slate-600 border border-slate-800 rounded px-1 py-0.5 ml-1">
                <CommandIcon className="w-2.5 h-2.5" />K
              </kbd>
            </button>

            <div className="w-px h-5 bg-slate-800 mx-1.5" />

            <div className="hidden lg:block"><RegionSelector /></div>
            <LanguageSelector />

            {isAuthenticated && <NotificationBell />}

            <div className="w-px h-5 bg-slate-800 mx-1.5" />

            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <Link
                to="/login"
                className="bg-sky-500 hover:bg-sky-400 text-slate-950 text-[11px] font-bold px-4 py-2 rounded-lg transition-all hover-glow shadow-md shadow-sky-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300"
              >
                Access Portal
              </Link>
            )}
          </div>

          {/* Mobile: search + hamburger */}
          <div className="md:hidden flex items-center gap-1">
            <button
              onClick={onOpenCommandPalette}
              title="Search"
              className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-900 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            >
              <SearchIcon className="w-4.5 h-4.5" />
            </button>
            {isAuthenticated && <NotificationBell />}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              className="text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 cursor-pointer"
            >
              {isOpen ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Dropdown Matrix */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={mobileNavRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-slate-950/98 border-b border-slate-800 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block text-xs font-semibold px-3 py-2.5 rounded-lg transition-colors ${
                      isActive ? 'text-sky-400 bg-sky-500/10' : 'text-slate-400 hover:bg-slate-900'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}

              <div className="flex items-center gap-2 pt-3 mt-2 border-t border-slate-900">
                <RegionSelector />
                <LanguageSelector />
              </div>

              {isAuthenticated ? (
                <button
                  onClick={() => { handleLogoutClick(); setIsOpen(false); }}
                  className="w-full text-left text-xs font-bold text-red-400 pt-3 mt-1 border-t border-slate-900 cursor-pointer px-3"
                >
                  Disconnect Engine
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block text-center bg-sky-500 text-slate-950 text-xs font-bold py-2.5 rounded-lg mt-3"
                >
                  Access Portal
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
