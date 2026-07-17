// frontend/src/shared/components/UserMenu.jsx
import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/context/AuthContext';
import {
  UserCircleIcon, SettingsIcon, PaletteIcon, GlobeIcon, BellIcon,
  LifeBuoyIcon, LogoutIcon, ChevronDownIcon,
} from './Icons';
import { useOnClickOutside } from '../hooks/useOnClickOutside';

const MENU_ITEMS = [
  { key: 'profile', label: 'My Profile', icon: UserCircleIcon },
  { key: 'account', label: 'Account Settings', icon: SettingsIcon },
  { key: 'preferences', label: 'Preferences', icon: SettingsIcon },
  { key: 'appearance', label: 'Appearance', icon: PaletteIcon },
  { key: 'language', label: 'Language', icon: GlobeIcon },
  { key: 'notifications', label: 'Notifications', icon: BellIcon },
  { key: 'support', label: 'Support', icon: LifeBuoyIcon },
];

const UserMenu = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setOpen(false), open);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate('/');
  };

  const initials = (user?.username || 'U').slice(0, 2).toUpperCase();

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        className="flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 rounded-lg hover:bg-slate-900 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
      >
        <span className="w-7 h-7 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-[10px] font-black text-white shadow-inner">
          {initials}
        </span>
        <span className="hidden sm:block text-xs font-semibold text-slate-300 max-w-[7rem] truncate">
          {user?.username || 'Operator'}
        </span>
        <ChevronDownIcon className={`w-3 h-3 text-slate-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 mt-2 w-64 bg-slate-950 border border-slate-800 rounded-xl shadow-2xl shadow-black/40 z-50 overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-slate-900 flex items-center gap-3">
              <span className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center text-xs font-black text-white">
                {initials}
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-200 truncate">{user?.username || 'Operator'}</p>
                <p className="text-[10px] text-slate-500 truncate">{user?.isAdmin ? 'Administrator' : 'Inspection Team'}</p>
              </div>
            </div>

            <div className="py-1.5">
              {MENU_ITEMS.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setOpen(false)}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
                >
                  <Icon className="w-3.5 h-3.5 text-slate-500" />
                  {label}
                </button>
              ))}
            </div>

            <div className="border-t border-slate-900 py-1.5">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-red-400 hover:text-red-300 hover:bg-red-500/5 transition-colors cursor-pointer"
              >
                <LogoutIcon className="w-3.5 h-3.5" />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserMenu;
