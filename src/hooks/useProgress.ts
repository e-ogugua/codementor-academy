import { useEffect, useState } from 'react';
import { lessonsData } from '../data/lessonsData';
import { badgesData } from '../data/badgesData';

export function useProgress() {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);

  useEffect(() => {
    const storedLessons = localStorage.getItem('completedLessons');
    const storedBadges = localStorage.getItem('earnedBadges');

    if (storedLessons) {
      setCompletedLessons(JSON.parse(storedLessons));
    }
    if (storedBadges) {
      setEarnedBadges(JSON.parse(storedBadges));
    }
  }, []);

  const markLessonCompleted = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      const newCompleted = [...completedLessons, lessonId];
      setCompletedLessons(newCompleted);
      localStorage.setItem('completedLessons', JSON.stringify(newCompleted));
      checkBadgeEligibility(newCompleted);
    }
  };

  const checkBadgeEligibility = (completed: string[]) => {
    const newBadges: string[] = [];

    badgesData.forEach(badge => {
      if (!earnedBadges.includes(badge.id)) {
        if (badge.condition === 'Complete your first lesson.' && completed.length >= 1) {
          newBadges.push(badge.id);
        } else if (
          badge.condition.includes('Complete the HTML Basics lesson.') &&
          completed.includes('html-basics')
        ) {
          newBadges.push(badge.id);
        } else if (
          badge.condition.includes('Complete the CSS Styling lesson.') &&
          completed.includes('css-styling')
        ) {
          newBadges.push(badge.id);
        } else if (
          badge.condition.includes('Complete the JavaScript Variables lesson.') &&
          completed.includes('js-variables')
        ) {
          newBadges.push(badge.id);
        } else if (
          badge.condition.includes('Complete the React Components lesson.') &&
          completed.includes('react-components')
        ) {
          newBadges.push(badge.id);
        } else if (
          badge.condition.includes('Complete the Node.js Basics lesson.') &&
          completed.includes('nodejs-server')
        ) {
          newBadges.push(badge.id);
        } else if (
          badge.condition.includes('Complete the Python Loops lesson.') &&
          completed.includes('python-loops')
        ) {
          newBadges.push(badge.id);
        } else if (
          badge.condition.includes('Complete 5 lessons overall.') &&
          completed.length >= 5
        ) {
          newBadges.push(badge.id);
        }
      }
    });

    if (newBadges.length > 0) {
      const updatedBadges = [...earnedBadges, ...newBadges];
      setEarnedBadges(updatedBadges);
      localStorage.setItem('earnedBadges', JSON.stringify(updatedBadges));
    }
  };

  const resetProgress = () => {
    setCompletedLessons([]);
    setEarnedBadges([]);
    localStorage.removeItem('completedLessons');
    localStorage.removeItem('earnedBadges');
  };

  return {
    completedLessons,
    earnedBadges,
    markLessonCompleted,
    resetProgress,
    totalLessons: lessonsData.length,
    completedCount: completedLessons.length,
    badgeCount: earnedBadges.length,
  };
}
