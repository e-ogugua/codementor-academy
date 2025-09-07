import { motion } from 'framer-motion';
import { Clock, Bookmark, BookOpen, ArrowRight } from 'lucide-react';
import type { Topic } from '../data/topics';

interface TopicCardProps {
  topic: Topic;
  onEnroll?: (topicId: string) => void;
  onBookmark?: (topicId: string) => void;
  isBookmarked?: boolean;
  progress?: number;
  isHighlighted?: boolean;
}

export function TopicCard({ 
  topic, 
  onEnroll, 
  onBookmark, 
  isBookmarked = false, 
  progress = 0,
  isHighlighted = false
}: TopicCardProps) {
  
  const difficultyColors = {
    'Beginner': 'bg-green-500/20 text-green-400 border-green-500/30',
    'Intermediate': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    'Advanced': 'bg-red-500/20 text-red-400 border-red-500/30'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={`bg-black/40 backdrop-blur-xl border rounded-2xl p-6 h-full flex flex-col transition-all group ${
        isHighlighted 
          ? 'border-cyber-cyan shadow-lg shadow-cyber-cyan/20 ring-2 ring-cyber-cyan/30' 
          : 'border-purple-500/20 hover:border-purple-400/40'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${difficultyColors[topic.difficulty]}`}>
              {topic.difficulty}
            </span>
            {topic.is_featured && (
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-cyber-purple/20 text-cyber-purple border border-cyber-purple/30">
                Featured
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyber-cyan transition-colors">
            {topic.title}
          </h3>
          {/* Pricing */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl font-bold text-neon-green">
              {topic.price || '$39'}
            </span>
            {topic.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {topic.originalPrice}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={() => onBookmark?.(topic.id)}
          className={`p-2 rounded-lg transition-colors ${
            isBookmarked 
              ? 'bg-cyber-purple/20 text-cyber-purple' 
              : 'hover:bg-white/10 text-gray-400 hover:text-white'
          }`}
        >
          <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm mb-4 line-clamp-2">
        {topic.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {topic.tags.map((tag) => (
          <span 
            key={tag}
            className="px-2 py-1 bg-white/5 text-cyber-cyan text-xs rounded-md border border-white/10"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Meta Info */}
      <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{Math.floor(topic.duration_estimate / 60)}h {topic.duration_estimate % 60}m</span>
        </div>
        <div className="flex items-center gap-1">
          <BookOpen className="w-4 h-4" />
          <span>{topic.learning_outcomes.length} outcomes</span>
        </div>
      </div>

      {/* Progress Bar (if enrolled) */}
      {progress > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-400">Progress</span>
            <span className="text-cyber-cyan font-medium">{progress}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-cyber-purple to-cyber-cyan h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Action Button */}
      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onEnroll?.(topic.id)}
          className="flex-1 bg-gradient-to-r from-neon-green to-cyber-cyan hover:from-neon-green/80 hover:to-cyber-cyan/80 text-black font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
        >
          <ArrowRight className="w-4 h-4" />
          📧 ENROLL NOW - {topic.price || '$39'}
        </motion.button>
      </div>

      {/* Prerequisites (if any) */}
      {topic.prerequisites && topic.prerequisites.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-xs text-gray-500 mb-2">Prerequisites:</p>
          <div className="flex flex-wrap gap-1">
            {topic.prerequisites.map((prereq) => (
              <span 
                key={prereq}
                className="px-2 py-1 bg-red-500/10 text-red-400 text-xs rounded border border-red-500/20"
              >
                {prereq}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
