import { motion } from 'framer-motion';
import { Filter, Search, SortAsc } from 'lucide-react';
import type { Topic } from '../data/topics';
import { topics } from '../data/topics';

interface TopicFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  selectedDifficulty: Topic['difficulty'] | 'All';
  onDifficultyChange: (difficulty: Topic['difficulty'] | 'All') => void;
  sortBy: 'relevance' | 'duration' | 'difficulty';
  onSortChange: (sort: 'relevance' | 'duration' | 'difficulty') => void;
}

export function TopicFilters({
  searchTerm,
  onSearchChange,
  selectedTags,
  onTagToggle,
  selectedDifficulty,
  onDifficultyChange,
  sortBy,
  onSortChange,
}: TopicFiltersProps) {
  const allTags = Array.from(new Set(topics.flatMap(topic => topic.tags)));
  const difficulties: (Topic['difficulty'] | 'All')[] = [
    'All',
    'Beginner',
    'Intermediate',
    'Advanced',
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className='bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 mb-8'
    >
      {/* Search Bar */}
      <div className='relative mb-6'>
        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
        <input
          type='text'
          placeholder='Search topics...'
          value={searchTerm}
          onChange={e => onSearchChange(e.target.value)}
          className='w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyber-cyan/50 focus:border-cyber-cyan/50 transition-all'
        />
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        {/* Tags Filter */}
        <div>
          <div className='flex items-center gap-2 mb-3'>
            <Filter className='w-4 h-4 text-cyber-cyan' />
            <h3 className='text-sm font-semibold text-white'>Tags</h3>
          </div>
          <div className='flex flex-wrap gap-2'>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => onTagToggle(tag)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                  selectedTags.includes(tag)
                    ? 'bg-cyber-cyan text-black'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Filter */}
        <div>
          <div className='flex items-center gap-2 mb-3'>
            <Filter className='w-4 h-4 text-cyber-purple' />
            <h3 className='text-sm font-semibold text-white'>Difficulty</h3>
          </div>
          <div className='flex flex-wrap gap-2'>
            {difficulties.map(difficulty => (
              <button
                key={difficulty}
                onClick={() => onDifficultyChange(difficulty)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                  selectedDifficulty === difficulty
                    ? 'bg-cyber-purple text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div>
          <div className='flex items-center gap-2 mb-3'>
            <SortAsc className='w-4 h-4 text-neon-green' />
            <h3 className='text-sm font-semibold text-white'>Sort By</h3>
          </div>
          <div className='flex flex-wrap gap-2'>
            {[
              { key: 'relevance', label: 'Most Relevant' },
              { key: 'duration', label: 'Duration' },
              { key: 'difficulty', label: 'Difficulty' },
            ].map(option => (
              <button
                key={option.key}
                onClick={() => onSortChange(option.key as 'relevance' | 'duration' | 'difficulty')}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                  sortBy === option.key
                    ? 'bg-neon-green text-black'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active Filters Summary */}
      {(selectedTags.length > 0 || selectedDifficulty !== 'All' || searchTerm) && (
        <div className='mt-4 pt-4 border-t border-white/10'>
          <div className='flex items-center gap-2 text-sm text-gray-400'>
            <span>Active filters:</span>
            {searchTerm && (
              <span className='px-2 py-1 bg-cyber-cyan/20 text-cyber-cyan rounded'>
                "{searchTerm}"
              </span>
            )}
            {selectedDifficulty !== 'All' && (
              <span className='px-2 py-1 bg-cyber-purple/20 text-cyber-purple rounded'>
                {selectedDifficulty}
              </span>
            )}
            {selectedTags.map(tag => (
              <span key={tag} className='px-2 py-1 bg-white/10 text-white rounded'>
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
