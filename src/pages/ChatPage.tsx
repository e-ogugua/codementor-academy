import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Brain, User, Lightbulb, BookOpen, TrendingUp } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const aiResponses: { [key: string]: string[] } = {
  'hello': [
    "Hello! I'm Alex, your AI coding mentor. How can I help you learn today?",
    "Hi there! Ready to dive into some code? What would you like to know?"
  ],
  'react': [
    "React is fantastic! It's a JavaScript library for building user interfaces. Have you tried creating components yet?",
    "React makes building interactive UIs a breeze. What's your favorite React hook?"
  ],
  'javascript': [
    "JavaScript is the backbone of web development. Are you working on variables, functions, or something more advanced?",
    "JS powers the web! What aspect are you struggling with?"
  ],
  'html': [
    "HTML is the foundation! Let's talk about structuring your pages with semantic elements.",
    "Great choice! HTML tags are the building blocks. What's your current project?"
  ],
  'css': [
    "CSS brings designs to life! Flexbox or Grid for layouts?",
    "Styling is an art! What's your favorite CSS property?"
  ],
  'python': [
    "Python is elegant and powerful! Working on scripts or data analysis?",
    "Love Python's simplicity! What's your project about?"
  ],
  'career': [
    "Career in tech is exciting! Focus on building projects and networking.",
    "Great question! Certifications, portfolios, and continuous learning are key."
  ],
  'motivation': [
    "You're doing great! Every expert was once a beginner. Keep coding!",
    "Remember, progress over perfection. What's one small win today?"
  ],
  'premium': [
    "That's part of our upcoming Pro Series — launching soon! Stay tuned for advanced topics.",
    "Premium lessons are in the works! In the meantime, our free lessons are a great foundation."
  ],
  'help': [
    "I'm here to help! What specific coding challenge are you facing?",
    "Let's tackle this together. What's on your mind?"
  ],
  'default': [
    "That's interesting! Can you tell me more about what you're working on?",
    "I'm excited to help! Could you provide more details?"
  ]
};

export function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm Alex, your AI coding mentor. I'm here to help you learn and grow as a developer. What would you like to know?",
      timestamp: new Date()
    }
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

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return aiResponses.hello[Math.floor(Math.random() * aiResponses.hello.length)];
    } else if (lowerMessage.includes('react')) {
      return aiResponses.react[Math.floor(Math.random() * aiResponses.react.length)];
    } else if (lowerMessage.includes('javascript') || lowerMessage.includes('js')) {
      return aiResponses.javascript[Math.floor(Math.random() * aiResponses.javascript.length)];
    } else if (lowerMessage.includes('html')) {
      return aiResponses.html[Math.floor(Math.random() * aiResponses.html.length)];
    } else if (lowerMessage.includes('css')) {
      return aiResponses.css[Math.floor(Math.random() * aiResponses.css.length)];
    } else if (lowerMessage.includes('python')) {
      return aiResponses.python[Math.floor(Math.random() * aiResponses.python.length)];
    } else if (lowerMessage.includes('career') || lowerMessage.includes('job') || lowerMessage.includes('work')) {
      return aiResponses.career[Math.floor(Math.random() * aiResponses.career.length)];
    } else if (lowerMessage.includes('motivat') || lowerMessage.includes('encourag')) {
      return aiResponses.motivation[Math.floor(Math.random() * aiResponses.motivation.length)];
    } else if (lowerMessage.includes('premium') || lowerMessage.includes('pro') || lowerMessage.includes('advanced')) {
      return aiResponses.premium[Math.floor(Math.random() * aiResponses.premium.length)];
    } else if (lowerMessage.includes('help')) {
      return aiResponses.help[Math.floor(Math.random() * aiResponses.help.length)];
    } else {
      return aiResponses.default[Math.floor(Math.random() * aiResponses.default.length)];
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: getAIResponse(inputValue),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickSuggests = [
    { text: 'Teach me React Hooks', icon: BookOpen, category: 'react' },
    { text: 'Show JavaScript tips', icon: TrendingUp, category: 'javascript' },
    { text: 'Motivate me to code', icon: Lightbulb, category: 'motivation' },
    { text: 'Career advice', icon: TrendingUp, category: 'career' }
  ];

  const handleQuickSuggest = (text: string) => {
    setInputValue(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-20">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Brain className="w-10 h-10 text-cyber-purple" />
            Chat with Alex
          </h1>
          <p className="text-gray-300">
            Your AI coding mentor is here to help! Ask questions, get guidance, and learn together.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/20 backdrop-blur-xl rounded-2xl border border-purple-500/20 h-[600px] flex flex-col"
        >
          {/* Quick Suggest Buttons */}
          <div className="p-4 border-b border-gray-700">
            <div className="flex flex-wrap gap-2">
              {quickSuggests.map((suggest, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleQuickSuggest(suggest.text)}
                  className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-3 py-2 rounded-lg text-sm transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <suggest.icon className="w-4 h-4" />
                  {suggest.text}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, x: message.type === 'user' ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start gap-3 max-w-[70%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' ? 'bg-cyber-pink' : 'bg-cyber-purple'
                  }`}>
                    {message.type === 'user' ? <User className="w-4 h-4 text-white" /> : <Brain className="w-4 h-4 text-white" />}
                  </div>
                  <div className={`p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-cyber-pink text-white'
                      : 'bg-gray-700 text-gray-100'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-cyber-purple rounded-full flex items-center justify-center">
                    <Brain className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-gray-700 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-gray-700">
            <div className="flex gap-3">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask Alex anything about coding..."
                className="flex-1 bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:border-cyber-purple focus:outline-none resize-none"
                rows={2}
              />
              <motion.button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="bg-cyber-purple hover:bg-cyber-purple/80 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ChatPage;
