// frontend/src/shared/components/NotificationBell.jsx
import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BellIcon, ScanIcon, GlobeIcon, DatabaseIcon, CpuIcon, InboxIcon } from './Icons';
import { MOCK_NOTIFICATIONS } from '../data/mockActivity';
import { useOnClickOutside } from '../hooks/useOnClickOutside';

const TYPE_ICON = {
  report: InboxIcon,
  ai: ScanIcon,
  system: GlobeIcon,
  update: CpuIcon,
  database: DatabaseIcon,
};

function timeAgo(iso) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diffMs / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.round(hrs / 24)}d ago`;
}

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setOpen(false), open);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="true"
        aria-expanded={open}
        title="Notifications"
        className="relative flex items-center justify-center w-9 h-9 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-900 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
      >
        <BellIcon className="w-4.5 h-4.5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex items-center justify-center min-w-[15px] h-[15px] px-0.5 rounded-full bg-red-500 text-[9px] font-bold text-white animate-badge-pop">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-950 border border-slate-800 rounded-xl shadow-2xl shadow-black/40 z-50 overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-900">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wide">Notifications</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-[10px] font-semibold text-sky-400 hover:text-sky-300 cursor-pointer"
                >
                  Mark all as read
                </button>
              )}
            </div>

            <div className="max-h-96 overflow-y-auto scrollbar-thin divide-y divide-slate-900/80">
              {notifications.length === 0 ? (
                <p className="px-4 py-8 text-xs text-slate-600 text-center">You're all caught up.</p>
              ) : (
                notifications.map((n) => {
                  const Icon = TYPE_ICON[n.type] || InboxIcon;
                  return (
                    <div
                      key={n.id}
                      className={`flex gap-3 px-4 py-3 transition-colors hover:bg-slate-900/60 ${!n.read ? 'bg-sky-500/[0.04]' : ''}`}
                    >
                      <div className="shrink-0 w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center">
                        <Icon className="w-3.5 h-3.5 text-sky-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-xs font-semibold text-slate-200">{n.title}</p>
                          {!n.read && <span className="mt-1 w-1.5 h-1.5 rounded-full bg-sky-400 shrink-0" />}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{n.detail}</p>
                        <p className="text-[10px] text-slate-600 mt-1 font-mono">{timeAgo(n.timestamp)}</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            <div className="px-4 py-2.5 border-t border-slate-900 text-center">
              <button className="text-[11px] font-semibold text-slate-500 hover:text-slate-300 cursor-pointer">
                View all activity
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;
