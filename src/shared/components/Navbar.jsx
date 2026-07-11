// frontend/src/shared/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

// Core State Handshaking (Step back 2 levels to src/, then into features/)
import { useAuth } from '../../features/auth/context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, isAdmin, logout, user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogoutClick = () => {
    logout();
    navigate('/');
  };

  const linkClass = ({ isActive }) =>
    `text-xs font-semibold tracking-wide transition-colors ${
      isActive ? 'text-sky-400' : 'text-slate-400 hover:text-slate-200'
    }`;

  return (
    <nav className="bg-slate-950 border-b border-slate-800/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Platform Identity Branding */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 text-white font-black tracking-tight text-sm uppercase">
              <span>🛣️</span>
              <span>RoadAnomalyAI</span>
            </Link>
          </div>

          {/* Desktop Control Panel Links */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/" end className={linkClass}>Home</NavLink>
            {isAuthenticated ? (
              <>
                <NavLink to="/dashboard" className={linkClass}>Console</NavLink>
                <NavLink to="/upload" className={linkClass}>Deploy Run</NavLink>
                <NavLink to="/map" className={linkClass}>GIS Map</NavLink>
                                <NavLink to="/analytics" className={linkClass}>Analytics</NavLink>
                {isAdmin && (
                  <NavLink to="/admin" className={linkClass}>Admin</NavLink>
                )}
                <button
                  onClick={handleLogoutClick}
                  className="bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[11px] font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer"
                >
                  Disconnect
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-sky-500 hover:bg-sky-400 text-slate-950 text-[11px] font-bold px-4 py-2 rounded-lg transition-colors shadow-md shadow-sky-500/10"
              >
                Access Portal
              </Link>
            )}
          </div>

          {/* Mobile Menu Action Bar Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-400 hover:text-white focus:outline-none cursor-pointer text-xl"
            >
              {isOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Dropdown Matrix */}
      {isOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-slate-800 px-4 pt-2 pb-4 space-y-3 animate-fade-in">
          <NavLink to="/" end onClick={() => setIsOpen(false)} className="block text-xs font-semibold text-slate-400">Home</NavLink>
          {isAuthenticated ? (
            <>
              <NavLink to="/dashboard" onClick={() => setIsOpen(false)} className="block text-xs font-semibold text-slate-400">Console</NavLink>
              <NavLink to="/upload" onClick={() => setIsOpen(false)} className="block text-xs font-semibold text-slate-400">Deploy Run</NavLink>
              <NavLink to="/map" onClick={() => setIsOpen(false)} className="block text-xs font-semibold text-slate-400">GIS Map</NavLink>
                            <NavLink to="/analytics" onClick={() => setIsOpen(false)} className="block text-xs font-semibold text-slate-400">Analytics</NavLink>
              {isAdmin && (
                <NavLink to="/admin" onClick={() => setIsOpen(false)} className="block text-xs font-semibold text-sky-400">Admin</NavLink>
              )}
              <button
                onClick={() => { handleLogoutClick(); setIsOpen(false); }}
                className="w-full text-left text-xs font-bold text-red-400 pt-2 border-t border-slate-900 cursor-pointer"
              >
                Disconnect Engine
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block text-center bg-sky-500 text-slate-950 text-xs font-bold py-2.5 rounded-lg"
            >
              Access Portal
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;