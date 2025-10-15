import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Brain,
  BookOpen,
  Play,
  Users,
  User,
  Search,
  Clock,
  Trophy
} from 'lucide-react';
import { PremiumModal } from './components/PremiumModal';
import { CodingPlayground } from './components/CodingPlayground';
import { CodingQuiz } from './components/CodingQuiz';
import { ProgressPage } from './pages/ProgressPage';
// Coming Soon Component
function ComingSoonModal({ isOpen, onClose, title, description }: { isOpen: boolean; onClose: () => void; title: string; description: string }) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-gray-900 rounded-2xl p-8 max-w-md w-full border border-cyber-purple/30"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4">🚧 {title}</h3>
          <p className="text-gray-300 mb-6">{description}</p>
          <motion.button
            onClick={onClose}
            className="bg-cyber-purple text-white px-4 py-2 rounded-lg"
            whileHover={{ scale: 1.05 }}
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Lesson Preview Component
function LessonPreview({ lesson }: { lesson: { id: string; title: string; level: string; duration: string; explanation: string; objectives: string[] } }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-white" />
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
          lesson.level === 'Beginner' ? 'bg-green-500/20 text-green-400' :
          lesson.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
          'bg-red-500/20 text-red-400'
        }`}>
          {lesson.level}
        </span>
      </div>
      <h4 className="text-xl font-bold text-white mb-2">{lesson.title}</h4>
      <p className="text-purple-200 text-sm mb-4 line-clamp-2">{lesson.explanation}</p>
      <div className="flex items-center justify-between text-sm text-purple-300">
        <span className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          {lesson.duration}
        </span>
        <span className="flex items-center">
          <Trophy className="w-4 h-4 mr-1" />
          {lesson.objectives.length} objectives
        </span>
      </div>
    </motion.div>
  );
}

// Search and Filter Component
function SearchAndFilter({ searchTerm, setSearchTerm, selectedCategory, setSelectedCategory, selectedLevel, setSelectedLevel }: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedLevel: string;
  setSelectedLevel: (level: string) => void;
}) {
  return (
    <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
          <input
            type="text"
            placeholder="Search lessons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-purple-500/30 rounded-xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-3 bg-gray-800/50 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400"
        >
          <option value="">All Categories</option>
          <option value="HTML">HTML</option>
          <option value="CSS">CSS</option>
          <option value="JavaScript">JavaScript</option>
          <option value="React">React</option>
          <option value="Node.js">Node.js</option>
          <option value="Python">Python</option>
        </select>
        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="px-4 py-3 bg-gray-800/50 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:border-purple-400"
        >
          <option value="">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>
    </div>
  );
}

function App() {
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [showCodingPlayground, setShowCodingPlayground] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [comingSoonTitle, setComingSoonTitle] = useState('');
  const [comingSoonDescription, setComingSoonDescription] = useState('');
  const [aiMessage, setAiMessage] = useState("Ready to tackle React hooks? Let's build something amazing together!");

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

  const handleComingSoon = (title: string, description: string) => {
    setComingSoonTitle(title);
    setComingSoonDescription(description);
    setShowComingSoon(true);
  };

  return (
    <Router>
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
                <Link to="/" className="text-cyber-cyan hover:text-neon-green transition-colors font-medium hover:animate-pulse">Home</Link>
                <Link to="/courses" className="text-cyber-cyan hover:text-neon-green transition-colors font-medium hover:animate-pulse">Courses</Link>
                <Link to="/progress" className="text-cyber-cyan hover:text-neon-green transition-colors font-medium hover:animate-pulse">Progress</Link>
                <Link to="/quiz" className="text-cyber-cyan hover:text-neon-green transition-colors font-medium hover:animate-pulse">Quiz</Link>
                <Link to="/community" className="text-cyber-cyan hover:text-neon-green transition-colors font-medium hover:animate-pulse">Community</Link>
                <button 
                  onClick={() => handleComingSoon('Premium Features', 'Unlock advanced lessons, 1-on-1 mentoring, and exclusive content with our premium subscription.')}
                  className="text-cyber-cyan hover:text-neon-green transition-colors font-medium hover:animate-pulse"
                >
                  Premium
                </button>
                <button 
                  onClick={() => handleComingSoon('Advanced Courses', 'Access expert-level courses on AI, machine learning, and advanced web development.')}
                  className="text-cyber-cyan hover:text-neon-green transition-colors font-medium hover:animate-pulse"
                >
                  Advanced
                </button>
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

        <Routes>
          <Route path="/" element={<HomePage handleAiChat={handleAiChat} aiMessage={aiMessage} />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/community" element={<CommunityPage />} />
        </Routes>

        <PremiumModal isOpen={showPremiumModal} onClose={() => setShowPremiumModal(false)} />
        <CodingPlayground isOpen={showCodingPlayground} onClose={() => setShowCodingPlayground(false)} />
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
    </Router>
  );
}

function HomePage({ handleAiChat, aiMessage }: { handleAiChat: () => void; aiMessage: string }) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-32 px-6 lg:px-8">
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
                onClick={() => handleAiChat()}
                className="px-12 py-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-3xl font-black text-2xl shadow-2xl"
              >
                <Play className="w-8 h-8 inline mr-4" />
                🎮 START CODING NOW
              </motion.button>
              <Link to="/courses">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-12 py-6 text-purple-200 border-4 border-purple-400/50 rounded-3xl hover:bg-purple-500/20 hover:border-purple-300 transition-all font-black text-2xl backdrop-blur-sm"
                >
                  <BookOpen className="w-8 h-8 inline mr-4" />
                  📚 EXPLORE COURSES
                </motion.button>
              </Link>
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
                      <span>0/20</span>
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
              2024 CodeMentor Academy. Empowering the next generation of developers.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  const filteredLessons = [
    { id: 'html-basics', title: 'HTML Basics: Building Your First Web Page', level: 'Beginner', duration: '25 min', explanation: 'HTML is the backbone of every web page. Learn the essential tags and structure to create your first webpage from scratch!', objectives: ['Understand HTML structure', 'Create semantic markup'] },
    { id: 'css-fundamentals', title: 'CSS Fundamentals: Styling Your Web Pages', level: 'Beginner', duration: '30 min', explanation: 'CSS brings life to your HTML! Learn how to style elements, create beautiful layouts, and make your webpages visually appealing.', objectives: ['Apply CSS selectors', 'Use colors and fonts'] },
    { id: 'js-variables', title: 'JavaScript Variables and Data Types', level: 'Beginner', duration: '20 min', explanation: 'Variables are the foundation of JavaScript programming. Learn how to store and manipulate data in your scripts.', objectives: ['Declare variables with var, let, const', 'Understand data types'] },
    { id: 'react-components', title: 'React Components: Building User Interfaces', level: 'Intermediate', duration: '35 min', explanation: 'React components are the building blocks of modern web apps. Learn how to create reusable UI elements with React.', objectives: ['Create functional components', 'Use JSX syntax'] },
    { id: 'python-loops', title: 'Python Loops and Control Flow', level: 'Beginner', duration: '25 min', explanation: 'Loops and conditionals are essential for controlling program flow in Python. Learn how to iterate and make decisions in your code.', objectives: ['Use for and while loops', 'Understand if/else statements'] }
  ].filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lesson.explanation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || lesson.level === selectedCategory;
    const matchesLevel = !selectedLevel || lesson.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="relative py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-5xl font-black text-white mb-6">🎯 LESSONS & COURSES</h3>
          <p className="text-xl text-purple-200">Explore our comprehensive coding curriculum</p>
        </div>

        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedLevel={selectedLevel}
          setSelectedLevel={setSelectedLevel}
        />

        <div className="mb-12">
          <h4 className="text-3xl font-bold text-white mb-8">📚 Available Lessons ({filteredLessons.length})</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <LessonPreview lesson={lesson} />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/30">
          <h4 className="text-3xl font-bold text-white mb-4">🚀 Featured Courses</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { id: 1, title: 'JavaScript Fundamentals', level: 'Beginner', students: 1250, rating: 4.8 },
              { id: 2, title: 'React Development', level: 'Intermediate', students: 890, rating: 4.9 },
              { id: 3, title: 'Node.js Backend', level: 'Advanced', students: 567, rating: 4.7 },
              { id: 4, title: 'Python for AI', level: 'Intermediate', students: 1100, rating: 4.8 }
            ].map((course, index) => (
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
                    className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                  >
                    Start Course
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function QuizPage() {
  return (
    <section className="relative py-24 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-5xl font-black text-white mb-6">🧠 CODING QUIZ</h3>
          <p className="text-xl text-purple-200">Test your knowledge with 20 coding questions</p>
        </div>
        <CodingQuiz />
      </div>
    </section>
  );
}

function CommunityPage() {
  return (
    <div className="relative py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-5xl font-black text-white mb-6">👥 COMMUNITY</h3>
          <p className="text-xl text-purple-200">Connect with fellow learners and share your journey</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Forums Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-4">💬 Discussion Forums</h4>
              <p className="text-purple-200 mb-6">Join discussions, ask questions, and share knowledge with the community.</p>
              <motion.button
                className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Coming Soon
              </motion.button>
            </div>
          </motion.div>

          {/* User Profiles Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-4">👤 User Profiles</h4>
              <p className="text-purple-200 mb-6">Showcase your progress, skills, and connect with other developers.</p>
              <motion.button
                className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-xl font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Coming Soon
              </motion.button>
            </div>
          </motion.div>

          {/* Leaderboards Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20"
          >
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-4">🏆 Leaderboards</h4>
              <p className="text-purple-200 mb-6">Compete with other learners and climb the rankings.</p>
              <motion.button
                className="w-full px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl font-bold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Coming Soon
              </motion.button>
            </div>
          </motion.div>
        </div>

        <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/30">
          <h4 className="text-3xl font-bold text-white mb-4">🚀 Upcoming Community Features</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-black/20 rounded-lg">
              <h5 className="text-lg font-semibold text-white mb-2">🎥 Live Coding Sessions</h5>
              <p className="text-gray-300">Join live coding sessions with expert mentors and peers.</p>
            </div>
            <div className="p-4 bg-black/20 rounded-lg">
              <h5 className="text-lg font-semibold text-white mb-2">🏆 Monthly Challenges</h5>
              <p className="text-gray-300">Participate in coding challenges and win exclusive badges.</p>
            </div>
            <div className="p-4 bg-black/20 rounded-lg">
              <h5 className="text-lg font-semibold text-white mb-2">🤝 Study Groups</h5>
              <p className="text-gray-300">Form study groups and collaborate on projects together.</p>
            </div>
            <div className="p-4 bg-black/20 rounded-lg">
              <h5 className="text-lg font-semibold text-white mb-2">📚 Resource Sharing</h5>
              <p className="text-gray-300">Share and discover useful learning resources and tutorials.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
