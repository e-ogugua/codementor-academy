import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Code, Users, Trophy, Play, ChevronRight, Star, Zap, Brain } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 backdrop-blur-sm bg-slate-900/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">CodeMentor Academy</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-slate-300 hover:text-white transition-colors">Courses</a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">Mentoring</a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">Community</a>
              <a href="#" className="text-slate-300 hover:text-white transition-colors">Pricing</a>
            </nav>
            <div className="flex space-x-4">
              <button className="px-4 py-2 text-slate-300 hover:text-white transition-colors">Sign In</button>
              <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all">
                Start Learning
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Master Coding with
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"> AI Guidance</span>
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Learn programming through interactive challenges, AI-powered mentoring, and real-world projects. 
              Join thousands of developers advancing their careers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all flex items-center justify-center">
                <Play className="w-5 h-5 mr-2" />
                Start Free Trial
              </button>
              <button className="px-8 py-4 border border-slate-600 text-white rounded-lg text-lg font-semibold hover:bg-slate-800 transition-all">
                View Courses
              </button>
            </div>
          </motion.div>
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
