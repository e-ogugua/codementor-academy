import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';

/**
 * User progress data structure for global state management.
 *
 * Tracks user learning progress including completed lessons, experience points,
 * skill level progression, and earned achievements. Persisted to localStorage
 * for data continuity across browser sessions.
 */
interface UserProgress {
  /** Array of completed lesson identifiers */
  completedLessons: string[];
  /** Calculated user statistics based on progress */
  stats: {
    /** Display name of the user */
    name: string;
    /** Experience points earned (100 XP per lesson) */
    xp: number;
    /** Current skill level (calculated from total XP) */
    level: number;
    /** Consecutive learning days (capped at 7) */
    streak: number;
    /** Array of earned badge identifiers */
    badges: string[];
    /** Total number of available lessons */
    totalLessons: number;
  };
}

/**
 * Context type definition for user progress management.
 *
 * Provides both the current progress state and methods to update progress.
 * Used throughout the application for consistent user data management.
 */
interface UserProgressContextType {
  /** Current user progress state */
  progress: UserProgress;
  /** Function to update lesson completion status */
  updateProgress: (lessonId: string, completed: boolean) => void;
}

/**
 * React Context for global user progress state management.
 *
 * Provides a centralized way to manage user learning progress across the entire
 * application. Eliminates prop drilling while maintaining type safety and
 * performance optimization through proper state management.
 *
 * @see UserProgressProvider for the provider implementation
 * @see useUserProgress for the consumer hook
 */
const UserProgressContext = createContext<UserProgressContextType | undefined>(undefined);

/**
 * Custom hook for accessing user progress context.
 *
 * Provides type-safe access to global user progress state and update functions.
 * Must be used within a UserProgressProvider component.
 *
 * @returns UserProgressContextType containing progress state and update functions
 * @throws Error if used outside of UserProgressProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { progress, updateProgress } = useUserProgress();
 *
 *   const handleLessonComplete = (lessonId: string) => {
 *     updateProgress(lessonId, true);
 *   };
 *
 *   return <div>Level: {progress.stats.level}</div>;
 * }
 * ```
 */
export const useUserProgress = () => {
  const context = useContext(UserProgressContext);
  if (!context) {
    throw new Error('useUserProgress must be used within UserProgressProvider');
  }
  return context;
};

/**
 * Props interface for the UserProgressProvider component.
 *
 * Defines the children prop for React component composition.
 */
interface UserProgressProviderProps {
  /** Child components that will have access to user progress context */
  children: ReactNode;
}

/**
 * Provider component for user progress state management.
 *
 * Manages global user progress state with persistence to localStorage.
 * Handles progress updates, badge calculations, and XP/level progression.
 * Provides context to all child components through useUserProgress hook.
 *
 * Architecture decisions:
 * - Context API chosen for simplicity over Redux for this use case
 * - localStorage persistence ensures data survives browser refreshes
 * - Automatic badge calculation based on lesson completion milestones
 * - Performance optimized with proper state management
 *
 * @param props - UserProgressProviderProps containing child components
 * @returns JSX provider component wrapping children with progress context
 *
 * @example
 * ```tsx
 * <UserProgressProvider>
 *   <App />
 * </UserProgressProvider>
 * ```
 */
export const UserProgressProvider = ({ children }: UserProgressProviderProps) => {
  const [progress, setProgress] = useState<UserProgress>({
    completedLessons: [],
    stats: {
      name: 'Emmanuel',
      xp: 0,
      level: 1,
      streak: 0,
      badges: [],
      totalLessons: 20,
    },
  });

  // Load progress from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('completedLessons');
    if (saved) {
      const completed = JSON.parse(saved);
      setProgress(prev => ({
        ...prev,
        completedLessons: completed,
        stats: {
          ...prev.stats,
          xp: completed.length * 100,
          level: Math.floor((completed.length * 100) / 500) + 1,
          streak: Math.min(completed.length, 7),
        },
      }));
    }
  }, []);

  // Update progress and persist to localStorage
  // Optimized to avoid unnecessary calculations
  const updateProgress = (lessonId: string, completed: boolean) => {
    setProgress(prev => {
      let newCompletedLessons;
      if (completed) {
        newCompletedLessons = [...prev.completedLessons, lessonId];
      } else {
        newCompletedLessons = prev.completedLessons.filter(id => id !== lessonId);
      }

      // Persist to localStorage for data persistence
      localStorage.setItem('completedLessons', JSON.stringify(newCompletedLessons));

      // Calculate new stats based on completed lessons
      const lessonCount = newCompletedLessons.length;
      const newBadges: string[] = [];
      if (lessonCount > 0) newBadges.push('first-steps');
      if (lessonCount >= 5) newBadges.push('learner');
      if (lessonCount >= 10) newBadges.push('achiever');

      return {
        ...prev,
        completedLessons: newCompletedLessons,
        stats: {
          ...prev.stats,
          xp: lessonCount * 100,
          level: Math.floor((lessonCount * 100) / 500) + 1,
          streak: Math.min(lessonCount, 7),
          badges: newBadges,
        },
      };
    });
  };

  const value = {
    progress,
    updateProgress,
  };

  return <UserProgressContext.Provider value={value}>{children}</UserProgressContext.Provider>;
};
