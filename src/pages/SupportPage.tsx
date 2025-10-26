import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HelpCircle, MessageCircle } from 'lucide-react';

export function SupportPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-16 px-6'>
      <div className='max-w-4xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          <h1 className='text-4xl font-bold bg-gradient-to-r from-cyber-purple via-cyber-pink to-cyber-cyan bg-clip-text text-transparent mb-6'>
            Get Support
          </h1>
          <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
            Need help? We're here to support your learning journey every step of the way.
          </p>
        </motion.div>

        <div className='grid md:grid-cols-2 gap-8 mb-16'>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10'
          >
            <MessageCircle className='w-12 h-12 text-cyber-purple mb-6' />
            <h3 className='text-2xl font-bold text-white mb-4'>Live Chat Support</h3>
            <p className='text-gray-300 mb-6'>
              Get instant help from our support team or chat with Alex, your AI mentor.
            </p>
            <Link to='/chat'>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className='bg-gradient-to-r from-cyber-purple to-cyber-pink px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300'
              >
                Start Chat
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10'
          >
            <HelpCircle className='w-12 h-12 text-cyber-pink mb-6' />
            <h3 className='text-2xl font-bold text-white mb-4'>FAQ & Documentation</h3>
            <p className='text-gray-300 mb-6'>
              Browse our comprehensive documentation and frequently asked questions.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl font-semibold text-white border border-white/20 transition-all duration-300'
            >
              View Docs
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default SupportPage;
