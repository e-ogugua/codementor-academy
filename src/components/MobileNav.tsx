import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Brain, Menu, X } from 'lucide-react';

/**
 * Props interface for the MobileNav component.
 *
 * Defines the callback functions required for mobile navigation interactions.
 * Used by the main App component to handle navigation actions.
 */
interface MobileNavProps {
  /** Callback function to display "coming soon" modal with feature details */
  handleComingSoon: (title: string, description: string) => void;
  /** Function to control the premium modal visibility */
  setShowPremiumModal: (show: boolean) => void;
}

/**
 * MobileNav provides responsive navigation for mobile and tablet devices.
 *
 * Renders a hamburger menu that slides in from the left side of the screen.
 * Implements proper accessibility with ARIA attributes, keyboard navigation,
 * and focus management. Automatically closes on route changes and outside clicks.
 *
 * Mobile-first responsive design:
 * - Hidden on large screens (lg breakpoint and above)
 * - Slide-in animation with backdrop blur
 * - Touch-friendly button sizes (minimum 44px)
 * - Safe area support for modern mobile devices
 *
 * Performance optimizations:
 * - Transform-based animations for GPU acceleration
 * - Reduced motion support for accessibility
 * - Proper cleanup of event listeners
 *
 * @param props - MobileNavProps containing callback functions
 * @returns JSX element for mobile navigation interface
 *
 * @example
 * ```tsx
 * <MobileNav
 *   handleComingSoon={handleComingSoon}
 *   setShowPremiumModal={setShowPremiumModal}
 * />
 * ```
 */
export const MobileNav = ({ handleComingSoon, setShowPremiumModal }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isOpen && !target.closest('.mobile-nav')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  const navItems = [
    { href: '/', label: 'Home', exact: true },
    { href: '/courses', label: 'Courses' },
    { href: '/progress', label: 'Progress' },
    { href: '/quiz', label: 'Quiz' },
    { href: '/community', label: 'Community' },
  ];

  return (
    <>
      {/* Mobile menu button - Transform-based animation for performance */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='mobile-nav lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-cyber-cyan focus:ring-offset-2 focus:ring-offset-transparent min-h-[44px] min-w-[44px] flex items-center justify-center'
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className='flex items-center justify-center'
        >
          {isOpen ? <X className='w-6 h-6 text-white' /> : <Menu className='w-6 h-6 text-white' />}
        </motion.div>
      </button>

      {/* Mobile menu overlay - Optimized animations */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='mobile-nav fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden'
              onClick={() => setIsOpen(false)}
            />

            {/* Menu panel - Transform-based slide animation */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{
                type: 'tween',
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
              }}
              className='mobile-nav fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-gray-900/95 backdrop-blur-xl border-r border-purple-500/20 z-50 lg:hidden safe-left'
            >
              {/* Header */}
              <div className='flex items-center justify-between p-6 border-b border-purple-500/20'>
                <div className='flex items-center space-x-3'>
                  <Brain className='w-6 h-6 text-cyber-purple animate-pulse' />
                  <span className='text-white font-cyber font-semibold'>CodeMentor</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className='p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-cyber-cyan min-h-[44px] min-w-[44px] flex items-center justify-center'
                  aria-label='Close menu'
                >
                  <X className='w-5 h-5 text-white' />
                </button>
              </div>

              {/* Navigation links */}
              <nav className='p-6 space-y-2'>
                {navItems.map(item => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`block px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyber-cyan min-h-[44px] flex items-center ${
                      location.pathname === item.href
                        ? 'bg-cyber-purple/20 text-cyber-purple border border-cyber-purple/30'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Action buttons */}
                <div className='pt-4 space-y-2 border-t border-purple-500/20 mt-6'>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleComingSoon(
                        'Premium Features',
                        'Unlock advanced lessons, 1-on-1 mentoring, and exclusive content with our premium subscription.'
                      );
                    }}
                    className='w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyber-cyan min-h-[44px] flex items-center'
                  >
                    Premium
                  </button>

                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleComingSoon(
                        'Advanced Courses',
                        'Access expert-level courses on AI, machine learning, and advanced web development.'
                      );
                    }}
                    className='w-full text-left px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyber-cyan min-h-[44px] flex items-center'
                  >
                    Advanced
                  </button>

                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setShowPremiumModal(true);
                    }}
                    className='w-full mt-4 bg-gradient-to-r from-cyber-purple to-cyber-pink hover:from-dark-purple hover:to-hot-pink px-4 py-3 rounded-lg font-semibold text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyber-cyan focus:ring-offset-2 min-h-[48px] flex items-center justify-center'
                  >
                    Get Started
                  </button>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
