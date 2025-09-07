import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import CoursesPage from './pages/CoursesPage';
import AboutPage from './pages/AboutPage';
import CommunityPage from './pages/CommunityPage';
import SupportPage from './pages/SupportPage';
import ChatPage from './components/ChatPage';
import AdminPanel from './components/AdminPanel';

function App() {
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Admin panel keyboard shortcut (Ctrl+Shift+A)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === 'A') {
        event.preventDefault();
        setShowAdminPanel(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
        <Navigation />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>

        {/* Admin Panel */}
        {showAdminPanel && (
          <AdminPanel 
            isVisible={showAdminPanel}
            onClose={() => setShowAdminPanel(false)}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
