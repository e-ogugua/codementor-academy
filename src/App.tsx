// Updated for redeploy trigger - Oct 15, 2025
import { lazy, Suspense, useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, User } from 'lucide-react';
import { PremiumModal } from './components/PremiumModal';
import { CodingPlayground } from './components/CodingPlayground';
import { ProgressPage } from './pages/ProgressPage';
import { MobileNav } from './components/MobileNav';

// Lazy load route components to reduce initial bundle size
// Using dynamic import to delay route bundle until accessed
const HomePage = lazy(() => import('./pages/HomePage'));
const CoursesPage = lazy(() => import('./pages/CoursesPage'));
const QuizPage = lazy(() => import('./pages/QuizPage'));
const CommunityPage = lazy(() => import('./pages/CommunityPage'));

/**
 * Modal component for displaying "coming soon" notifications.
 *
 * Provides consistent messaging for features under development.
 * Uses backdrop blur and animations for modern UX.
 *
 * @param isOpen - Controls modal visibility
 * @param onClose - Callback function to close the modal
 * @param title - Modal title text
 * @param description - Detailed description of the feature
 */
function ComingSoonModal({
  isOpen,
  onClose,
  title,
  description,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
}) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className='bg-gray-900 rounded-2xl p-6 md:p-8 max-w-md w-full mx-4 border border-cyber-purple/30'
        onClick={e => e.stopPropagation()}
      >
        <div className='text-center'>
          <h3 className='text-xl md:text-2xl font-bold text-white mb-4'>{title}</h3>
          <p className='text-gray-300 mb-6 text-sm md:text-base'>{description}</p>
          <motion.button
            onClick={onClose}
            className='bg-cyber-purple text-white px-4 py-2 rounded-lg w-full min-h-[44px] focus:outline-none focus:ring-2 focus:ring-cyber-cyan'
            whileHover={{ scale: 1.05 }}
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/**
 * Main application component for CodeMentor Academy.
 *
 * Serves as the root component providing routing, global state management,
 * and responsive layout. Implements mobile-first design with lazy loading
 * for optimal performance.
 *
 * Architecture decisions:
 * - Uses React Router v7 for client-side routing with code splitting
 * - Implements Context API for global progress state management
 * - Mobile-first responsive design with fluid typography
 * - Accessibility-first approach with semantic HTML and ARIA
 * - Performance optimized with React.memo and lazy loading
 *
 * @returns JSX element representing the complete application
 *
 * @example
 * ```tsx
 * <App />
 * ```
 */
