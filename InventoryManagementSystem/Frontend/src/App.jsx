// src/App.jsx
import { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';

function App() {
  const [currentView, setCurrentView] = useState('welcome'); // 'welcome' | 'login' | 'dashboard'
  const [user, setUser] = useState(null);

  const handleLoginClick = () => setCurrentView('login');
  const handleBackClick = () => setCurrentView('welcome');

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('welcome');
  };

  return (
    <div className="App">
      {currentView === 'welcome' && <WelcomeScreen onLoginClick={handleLoginClick} />}
      {currentView === 'login' && (
        <LoginPage onBackClick={handleBackClick} onLogin={handleLoginSuccess} />
      )}
      {currentView === 'dashboard' && (
        <DashboardPage user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
