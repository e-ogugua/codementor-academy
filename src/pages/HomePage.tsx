import { memo, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, ChevronRight, MessageCircle, Play } from 'lucide-react';
import { TopicGrid } from '../components/TopicGrid';
import type { Topic } from '../types/Topic';
import { topicsData } from '../data/topics';

interface HomePageProps {
  handleAiChat: () => void;
}

export const HomePage = memo(({ handleAiChat }: HomePageProps) => {
  // Memoize topics data to prevent unnecessary recalculations
  // Stable reference prevents child component re-renders
  const featuredTopics = useState<Topic[]>(() =>
    topicsData.filter(t => t.is_featured).slice(0, 6)
  )[0];

  const [highlightedTopic, setHighlightedTopic] = useState<string | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setHighlightedTopic(hash);
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 500);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Memoize event handlers for stable reference
  // Prevents child components from re-rendering due to function recreation
  const handleEnroll = useCallback((topicId: string) => {
    console.log('Enrolling in topic:', topicId);
    // TODO: Implement enrollment logic
  }, []);

  const handleBookmark = useCallback((topicId: string) => {
    console.log('Bookmarking topic:', topicId);
    // TODO: Implement bookmark logic
  }, []);

  const handleStartChat = useCallback(() => {
    handleAiChat();
  }, [handleAiChat]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900'>
      {/* Hero Section - Mobile-first responsive design */}
      <section className='relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden safe-top'>
        <div className='absolute inset-0 bg-gradient-to-r from-cyber-purple/20 to-cyber-pink/20' />
        <div className='relative z-10 max-w-4xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8'
          >
            <Link to='/' className='flex-shrink-0'>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className='p-3 sm:p-4 bg-gradient-to-r from-cyber-purple to-cyber-pink rounded-2xl shadow-2xl cursor-pointer'
                whileHover={{ scale: 1.1 }}
              >
                <Brain className='w-6 h-6 sm:w-8 sm:h-8 text-white animate-pulse' />
              </motion.div>
            </Link>
            <div className='text-center sm:text-left'>
              <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-cyber-purple via-cyber-pink to-cyber-cyan bg-clip-text text-transparent font-cyber leading-tight'>
                CodeMentor Academy
              </h1>
              <p className='text-cyber-cyan font-medium text-sm sm:text-base md:text-lg mt-1'>
                AI-Powered Learning Platform
              </p>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4'
          >
            Master React development with AI-powered guidance, interactive tutorials, and real-world
            projects.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center'
          >
            <Link to='/courses' className='w-full sm:w-auto'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='w-full sm:w-auto bg-gradient-to-r from-cyber-purple to-cyber-pink hover:from-dark-purple hover:to-hot-pink px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-white shadow-lg shadow-cyber-purple/25 transition-all duration-300 animate-cyber-glow flex items-center justify-center gap-2 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-cyber-cyan focus:ring-offset-2'
              >
                <Play className='w-4 h-4 sm:w-5 sm:h-5' />
                <span className='text-sm sm:text-base'>Start Learning</span>
              </motion.button>
            </Link>
            <motion.button
              onClick={handleStartChat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-white border border-white/20 transition-all duration-300 flex items-center justify-center gap-2 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-cyber-cyan focus:ring-offset-2'
            >
              <MessageCircle className='w-4 h-4 sm:w-5 sm:h-5' />
              <span className='text-sm sm:text-base'>Chat with Alex</span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Featured Topics - Mobile-first responsive design */}
      <section className='py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-7xl mx-auto'>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center mb-8 sm:mb-12'
          >
            <h2 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4'>
              Featured Learning Paths
            </h2>
            <p className='text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed'>
              Curated learning experiences designed to take you from beginner to expert.
            </p>
          </motion.div>

          <TopicGrid
            topics={featuredTopics}
            onEnroll={handleEnroll}
            onBookmark={handleBookmark}
            highlightedTopic={highlightedTopic}
          />

          <div className='text-center mt-8 sm:mt-10'>
            <Link to='/courses'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='bg-gradient-to-r from-cyber-cyan to-cyber-blue hover:from-cyber-cyan/80 hover:to-cyber-blue/80 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all duration-300 flex items-center gap-2 mx-auto min-h-[48px] focus:outline-none focus:ring-2 focus:ring-cyber-cyan focus:ring-offset-2'
              >
                <span className='text-sm sm:text-base'>View All Courses</span>
                <ChevronRight className='w-4 h-4' />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
});

HomePage.displayName = 'HomePage';

export default HomePage;
