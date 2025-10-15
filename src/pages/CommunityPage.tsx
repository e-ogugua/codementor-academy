import { motion } from 'framer-motion';
import { MessageCircle, ThumbsUp, Eye, Star, Users, Award } from 'lucide-react';

export function CommunityPage() {
  const discussions = [
    {
      id: 1,
      title: 'Best practices for React state management?',
      author: 'Sarah Dev',
      avatar: '💻',
      replies: 23,
      views: 156,
      likes: 12,
      time: '2 hours ago'
    },
    {
      id: 2,
      title: 'Stuck on async/await in JavaScript - help!',
      author: 'Mike Learner',
      avatar: '🔧',
      replies: 15,
      views: 89,
      likes: 8,
      time: '4 hours ago'
    },
    {
      id: 3,
      title: 'CSS Grid vs Flexbox for layouts?',
      author: 'Emma Stylist',
      avatar: '🎨',
      replies: 31,
      views: 203,
      likes: 19,
      time: '6 hours ago'
    },
    {
      id: 4,
      title: 'How to debug React hooks effectively?',
      author: 'Alex Coder',
      avatar: '🚀',
      replies: 18,
      views: 134,
      likes: 14,
      time: '8 hours ago'
    },
    {
      id: 5,
      title: 'Python decorators for beginners?',
      author: 'Jamie Python',
      avatar: '🐍',
      replies: 12,
      views: 98,
      likes: 9,
      time: '10 hours ago'
    },
    {
      id: 6,
      title: 'Node.js vs Django for backend?',
      author: 'Chris Backend',
      avatar: '⚙️',
      replies: 27,
      views: 187,
      likes: 21,
      time: '12 hours ago'
    },
    {
      id: 7,
      title: 'HTML5 semantic elements confusion',
      author: 'Riley HTML',
      avatar: '📄',
      replies: 14,
      views: 76,
      likes: 7,
      time: '14 hours ago'
    },
    {
      id: 8,
      title: 'Tailwind CSS responsive design tips',
      author: 'Morgan CSS',
      avatar: '🎨',
      replies: 22,
      views: 145,
      likes: 16,
      time: '16 hours ago'
    },
    {
      id: 9,
      title: 'JavaScript closures explained',
      author: 'Taylor JS',
      avatar: '📜',
      replies: 19,
      views: 112,
      likes: 11,
      time: '18 hours ago'
    },
    {
      id: 10,
      title: 'React Context API vs Redux?',
      author: 'Jordan React',
      avatar: '⚛️',
      replies: 25,
      views: 178,
      likes: 20,
      time: '20 hours ago'
    }
  ];

  const testimonials = [
    {
      name: 'Alex Johnson',
      role: 'Frontend Developer',
      avatar: '🚀',
      quote: 'CodeMentor Academy transformed my coding journey. The AI mentor helped me understand React hooks in a way no tutorial could!',
      rating: 5
    },
    {
      name: 'Sarah Chen',
      role: 'Full-Stack Engineer',
      avatar: '💻',
      quote: 'The lessons are bite-sized and practical. I went from zero to building my first app in weeks. Highly recommend!',
      rating: 5
    },
    {
      name: 'Michael Torres',
      role: 'Junior Developer',
      avatar: '🔧',
      quote: 'The community support is amazing. Always someone ready to help with debugging or career advice.',
      rating: 5
    },
    {
      name: 'Emily Davis',
      role: 'UX Designer & Coder',
      avatar: '🎨',
      quote: 'The resources section is a goldmine! Found everything I needed for my portfolio project.',
      rating: 5
    },
    {
      name: 'David Wilson',
      role: 'Backend Developer',
      avatar: '⚙️',
      quote: 'Node.js lessons were spot on. Finally understood middleware and APIs. Great for beginners!',
      rating: 5
    },
    {
      name: 'Lisa Park',
      role: 'Data Scientist',
      avatar: '📊',
      quote: 'Python tutorials are excellent. The challenges really helped me grasp loops and functions.',
      rating: 5
    },
    {
      name: 'Kevin Brown',
      role: 'Freelance Developer',
      avatar: '💼',
      quote: 'Progress tracking keeps me motivated. Badges and streaks make learning addictive!',
      rating: 5
    },
    {
      name: 'Rachel Green',
      role: 'Startup CTO',
      avatar: '🏢',
      quote: 'Premium features are worth every penny. The advanced lessons took my skills to the next level.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            <span className="text-cyber-purple">Community</span> Hub
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Connect with fellow learners, share knowledge, and grow together in our vibrant developer community.
          </p>
        </motion.div>

        {/* Discussions Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <MessageCircle className="w-8 h-8 text-cyber-purple" />
            Latest Discussions
          </h2>
          <div className="grid gap-6">
            {discussions.map((discussion, index) => (
              <motion.div
                key={discussion.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">{discussion.avatar}</div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">{discussion.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>by {discussion.author}</span>
                        <span>{discussion.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {discussion.replies}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {discussion.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      {discussion.likes}
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <motion.button
                    onClick={() => alert(`Joining discussion: ${discussion.title}`)}
                    className="bg-cyber-purple hover:bg-cyber-purple/80 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Join Discussion
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <motion.button
              onClick={() => alert('Viewing all discussions...')}
              className="bg-gradient-to-r from-cyber-purple to-cyber-pink text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Discussions
            </motion.button>
          </div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <Star className="w-8 h-8 text-yellow-400" />
            What Our Students Say
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{testimonial.avatar}</span>
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">"{testimonial.quote}"</p>
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center">
            <Users className="w-16 h-16 text-cyber-purple mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">5,000+</h3>
            <p className="text-gray-300">Active Learners</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center">
            <MessageCircle className="w-16 h-16 text-cyber-pink mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">24/7</h3>
            <p className="text-gray-300">Community Support</p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 text-center">
            <Award className="w-16 h-16 text-cyber-cyan mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">1,200+</h3>
            <p className="text-gray-300">Projects Completed</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
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
