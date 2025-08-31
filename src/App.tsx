import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Play, 
  BookOpen, 
  Users, 
  Code, 
  Zap, 
  Star,
  ChevronRight,
  Brain,
  Trophy
} from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('courses');

  const courses = [
    { id: 1, title: 'JavaScript Fundamentals', level: 'Beginner', students: 1250, rating: 4.8, progress: 0 },
    { id: 2, title: 'React Development', level: 'Intermediate', students: 890, rating: 4.9, progress: 0 },
    { id: 3, title: 'Node.js Backend', level: 'Advanced', students: 567, rating: 4.7, progress: 0 },
    { id: 4, title: 'Python for AI', level: 'Intermediate', students: 1100, rating: 4.8, progress: 0 }
  ];

  const features = [
    { icon: Brain, title: 'AI-Powered Learning', desc: 'Personalized learning paths with AI mentoring' },
    { icon: Code, title: 'Interactive Coding', desc: 'Real-time code execution and feedback' },
    { icon: Users, title: 'Community Support', desc: 'Connect with fellow developers worldwide' },
    { icon: Trophy, title: 'Certifications', desc: 'Industry-recognized certificates' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-xl border-b border-indigo-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <Zap className="w-2.5 h-2.5 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  CodeMentor Academy
                </h1>
                <p className="text-sm text-gray-600 font-medium">AI-Powered Learning Platform</p>
              </div>
            </div>
            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-indigo-600 font-semibold transition-colors relative group">
                Courses
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
              </a>
              <a href="#" className="text-gray-700 hover:text-indigo-600 font-semibold transition-colors relative group">
                AI Mentors
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
              </a>
              <a href="#" className="text-gray-700 hover:text-indigo-600 font-semibold transition-colors relative group">
                Community
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
              </a>
              <a href="#" className="text-gray-700 hover:text-indigo-600 font-semibold transition-colors relative group">
                Pricing
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all group-hover:w-full"></span>
              </a>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="px-6 py-2.5 text-indigo-600 border-2 border-indigo-200 rounded-xl hover:bg-indigo-50 hover:border-indigo-300 transition-all font-semibold">
                Sign In
              </button>
              <button className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all font-semibold shadow-md">
                Start Learning
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-10 blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left"
            >
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 border border-indigo-200 rounded-full text-indigo-700 text-sm font-semibold mb-8">
                <Brain className="w-4 h-4 mr-2" />
                AI-Powered Learning Revolution
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-tight">
                Master Coding with
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent block mt-2">
                  AI Mentorship
                </span>
              </h1>
              <p className="text-xl text-gray-700 mb-10 leading-relaxed font-medium">
                Transform your programming journey with personalized AI mentoring, real-time code feedback, 
                and interactive challenges. Join thousands of developers building their dream careers.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 mb-12">
                <button className="group px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-xl">
                  <span className="flex items-center justify-center">
                    Start Learning Free
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
                <button className="px-8 py-4 border-2 border-indigo-300 text-indigo-700 rounded-2xl font-bold text-lg hover:bg-indigo-50 hover:border-indigo-400 transition-all flex items-center justify-center">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-black text-indigo-600">50K+</div>
                  <div className="text-gray-600 font-semibold">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-purple-600">95%</div>
                  <div className="text-gray-600 font-semibold">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-cyan-600">24/7</div>
                  <div className="text-gray-600 font-semibold">AI Support</div>
                </div>
              </div>
            </motion.div>

            {/* Right Visual - Interactive Learning Dashboard */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Main Dashboard */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg"></div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">Learning Dashboard</div>
                      <div className="text-xs text-gray-500">JavaScript Mastery</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-xs text-gray-500 font-medium">AI Mentor Online</span>
                  </div>
                </div>

                {/* Progress Section */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Course Progress</span>
                    <span className="text-sm font-bold text-indigo-600">78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full w-3/4"></div>
                  </div>
                </div>

                {/* Code Editor Mockup */}
                <div className="bg-gray-900 rounded-xl p-4 mb-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="text-purple-400">function <span className="text-blue-400">calculateSum</span>() {'{'}</div>
                    <div className="text-gray-300 ml-4">return <span className="text-green-400">a + b</span>;</div>
                    <div className="text-purple-400">{'}'}</div>
                  </div>
                </div>

                {/* AI Feedback */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 border border-indigo-100">
                  <div className="flex items-center space-x-2 mb-2">
                    <Brain className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm font-semibold text-indigo-700">AI Mentor Feedback</span>
                  </div>
                  <p className="text-sm text-gray-700">Great work! Consider adding parameter validation for better code quality.</p>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-6 -right-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-4 shadow-xl"
              >
                <Trophy className="w-6 h-6 text-white" />
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-6 -left-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl p-4 shadow-xl"
              >
                <Code className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold text-white text-center mb-12">Why Choose CodeMentor Academy?</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all"
              >
                <feature.icon className="w-12 h-12 text-blue-400 mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">{feature.title}</h4>
                <p className="text-slate-300">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Tabs */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="bg-slate-800/50 rounded-lg p-1 backdrop-blur-sm border border-slate-700/50">
              {['courses', 'mentoring', 'community'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-md text-sm font-medium transition-all capitalize ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'courses' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {courses.map((course) => (
                <div key={course.id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      course.level === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                      course.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {course.level}
                    </span>
                    <div className="flex items-center text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm ml-1">{course.rating}</span>
                    </div>
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {course.title}
                  </h4>
                  <p className="text-slate-300 text-sm mb-4">{course.students.toLocaleString()} students</p>
                  <button className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors flex items-center justify-center">
                    Start Course
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </button>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'mentoring' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Zap className="w-16 h-16 text-blue-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">AI-Powered Mentoring</h3>
              <p className="text-slate-300 max-w-2xl mx-auto mb-8">
                Get personalized guidance from our AI mentor that adapts to your learning style and provides 
                real-time feedback on your code and progress.
              </p>
              <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all">
                Try AI Mentor
              </button>
            </motion.div>
          )}

          {activeTab === 'community' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Users className="w-16 h-16 text-blue-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">Global Developer Community</h3>
              <p className="text-slate-300 max-w-2xl mx-auto mb-8">
                Connect with developers worldwide, share projects, get help, and collaborate on exciting challenges.
                Build your network while you build your skills.
              </p>
              <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all">
                Join Community
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">50K+</div>
              <div className="text-slate-300">Active Learners</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">200+</div>
              <div className="text-slate-300">Courses</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">95%</div>
              <div className="text-slate-300">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">24/7</div>
              <div className="text-slate-300">AI Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">CodeMentor Academy</span>
          </div>
          <p className="text-slate-400 mb-6">Empowering the next generation of developers with AI-powered education</p>
          <div className="flex justify-center space-x-6 text-slate-400">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