function App() {
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showCodingPlayground, setShowCodingPlayground] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [comingSoonTitle, setComingSoonTitle] = useState('');
  const [comingSoonDescription, setComingSoonDescription] = useState('');
  const [aiMessage, setAiMessage] = useState(
    "Ready to explore React hooks? Let's build something together."
  );

  const handleAiChat = () => {
    const progress = Math.floor(Math.random() * 15); // Simulate progress
    if (progress < 3) {
      setAiMessage(
        "Great start! You're building a strong foundation. Let's dive into variables and functions next."
      );
    } else if (progress < 8) {
      setAiMessage(
        "You're making excellent progress! Ready to explore React components and state management?"
      );
    } else {
      setAiMessage(
        "Excellent work! You're ready for advanced topics. Consider upgrading to Premium for personalized mentoring."
      );
    }
    setShowChatModal(true);
  };

  const handleComingSoon = (title: string, description: string) => {
    setComingSoonTitle(title);
    setComingSoonDescription(description);
    setShowComingSoon(true);
  };

  return (
    <Router>
      <div className='min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 overflow-hidden'>
        {/* Animated Background Blobs */}
        <div className='fixed inset-0 overflow-hidden pointer-events-none'>
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className='absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30'
          />
          <motion.div
            animate={{
              x: [0, -150, 0],
              y: [0, 100, 0],
              scale: [1, 0.8, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
            className='absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30'
          />
          <motion.div
            animate={{
              x: [0, 80, 0],
              y: [0, -80, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            className='absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20'
          />
        </div>

        {/* Skip link for accessibility */}
        <a href='#main' className='skip-link sr-only focus:not-sr-only'>
          Skip to main content
        </a>

        {/* Header - Mobile-first responsive design */}
        <header className='relative z-50 bg-black/10 backdrop-blur-2xl border-b border-purple-500/20 safe-top'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex items-center justify-between h-16 sm:h-20'>
              {/* Logo */}
              <div className='flex items-center space-x-3 min-w-0'>
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className='relative flex-shrink-0'
                >
                  <Brain className='w-6 h-6 sm:w-8 sm:h-8 text-white animate-pulse' />
                </motion.div>
                <div className='min-w-0'>
                  <h1 className='text-lg sm:text-xl lg:text-3xl font-bold bg-gradient-to-r from-cyber-purple via-cyber-pink to-cyber-cyan bg-clip-text text-transparent font-cyber truncate'>
                    CodeMentor Academy
                  </h1>
                  <p className='text-cyber-cyan font-medium text-xs sm:text-sm hidden sm:block'>
                    AI-Powered Learning Platform
                  </p>
                </div>
              </div>

              {/* Desktop Navigation */}
              <nav className='hidden lg:flex items-center space-x-8 xl:space-x-10'>
                <Link
                  to='/'
                  className='text-cyber-cyan hover:text-neon-green transition-colors font-medium hover:animate-pulse focus:outline-none focus:ring-2 focus:ring-cyber-cyan rounded-lg px-2 py-1'
                >
                  Home
                </Link>
                <Link
                  to='/courses'
                  className='text-cyber-cyan hover:text-neon-green transition-colors font-medium hover:animate-pulse focus:outline-none focus:ring-2 focus:ring-cyber-cyan rounded-lg px-2 py-1'
                >
                  Courses
                </Link>
                <Link
                  to='/progress'
                  className='text-cyber-cyan hover:text-neon-green transition-colors font-medium hover:animate-pulse focus:outline-none focus:ring-2 focus:ring-cyber-cyan rounded-lg px-2 py-1'
                >
                  Progress
                </Link>
                <Link
                  to='/quiz'
                  className='text-cyber-cyan hover:text-neon-green transition-colors font-medium hover:animate-pulse focus:outline-none focus:ring-2 focus:ring-cyber-cyan rounded-lg px-2 py-1'
                >
                  Quiz
                </Link>
                <Link
                  to='/community'
                  className='text-cyber-cyan hover:text-neon-green transition-colors font-medium hover:animate-pulse focus:outline-none focus:ring-2 focus:ring-cyber-cyan rounded-lg px-2 py-1'
                >
                  Community
                </Link>
                <button
                  onClick={() =>
                    handleComingSoon(
                      'Premium Features',
                      'Unlock advanced lessons, 1-on-1 mentoring, and exclusive content with our premium subscription.'
                    )
                  }
                  className='text-cyber-cyan hover:text-neon-green transition-colors font-medium hover:animate-pulse focus:outline-none focus:ring-2 focus:ring-cyber-cyan rounded-lg px-2 py-1'
                >
                  Premium
                </button>
                <button
                  onClick={() =>
                    handleComingSoon(
                      'Advanced Courses',
                      'Access expert-level courses on AI, machine learning, and advanced web development.'
                    )
                  }
                  className='text-cyber-cyan hover:text-neon-green transition-colors font-medium hover:animate-pulse focus:outline-none focus:ring-2 focus:ring-cyber-cyan rounded-lg px-2 py-1'
                >
                  Advanced
                </button>
              </nav>

              {/* Desktop Actions */}
              <div className='hidden lg:flex items-center space-x-3 xl:space-x-4'>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowPremiumModal(true)}
                  className='bg-gradient-to-r from-cyber-purple to-cyber-pink hover:from-dark-purple hover:to-hot-pink px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold text-white shadow-lg shadow-cyber-purple/25 transition-all duration-300 animate-cyber-glow focus:outline-none focus:ring-2 focus:ring-cyber-cyan focus:ring-offset-2'
                >
                  <span className='hidden xl:inline'>Get Started</span>
                  <span className='xl:hidden'>Start</span>
                </motion.button>
                <User className='w-8 h-8 sm:w-10 sm:h-10 text-cyber-cyan hover:text-neon-green cursor-pointer transition-colors animate-float focus:outline-none focus:ring-2 focus:ring-cyber-cyan rounded-lg p-1' />
              </div>

              {/* Mobile Navigation */}
              <MobileNav
                handleComingSoon={handleComingSoon}
                setShowPremiumModal={setShowPremiumModal}
              />
            </div>
          </div>
        </header>

        {/* Main content */}
        <main id='main' className='relative z-10'>
          <Routes>
            <Route
              path='/'
              element={
                <Suspense
                  fallback={
                    <div className='flex items-center justify-center min-h-screen text-white'>
                      Loading...
                    </div>
                  }
                >
                  <HomePage handleAiChat={handleAiChat} />
                </Suspense>
              }
            />
            <Route
              path='/courses'
              element={
                <Suspense
                  fallback={
                    <div className='flex items-center justify-center min-h-screen text-white'>
                      Loading...
                    </div>
                  }
                >
                  <CoursesPage />
                </Suspense>
              }
            />
            <Route path='/progress' element={<ProgressPage />} />
            <Route
              path='/quiz'
              element={
                <Suspense
                  fallback={
                    <div className='flex items-center justify-center min-h-screen text-white'>
                      Loading...
                    </div>
                  }
                >
                  <QuizPage />
                </Suspense>
              }
            />
            <Route
              path='/community'
              element={
                <Suspense
                  fallback={
                    <div className='flex items-center justify-center min-h-screen text-white'>
                      Loading...
                    </div>
                  }
                >
                  <CommunityPage />
                </Suspense>
              }
            />
          </Routes>
        </main>

        <PremiumModal isOpen={showPremiumModal} onClose={() => setShowPremiumModal(false)} />
        <CodingPlayground
          isOpen={showCodingPlayground}
          onClose={() => setShowCodingPlayground(false)}
        />
        <ComingSoonModal
          isOpen={showComingSoon}
          onClose={() => setShowComingSoon(false)}
          title={comingSoonTitle}
          description={comingSoonDescription}
        />

        {/* Simple Chat Modal */}
        {showChatModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 safe-top safe-bottom'
            onClick={() => setShowChatModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className='bg-gray-900 rounded-2xl p-6 md:p-8 max-w-md w-full mx-4 border border-cyber-purple/30'
              onClick={e => e.stopPropagation()}
            >
              <div className='text-center'>
                <h3 className='text-xl font-bold text-white mb-4'>AI Assistant Chat</h3>
                <p className='text-gray-300 mb-6'>"{aiMessage}"</p>
                <motion.button
                  onClick={() => setShowChatModal(false)}
                  className='bg-cyber-purple text-white px-4 py-2 rounded-lg w-full min-h-[44px] focus:outline-none focus:ring-2 focus:ring-cyber-cyan'
                  whileHover={{ scale: 1.05 }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </Router>
  );
}

export default App;
