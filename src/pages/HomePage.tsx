import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Play, MessageCircle, ChevronRight } from 'lucide-react';
import { TopicGrid } from '../components/TopicGrid';
import type { Topic } from '../types/Topic';
import { topicsData } from '../data/topics';

export function HomePage() {
  const [topics] = useState<Topic[]>(topicsData);
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

  const handleEnroll = (topicId: string) => {
    console.log('Enrolling in topic:', topicId);
    // TODO: Implement enrollment logic
  };

  const handleBookmark = (topicId: string) => {
    console.log('Bookmarking topic:', topicId);
    // TODO: Implement bookmark logic
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyber-purple/20 to-cyber-pink/20" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <Link to="/">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="p-4 bg-gradient-to-r from-cyber-purple to-cyber-pink rounded-2xl shadow-2xl cursor-pointer"
                whileHover={{ scale: 1.1 }}
              >
                <Brain className="w-8 h-8 text-white animate-pulse" />
              </motion.div>
            </Link>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyber-purple via-cyber-pink to-cyber-cyan bg-clip-text text-transparent font-cyber">
                CodeMentor Academy
              </h1>
              <p className="text-cyber-cyan font-medium">AI-Powered Learning Platform</p>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Master React development with AI-powered guidance, interactive tutorials, and real-world projects.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/courses">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-cyber-purple to-cyber-pink hover:from-dark-purple hover:to-hot-pink px-8 py-4 rounded-xl font-semibold text-white shadow-lg shadow-cyber-purple/25 transition-all duration-300 animate-cyber-glow flex items-center gap-2"
              >
                <Play className="w-5 h-5" />
                Start Learning
              </motion.button>
            </Link>
            <Link to="/chat">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-8 py-4 rounded-xl font-semibold text-white border border-white/20 transition-all duration-300 flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Chat with Alex
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Topics */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Featured Learning Paths</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Curated learning experiences designed to take you from beginner to expert.
            </p>
          </motion.div>

          <TopicGrid 
            topics={topics.filter(t => t.is_featured).slice(0, 6)}
            onEnroll={handleEnroll}
            onBookmark={handleBookmark}
            highlightedTopic={highlightedTopic}
          />

          <div className="text-center mt-8">
            <Link to="/courses">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-cyber-cyan to-cyber-blue hover:from-cyber-cyan/80 hover:to-cyber-blue/80 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center gap-2 mx-auto"
              >
                View All Courses
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
