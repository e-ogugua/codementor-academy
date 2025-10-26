import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Code, Play, RotateCcw, X } from 'lucide-react';

interface CodingPlaygroundProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CodingPlayground({ isOpen, onClose }: CodingPlaygroundProps) {
  const [code, setCode] = useState(`// Welcome to CodeMentor Playground
// Try editing this code and run it

function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("World"));`);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    setOutput('');

    // Simulate code execution (very basic)
    setTimeout(() => {
      try {
        let simulatedOutput = '';
        if (code.includes('console.log')) {
          // Extract simple console.log statements
          const logs = code.match(/console\.log\([^)]+\)/g);
          if (logs) {
            logs.forEach(log => {
              const match = /console\.log\(([^)]+)\)/.exec(log);
              if (match) {
                simulatedOutput += match[1].replace(/["']/g, '') + '\n';
              }
            });
          }
        }
        setOutput(simulatedOutput || 'Code executed successfully');
      } catch (error) {
        setOutput('Error: ' + error);
      }
      setIsRunning(false);
    }, 1000);
  };

  const resetCode = () => {
    setCode(`// Welcome to CodeMentor Playground
// Try editing this code and run it

function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("World"));`);
    setOutput('');
  };

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
            className='bg-gray-900 rounded-2xl p-8 max-w-5xl w-full max-h-[90vh] overflow-hidden border border-cyber-purple/30'
            onClick={e => e.stopPropagation()}
          >
            <div className='flex justify-between items-center mb-6'>
              <div>
                <h2 className='text-2xl font-bold text-white flex items-center gap-2'>
                  <Code className='w-6 h-6 text-cyber-purple' />
                  CodeMentor Playground
                </h2>
                <p className='text-gray-400'>Experiment with JavaScript in a safe environment</p>
              </div>
              <button
                onClick={onClose}
                className='text-gray-400 hover:text-white transition-colors'
              >
                <X className='w-6 h-6' />
              </button>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 h-96'>
              {/* Code Editor */}
              <div className='bg-gray-800 rounded-lg p-4'>
                <h3 className='text-lg font-semibold text-white mb-3'>Code Editor</h3>
                <textarea
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  className='w-full h-64 bg-gray-900 text-green-400 font-mono text-sm p-3 rounded border border-gray-600 resize-none focus:outline-none focus:border-cyber-purple'
                  placeholder='Write your JavaScript code here...'
                />
              </div>

              {/* Output */}
              <div className='bg-gray-800 rounded-lg p-4'>
                <h3 className='text-lg font-semibold text-white mb-3'>Output</h3>
                <div className='w-full h-64 bg-gray-900 text-green-400 font-mono text-sm p-3 rounded border border-gray-600 overflow-y-auto'>
                  {isRunning ? (
                    <div className='flex items-center gap-2'>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className='w-4 h-4 border-2 border-cyber-purple border-t-transparent rounded-full'
                      />
                      Running...
                    </div>
                  ) : (
                    <pre className='whitespace-pre-wrap'>
                      {output || 'Click "Run Code" to see output'}
                    </pre>
                  )}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className='flex justify-between items-center mt-6'>
              <motion.button
                onClick={runCode}
                disabled={isRunning}
                className='bg-gradient-to-r from-cyber-purple to-cyber-pink text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 disabled:opacity-50'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Play className='w-4 h-4' />
                {isRunning ? 'Running...' : 'Run Code'}
              </motion.button>

              <div className='flex gap-2'>
                <motion.button
                  onClick={resetCode}
                  className='bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <RotateCcw className='w-4 h-4' />
                  Reset
                </motion.button>
                <motion.button
                  onClick={onClose}
                  className='bg-cyber-purple hover:bg-cyber-purple/80 text-white px-4 py-2 rounded-lg'
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </div>
            </div>

            {/* Tips */}
            <div className='mt-4 p-3 bg-blue-900/20 rounded-lg border border-blue-500/30'>
              <p className='text-blue-200 text-sm'>
                <strong>Note:</strong> This is a basic playground. In the full app, you'll have
                access to advanced features like syntax highlighting, error checking, and real-time
                collaboration.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
