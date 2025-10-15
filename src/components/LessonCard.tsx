import { motion } from 'framer-motion';
import { Clock, Target, Code, Play, Lock, Zap } from 'lucide-react';
import type { Lesson } from '../types/Lesson';

interface LessonCardProps {
  lesson: Lesson;
  onStart: (lessonId: string) => void;
  highlighted?: boolean;
}

export function LessonCard({ lesson, onStart, highlighted }: LessonCardProps) {
  return (
    <motion.div
      className={`bg-black/20 backdrop-blur-xl rounded-2xl p-6 border transition-all duration-300 ${
        highlighted
          ? 'border-cyber-purple shadow-lg shadow-cyber-purple/25'
          : lesson.isPremium
          ? 'border-yellow-400/50 bg-yellow-500/5'
          : 'border-purple-500/20 hover:border-purple-400/40'
      }`}
      whileHover={{ scale: 1.02, y: -5 }}
      layout
    >
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            lesson.level === 'Beginner' ? 'bg-green-500/20 text-green-400' :
            lesson.level === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {lesson.level}
          </span>
          <div className="flex items-center gap-2">
            {lesson.isPremium && <Lock className="w-4 h-4 text-yellow-400" />}
            <span className="text-cyber-cyan text-sm">{lesson.category}</span>
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{lesson.title}</h3>
        <div className="flex items-center text-gray-400 text-sm mb-3">
          <Clock className="w-4 h-4 mr-1" />
          {lesson.duration}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center mb-2">
          <Target className="w-4 h-4 mr-2 text-cyber-purple" />
          <span className="text-sm font-medium text-gray-300">Objectives</span>
        </div>
        <ul className="text-sm text-gray-400 space-y-1">
          {lesson.objectives.slice(0, 2).map((obj, index) => (
            <li key={index}>• {obj}</li>
          ))}
          {lesson.objectives.length > 2 && <li>• ...</li>}
        </ul>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-300 line-clamp-3">{lesson.explanation}</p>
      </div>

      {lesson.challenges && (
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <Zap className="w-4 h-4 mr-2 text-cyber-pink" />
            <span className="text-sm font-medium text-gray-300">Challenges</span>
          </div>
          <ul className="text-sm text-gray-400 space-y-1">
            {lesson.challenges.slice(0, 2).map((challenge, index) => (
              <li key={index}>• {challenge}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mb-4">
        <div className="flex items-center mb-2">
          <Code className="w-4 h-4 mr-2 text-cyber-pink" />
          <span className="text-sm font-medium text-gray-300">Code Example</span>
        </div>
        <pre className="bg-gray-800 rounded-lg p-3 text-xs text-green-400 overflow-x-auto">
          <code>{lesson.codeSnippet.split('\n').slice(0, 4).join('\n')}{lesson.codeSnippet.split('\n').length > 4 ? '\n...' : ''}</code>
        </pre>
      </div>

      {lesson.isPremium ? (
        <motion.button
          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Lock className="w-4 h-4" />
          Unlock with Premium
        </motion.button>
      ) : (
        <motion.button
          onClick={() => onStart(lesson.id)}
          className="w-full bg-gradient-to-r from-cyber-purple to-cyber-pink text-white font-semibold py-2 px-4 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Play className="w-4 h-4" />
          Start Lesson
        </motion.button>
      )}
    </motion.div>
  );
}
