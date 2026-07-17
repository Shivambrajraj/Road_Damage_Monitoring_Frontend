// frontend/src/shared/components/LanguageSelector.jsx
import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { GlobeIcon, ChevronDownIcon } from './Icons';
import { SUPPORTED_LANGUAGES } from '../../i18n/i18n';
import { useOnClickOutside } from '../hooks/useOnClickOutside';

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setOpen(false), open);

  const current = SUPPORTED_LANGUAGES.find((l) => l.code === i18n.language) || SUPPORTED_LANGUAGES[0];

  const selectLanguage = (code) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, SUPPORTED_LANGUAGES.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      selectLanguage(SUPPORTED_LANGUAGES[activeIndex].code);
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => { if (e.key === 'ArrowDown' || e.key === 'Enter') { e.preventDefault(); setOpen(true); } }}
        aria-haspopup="listbox"
        aria-expanded={open}
        title="Change language"
        className="flex items-center gap-1.5 text-slate-400 hover:text-slate-100 px-2 py-1.5 rounded-lg hover:bg-slate-900 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
      >
        <GlobeIcon className="w-4 h-4" />
        <span className="text-[11px] font-bold uppercase hidden sm:inline">{current.code}</span>
        <ChevronDownIcon className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            onKeyDown={handleKeyDown}
            className="absolute right-0 mt-2 w-56 bg-slate-950 border border-slate-800 rounded-xl shadow-2xl shadow-black/40 py-1.5 z-50 max-h-80 overflow-y-auto scrollbar-thin"
          >
            <div className="px-3 py-1.5 text-[10px] font-bold text-slate-600 uppercase tracking-wider">Select language</div>
            {SUPPORTED_LANGUAGES.map((lang, idx) => (
              <button
                key={lang.code}
                role="option"
                aria-selected={lang.code === current.code}
                onClick={() => selectLanguage(lang.code)}
                onMouseEnter={() => setActiveIndex(idx)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${
                  lang.code === current.code ? 'text-sky-400 bg-sky-500/10' : 'text-slate-300'
                } ${idx === activeIndex ? 'bg-slate-900' : ''}`}
              >
                <span>{lang.nativeLabel}</span>
                <span className="text-[10px] text-slate-600">{lang.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
