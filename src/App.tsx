import { motion } from 'framer-motion'
import { 
  Play, 
  BookOpen, 
  Users, 
  Code, 
  Zap, 
  Star,
  Brain,
  Trophy,
  Rocket,
  Target,
  Sparkles
} from 'lucide-react';

function App() {

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
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 via-pink-500 to-cyan-400 rounded-3xl flex items-center justify-center shadow-2xl">
                  <Brain className="w-9 h-9 text-white" />
                </div>
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
                >
                  <Zap className="w-3 h-3 text-white" />
                </motion.div>
              </motion.div>
              <div>
                <h1 className="text-3xl font-black bg-gradient-to-r from-purple-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent">
                  CodeMentor Academy
                </h1>
                <p className="text-purple-200 font-bold tracking-wide flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI-Powered Learning Revolution
                </p>
              </div>
            </div>
            <nav className="hidden lg:flex items-center space-x-10">
              {['🎯 Courses', '🧠 AI Mentors', '👥 Community', '🏆 Challenges'].map((item, index) => (
                <motion.a 
                  key={index}
                  href="#" 
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="text-purple-200 hover:text-white font-bold transition-all relative group"
                >
                  {item}
                  <span className="absolute -bottom-2 left-0 w-0 h-1 bg-gradient-to-r from-purple-400 to-pink-400 transition-all group-hover:w-full rounded-full"></span>
                </motion.a>
              ))}
            </nav>
            <div className="flex items-center space-x-4">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 text-purple-200 border-2 border-purple-400/50 rounded-2xl hover:bg-purple-500/20 hover:border-purple-300 transition-all font-bold backdrop-blur-sm"
              >
                Sign In
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{ boxShadow: ['0 0 20px rgba(168, 85, 247, 0.4)', '0 0 40px rgba(168, 85, 247, 0.6)', '0 0 20px rgba(168, 85, 247, 0.4)'] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white rounded-2xl font-bold shadow-lg"
              >
                <Rocket className="w-5 h-5 inline mr-2" />
                Start Learning
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-32 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.h2 
              className="text-8xl font-black mb-12 leading-tight"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{
                backgroundImage: 'linear-gradient(45deg, #a855f7, #ec4899, #06b6d4, #a855f7)',
                backgroundSize: '300% 300%',
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
                className="px-12 py-6 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white rounded-3xl font-black text-2xl shadow-2xl"
              >
                <Play className="w-8 h-8 inline mr-4" />
                🎮 START CODING NOW
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
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
                  <p className="text-purple-200 mb-6">"Ready to tackle React hooks? Let's build something amazing together!"</p>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold"
                  >
                    💬 Chat Now
                  </motion.button>
                </div>
              </motion.div>

              {/* Progress */}
              <motion.div 
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-2xl p-8 border border-cyan-400/30 backdrop-blur-sm"
              >
                <h4 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Target className="w-6 h-6 mr-2 text-cyan-400" />
                  📊 Your Progress
                </h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-cyan-200 mb-2">
                      <span>JavaScript Mastery</span>
                      <span>87%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '87%' }}
                        transition={{ duration: 2, delay: 1 }}
                        className="bg-gradient-to-r from-cyan-400 to-blue-500 h-3 rounded-full"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-cyan-200 mb-2">
                      <span>React Development</span>
                      <span>64%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '64%' }}
                        transition={{ duration: 2, delay: 1.5 }}
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
                  <Trophy className="w-6 h-6 mr-2 text-yellow-400" />
                  🏆 Achievements
                </h4>
                <div className="space-y-4">
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-3"
                  >
                    <Trophy className="w-8 h-8 text-yellow-400" />
                    <div>
                      <p className="text-white font-bold">Code Ninja</p>
                      <p className="text-yellow-200 text-sm">100 challenges completed</p>
                    </div>
                  </motion.div>
                  <motion.div 
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-3"
                  >
                    <Star className="w-8 h-8 text-yellow-400" />
                    <div>
                      <p className="text-white font-bold">React Master</p>
                      <p className="text-yellow-200 text-sm">Built 5 projects</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Courses Preview */}
      <section className="relative py-24 px-6 lg:px-8">
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
                    <Code className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">{course.title}</h4>
                  <p className="text-purple-200 text-sm mb-4">{course.level}</p>
                  <div className="flex items-center justify-between text-sm text-purple-300 mb-4">
                    <span className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {course.students}
                    </span>
                    <span className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-400" />
                      {course.rating}
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
    </div>
  );
}

export default App;
