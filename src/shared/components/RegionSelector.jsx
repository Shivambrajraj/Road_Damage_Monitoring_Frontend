// frontend/src/shared/components/RegionSelector.jsx
import React, { useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PinIcon, ChevronDownIcon, SearchIcon } from './Icons';
import { NATIONAL_REGION, INDIAN_STATES, INDIAN_UNION_TERRITORIES } from '../data/regions';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useOnClickOutside } from '../hooks/useOnClickOutside';

const RegionSelector = () => {
  const [region, setRegion] = useLocalStorage('rai_region', NATIONAL_REGION);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef(null);

  useOnClickOutside(ref, () => setOpen(false), open);

  const filteredStates = useMemo(
    () => INDIAN_STATES.filter((s) => s.label.toLowerCase().includes(query.toLowerCase())),
    [query]
  );
  const filteredUTs = useMemo(
    () => INDIAN_UNION_TERRITORIES.filter((s) => s.label.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  const select = (r) => {
    setRegion(r);
    setOpen(false);
    setQuery('');
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        title="Change region scope"
        className="flex items-center gap-1.5 text-slate-400 hover:text-slate-100 px-2.5 py-1.5 rounded-lg hover:bg-slate-900 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 max-w-[9.5rem]"
      >
        <PinIcon className="w-4 h-4 shrink-0 text-sky-400/80" />
        <span className="text-[11px] font-bold truncate">{region.label}</span>
        <ChevronDownIcon className={`w-3 h-3 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 mt-2 w-72 bg-slate-950 border border-slate-800 rounded-xl shadow-2xl shadow-black/40 z-50 overflow-hidden"
          >
            <div className="p-2 border-b border-slate-900">
              <div className="flex items-center gap-2 bg-slate-900 rounded-lg px-2.5 py-1.5">
                <SearchIcon className="w-3.5 h-3.5 text-slate-600" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search states or UTs…"
                  className="bg-transparent text-xs text-slate-200 placeholder:text-slate-600 outline-none w-full"
                />
              </div>
            </div>
            <div className="max-h-72 overflow-y-auto scrollbar-thin py-1.5">
              {!query && (
                <button
                  onClick={() => select(NATIONAL_REGION)}
                  className={`w-full text-left px-3 py-2 text-xs font-semibold cursor-pointer ${
                    region.code === NATIONAL_REGION.code ? 'text-sky-400 bg-sky-500/10' : 'text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  🇮🇳 National View
                </button>
              )}
              {filteredStates.length > 0 && (
                <>
                  <div className="px-3 pt-2 pb-1 text-[10px] font-bold text-slate-600 uppercase tracking-wider">States</div>
                  {filteredStates.map((s) => (
                    <button
                      key={s.code}
                      onClick={() => select(s)}
                      className={`w-full text-left px-3 py-2 text-xs cursor-pointer ${
                        region.label === s.label ? 'text-sky-400 bg-sky-500/10' : 'text-slate-300 hover:bg-slate-900'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </>
              )}
              {filteredUTs.length > 0 && (
                <>
                  <div className="px-3 pt-2 pb-1 text-[10px] font-bold text-slate-600 uppercase tracking-wider">Union Territories</div>
                  {filteredUTs.map((s) => (
                    <button
                      key={s.code}
                      onClick={() => select(s)}
                      className={`w-full text-left px-3 py-2 text-xs cursor-pointer ${
                        region.label === s.label ? 'text-sky-400 bg-sky-500/10' : 'text-slate-300 hover:bg-slate-900'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </>
              )}
              {query && filteredStates.length === 0 && filteredUTs.length === 0 && (
                <p className="px-3 py-4 text-xs text-slate-600 text-center">No matches found.</p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RegionSelector;
