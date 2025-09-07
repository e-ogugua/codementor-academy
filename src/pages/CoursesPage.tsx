import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TopicFilters } from '../components/TopicFilters';
import { TopicGrid } from '../components/TopicGrid';
import type { Topic } from '../types/Topic';
import { topics } from '../data/topics';

export function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<Topic['difficulty'] | 'All'>('All');
  const [sortBy, setSortBy] = useState<'relevance' | 'duration' | 'difficulty'>('relevance');
  const [highlightedTopic, setHighlightedTopic] = useState<string | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setHighlightedTopic(hash);
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 500);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Filter and sort topics
  const filteredTopics = useMemo(() => {
    let filtered = topics.filter(topic => {
      const matchesSearch = searchTerm === '' || 
        topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        topic.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => topic.tags.includes(tag));
      
      const matchesDifficulty = selectedDifficulty === 'All' || topic.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesTags && matchesDifficulty;
    });

    // Sort topics
    if (sortBy === 'duration') {
      filtered.sort((a, b) => a.duration_estimate - b.duration_estimate);
    } else if (sortBy === 'difficulty') {
      const difficultyOrder = { Beginner: 1, Intermediate: 2, Advanced: 3 };
      filtered.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
    }

    return filtered;
  }, [searchTerm, selectedTags, selectedDifficulty, sortBy]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleEnroll = (topicId: string) => {
    const topic = topics.find(t => t.id === topicId);
    if (topic) {
      const subject = `Enrollment Request - ${topic.title}`;
      const body = `Hi Emmanuel,

I would like to enroll in the following course:

Course: ${topic.title}
Difficulty: ${topic.difficulty}
Duration: ${Math.floor(topic.duration_estimate / 60)}h ${topic.duration_estimate % 60}m

Please send me the enrollment details and payment information.

Best regards`;
      
      window.open(`mailto:e.ogugua.dev@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
    }
  };

  const handleBookmark = (topicId: string) => {
    const topic = topics.find(t => t.id === topicId);
    if (topic) {
      const subject = `Course Bookmark - ${topic.title}`;
      const body = `Hi Emmanuel,

I'm interested in the following course and would like to bookmark it for future enrollment:

Course: ${topic.title}
Difficulty: ${topic.difficulty}
Duration: ${Math.floor(topic.duration_estimate / 60)}h ${topic.duration_estimate % 60}m

Please keep me updated on availability and any special offers.

Best regards`;
      
      window.open(`mailto:e.ogugua.dev@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            All <span className="text-cyber-purple">Courses</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Master React development with our comprehensive course catalog. From beginner to advanced topics.
          </p>
        </motion.div>

        {/* Filters */}
        <TopicFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
          selectedDifficulty={selectedDifficulty}
          onDifficultyChange={setSelectedDifficulty}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Topics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <TopicGrid 
            topics={filteredTopics}
            onEnroll={handleEnroll}
            onBookmark={handleBookmark}
            highlightedTopic={highlightedTopic}
          />
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12 pt-8 border-t border-white/10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-cyber-purple mb-2">{filteredTopics.length}</div>
              <div className="text-gray-400">Available Courses</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyber-pink mb-2">
                {Math.round(filteredTopics.reduce((acc, topic) => acc + topic.duration_estimate, 0) / 60)}h
              </div>
              <div className="text-gray-400">Total Content</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyber-cyan mb-2">
                {Array.from(new Set(filteredTopics.flatMap(topic => topic.tags))).length}
              </div>
              <div className="text-gray-400">Topics Covered</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default CoursesPage;
