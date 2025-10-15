import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { TopicFilters } from '../components/TopicFilters';
import { LessonCard } from '../components/LessonCard';
import { LessonModal } from '../components/LessonModal';
import type { Lesson } from '../types/Lesson';
import { lessonsData } from '../data/lessonsData';

export function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevel, setSelectedLevel] = useState<Lesson['level'] | 'All'>('All');
  const [sortBy, setSortBy] = useState<'relevance' | 'duration' | 'difficulty'>('relevance');
  const [highlightedLesson, setHighlightedLesson] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setHighlightedLesson(hash);
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

  // Filter and sort lessons
  const filteredLessons = useMemo(() => {
    const filtered = lessonsData.filter(lesson => {
      const matchesSearch = searchTerm === '' ||
        lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.explanation.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.objectives.some(obj => obj.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesCategories = selectedCategories.length === 0 ||
        selectedCategories.includes(lesson.category);

      const matchesLevel = selectedLevel === 'All' || lesson.level === selectedLevel;

      return matchesSearch && matchesCategories && matchesLevel;
    });

    // Sort lessons
    if (sortBy === 'duration') {
      filtered.sort((a, b) => {
        const aDuration = parseInt(a.duration.split(' ')[0]);
        const bDuration = parseInt(b.duration.split(' ')[0]);
        return aDuration - bDuration;
      });
    } else if (sortBy === 'difficulty') {
      const difficultyOrder = { Beginner: 1, Intermediate: 2, Advanced: 3 };
      filtered.sort((a, b) => difficultyOrder[a.level] - difficultyOrder[b.level]);
    }

    return filtered;
  }, [searchTerm, selectedCategories, selectedLevel, sortBy]);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleStartLesson = (lessonId: string) => {
    const lesson = lessonsData.find(l => l.id === lessonId);
    if (lesson) {
      setSelectedLesson(lesson);
      setIsModalOpen(true);
    }
  };

  const handleLessonComplete = (lessonId: string) => {
    // Update localStorage for progress
    const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
    if (!completedLessons.includes(lessonId)) {
      completedLessons.push(lessonId);
      localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
    }
    // Advance to next step
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const steps = [
    { title: 'Choose Your Path', content: 'Select a lesson to start learning.' },
    { title: 'Complete Lessons', content: 'Finish lessons to earn XP and badges.' },
    { title: 'Unlock Premium', content: 'Access advanced content and 1-on-1 mentoring.' }
  ];

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
            Mini <span className="text-cyber-purple">Lessons</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Bite-sized, hands-on coding lessons to build your skills step by step. Each includes objectives, explanations, code examples, and a "Try It Yourself" section.
          </p>
        </motion.div>

        {/* Step-by-Step Flow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">Your Learning Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`p-4 rounded-lg border-2 ${
                  index <= currentStep
                    ? 'border-cyber-purple bg-cyber-purple/10'
                    : 'border-gray-700 bg-gray-800/50'
                }`}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    index <= currentStep ? 'bg-cyber-purple' : 'bg-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                </div>
                <p className="text-gray-300 text-sm">{step.content}</p>
              </motion.div>
            ))}
          </div>
          <p className="text-gray-400">Complete steps to unlock premium features and advanced content!</p>
        </motion.div>

        {/* Premium Preview */}
        {currentStep >= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-xl rounded-2xl p-6 border border-yellow-400/30 mb-8"
          >
            <h3 className="text-xl font-bold text-white mb-2">🚀 Premium Content Unlocked!</h3>
            <p className="text-gray-300 mb-4">You've completed basic lessons. Access advanced topics and 1-on-1 mentoring.</p>
            <motion.button
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Upgrade to Premium
            </motion.button>
          </motion.div>
        )}

        {/* Coming Soon Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-600 mb-8"
        >
          <h3 className="text-xl font-bold text-white mb-4">🔮 Coming Soon</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-black/20 rounded-lg">
              <h4 className="text-lg font-semibold text-white">Live Coding Sessions</h4>
              <p className="text-gray-300">Join real-time coding with experts.</p>
            </div>
            <div className="p-4 bg-black/20 rounded-lg">
              <h4 className="text-lg font-semibold text-white">Project-Based Learning</h4>
              <p className="text-gray-300">Build real apps with guided projects.</p>
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <TopicFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedTags={selectedCategories}
          onTagToggle={handleCategoryToggle}
          selectedDifficulty={selectedLevel}
          onDifficultyChange={setSelectedLevel}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        {/* Lessons Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredLessons.map((lesson, index) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <LessonCard
                lesson={lesson}
                onStart={handleStartLesson}
                highlighted={highlightedLesson === lesson.id}
              />
            </motion.div>
          ))}
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
              <div className="text-3xl font-bold text-cyber-purple mb-2">{filteredLessons.length}</div>
              <div className="text-gray-400">Available Lessons</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyber-pink mb-2">
                {Math.round(filteredLessons.reduce((acc, lesson) => {
                  const duration = parseInt(lesson.duration.split(' ')[0]);
                  return acc + duration;
                }, 0) / 60)}h
              </div>
              <div className="text-gray-400">Total Content</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyber-cyan mb-2">
                {Array.from(new Set(filteredLessons.map(lesson => lesson.category))).length}
              </div>
              <div className="text-gray-400">Technologies</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Lesson Modal */}
      <LessonModal
        lesson={selectedLesson}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onComplete={handleLessonComplete}
      />
    </div>
  );
}

export default CoursesPage;
