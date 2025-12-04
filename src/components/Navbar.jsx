import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Bell, User, LogIn, Menu } from 'lucide-react';

const Navbar = ({ searchTerm, onSearchChange, showSearch = true }) => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isAuth, setIsAuth] = useState(false); // TODO: Collegare a Firebase Auth

  const menuItems = [
    { icon: '🏠', label: 'Home', path: '/' },
    { icon: '🎲', label: 'Lista Giochi', path: '/games' },
    { icon: '💬', label: 'Consigliami tu!', path: '/recommend' },
    { icon: '🛒', label: 'Mercatino', path: '/marketplace' },
    { icon: '📅', label: 'Eventi', path: '/events' },
    { icon: '📨', label: 'Feedback', path: '/feedback' },
  ];

  return (
    <>
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-stone-950 border-r border-stone-800 z-50 transition-transform ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-yellow-400">Menu</h2>
            <button onClick={() => setShowSidebar(false)} className="p-2 hover:bg-stone-800 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          {menuItems.map((item, i) => (
            <button
              key={i}
              onClick={() => {
                navigate(item.path);
                setShowSidebar(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-stone-800 text-left mb-2 transition-colors"
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {showSidebar && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40" 
          onClick={() => setShowSidebar(false)} 
        />
      )}

      {/* Navbar */}
      <nav className="bg-stone-950 border-b border-yellow-600 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            {/* Left: Menu + Logo */}
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowSidebar(true)} 
                className="p-2 hover:bg-stone-800 rounded-lg flex-shrink-0 transition-colors"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
              </button>
              <div 
                onClick={() => navigate('/')}
                className="flex items-center gap-2 cursor-pointer"
              >
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center text-lg sm:text-2xl flex-shrink-0">
                  📖
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl sm:text-2xl font-bold text-yellow-400">Nel Grimorio</h1>
                  <p className="text-xs text-stone-400">Associazione Ludica</p>
                </div>
              </div>
            </div>

            {/* Center: Search */}
            {showSearch && (
              <div className="flex-1 max-w-xs sm:max-w-md mx-2">
                <div className="relative">
                  <Search className="absolute left-2 sm:left-3 top-2 sm:top-2.5 w-4 h-4 sm:w-5 sm:h-5 text-stone-400" />
                  <input
                    type="text"
                    placeholder="Cerca..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange?.(e.target.value)}
                    className="w-full pl-8 sm:pl-10 pr-2 sm:pr-4 py-1.5 sm:py-2 text-sm bg-stone-800 border border-stone-700 rounded-lg text-white focus:outline-none focus:border-yellow-500 transition-colors"
                  />
                </div>
              </div>
            )}

            {/* Right: Notifications + User */}
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-stone-800 rounded-lg relative flex-shrink-0 transition-colors">
                <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-400 rounded-full" />
              </button>
              
              {isAuth ? (
                <button 
                  onClick={() => navigate('/profile')}
                  className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg font-semibold text-stone-900 text-sm hover:from-yellow-400 hover:to-yellow-500 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden md:inline">Francesco</span>
                </button>
              ) : (
                <button 
                  onClick={() => navigate('/login')}
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg font-semibold text-xs sm:text-sm hover:from-cyan-400 hover:to-cyan-500 transition-colors"
                >
                  <LogIn className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">Accedi</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;