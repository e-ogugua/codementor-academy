# Component API Reference

This document provides a comprehensive reference for all reusable components in
CodeMentor Academy. Each component includes detailed JSDoc documentation, usage
examples, and accessibility considerations.

## 📁 Component Organization

```
components/
├── ui/              # Base UI primitives
│   ├── TopicCard.tsx        # Individual lesson/course cards
│   ├── MobileNav.tsx        # Mobile navigation with hamburger menu
│   ├── CodingQuiz.tsx       # Interactive quiz component
│   └── ComingSoonModal.tsx  # Modal for upcoming features
├── layout/          # Layout components
│   ├── App.tsx             # Main application layout
│   └── Header.tsx          # Application header (planned)
└── features/        # Feature-specific components
    ├── ProgressPage.tsx    # User progress tracking
    └── QuizPage.tsx        # Quiz page wrapper
```

## 🎨 Base UI Components

### TopicCard

**Location**: `src/components/TopicCard.tsx`

**Purpose**: Displays lesson information in a card format for course listings
and search results.

**Key Features**:

- Mobile-first responsive design
- Touch-friendly interaction targets (44px minimum)
- Progress visualization with animated progress bars
- Bookmark functionality with visual feedback
- Accessibility-first with keyboard navigation

**Props Interface**:

```typescript
interface TopicCardProps {
  /** Lesson data including title, description, and metadata */
  topic: Topic;
  /** Optional callback when user enrolls in lesson */
  onEnroll?: (topicId: string) => void;
  /** Optional callback for bookmark toggle */
  onBookmark?: (topicId: string) => void;
  /** Whether the lesson is bookmarked by user */
  isBookmarked?: boolean;
  /** Completion percentage (0-100) */
  progress?: number;
  /** Whether to highlight the card (search results) */
  isHighlighted?: boolean;
}
```

**Usage Example**:

```tsx
<TopicCard
  topic={lessonData}
  onEnroll={handleEnroll}
  onBookmark={handleBookmark}
  progress={75}
  isBookmarked={true}
  isHighlighted={false}
/>
```

**Accessibility Features**:

- Semantic HTML with proper heading hierarchy
- ARIA attributes for screen reader support
- Keyboard navigation for all interactive elements
- High contrast focus indicators
- Alternative text for all visual elements

---

### MobileNav

**Location**: `src/components/MobileNav.tsx`

**Purpose**: Provides responsive navigation for mobile and tablet devices with
slide-in menu functionality.

**Key Features**:

- Hamburger menu with smooth slide animation
- Backdrop blur for modern visual effect
- Automatic menu closure on route changes
- Touch-optimized button sizing
- Safe area support for modern mobile devices

**Props Interface**:

```typescript
interface MobileNavProps {
  /** Callback function to display "coming soon" modal */
  handleComingSoon: (title: string, description: string) => void;
  /** Function to control the premium modal visibility */
  setShowPremiumModal: (show: boolean) => void;
}
```

**Usage Example**:

```tsx
<MobileNav
  handleComingSoon={handleComingSoon}
  setShowPremiumModal={setShowPremiumModal}
/>
```

**Accessibility Features**:

- ARIA expanded/collapsed states
- Keyboard navigation support
- Focus management with proper tab order
- Screen reader announcements for state changes
- Click-outside-to-close functionality

---

### CodingQuiz

**Location**: `src/components/CodingQuiz.tsx`

**Purpose**: Interactive quiz component with multiple choice questions, progress
tracking, and accessibility features.

**Key Features**:

- Dynamic question progression with visual progress bar
- Immediate feedback with explanations
- Score tracking and completion statistics
- Keyboard navigation support
- Screen reader compatibility

**Props Interface**: Component has no external props (self-contained)

**Usage Example**:

```tsx
import { CodingQuiz } from './components/CodingQuiz';

// Simple usage - component manages its own state
<CodingQuiz />;
```

**Accessibility Features**:

- ARIA roles for quiz structure (role="option", aria-selected)
- Live regions for score updates (aria-live="polite")
- Keyboard shortcuts (Enter/Space for selection)
- Screen reader friendly question format
- High contrast feedback for correct/incorrect answers

---

## 🏗️ Layout Components

### App (Main Layout)

**Location**: `src/App.tsx`

**Purpose**: Root application component providing routing, global state
management, and responsive layout.

**Key Features**:

- React Router v7 with lazy loading for performance
- Global error boundaries and loading states
- Mobile-first responsive header with navigation
- Context providers for global state management
- Accessibility features (skip links, ARIA landmarks)

**Architecture Decisions**:

- **Code splitting**: All route components lazy loaded
- **State management**: Context API for user progress
- **Performance**: React.memo and useCallback optimizations
- **Accessibility**: WCAG 2.1 AA compliance

**Props Interface**: Component has no external props (root component)

---

## 🎯 Feature Components

### ProgressPage

**Location**: `src/pages/ProgressPage.tsx`

**Purpose**: User dashboard displaying learning progress, achievements, and
statistics.

**Key Features**:

- Real-time progress visualization with animated bars
- Badge system with achievement tracking
- Recent activity feed with timestamps
- Responsive stats grid (2 columns on mobile, 4 on desktop)
- Performance optimized with React.memo and useMemo

**Context Integration**:

- Uses `useUserProgress()` hook for global state
- Automatically updates when progress changes
- Persistent data with localStorage backup

**Accessibility Features**:

- Semantic structure with proper headings
- ARIA live regions for dynamic updates
- Keyboard navigation for all interactive elements
- Screen reader friendly progress announcements

