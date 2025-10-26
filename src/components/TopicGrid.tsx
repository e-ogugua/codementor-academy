import { motion } from 'framer-motion';
import { TopicCard } from './TopicCard';
import type { Topic } from '../data/topics';

interface TopicGridProps {
  topics: Topic[];
  onEnroll?: (topicId: string) => void;
  onBookmark?: (topicId: string) => void;
  bookmarkedTopics?: string[];
  userProgress?: Record<string, number>;
  highlightedTopic?: string | null;
}

export function TopicGrid({
  topics,
  onEnroll,
  onBookmark,
  bookmarkedTopics = [],
  userProgress = {},
  highlightedTopic,
}: TopicGridProps) {
  if (topics.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='text-center py-8 sm:py-12'
      >
        <div className='text-gray-400 text-base sm:text-lg mb-2 sm:mb-4'>No topics found</div>
        <p className='text-gray-500 text-sm sm:text-base'>
          Try adjusting your filters or search terms
        </p>
      </motion.div>
    );
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
      {topics.map((topic, index) => (
        <motion.div
          key={topic.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div id={topic.slug}>
            <TopicCard
              key={topic.slug}
              topic={topic}
              onEnroll={onEnroll}
              onBookmark={onBookmark}
              isBookmarked={bookmarkedTopics.includes(topic.slug)}
              progress={userProgress[topic.slug]}
              isHighlighted={highlightedTopic === topic.slug}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
