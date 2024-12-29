import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import GiveKudos from './components/GiveKudos';
import Login from './components/Login';
import Navigation from './components/Navigation';
import { Bubble } from './components/Bubble';
import './index.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [userEmail, setUserEmail] = useState('');

  const handleLogin = (email) => {
    setUserEmail(email);
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login onLogin={handleLogin} />;
      case 'dashboard':
        return (
          <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 relative">
            <Bubble />
            <Navigation currentPage={currentPage} handleNavigate={handleNavigate} />
            <div className="relative z-10">
              <Dashboard userEmail={userEmail} />
            </div>
          </div>
        );
      case 'give-kudos':
        return (
          <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 relative">
            <Bubble />
            <Navigation currentPage={currentPage} handleNavigate={handleNavigate} />
            <div className="relative z-10">
              <GiveKudos userEmail={userEmail} />
            </div>
          </div>
        );
      default:
        return <Login onLogin={handleLogin} />;
    }
  };

  return renderPage();
};

export default App;