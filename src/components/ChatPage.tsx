import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Bot, Code, Lightbulb, Send, User } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'alex';
  timestamp: Date;
  type?: 'text' | 'code' | 'suggestion';
}

const alexResponses = [
  'Great question! Let me help you understand React hooks better. Hooks are functions that let you use state and other React features in functional components.',
  "I see you're working on a component! Here's a tip: always remember to import useState from React when you need to manage state.",
  "That's a common pattern in React! You're on the right track. Let me show you how to optimize that code.",
  'Excellent progress! React development is all about breaking down complex UIs into reusable components. Keep practicing!',
  "I notice you're asking about useEffect. This hook is perfect for side effects like API calls, subscriptions, or manually changing the DOM.",
  "Let's build something together! How about we create a simple todo app to practice React hooks and state management?",
  "Perfect! That's exactly how you handle events in React. Remember to always use arrow functions or bind methods to preserve the 'this' context.",
  "I'm here to help you master React! Whether it's hooks, components, or state management - just ask me anything.",
];

const quickSuggestions = [
  'Explain React hooks',
  'Help me debug this component',
  'Show me useState examples',
  'Build a todo app together',
  'React best practices',
  'How to handle forms in React',
];

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content:
        "Hi! I'm Alex, your AI mentor. I'm here to help you master React development. What would you like to learn today?",
      sender: 'alex',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate Alex thinking and responding
    setTimeout(
      () => {
        const alexResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: alexResponses[Math.floor(Math.random() * alexResponses.length)],
          sender: 'alex',
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, alexResponse]);
        setIsTyping(false);
      },
      1000 + Math.random() * 2000
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const sendQuickMessage = (suggestion: string) => {
    setInputValue(suggestion);
    setTimeout(() => sendMessage(), 100);
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900'>
      <div className='max-w-4xl mx-auto px-6 py-8'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='text-center mb-8'
        >
          <div className='flex items-center justify-center gap-3 mb-4'>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className='p-3 bg-gradient-to-r from-cyber-purple to-cyber-pink rounded-xl'
            >
              <Bot className='w-8 h-8 text-white' />
            </motion.div>
            <h1 className='text-3xl font-bold bg-gradient-to-r from-cyber-purple via-cyber-pink to-cyber-cyan bg-clip-text text-transparent'>
              Chat with Alex
            </h1>
          </div>
          <p className='text-gray-300'>
            Your AI mentor is ready to help you master React development
          </p>
        </motion.div>

        {/* Chat Container */}
        <div className='bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 h-[600px] flex flex-col'>
          {/* Messages */}
          <div className='flex-1 overflow-y-auto p-6 space-y-4'>
            {messages.map(message => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex gap-3 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-cyber-cyan to-cyber-blue'
                        : 'bg-gradient-to-r from-cyber-purple to-cyber-pink'
                    }`}
                  >
                    {message.sender === 'user' ? (
                      <User className='w-4 h-4 text-white' />
                    ) : (
                      <Bot className='w-4 h-4 text-white' />
                    )}
                  </div>
                  <div
                    className={`rounded-2xl p-4 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-cyber-cyan/20 to-cyber-blue/20 border border-cyber-cyan/30'
                        : 'bg-white/10 border border-white/20'
                    }`}
                  >
                    <p className='text-white leading-relaxed'>{message.content}</p>
                    <p className='text-xs text-gray-400 mt-2'>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='flex justify-start'
              >
                <div className='flex gap-3 max-w-[80%]'>
                  <div className='w-8 h-8 rounded-full bg-gradient-to-r from-cyber-purple to-cyber-pink flex items-center justify-center'>
                    <Bot className='w-4 h-4 text-white' />
                  </div>
                  <div className='bg-white/10 border border-white/20 rounded-2xl p-4'>
                    <div className='flex gap-1'>
                      <div
                        className='w-2 h-2 bg-cyber-purple rounded-full animate-bounce'
                        style={{ animationDelay: '0ms' }}
                      />
                      <div
                        className='w-2 h-2 bg-cyber-pink rounded-full animate-bounce'
                        style={{ animationDelay: '150ms' }}
                      />
                      <div
                        className='w-2 h-2 bg-cyber-cyan rounded-full animate-bounce'
                        style={{ animationDelay: '300ms' }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          <div className='px-6 py-3 border-t border-white/10'>
            <div className='flex flex-wrap gap-2 mb-3'>
              {quickSuggestions.map((suggestion, index) => (
                <motion.button
                  key={suggestion}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => sendQuickMessage(suggestion)}
                  className='px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-sm text-gray-300 hover:text-white transition-all duration-200 border border-white/20'
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className='p-6 border-t border-white/10'>
            <div className='flex gap-3'>
              <input
                type='text'
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder='Ask Alex anything about React...'
                className='flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyber-purple focus:border-transparent transition-all'
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={sendMessage}
                disabled={!inputValue.trim()}
                className='bg-gradient-to-r from-cyber-purple to-cyber-pink hover:from-dark-purple hover:to-hot-pink px-6 py-3 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2'
              >
                <Send className='w-4 h-4' />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className='grid md:grid-cols-3 gap-6 mt-8'
        >
          <div className='bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center'>
            <Code className='w-8 h-8 text-cyber-purple mx-auto mb-3' />
            <h3 className='text-white font-semibold mb-2'>Code Review</h3>
            <p className='text-gray-400 text-sm'>Get instant feedback on your React code</p>
          </div>
          <div className='bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center'>
            <BookOpen className='w-8 h-8 text-cyber-pink mx-auto mb-3' />
            <h3 className='text-white font-semibold mb-2'>Learning Path</h3>
            <p className='text-gray-400 text-sm'>Personalized curriculum based on your progress</p>
          </div>
          <div className='bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center'>
            <Lightbulb className='w-8 h-8 text-cyber-cyan mx-auto mb-3' />
            <h3 className='text-white font-semibold mb-2'>Smart Hints</h3>
            <p className='text-gray-400 text-sm'>Contextual suggestions to improve your code</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ChatPage;
