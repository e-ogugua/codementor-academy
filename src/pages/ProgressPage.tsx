import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Target, Award, Zap, BookOpen, Clock, TrendingUp } from 'lucide-react';

export function ProgressPage() {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [userStats, setUserStats] = useState({
    name: 'Emmanuel',
    xp: 0,
    level: 1,
    streak: 0,
    badges: [] as string[],
    totalLessons: 20
  });

  useEffect(() => {
    // Load progress from localStorage
    const saved = localStorage.getItem('completedLessons');
    if (saved) {
      const completed = JSON.parse(saved);
      setCompletedLessons(completed);
      setUserStats(prev => ({
        ...prev,
        xp: completed.length * 100,
        level: Math.floor((completed.length * 100) / 500) + 1,
        streak: Math.min(completed.length, 7)
      }));
    }

    // Simulate badges earned
    const earnedBadges: string[] = [];
    if (completedLessons.length > 0) earnedBadges.push('first-steps');
    if (completedLessons.length >= 5) earnedBadges.push('learner');
    if (completedLessons.length >= 10) earnedBadges.push('achiever');
    setUserStats(prev => ({ ...prev, badges: earnedBadges }));
  }, [completedLessons.length]);

  const badgeData = {
    'first-steps': { name: 'First Steps', description: 'Completed your first lesson', icon: '🎯' },
    'learner': { name: 'Eager Learner', description: 'Completed 5 lessons', icon: '📚' },
    'achiever': { name: 'High Achiever', description: 'Completed 10 lessons', icon: '🏆' }
  };

  const recentActivity = [
    { lesson: 'JavaScript Variables', date: '2 hours ago', type: 'completed' },
    { lesson: 'HTML Basics', date: '1 day ago', type: 'completed' },
    { lesson: 'CSS Fundamentals', date: '2 days ago', type: 'completed' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome back, <span className="text-cyber-purple">{userStats.name}</span>! 🎉
          </h1>
          <p className="text-xl text-gray-300">Track your learning journey and achievements</p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 text-center">
            <Target className="w-8 h-8 text-cyber-purple mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{userStats.xp}</div>
            <div className="text-gray-400">Total XP</div>
          </div>

          <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 text-center">
            <TrendingUp className="w-8 h-8 text-cyber-cyan mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">Level {userStats.level}</div>
            <div className="text-gray-400">Current Level</div>
          </div>

          <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 text-center">
            <Zap className="w-8 h-8 text-cyber-pink mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{userStats.streak} days</div>
            <div className="text-gray-400">Current Streak</div>
          </div>

          <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/20 text-center">
            <Award className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{userStats.badges.length}</div>
            <div className="text-gray-400">Badges Earned</div>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Overall Progress</h2>
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-300 mb-2">
              <span>Lessons Completed</span>
              <span>{completedLessons.length}/{userStats.totalLessons}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(completedLessons.length / userStats.totalLessons) * 100}%` }}
                transition={{ duration: 1, delay: 0.6 }}
                className="bg-gradient-to-r from-cyber-purple to-cyber-pink h-3 rounded-full"
              />
            </div>
          </div>
          <p className="text-gray-400">
            {completedLessons.length === 0
              ? "Start your first lesson to begin your journey!"
              : `Great progress! ${userStats.totalLessons - completedLessons.length} lessons remaining to complete all content.`
            }
          </p>
        </motion.div>

        {/* Badges Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-400" />
            Your Badges
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {userStats.badges.map(badge => (
              <motion.div
                key={badge}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg p-4 border border-yellow-400/30"
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{badgeData[badge as keyof typeof badgeData]?.icon}</div>
                  <h3 className="text-lg font-semibold text-white">{badgeData[badge as keyof typeof badgeData]?.name}</h3>
                  <p className="text-gray-300 text-sm">{badgeData[badge as keyof typeof badgeData]?.description}</p>
                </div>
              </motion.div>
            ))}
            {userStats.badges.length === 0 && (
              <div className="col-span-full text-center py-8">
                <Award className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">Complete lessons to earn your first badge!</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-black/20 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Clock className="w-6 h-6 text-cyber-cyan" />
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg"
              >
                <div className="w-8 h-8 bg-cyber-purple rounded-full flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{activity.lesson}</p>
                  <p className="text-gray-400 text-sm">{activity.date}</p>
                </div>
                <span className="bg-green-500 text-white px-2 py-1 rounded text-sm">Completed</span>
              </motion.div>
            ))}
            {recentActivity.length === 0 && (
              <p className="text-gray-400 text-center py-8">No recent activity. Start learning to see your progress here!</p>
            )}
          </div>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-xl rounded-2xl p-8 border border-blue-500/30"
        >
          <h2 className="text-2xl font-bold text-white mb-4">Recommended Next Steps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-black/20 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">🎯 Continue Learning</h3>
              <p className="text-gray-300 mb-3">Complete more lessons to level up and earn badges.</p>
              <motion.button
                onClick={() => window.location.href = '/courses'}
                className="bg-cyber-purple hover:bg-cyber-purple/80 text-white px-4 py-2 rounded-lg text-sm"
                whileHover={{ scale: 1.05 }}
              >
                Browse Courses
              </motion.button>
            </div>
            <div className="p-4 bg-black/20 rounded-lg">
              <h3 className="text-lg font-semibold text-white mb-2">🚀 Try Premium</h3>
              <p className="text-gray-300 mb-3">Unlock advanced lessons and 1-on-1 mentoring.</p>
              <motion.button
                onClick={() => window.location.href = '/premium'}
                className="bg-gradient-to-r from-cyber-purple to-cyber-pink hover:from-dark-purple hover:to-hot-pink text-white px-4 py-2 rounded-lg text-sm"
                whileHover={{ scale: 1.05 }}
              >
                Upgrade Now
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default ProgressPage;
