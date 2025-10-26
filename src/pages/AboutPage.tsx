import { motion } from 'framer-motion';
import { BookOpen, Brain } from 'lucide-react';

export function AboutPage() {
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
            About CodeMentor Academy
          </h1>
          <p className='text-xl text-gray-300 max-w-3xl mx-auto'>
            Professional React education platform featuring AI-powered mentorship and practical
            learning experiences.
          </p>
        </motion.div>

        <div className='grid md:grid-cols-2 gap-12 mb-16'>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10'
          >
            <Brain className='w-12 h-12 text-cyber-purple mb-6' />
            <h3 className='text-2xl font-bold text-white mb-4'>AI-Powered Learning</h3>
            <p className='text-gray-300 leading-relaxed'>
              Our AI mentor provides personalized guidance, answers questions in real-time, and
              adapts to your learning style for maximum effectiveness.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className='bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10'
          >
            <BookOpen className='w-12 h-12 text-cyber-pink mb-6' />
            <h3 className='text-2xl font-bold text-white mb-4'>Hands-On Projects</h3>
            <p className='text-gray-300 leading-relaxed'>
              Learn by building real applications. Each course includes practical projects that you
              can add to your portfolio.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className='text-center'
        >
          <h2 className='text-3xl font-bold text-white mb-8'>Our Mission</h2>
          <p className='text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto'>
            To provide accessible, high-quality React education through AI technology and proven
            teaching methods. We believe everyone should have access to professional programming
            education, regardless of their background or location.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default AboutPage;