---

### QuizPage

**Location**: `src/pages/QuizPage.tsx`

**Purpose**: Dedicated page for the interactive quiz component with proper
routing and layout.

**Key Features**:

- Focused quiz experience without distractions
- Responsive typography and spacing
- Safe area support for mobile devices
- Consistent with application design system

**Props Interface**:

```typescript
// Currently no props - self-contained quiz experience
export function QuizPage() {
  // Component implementation
}
```

---

## 🎪 Modal Components

### ComingSoonModal

**Location**: `src/App.tsx` (inline component)

**Purpose**: Consistent messaging system for features under development.

**Key Features**:

- Backdrop blur for modern visual effect
- Responsive sizing (mobile-optimized)
- Touch-friendly close button
- Accessibility with proper ARIA attributes

**Props Interface**:

```typescript
interface ComingSoonModalProps {
  /** Controls modal visibility */
  isOpen: boolean;
  /** Callback function to close the modal */
  onClose: () => void;
  /** Modal title text */
  title: string;
  /** Detailed description of the feature */
  description: string;
}
```

---

## 🪝 Custom Hooks

### useUserProgress

**Location**: `src/contexts/UserProgressContext.tsx`

**Purpose**: Provides type-safe access to global user progress state management.

**Return Type**:

```typescript
interface UserProgressContextType {
  progress: UserProgress;
  updateProgress: (lessonId: string, completed: boolean) => void;
}
```

**Usage Example**:

```tsx
function Dashboard() {
  const { progress, updateProgress } = useUserProgress();

  const handleLessonComplete = (lessonId: string) => {
    updateProgress(lessonId, true);
  };

  return (
    <div>
      <p>Current level: {progress.stats.level}</p>
      <p>XP earned: {progress.stats.xp}</p>
    </div>
  );
}
```

**Error Handling**: Throws error if used outside UserProgressProvider.

---

## 🎨 Design System Integration

### Responsive Breakpoints

All components follow the mobile-first breakpoint system:

```css
/* Breakpoint scale used throughout the application */
xs: 480px    /* Landscape phones */
sm: 640px    /* Tablets */
md: 768px    /* Small laptops */
lg: 1024px   /* Desktops */
xl: 1280px   /* Large desktops */
```

### Typography Scale

Components use the fluid typography system with clamp() functions:

```css
/* Consistent text sizing across components */
text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem)
text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem)
text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem)
text-xl: clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)
```

### Color System

Consistent color usage across all components:

```css
/* Brand colors with accessibility compliance */
--color-cyber-purple: #8b5cf6 /* Primary, 4.5:1 contrast */
  --color-cyber-pink: #ec4899 /* Secondary, 4.5:1 contrast */
  --color-cyber-cyan: #06b6d4 /* Interactive, 4.5:1 contrast */
  --color-neon-green: #10b981 /* Success, 4.5:1 contrast */;
```

---

## ♿ Accessibility Implementation

### Universal Accessibility Features

All components implement comprehensive accessibility features:

1. **Semantic HTML**: Proper heading hierarchy and landmark elements
2. **ARIA Support**: Screen reader compatibility with meaningful labels
3. **Keyboard Navigation**: Full tab order support with focus management
4. **Color Independence**: Information not conveyed by color alone
5. **Motion Preferences**: Respect for prefers-reduced-motion settings

### Touch Target Compliance

All interactive elements meet accessibility guidelines:

- **Minimum size**: 44px × 44px (48px on mobile)
- **Spacing**: Adequate spacing between touch targets
- **Visual feedback**: Clear hover and focus states
- **Error prevention**: Confirmation for destructive actions

### Performance Considerations

- **Animation performance**: Transform and opacity-only animations
- **Bundle optimization**: Code splitting and lazy loading
- **Memory management**: Proper cleanup of event listeners
- **Loading states**: Accessible loading indicators and progress feedback

---

## 🔄 Component Lifecycle

### Mounting and Updates

**Performance optimizations**:

- Components use React.memo to prevent unnecessary re-renders
- Expensive calculations are memoized with useMemo
- Event handlers are stabilized with useCallback
- Context updates are optimized to minimize cascade re-renders

**Error boundaries**: Components are wrapped in error boundaries for graceful
failure handling

### Unmounting

**Cleanup procedures**:

- Event listeners removed in cleanup functions
- Timers and intervals cleared
- Subscriptions cancelled
- Memory leaks prevented

---

## 🧪 Testing Considerations

### Component Testing Strategy

**Recommended testing approach**:

- **Unit tests**: Individual component behavior with React Testing Library
- **Integration tests**: Component interactions and data flow
- **Accessibility tests**: axe-core integration for WCAG compliance
- **Visual regression**: Screenshot testing for UI consistency

**Testing utilities**:

- React Testing Library for component interaction testing
- Jest for unit test framework
- axe-core for accessibility testing
- MSW (Mock Service Worker) for API mocking

---

## 📚 Further Reading

### Documentation Links

- **Architecture Decisions**: `/docs/architecture-decisions.md`
- **Performance Guide**: `/docs/performance-guide.md`
- **Accessibility Guide**: `/docs/accessibility-guide.md`
- **Contributing Guidelines**: `/CONTRIBUTING.md`

### Learning Resources

- [React Component Patterns](https://react.dev/learn/thinking-in-react)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Framer Motion Documentation](https://www.framer.com/motion/)

---

**Document version**: 1.0.0 **Component coverage**: 100% documented **Last
updated**: October 2025 **Maintained by**: CEO – Chukwuka Emmanuel Ogugua
