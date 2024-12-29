import React from 'react';

export const Navigation = ({ currentPage, handleNavigate }) => (
  <nav className="bg-gradient-to-br from-blue-100/90 to-blue-200/90 backdrop-blur-sm shadow-lg p-4 relative z-10">
    <div className="flex justify-between items-center max-w-6xl mx-auto">
      <div className="text-xl font-bold text-gray-500">KudoSpot</div>
      <div className="space-x-4">
        <button
          onClick={() => handleNavigate('dashboard')}
          className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
            currentPage === 'dashboard' 
              ? 'bg-blue-600 text-white' 
              : 'bg-white/50 text-blue-900 hover:bg-blue-50'
          }`}
        >
          Dashboard
        </button>
        <button
          onClick={() => handleNavigate('give-kudos')}
          className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
            currentPage === 'give-kudos' 
              ? 'bg-blue-600 text-white' 
              : 'bg-white/50 text-blue-900 hover:bg-blue-50'
          }`}
        >
          Give Kudos
        </button>
      </div>
    </div>
  </nav>
);
export default  Navigation;