import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';

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
    options: ['HyperText Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlink and Text Markup Language'],
    correct: 0,
    explanation: 'HTML stands for HyperText Markup Language, the standard markup language for web pages.'
  },
  {
    id: 2,
    question: 'Which CSS property is used to change the text color?',
    options: ['font-color', 'text-color', 'color', 'foreground-color'],
    correct: 2,
    explanation: 'The "color" property in CSS is used to set the color of text.'
  },
  {
    id: 3,
    question: 'What is the correct way to declare a JavaScript variable?',
    options: ['variable name = value;', 'v name = value;', 'let name = value;', 'declare name = value;'],
    correct: 2,
    explanation: 'In modern JavaScript, we use "let" to declare variables that can be reassigned.'
  },
  {
    id: 4,
    question: 'Which React hook is used to manage state?',
    options: ['useEffect', 'useState', 'useContext', 'useReducer'],
    correct: 1,
    explanation: 'useState is the primary hook for managing component state in React.'
  },
  {
    id: 5,
    question: 'What does CSS Grid primarily help with?',
    options: ['Animations', 'Layout design', 'Color schemes', 'Typography'],
    correct: 1,
    explanation: 'CSS Grid is a layout system for creating complex, responsive web layouts.'
  },
  {
    id: 6,
    question: 'In Python, how do you create a comment?',
    options: ['// This is a comment', '# This is a comment', '/* This is a comment */', '-- This is a comment'],
    correct: 1,
    explanation: 'In Python, comments start with the # symbol.'
  },
  {
    id: 7,
    question: 'What is the purpose of the "alt" attribute in HTML images?',
    options: ['To specify image size', 'To provide alternative text', 'To set image position', 'To define image format'],
    correct: 1,
    explanation: 'The "alt" attribute provides alternative text for screen readers and when images fail to load.'
  },
  {
    id: 8,
    question: 'Which JavaScript method is used to add an element to the end of an array?',
    options: ['push()', 'add()', 'append()', 'insert()'],
    correct: 0,
    explanation: 'The push() method adds one or more elements to the end of an array.'
  },
  {
    id: 9,
    question: 'What does the "box-sizing: border-box" CSS property do?',
    options: ['Includes padding and border in element width', 'Excludes padding from element width', 'Sets box shadow', 'Defines border radius'],
    correct: 0,
    explanation: 'border-box includes padding and border in the element\'s total width and height.'
  },
  {
    id: 10,
    question: 'In React, what is JSX?',
    options: ['A JavaScript framework', 'A syntax extension for JavaScript', 'A CSS preprocessor', 'A database query language'],
    correct: 1,
    explanation: 'JSX is a syntax extension for JavaScript that allows you to write HTML-like code in React.'
  },
  {
    id: 11,
    question: 'Which HTTP method is used to create new resources?',
    options: ['GET', 'POST', 'PUT', 'DELETE'],
    correct: 1,
    explanation: 'POST is used to create new resources on the server.'
  },
  {
    id: 12,
    question: 'What is the correct file extension for Python files?',
    options: ['.py', '.python', '.pyt', '.pyth'],
    correct: 0,
    explanation: 'Python files have the .py extension.'
  },
  {
    id: 13,
    question: 'Which CSS property controls the spacing between elements?',
    options: ['margin', 'padding', 'border', 'spacing'],
    correct: 0,
    explanation: 'The margin property controls the space outside of elements.'
  },
  {
    id: 14,
    question: 'In JavaScript, what does "typeof null" return?',
    options: ['"null"', '"undefined"', '"object"', '"boolean"'],
    correct: 2,
    explanation: 'typeof null returns "object", which is a well-known quirk in JavaScript.'
  },
  {
    id: 15,
    question: 'What is the purpose of the "useEffect" hook in React?',
    options: ['To manage state', 'To handle side effects', 'To create components', 'To style elements'],
    correct: 1,
    explanation: 'useEffect is used to perform side effects in functional components, like data fetching or subscriptions.'
  },
  {
    id: 16,
    question: 'Which tag is used to create an unordered list in HTML?',
    options: ['<ol>', '<ul>', '<li>', '<list>'],
    correct: 1,
    explanation: '<ul> creates an unordered (bulleted) list in HTML.'
  },
  {
    id: 17,
    question: 'What does the "async" keyword do in JavaScript?',
    options: ['Makes a function run faster', 'Allows a function to return a Promise', 'Creates a new thread', 'Defines a constant'],
    correct: 1,
    explanation: 'The async keyword allows a function to use await and return a Promise.'
  },
  {
    id: 18,
    question: 'In CSS, how do you select an element by its ID?',
    options: ['.id', '#id', '[id]', 'id()'],
    correct: 1,
    explanation: 'Use # followed by the ID name to select an element by ID.'
  },
  {
    id: 19,
    question: 'What is the main purpose of Node.js?',
    options: ['Frontend development', 'Server-side JavaScript', 'Database management', 'Mobile app development'],
    correct: 1,
    explanation: 'Node.js is primarily used for server-side JavaScript development.'
  },
  {
    id: 20,
    question: 'Which Python data type is immutable?',
    options: ['List', 'Dictionary', 'Set', 'Tuple'],
    correct: 3,
    explanation: 'Tuples are immutable in Python, meaning their contents cannot be changed after creation.'
  }
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

  if (showResult) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-900 rounded-2xl p-8 max-w-md mx-auto text-center border border-cyber-purple/30"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-16 h-16 bg-gradient-to-br from-cyber-purple to-cyber-pink rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Trophy className="w-8 h-8 text-white" />
        </motion.div>
        <h2 className="text-2xl font-bold text-white mb-4">Quiz Complete!</h2>
        <p className="text-gray-300 mb-6">
          You scored {score} out of {questions.length} ({Math.round((score / questions.length) * 100)}%)
        </p>
        <motion.button
          onClick={restartQuiz}
          className="bg-gradient-to-r from-cyber-purple to-cyber-pink text-white px-6 py-3 rounded-xl font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw className="w-4 h-4 inline mr-2" />
          Try Again
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900 rounded-2xl p-8 max-w-2xl mx-auto border border-cyber-purple/30"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Question {currentQuestion + 1} of {questions.length}
        </h2>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            className="bg-cyber-purple h-2 rounded-full"
          />
        </div>
      </div>

      <h3 className="text-xl font-semibold text-white mb-6">
        {questions[currentQuestion].question}
      </h3>

      <div className="space-y-3 mb-6">
        {questions[currentQuestion].options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => handleAnswer(index)}
            disabled={showExplanation}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
              selectedAnswer === index
                ? index === questions[currentQuestion].correct
                  ? 'border-green-500 bg-green-500/20 text-white'
                  : 'border-red-500 bg-red-500/20 text-white'
                : showExplanation && index === questions[currentQuestion].correct
                ? 'border-green-500 bg-green-500/20 text-white'
                : 'border-gray-600 bg-gray-800 text-gray-300 hover:border-gray-500'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-current opacity-20 flex items-center justify-center text-sm font-bold">
                {String.fromCharCode(65 + index)}
              </span>
              {option}
              {showExplanation && index === questions[currentQuestion].correct && (
                <CheckCircle className="w-5 h-5 text-green-400 ml-auto" />
              )}
              {showExplanation && selectedAnswer === index && index !== questions[currentQuestion].correct && (
                <XCircle className="w-5 h-5 text-red-400 ml-auto" />
              )}
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6"
          >
            <p className="text-blue-200">{questions[currentQuestion].explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-center">
        <div className="text-gray-400">
          Score: {score}/{currentQuestion + (selectedAnswer !== null ? 1 : 0)}
        </div>
        <motion.button
          onClick={nextQuestion}
          disabled={selectedAnswer === null}
          className="bg-gradient-to-r from-cyber-purple to-cyber-pink text-white px-6 py-3 rounded-xl font-semibold disabled:opacity-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
        </motion.button>
      </div>
    </motion.div>
  );
}

export default CodingQuiz;
