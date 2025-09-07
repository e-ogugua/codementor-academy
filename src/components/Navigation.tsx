import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, BookOpen, Users, MessageCircle, HelpCircle, User, Settings, Home, Info } from 'lucide-react';

export function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/courses', label: 'Courses', icon: BookOpen },
    { path: '/community', label: 'Community', icon: Users },
    { path: '/chat', label: 'AI Mentor', icon: MessageCircle },
    { path: '/about', label: 'About', icon: Info },
    { path: '/support', label: 'Support', icon: HelpCircle },
  ];

  return (
    <nav className="bg-black/20 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="p-2 bg-gradient-to-r from-cyber-purple to-cyber-pink rounded-lg"
            >
              <Brain className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyber-purple to-cyber-pink bg-clip-text text-transparent font-cyber">
              CodeMentor Academy
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            {navItems.slice(1).map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`transition-colors flex items-center gap-2 ${
                    isActive 
                      ? 'text-cyber-purple' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <User className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
