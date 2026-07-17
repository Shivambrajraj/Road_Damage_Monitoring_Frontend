// frontend/src/shared/components/CommandPalette.jsx
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/context/AuthContext';
import {
  SearchIcon, StackIcon, UploadCloudIcon, GlobeIcon, TrendUpIcon,
  SettingsIcon, LifeBuoyIcon, LogoutIcon, CommandIcon, InboxIcon,
} from './Icons';

const buildCommands = (isAuthenticated, isAdmin) => [
  { id: 'page-home', group: 'Pages', label: 'Home', hint: 'Landing page', icon: GlobeIcon, action: (nav) => nav('/') },
  ...(isAuthenticated ? [
    { id: 'page-dashboard', group: 'Pages', label: 'Dashboard', hint: 'Central control console', icon: StackIcon, action: (nav) => nav('/dashboard') },
    { id: 'page-upload', group: 'Pages', label: 'Upload / Deploy Run', hint: 'Submit a new road image', icon: UploadCloudIcon, action: (nav) => nav('/upload') },
    { id: 'page-map', group: 'GIS', label: 'GIS Map', hint: 'Geo-tagged detection map', icon: GlobeIcon, action: (nav) => nav('/map') },
    { id: 'page-analytics', group: 'Analytics', label: 'Analytics', hint: 'Trends & severity breakdown', icon: TrendUpIcon, action: (nav) => nav('/analytics') },
  ] : [
    { id: 'page-login', group: 'Pages', label: 'Login', hint: 'Access portal', icon: SettingsIcon, action: (nav) => nav('/login') },
    { id: 'page-register', group: 'Pages', label: 'Register', hint: 'Create an account', icon: SettingsIcon, action: (nav) => nav('/register') },
  ]),
  ...(isAdmin ? [
    { id: 'page-admin', group: 'Pages', label: 'Admin Panel', hint: 'User & system administration', icon: SettingsIcon, action: (nav) => nav('/admin') },
  ] : []),
  { id: 'reports-recent', group: 'Reports', label: 'View recent reports', hint: 'Latest submitted road anomaly reports', icon: InboxIcon, action: (nav) => nav('/dashboard') },
  { id: 'docs-api', group: 'Documentation', label: 'API Documentation', hint: 'REST endpoints reference', icon: LifeBuoyIcon, action: () => window.open('https://github.com', '_blank') },
  { id: 'docs-architecture', group: 'Documentation', label: 'System Architecture', hint: 'How RoadAnomalyAI is built', icon: LifeBuoyIcon, action: () => window.open('https://github.com', '_blank') },
  { id: 'cmd-settings', group: 'Commands', label: 'Open Settings', hint: 'Account & preferences', icon: SettingsIcon, action: () => {} },
  { id: 'cmd-support', group: 'Commands', label: 'Contact Support', hint: 'Reach the platform team', icon: LifeBuoyIcon, action: () => {} },
  ...(isAuthenticated ? [
    { id: 'cmd-logout', group: 'Commands', label: 'Log out', hint: 'End current session', icon: LogoutIcon, action: (nav, _q, logout) => { logout(); nav('/'); } },
  ] : []),
];

const CommandPalette = ({ open, onClose }) => {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, logout } = useAuth();

  const commands = useMemo(() => buildCommands(isAuthenticated, isAdmin), [isAuthenticated, isAdmin]);

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter((c) => c.label.toLowerCase().includes(q) || c.group.toLowerCase().includes(q) || c.hint?.toLowerCase().includes(q));
  }, [commands, query]);

  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach((c) => {
      if (!map[c.group]) map[c.group] = [];
      map[c.group].push(c);
    });
    return map;
  }, [filtered]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  const runCommand = useCallback((cmd) => {
    if (!cmd) return;
    cmd.action(navigate, query, logout);
    onClose();
    setQuery('');
  }, [navigate, query, logout, onClose]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      runCommand(filtered[activeIndex]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  let flatIndex = -1;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[12vh] left-1/2 -translate-x-1/2 w-[92vw] max-w-xl bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl shadow-black/60 z-[101] overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-900">
              <SearchIcon className="w-4 h-4 text-slate-500 shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search pages, reports, analytics, GIS, settings, docs…"
                className="flex-1 bg-transparent text-sm text-slate-100 placeholder:text-slate-600 outline-none"
              />
              <kbd className="hidden sm:flex items-center gap-1 text-[10px] font-mono text-slate-600 border border-slate-800 rounded px-1.5 py-0.5">
                ESC
              </kbd>
            </div>

            <div className="max-h-[60vh] overflow-y-auto scrollbar-thin py-2">
              {Object.keys(grouped).length === 0 && (
                <p className="px-4 py-8 text-xs text-slate-600 text-center">No results found.</p>
              )}
              {Object.entries(grouped).map(([group, items]) => (
                <div key={group} className="mb-1.5">
                  <div className="px-4 py-1 text-[10px] font-bold text-slate-600 uppercase tracking-wider">{group}</div>
                  {items.map((cmd) => {
                    flatIndex += 1;
                    const isActive = flatIndex === activeIndex;
                    const Icon = cmd.icon;
                    return (
                      <button
                        key={cmd.id}
                        onMouseEnter={() => setActiveIndex(flatIndex)}
                        onClick={() => runCommand(cmd)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors cursor-pointer ${
                          isActive ? 'bg-sky-500/10 text-sky-300' : 'text-slate-300 hover:bg-slate-900'
                        }`}
                      >
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-sky-400' : 'text-slate-500'}`} />
                        <span className="text-xs font-semibold flex-1 min-w-0 truncate">{cmd.label}</span>
                        {cmd.hint && <span className="text-[10px] text-slate-600 truncate hidden sm:block">{cmd.hint}</span>}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between px-4 py-2.5 border-t border-slate-900 text-[10px] text-slate-600">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><kbd className="border border-slate-800 rounded px-1 py-0.5 font-mono">↑↓</kbd> Navigate</span>
                <span className="flex items-center gap-1"><kbd className="border border-slate-800 rounded px-1 py-0.5 font-mono">↵</kbd> Select</span>
              </div>
              <span className="flex items-center gap-1">
                <CommandIcon className="w-3 h-3" /> K to toggle
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
