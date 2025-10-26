import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle, RotateCcw, Trophy, XCircle } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: 'What does HTML stand for?',
    options: [
      'HyperText Markup Language',
      'High Tech Modern Language',
      'Home Tool Markup Language',
      'Hyperlink and Text Markup Language',
    ],
    correct: 0,
    explanation:
      'HTML stands for HyperText Markup Language, the standard markup language for web pages.',
  },
  {
    id: 2,
    question: 'Which CSS property is used to change the text color?',
    options: ['font-color', 'text-color', 'color', 'foreground-color'],
    correct: 2,
    explanation: 'The "color" property in CSS is used to set the color of text.',
  },
  {
    id: 3,
    question: 'What is the correct way to declare a JavaScript variable?',
    options: [
      'variable name = value;',
      'v name = value;',
      'let name = value;',
      'declare name = value;',
    ],
    correct: 2,
    explanation: 'In modern JavaScript, we use "let" to declare variables that can be reassigned.',
  },
  {
    id: 4,
    question: 'Which React hook is used to manage state?',
    options: ['useEffect', 'useState', 'useContext', 'useReducer'],
    correct: 1,
    explanation: 'useState is the primary hook for managing component state in React.',
  },
  {
    id: 5,
    question: 'What does CSS Grid primarily help with?',
    options: ['Animations', 'Layout design', 'Color schemes', 'Typography'],
    correct: 1,
    explanation: 'CSS Grid is a layout system for creating complex, responsive web layouts.',
  },
];

export function CodingQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setShowExplanation(false);
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className='bg-gray-900 rounded-2xl p-4 sm:p-6 md:p-8 max-w-md mx-auto text-center border border-cyber-purple/30'
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          className='w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-cyber-purple to-cyber-pink rounded-full flex items-center justify-center mx-auto mb-4'
        >
          <Trophy className='w-6 h-6 sm:w-8 sm:h-8 text-white' />
        </motion.div>
        <h2 className='text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4'>
          Quiz Complete!
        </h2>
        <p className='text-sm sm:text-base text-gray-300 mb-4 sm:mb-6'>
          You scored <span className='font-bold text-cyber-cyan'>{score}</span> out of{' '}
          {questions.length} ({percentage}%)
        </p>
        <motion.button
          onClick={restartQuiz}
          onKeyDown={e => handleKeyDown(e, restartQuiz)}
          className='w-full bg-gradient-to-r from-cyber-purple to-cyber-pink hover:from-dark-purple hover:to-hot-pink text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-200 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-cyber-cyan focus:ring-offset-2'
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw className='w-4 h-4 sm:w-5 sm:h-5 inline mr-2' />
          Try Again
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='bg-gray-900 rounded-2xl p-4 sm:p-6 md:p-8 max-w-2xl mx-auto border border-cyber-purple/30'
    >
      {/* Progress indicator */}
      <div className='mb-4 sm:mb-6'>
        <div className='flex justify-between items-center mb-2'>
          <h2 className='text-base sm:text-lg md:text-xl font-bold text-white'>
            Question {currentQuestion + 1} of {questions.length}
          </h2>
          <span className='text-sm text-gray-400'>
            Score: {score}/{currentQuestion + (selectedAnswer !== null ? 1 : 0)}
          </span>
        </div>
        <div className='w-full bg-gray-700 rounded-full h-2 sm:h-3'>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            className='bg-gradient-to-r from-cyber-purple to-cyber-pink h-2 sm:h-3 rounded-full'
          />
        </div>
      </div>

      {/* Question */}
      <h3 className='text-base sm:text-lg md:text-xl font-semibold text-white mb-4 sm:mb-6 leading-relaxed'>
        {questions[currentQuestion].question}
      </h3>

      {/* Answer options */}
      <div className='space-y-2 sm:space-y-3 mb-4 sm:mb-6'>
        {questions[currentQuestion].options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === questions[currentQuestion].correct;
          const isWrongSelection = isSelected && !isCorrect;
          const showCorrectAnswer = showExplanation && isCorrect;

          return (
            <motion.button
              key={index}
              onClick={() => handleAnswer(index)}
              onKeyDown={e => handleKeyDown(e, () => handleAnswer(index))}
              disabled={showExplanation}
              className={`w-full p-3 sm:p-4 text-left rounded-lg border-2 transition-all duration-200 min-h-[48px] focus:outline-none focus:ring-2 focus:ring-cyber-cyan focus:ring-offset-2 ${
                isSelected && isCorrect
                  ? 'border-green-500 bg-green-500/20 text-white'
                  : isWrongSelection
                    ? 'border-red-500 bg-red-500/20 text-white'
                    : showCorrectAnswer
                      ? 'border-green-500 bg-green-500/20 text-white'
                      : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500 hover:bg-gray-700/50'
              }`}
              whileHover={!showExplanation ? { scale: 1.02 } : {}}
              whileTap={!showExplanation ? { scale: 0.98 } : {}}
              role='option'
              aria-selected={isSelected}
              aria-label={`Option ${String.fromCharCode(65 + index)}: ${option}`}
            >
              <div className='flex items-center gap-3'>
                <span className='w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-current opacity-20 flex items-center justify-center text-sm font-bold flex-shrink-0'>
                  {String.fromCharCode(65 + index)}
                </span>
                <span className='flex-1 text-sm sm:text-base'>{option}</span>
                {showCorrectAnswer && (
                  <CheckCircle
                    className='w-5 h-5 text-green-400 flex-shrink-0'
                    aria-label='Correct answer'
                  />
                )}
                {isWrongSelection && (
                  <XCircle
                    className='w-5 h-5 text-red-400 flex-shrink-0'
                    aria-label='Incorrect answer'
                  />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Explanation */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className='bg-blue-900/20 border border-blue-500/30 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6'
            role='status'
            aria-live='polite'
          >
            <p className='text-sm sm:text-base text-blue-200 leading-relaxed'>
              {questions[currentQuestion].explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <div className='flex justify-between items-center'>
        <div className='text-xs sm:text-sm text-gray-400'>
          Use keyboard or touch to select answers
        </div>
        <motion.button
          onClick={nextQuestion}
          onKeyDown={e => handleKeyDown(e, nextQuestion)}
          disabled={selectedAnswer === null}
          className='bg-gradient-to-r from-cyber-purple to-cyber-pink hover:from-dark-purple hover:to-hot-pink text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-200 min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-cyber-cyan focus:ring-offset-2'
          whileHover={selectedAnswer !== null ? { scale: 1.05 } : {}}
          whileTap={selectedAnswer !== null ? { scale: 0.95 } : {}}
        >
          {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default CodingQuiz;
