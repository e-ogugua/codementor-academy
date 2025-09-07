import { motion } from 'framer-motion';
import { Users, MessageCircle, Award } from 'lucide-react';

export function CommunityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyber-purple via-cyber-pink to-cyber-cyan bg-clip-text text-transparent mb-6">
            Join Our Community
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Connect with fellow developers, share your progress, and learn together in our supportive community.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center"
          >
            <Users className="w-16 h-16 text-cyber-purple mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">5,000+</h3>
            <p className="text-gray-300">Active Learners</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center"
          >
            <MessageCircle className="w-16 h-16 text-cyber-pink mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">24/7</h3>
            <p className="text-gray-300">Community Support</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center"
          >
            <Award className="w-16 h-16 text-cyber-cyan mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">1,200+</h3>
            <p className="text-gray-300">Projects Completed</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-8">Get Involved</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-cyber-purple to-cyber-pink hover:from-dark-purple hover:to-hot-pink px-8 py-4 rounded-xl font-semibold text-white shadow-lg transition-all duration-300"
            >
              Join Discord
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-8 py-4 rounded-xl font-semibold text-white border border-white/20 transition-all duration-300"
            >
              Follow on GitHub
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default CommunityPage;
