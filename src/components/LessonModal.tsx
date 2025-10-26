import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Code, Play, Target, X, Zap } from 'lucide-react';
import type { Lesson } from '../types/Lesson';

interface LessonModalProps {
  lesson: Lesson | null;
  isOpen: boolean;
  onClose: () => void;
  onComplete: (lessonId: string) => void;
}

export function LessonModal({ lesson, isOpen, onClose, onComplete }: LessonModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);

  if (!lesson) return null;

  const steps = [
    { title: 'Objectives', content: lesson.objectives, icon: Target },
    { title: 'Explanation', content: lesson.explanation, icon: Code },
    { title: 'Code Example', content: lesson.codeSnippet, icon: Code },
    { title: 'Try It Yourself', content: lesson.tryItCode, icon: Play },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
      onComplete(lesson.id);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4'
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className='bg-gray-900 rounded-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-cyber-purple/30'
            onClick={e => e.stopPropagation()}
          >
            <div className='flex justify-between items-center mb-6'>
              <div>
                <h2 className='text-2xl font-bold text-white'>{lesson.title}</h2>
                <p className='text-gray-400'>
                  {lesson.category} • {lesson.level} • {lesson.duration}
                </p>
              </div>
              <button
                onClick={onClose}
                className='text-gray-400 hover:text-white transition-colors'
              >
                <X className='w-6 h-6' />
              </button>
            </div>

            {!completed ? (
              <>
                {/* Step Progress */}
                <div className='mb-6'>
                  <div className='flex items-center justify-between mb-2'>
                    {steps.map((step, index) => (
                      <div
                        key={index}
                        className={`flex items-center ${index <= currentStep ? 'text-cyber-purple' : 'text-gray-500'}`}
                      >
                        <step.icon className='w-5 h-5 mr-2' />
                        <span className='text-sm'>{step.title}</span>
                      </div>
                    ))}
                  </div>
                  <div className='w-full bg-gray-700 rounded-full h-2'>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                      className='bg-cyber-purple h-2 rounded-full'
                    />
                  </div>
                </div>

                {/* Step Content */}
                <div className='mb-8'>
                  <h3 className='text-xl font-bold text-white mb-4 flex items-center'>
                    <currentStepData.icon className='w-6 h-6 mr-2 text-cyber-purple' />
                    {currentStepData.title}
                  </h3>

                  {currentStep === 0 && (
                    <ul className='space-y-2'>
                      {lesson.objectives.map((obj, index) => (
                        <li key={index} className='flex items-start text-gray-300'>
                          <Check className='w-4 h-4 mr-2 mt-0.5 text-green-400 flex-shrink-0' />
                          {obj}
                        </li>
                      ))}
                    </ul>
                  )}

                  {currentStep === 1 && (
                    <p className='text-gray-300 leading-relaxed'>{lesson.explanation}</p>
                  )}

                  {(currentStep === 2 || currentStep === 3) && (
                    <pre className='bg-gray-800 rounded-lg p-4 text-green-400 overflow-x-auto'>
                      <code>{currentStepData.content}</code>
                    </pre>
                  )}
                </div>

                {/* Navigation */}
                <div className='flex justify-between'>
                  <motion.button
                    onClick={handlePrev}
                    disabled={currentStep === 0}
                    className='bg-gray-700 hover:bg-gray-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Previous
                  </motion.button>
                  <motion.button
                    onClick={handleNext}
                    className='bg-gradient-to-r from-cyber-purple to-cyber-pink text-white px-6 py-3 rounded-xl font-semibold'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {currentStep === steps.length - 1 ? 'Complete Lesson' : 'Next'}
                  </motion.button>
                </div>
              </>
            ) : (
              <div className='text-center'>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                  className='w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4'
                >
                  <Check className='w-8 h-8 text-white' />
                </motion.div>
                <h3 className='text-2xl font-bold text-white mb-2'>Lesson Completed!</h3>
                <p className='text-gray-300 mb-6'>
                  Great job! You've earned 100 XP and unlocked new badges.
                </p>
                {lesson.challenges && (
                  <div className='mb-6'>
                    <h4 className='text-lg font-semibold text-white mb-3'>Challenges to Try:</h4>
                    <ul className='text-gray-300 space-y-1'>
                      {lesson.challenges.map((challenge, index) => (
                        <li key={index} className='flex items-center'>
                          <Zap className='w-4 h-4 mr-2 text-cyber-pink' />
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <motion.button
                  onClick={onClose}
                  className='bg-gradient-to-r from-cyber-purple to-cyber-pink text-white px-6 py-3 rounded-xl font-semibold'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Continue Learning
                </motion.button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
