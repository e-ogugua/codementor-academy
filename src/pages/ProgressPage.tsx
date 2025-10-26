import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, BookOpen, Clock, Target, TrendingUp, Trophy, Zap } from 'lucide-react';

// Memoized badge icon component for stable reference
// Prevents re-render of lesson card grid when parent updates
const BadgeIcon = memo(({ iconType }: { iconType: string }) => {
  switch (iconType) {
    case 'Target':
      return <Target className='w-6 h-6 sm:w-8 sm:h-8 mx-auto text-cyber-purple' />;
    case 'BookOpen':
      return <BookOpen className='w-6 h-6 sm:w-8 sm:h-8 mx-auto text-cyber-cyan' />;
    case 'Trophy':
      return <Trophy className='w-6 h-6 sm:w-8 sm:h-8 mx-auto text-yellow-400' />;
    default:
      return null;
  }
});

BadgeIcon.displayName = 'BadgeIcon';

export const ProgressPage = memo(() => {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  // Memoize user stats calculation to avoid recalculation on every render
  // Performance optimization for expensive computation
  const userStats = useMemo(() => {
    const lessonCount = completedLessons.length;
    return {
      name: 'Emmanuel',
      xp: lessonCount * 100,
      level: Math.floor((lessonCount * 100) / 500) + 1,
      streak: Math.min(lessonCount, 7),
      badges: [] as string[],
      totalLessons: 20,
    };
  }, [completedLessons.length]);

  // Memoize badge calculation for performance
  // Avoids recalculation on every render when only unrelated props change
  const earnedBadges = useMemo(() => {
    const badges: string[] = [];
    if (completedLessons.length > 0) badges.push('first-steps');
    if (completedLessons.length >= 5) badges.push('learner');
    if (completedLessons.length >= 10) badges.push('achiever');
    return badges;
  }, [completedLessons.length]);

  useEffect(() => {
    // Load progress from localStorage
    const saved = localStorage.getItem('completedLessons');
    if (saved) {
      const completed = JSON.parse(saved);
      setCompletedLessons(completed);
    }
  }, []);

  // Memoize badge data for stable object reference
  // Prevents child components from re-rendering due to object recreation
  const badgeData = useMemo(
    () => ({
      'first-steps': {
        name: 'First Steps',
        description: 'Completed your first lesson',
        icon: 'Target',
      },
      learner: { name: 'Eager Learner', description: 'Completed 5 lessons', icon: 'BookOpen' },
      achiever: { name: 'High Achiever', description: 'Completed 10 lessons', icon: 'Trophy' },
    }),
    []
  );

  // Memoize progress percentage calculation
  // Avoids recalculation on every render
  const progressPercentage = useMemo(
    () => (completedLessons.length / userStats.totalLessons) * 100,
    [completedLessons.length, userStats.totalLessons]
  );

  // Memoize navigation handlers for stable reference
  // Prevents child components from re-rendering due to function recreation
  const handleNavigateToCourses = useCallback(() => {
    window.location.href = '/courses';
  }, []);

  const handleNavigateToPremium = useCallback(() => {
    window.location.href = '/premium';
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-12 sm:py-16 md:py-20 safe-top safe-bottom'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header - Mobile-first responsive design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-center mb-8 sm:mb-12'
        >
          <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 sm:mb-4'>
            Welcome back, <span className='text-cyber-purple'>{userStats.name}</span>
          </h1>
          <p className='text-base sm:text-lg md:text-xl text-gray-300'>
            Track your learning journey and achievements
          </p>
        </motion.div>

        {/* Stats Overview - Mobile-first responsive grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className='grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8'
        >
          <div className='bg-black/20 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-purple-500/20 text-center'>
            <Target className='w-6 h-6 sm:w-8 sm:h-8 text-cyber-purple mx-auto mb-2' />
            <div className='text-xl sm:text-2xl font-bold text-white'>{userStats.xp}</div>
            <div className='text-xs sm:text-sm text-gray-400'>Total XP</div>
          </div>

          <div className='bg-black/20 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-purple-500/20 text-center'>
            <TrendingUp className='w-6 h-6 sm:w-8 sm:h-8 text-cyber-cyan mx-auto mb-2' />
            <div className='text-xl sm:text-2xl font-bold text-white'>Level {userStats.level}</div>
            <div className='text-xs sm:text-sm text-gray-400'>Current Level</div>
          </div>

          <div className='bg-black/20 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-purple-500/20 text-center'>
            <Zap className='w-6 h-6 sm:w-8 sm:h-8 text-cyber-pink mx-auto mb-2' />
            <div className='text-xl sm:text-2xl font-bold text-white'>{userStats.streak} days</div>
            <div className='text-xs sm:text-sm text-gray-400'>Current Streak</div>
          </div>

          <div className='bg-black/20 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-purple-500/20 text-center'>
            <Award className='w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 mx-auto mb-2' />
            <div className='text-xl sm:text-2xl font-bold text-white'>{earnedBadges.length}</div>
            <div className='text-xs sm:text-sm text-gray-400'>Badges Earned</div>
          </div>
        </motion.div>

        {/* Progress Bar - Mobile-first responsive design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className='bg-black/20 backdrop-blur-xl rounded-2xl p-4 sm:p-6 md:p-8 border border-purple-500/20 mb-6 sm:mb-8'
        >
          <h2 className='text-lg sm:text-xl md:text-2xl font-bold text-white mb-4'>
            Overall Progress
          </h2>
          <div className='mb-4'>
            <div className='flex flex-col sm:flex-row sm:justify-between text-sm text-gray-300 mb-2 gap-1'>
              <span>Lessons Completed</span>
              <span>
                {completedLessons.length}/{userStats.totalLessons}
              </span>
            </div>
            <div className='w-full bg-gray-700 rounded-full h-3'>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, delay: 0.6 }}
                className='bg-gradient-to-r from-cyber-purple to-cyber-pink h-3 rounded-full'
              />
            </div>
          </div>
          <p className='text-sm sm:text-base text-gray-400'>
            {completedLessons.length === 0
              ? 'Start your first lesson to begin your journey!'
              : `Great progress! ${userStats.totalLessons - completedLessons.length} lessons remaining to complete all content.`}
          </p>
        </motion.div>

        {/* Badges Section - Mobile-first responsive design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className='bg-black/20 backdrop-blur-xl rounded-2xl p-4 sm:p-6 md:p-8 border border-purple-500/20 mb-6 sm:mb-8'
        >
          <h2 className='text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2'>
            <Trophy className='w-5 h-5 sm:w-6 sm:h-6 text-yellow-400' />
            Your Badges
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {earnedBadges.map(badge => (
              <motion.div
                key={badge}
                whileHover={{ scale: 1.05 }}
                className='bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg p-4 border border-yellow-400/30'
              >
                <div className='text-center'>
                  <div className='text-2xl sm:text-3xl mb-2'>
                    <BadgeIcon iconType={badgeData[badge as keyof typeof badgeData]?.icon} />
                  </div>
                  <h3 className='text-base sm:text-lg font-semibold text-white'>
                    {badgeData[badge as keyof typeof badgeData]?.name}
                  </h3>
                  <p className='text-xs sm:text-sm text-gray-300'>
                    {badgeData[badge as keyof typeof badgeData]?.description}
                  </p>
                </div>
              </motion.div>
            ))}
            {earnedBadges.length === 0 && (
              <div className='col-span-full text-center py-6 sm:py-8'>
                <Award className='w-10 h-10 sm:w-12 sm:h-12 text-gray-500 mx-auto mb-4' />
                <p className='text-sm sm:text-base text-gray-400'>
                  Complete lessons to earn your first badge!
                </p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Recent Activity - Mobile-first responsive design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className='bg-black/20 backdrop-blur-xl rounded-2xl p-4 sm:p-6 md:p-8 border border-purple-500/20 mb-6 sm:mb-8'
        >
          <h2 className='text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-2'>
            <Clock className='w-5 h-5 sm:w-6 sm:h-6 text-cyber-cyan' />
            Recent Activity
          </h2>
          <div className='space-y-3 sm:space-y-4'>
            {[
              { lesson: 'JavaScript Variables', date: '2 hours ago', type: 'completed' },
              { lesson: 'HTML Basics', date: '1 day ago', type: 'completed' },
              { lesson: 'CSS Fundamentals', date: '2 days ago', type: 'completed' },
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className='flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-800/50 rounded-lg'
              >
                <div className='w-8 h-8 sm:w-10 sm:h-10 bg-cyber-purple rounded-full flex items-center justify-center flex-shrink-0'>
                  <BookOpen className='w-4 h-4 text-white' />
                </div>
                <div className='flex-1 min-w-0'>
                  <p className='text-white font-medium text-sm sm:text-base truncate'>
                    {activity.lesson}
                  </p>
                  <p className='text-gray-400 text-xs sm:text-sm'>{activity.date}</p>
                </div>
                <span className='bg-green-500 text-white px-2 py-1 rounded text-xs sm:text-sm flex-shrink-0'>
                  Completed
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recommendations - Mobile-first responsive design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className='bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-xl rounded-2xl p-4 sm:p-6 md:p-8 border border-blue-500/30'
        >
          <h2 className='text-lg sm:text-xl md:text-2xl font-bold text-white mb-4'>
            Recommended Next Steps
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='p-4 bg-black/20 rounded-lg'>
              <h3 className='text-base sm:text-lg font-semibold text-white mb-2'>
                Continue Learning
              </h3>
              <p className='text-sm sm:text-base text-gray-300 mb-3'>
                Complete more lessons to advance your skills and earn recognition.
              </p>
              <motion.button
                onClick={handleNavigateToCourses}
                className='w-full bg-cyber-purple hover:bg-cyber-purple/80 text-white px-4 py-3 rounded-lg text-sm sm:text-base min-h-[48px] focus:outline-none focus:ring-2 focus:ring-cyber-cyan focus:ring-offset-2'
                whileHover={{ scale: 1.05 }}
              >
                Browse Courses
              </motion.button>
            </div>
            <div className='p-4 bg-black/20 rounded-lg'>
              <h3 className='text-base sm:text-lg font-semibold text-white mb-2'>Premium Access</h3>
              <p className='text-sm sm:text-base text-gray-300 mb-3'>
                Unlock advanced topics and personalized mentoring support.
              </p>
              <motion.button
                onClick={handleNavigateToPremium}
                className='w-full bg-gradient-to-r from-cyber-purple to-cyber-pink hover:from-dark-purple hover:to-hot-pink text-white px-4 py-3 rounded-lg text-sm sm:text-base min-h-[48px] focus:outline-none focus:ring-2 focus:ring-cyber-cyan focus:ring-offset-2'
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
});

ProgressPage.displayName = 'ProgressPage';

export default ProgressPage;
