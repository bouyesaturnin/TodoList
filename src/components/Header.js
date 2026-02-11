import React from 'react';

const Header = ({ user, onLogout }) => {
  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-1.5 rounded-lg">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <span className="text-xl font-black text-gray-900 tracking-tight hidden sm:block">
            MISSIONS<span className="text-indigo-600">HUB</span>
          </span>
        </div>

        {/* User Info & Logout */}
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-sm font-bold text-gray-800">Bonjour, {user?.username || 'Utilisateur'}</span>
            <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest leading-none">Connecté</span>
          </div>
          
          <button 
            onClick={onLogout}
            className="bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 p-2 rounded-full transition-colors border border-gray-100"
            title="Se déconnecter"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;