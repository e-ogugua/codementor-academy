import { motion } from 'framer-motion';
import { ArrowRight, Bookmark, BookOpen, Clock } from 'lucide-react';
import React from 'react';
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
  isHighlighted = false,
}: TopicCardProps) {
  const difficultyColors = {
    Beginner: 'bg-green-500/20 text-green-400 border-green-500/30',
    Intermediate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    Advanced: 'bg-red-500/20 text-red-400 border-red-500/30',
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className={`bg-black/40 backdrop-blur-xl border rounded-2xl p-4 sm:p-5 md:p-6 h-full flex flex-col transition-all group min-h-[280px] focus-within:ring-2 focus-within:ring-cyber-cyan focus-within:ring-offset-2 ${
        isHighlighted
          ? 'border-cyber-cyan shadow-lg shadow-cyber-cyan/20 ring-2 ring-cyber-cyan/30'
          : 'border-purple-500/20 hover:border-purple-400/40'
      }`}
      role='article'
      aria-labelledby={`topic-${topic.id}-title`}
    >
      {/* Header */}
      <div className='flex items-start justify-between mb-3 sm:mb-4'>
        <div className='flex-1 min-w-0'>
          <div className='flex items-center gap-2 mb-2 flex-wrap'>
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium border ${difficultyColors[topic.difficulty]}`}
            >
              {topic.difficulty}
            </span>
            {topic.is_featured && (
              <span className='px-2 py-1 rounded-full text-xs font-medium bg-cyber-purple/20 text-cyber-purple border border-cyber-purple/30'>
                Featured
              </span>
            )}
          </div>
          <h3
            id={`topic-${topic.id}-title`}
            className='text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-cyber-cyan transition-colors leading-tight'
          >
            {topic.title}
          </h3>
          {/* Pricing */}
          <div className='flex items-center gap-2 mb-2'>
            <span className='text-xl sm:text-2xl font-bold text-neon-green'>
              {topic.price ?? '$39'}
            </span>
            {topic.originalPrice && (
              <span className='text-sm text-gray-400 line-through'>{topic.originalPrice}</span>
            )}
          </div>
        </div>
        <button
          onClick={() => onBookmark?.(topic.id)}
          onKeyDown={e => handleKeyDown(e, () => onBookmark?.(topic.id))}
          className={`p-2 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-cyber-cyan ${
            isBookmarked
              ? 'bg-cyber-purple/20 text-cyber-purple'
              : 'hover:bg-white/10 text-gray-400 hover:text-white'
          }`}
          aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          <Bookmark className='w-4 h-4' fill={isBookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Description */}
      <p className='text-gray-300 text-sm sm:text-base mb-3 sm:mb-4 line-clamp-2 leading-relaxed'>
        {topic.description}
      </p>

      {/* Tags */}
      <div className='flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4'>
        {topic.tags.slice(0, 3).map(tag => (
          <span
            key={tag}
            className='px-2 py-1 bg-white/5 text-cyber-cyan text-xs rounded-md border border-white/10'
          >
            {tag}
          </span>
        ))}
        {topic.tags.length > 3 && (
          <span className='px-2 py-1 bg-white/5 text-gray-400 text-xs rounded-md border border-white/10'>
            +{topic.tags.length - 3} more
          </span>
        )}
      </div>

      {/* Meta Info */}
      <div className='flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4'>
        <div className='flex items-center gap-1'>
          <Clock className='w-3 h-3 sm:w-4 sm:h-4' />
          <span>
            {Math.floor(topic.duration_estimate / 60)}h {topic.duration_estimate % 60}m
          </span>
        </div>
        <div className='flex items-center gap-1'>
          <BookOpen className='w-3 h-3 sm:w-4 sm:h-4' />
          <span>{topic.learning_outcomes.length} outcomes</span>
        </div>
      </div>

      {/* Progress Bar (if enrolled) */}
      {progress > 0 && (
        <div className='mb-3 sm:mb-4'>
          <div className='flex items-center justify-between text-xs sm:text-sm mb-2'>
            <span className='text-gray-400'>Progress</span>
            <span className='text-cyber-cyan font-medium'>{progress}%</span>
          </div>
          <div
            className='w-full bg-gray-700 rounded-full h-2'
            role='progressbar'
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className='bg-gradient-to-r from-cyber-purple to-cyber-cyan h-2 rounded-full transition-all duration-300'
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Action Button */}
      <div className='flex gap-2 mt-auto'>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onEnroll?.(topic.id)}
          onKeyDown={e => handleKeyDown(e, () => onEnroll?.(topic.id))}
          className='flex-1 bg-gradient-to-r from-neon-green to-cyber-cyan hover:from-neon-green/80 hover:to-cyber-cyan/80 text-black font-bold py-3 sm:py-4 px-3 sm:px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 min-h-[48px] text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-cyber-cyan focus:ring-offset-2'
        >
          <ArrowRight className='w-4 h-4' />
          <span>Enroll Now</span>
        </motion.button>
      </div>

      {/* Prerequisites (if any) */}
      {topic.prerequisites && topic.prerequisites.length > 0 && (
        <div className='mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/10'>
          <p className='text-xs text-gray-500 mb-2'>Prerequisites:</p>
          <div className='flex flex-wrap gap-1'>
            {topic.prerequisites.slice(0, 2).map(prereq => (
              <span
                key={prereq}
                className='px-2 py-1 bg-red-500/10 text-red-400 text-xs rounded border border-red-500/20'
              >
                {prereq}
              </span>
            ))}
            {topic.prerequisites.length > 2 && (
              <span className='px-2 py-1 bg-gray-500/10 text-gray-400 text-xs rounded border border-gray-500/20'>
                +{topic.prerequisites.length - 2} more
              </span>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
