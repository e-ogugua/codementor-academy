import { useState } from 'react';
import { motion } from 'framer-motion'
import { 
  Brain, 
  BookOpen, 
  Play, 
  Users, 
  User
} from 'lucide-react';
import { PremiumModal } from './components/PremiumModal';
import { CodingPlayground } from './components/CodingPlayground';

function App() {
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showCodingPlayground, setShowCodingPlayground] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [aiMessage, setAiMessage] = useState("Ready to tackle React hooks? Let's build something amazing together!");

  // Contextual AI responses based on progress
  const handleAiChat = () => {
    const progress = Math.floor(Math.random() * 15); // Simulate progress
    if (progress < 3) {
      setAiMessage("Great start! You're building a strong foundation. Let's dive into variables and functions next!");
    } else if (progress < 8) {
      setAiMessage("You're making excellent progress! Ready to explore React components and state management?");
    } else {
      setAiMessage("Amazing work! You're ready for advanced topics. Consider upgrading to Premium for 1-on-1 mentoring!");
    }
    setShowChatModal(true);
  };

  const courses = [
    { id: 1, title: 'JavaScript Fundamentals', level: 'Beginner', students: 1250, rating: 4.8, progress: 0 },
    { id: 2, title: 'React Development', level: 'Intermediate', students: 890, rating: 4.9, progress: 0 },
    { id: 3, title: 'Node.js Backend', level: 'Advanced', students: 567, rating: 4.7, progress: 0 },
    { id: 4, title: 'Python for AI', level: 'Intermediate', students: 1100, rating: 4.8, progress: 0 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
        <motion.div
          animate={{
            x: [0, -150, 0],
            y: [0, 100, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, -80, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
      </div>

      {/* Header */}
      <header className="relative z-50 bg-black/10 backdrop-blur-2xl border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            <div className="flex items-center space-x-6">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="relative"
              >
                <Brain className="w-8 h-8 text-white animate-pulse" />
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyber-purple via-cyber-pink to-cyber-cyan bg-clip-text text-transparent font-cyber">
                  CodeMentor Academy
                </h1>
                <p className="text-cyber-cyan font-medium">AI-Powered Learning Platform</p>
              </div>
            </div>
            <nav className="hidden lg:flex items-center space-x-10">
              <a href="#home" className="text-cyber-cyan hover:text-neon-green transition-colors font-medium hover:animate-pulse">Home</a>
              <a href="#courses" className="text-cyber-cyan hover:text-neon-green transition-colors font-medium hover:animate-pulse">Courses</a>
              <a href="#progress" className="text-cyber-cyan hover:text-neon-green transition-colors font-medium hover:animate-pulse">Progress</a>
              <a href="#community" className="text-cyber-cyan hover:text-neon-green transition-colors font-medium hover:animate-pulse">Community</a>
            </nav>
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowPremiumModal(true)}
                className="bg-gradient-to-r from-cyber-purple to-cyber-pink hover:from-dark-purple hover:to-hot-pink px-6 py-3 rounded-xl font-semibold text-white shadow-lg shadow-cyber-purple/25 transition-all duration-300 animate-cyber-glow"
              >
                Get Started
              </motion.button>
              <User className="w-10 h-10 text-cyber-cyan hover:text-neon-green cursor-pointer transition-colors animate-float" />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h2
              className="text-8xl font-black mb-12 leading-tight tracking-tight"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{
                backgroundImage: 'linear-gradient(45deg, #a855f7, #ec4899, #06b6d4, #10b981, #a855f7)',
                backgroundSize: '400% 400%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              🚀 FUTURE OF<br />
              CODING EDUCATION
            </motion.h2>
            <p className="text-2xl text-purple-200 mb-16 leading-relaxed max-w-4xl mx-auto font-semibold">
              🤖 Revolutionary AI mentors • 🎯 Personalized learning paths • 🏆 Real-world projects • 👥 Global developer community
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                onClick={() => setShowCodingPlayground(true)}
                className="px-12 py-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-3xl font-black text-2xl shadow-2xl"
              >
                <Play className="w-8 h-8 inline mr-4" />
                🎮 START CODING NOW
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/courses'}
                className="px-12 py-6 text-purple-200 border-4 border-purple-400/50 rounded-3xl hover:bg-purple-500/20 hover:border-purple-300 transition-all font-black text-2xl backdrop-blur-sm"
              >
                <BookOpen className="w-8 h-8 inline mr-4" />
                📚 EXPLORE COURSES
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Dashboard Mockup */}
      <section className="relative py-24 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="bg-black/30 backdrop-blur-2xl rounded-3xl p-12 border border-purple-500/30 shadow-2xl"
          >
            <div className="text-center mb-12">
              <h3 className="text-4xl font-black text-white mb-4 flex items-center justify-center">
                <Brain className="w-10 h-10 mr-4 text-purple-400" />
                🧠 AI LEARNING DASHBOARD
              </h3>
              <p className="text-purple-200 text-xl">Experience the future of personalized coding education</p>
            </div>

            {/* Mock Dashboard */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* AI Mentor */}
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl p-8 border border-purple-400/30 backdrop-blur-sm"
              >
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <Brain className="w-10 h-10 text-white" />
                  </motion.div>
                  <h4 className="text-2xl font-bold text-white mb-4">🤖 AI Mentor: Alex</h4>
                  <p className="text-purple-200 mb-6">"{aiMessage}"</p>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAiChat}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold"
                  >
                    💬 Chat Now
                  </motion.button>
                </div>
              </motion.div>

              {/* Progress & Stats */}
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-2xl p-8 border border-cyan-400/30 backdrop-blur-sm"
              >
                <h4 className="text-2xl font-bold text-white mb-6 flex items-center">
                  📊 Your Progress
                </h4>
                <div className="space-y-4">
                  {/* Lessons Completed */}
                  <div>
                    <div className="flex justify-between text-cyan-200 mb-2">
                      <span>Lessons Completed</span>
                      <span>0/15</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `0%` }}
                        transition={{ duration: 2, delay: 1 }}
                        className="bg-gradient-to-r from-cyan-400 to-blue-500 h-3 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Achievements */}
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 rounded-2xl p-8 border border-yellow-400/30 backdrop-blur-sm"
              >
                <h4 className="text-2xl font-bold text-white mb-6 flex items-center">
                  🏆 Achievements
                </h4>
                <div className="space-y-4">
                  <p className="text-gray-400">Complete lessons to earn badges!</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Courses Preview */}
      <section id="courses" className="relative py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-black text-white mb-6">🎯 TRENDING COURSES</h3>
            <p className="text-xl text-purple-200">Master the skills that matter in 2024</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{course.title}</h4>
                  <p className="text-purple-200 text-sm mb-4">{course.level}</p>
                  <div className="flex items-center justify-between text-sm text-purple-300 mb-4">
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {course.students}
                    </span>
                    <span className="flex items-center">
                      ⭐ {course.rating}
                    </span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = '/courses'}
                    className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                  >
                    Start Course
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <section id="progress" className="relative py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h3 className="text-5xl font-black text-white mb-6">📊 TRACK YOUR PROGRESS</h3>
            <p className="text-xl text-purple-200 mb-8">See how far you've come and what's next</p>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/progress'}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-2xl font-black text-xl shadow-xl"
            >
              View My Progress
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="relative py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <h3 className="text-5xl font-black text-white mb-6">👥 JOIN THE COMMUNITY</h3>
            <p className="text-xl text-purple-200 mb-8">Connect with fellow learners and share your journey</p>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/community'}
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl font-black text-xl shadow-xl"
            >
              Explore Community
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-black/20 backdrop-blur-xl border-t border-purple-500/20 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                CodeMentor Academy
              </span>
            </div>
            <p className="text-purple-200 mb-4">
              🚀 Revolutionizing coding education with AI-powered mentorship
            </p>
            <p className="text-purple-300 text-sm">
              © 2024 CodeMentor Academy. Empowering the next generation of developers.
            </p>
          </div>
        </div>
      </footer>
      <PremiumModal isOpen={showPremiumModal} onClose={() => setShowPremiumModal(false)} />
      <CodingPlayground isOpen={showCodingPlayground} onClose={() => setShowCodingPlayground(false)} />
      {/* Simple Chat Modal */}
      {showChatModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowChatModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-gray-900 rounded-2xl p-8 max-w-md w-full border border-cyber-purple/30"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-4">🤖 AI Mentor Chat</h3>
              <p className="text-gray-300 mb-6">"{aiMessage}"</p>
              <motion.button
                onClick={() => setShowChatModal(false)}
                className="bg-cyber-purple text-white px-4 py-2 rounded-lg"
                whileHover={{ scale: 1.05 }}
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

export default App;
