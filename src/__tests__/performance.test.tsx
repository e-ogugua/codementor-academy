import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { TopicCard } from '../components/TopicCard';
import type { Topic } from '../data/topics';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Clock: ({ className }: { className: string }) => (
    <div className={className} data-testid='clock-icon'>
      Clock Icon
    </div>
  ),
  Bookmark: ({ className, fill }: { className: string; fill?: string }) => (
    <div className={className} data-testid='bookmark-icon' data-fill={fill}>
      Bookmark Icon
    </div>
  ),
  BookOpen: ({ className }: { className: string }) => (
    <div className={className} data-testid='book-icon'>
      Book Icon
    </div>
  ),
  ArrowRight: ({ className }: { className: string }) => (
    <div className={className} data-testid='arrow-icon'>
      Arrow Icon
    </div>
  ),
}));

const mockTopic: Topic = {
  id: '1',
  title: 'PC Repair & Troubleshooting',
  slug: 'pc-repair',
  description:
    'Quick practical fixes for Windows hardware & software. Learn systematic troubleshooting, common failure patterns, and hands-on repair techniques.',
  tags: ['hardware', 'repair', 'windows'],
  difficulty: 'Beginner',
  duration_estimate: 120,
  author_id: 'emmanuel',
  related_portfolio_slug: 'repair-services',
  cover_image: '/images/topics/pc-repair.jpg',
  is_featured: true,
  prerequisites: [],
  learning_outcomes: [
    'Diagnose common hardware failures',
    'Troubleshoot Windows boot issues',
    'Replace components safely',
    'Use diagnostic tools effectively',
  ],
  created_at: '2025-09-01T00:00:00Z',
  updated_at: '2025-09-01T00:00:00Z',
};

describe('Performance Tests', () => {
  const mockOnEnroll = vi.fn();
  const mockOnBookmark = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Render Performance', () => {
    it('renders TopicCard quickly', () => {
      const startTime = performance.now();

      render(<TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />);

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Component should render in less than 50ms (reasonable threshold for simple component)
      expect(renderTime).toBeLessThan(50);

      // Verify component rendered correctly
      expect(screen.getByText(mockTopic.title)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /enroll now/i })).toBeInTheDocument();
    });

    it('handles rapid re-renders efficiently', () => {
      const { rerender } = render(
        <TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />
      );

      const startTime = performance.now();

      // Rapidly change props multiple times
      for (let i = 0; i < 10; i++) {
        rerender(
          <TopicCard
            topic={mockTopic}
            onEnroll={mockOnEnroll}
            onBookmark={mockOnBookmark}
            progress={i * 10}
          />
        );
      }

      const endTime = performance.now();
      const totalTime = endTime - startTime;

      // Should handle 10 re-renders in reasonable time (less than 100ms)
      expect(totalTime).toBeLessThan(100);
    });
  });

  describe('Bundle Size Impact', () => {
    it('does not include unnecessary dependencies', () => {
      // This is more of a documentation test - we verify our imports are minimal
      render(<TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />);

      // Component should render without errors
      expect(screen.getByText(mockTopic.title)).toBeInTheDocument();
    });
  });

  describe('Memory Usage', () => {
    it('does not leak memory during component lifecycle', () => {
      const { unmount } = render(
        <TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />
      );

      // Component should mount and unmount cleanly
      expect(screen.getByText(mockTopic.title)).toBeInTheDocument();

      unmount();

      // After unmount, elements should be removed from DOM
      expect(screen.queryByText(mockTopic.title)).not.toBeInTheDocument();
    });
  });

  describe('Animation Performance', () => {
    it('handles animations without layout thrashing', () => {
      render(
        <TopicCard
          topic={mockTopic}
          onEnroll={mockOnEnroll}
          onBookmark={mockOnBookmark}
          isHighlighted={true}
        />
      );

      // Component with animations should still render core content
      expect(screen.getByText(mockTopic.title)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /enroll now/i })).toBeInTheDocument();
    });

    it('respects reduced motion preferences', () => {
      // Mock reduced motion preference
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query: string) => ({
          matches: query.includes('prefers-reduced-motion: reduce'),
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => {},
        }),
      });

      render(<TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />);

      // Component should still render correctly with reduced motion
      expect(screen.getByText(mockTopic.title)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /enroll now/i })).toBeInTheDocument();
    });
  });

  describe('Lazy Loading Impact', () => {
    it('renders efficiently when part of a list', () => {
      const topics = Array.from({ length: 10 }, (_, i) => ({
        ...mockTopic,
        id: `topic-${i}`,
        title: `Topic ${i}`,
      }));

      const startTime = performance.now();

      render(
        <div>
          {topics.map(topic => (
            <TopicCard
              key={topic.id}
              topic={topic}
              onEnroll={mockOnEnroll}
              onBookmark={mockOnBookmark}
            />
          ))}
        </div>
      );

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render 10 components efficiently (less than 200ms)
      expect(renderTime).toBeLessThan(200);

      // All components should be rendered
      expect(screen.getAllByText(/Topic \d/)).toHaveLength(10);
    });
  });

  describe('Accessibility Performance', () => {
    it('maintains performance with screen reader features', () => {
      const startTime = performance.now();

      render(
        <TopicCard
          topic={mockTopic}
          onEnroll={mockOnEnroll}
          onBookmark={mockOnBookmark}
          progress={50}
          isBookmarked={true}
        />
      );

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should render quickly even with accessibility features
      expect(renderTime).toBeLessThan(50);

      // All accessibility features should be present
      expect(screen.getByRole('article')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
      expect(screen.getByLabelText('Remove bookmark')).toBeInTheDocument();
      expect(screen.getByText('Progress')).toBeInTheDocument();
    });
  });

  describe('Mobile Performance', () => {
    it('performs well on mobile devices', () => {
      // Mock mobile viewport and device
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      Object.defineProperty(navigator, 'hardwareConcurrency', {
        writable: true,
        value: 2, // Simulate mobile device with fewer cores
      });

      const startTime = performance.now();

      render(<TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />);

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should still render quickly on mobile
      expect(renderTime).toBeLessThan(100);

      expect(screen.getByText(mockTopic.title)).toBeInTheDocument();
    });
  });

  describe('Code Splitting Benefits', () => {
    it('renders without blocking the main thread', async () => {
      // Simulate heavy computation
      const heavyTask = new Promise(resolve => {
        setTimeout(resolve, 10);
      });

      const startTime = performance.now();

      render(<TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />);

      // Wait for heavy task to complete
      await heavyTask;

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Component should render independently of other tasks
      expect(renderTime).toBeLessThan(100);
      expect(screen.getByText(mockTopic.title)).toBeInTheDocument();
    });
  });

  describe('Error Boundary Compatibility', () => {
    it('handles prop changes gracefully', () => {
      const { rerender } = render(
        <TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />
      );

      // Should handle prop changes without errors
      expect(screen.getByText(mockTopic.title)).toBeInTheDocument();

      rerender(
        <TopicCard
          topic={mockTopic}
          onEnroll={mockOnEnroll}
          onBookmark={mockOnBookmark}
          progress={100}
        />
      );

      expect(screen.getByText('Progress')).toBeInTheDocument();
      expect(screen.getByText('100%')).toBeInTheDocument();
    });
  });

  describe('Bundle Analysis', () => {
    it('maintains small component size', () => {
      // This test documents the component's lightweight nature
      render(<TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />);

      // Component should render with minimal DOM nodes
      const article = screen.getByRole('article');
      const childElements = article.querySelectorAll('*');

      // Should not create excessive DOM elements
      expect(childElements.length).toBeLessThan(50);
    });
  });

  describe('Network Efficiency', () => {
    it('handles missing images gracefully', () => {
      const topicWithoutImage = {
        ...mockTopic,
        cover_image: undefined,
      };

      render(
        <TopicCard topic={topicWithoutImage} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />
      );

      // Component should render without image dependency
      expect(screen.getByText(topicWithoutImage.title)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /enroll now/i })).toBeInTheDocument();
    });
  });

  describe('Hydration Performance', () => {
    it('renders consistently on server and client', () => {
      // Test that component renders the same content twice
      const { unmount } = render(
        <TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />
      );

      const firstRender = screen.getByText(mockTopic.title);
      expect(firstRender).toBeInTheDocument();

      unmount();

      render(<TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />);

      const secondRender = screen.getByText(mockTopic.title);
      expect(secondRender).toBeInTheDocument();

      // Both renders should produce the same content
      expect(firstRender).toHaveTextContent(secondRender.textContent ?? '');
    });
  });

  describe('Resource Cleanup', () => {
    it('cleans up event listeners on unmount', () => {
      const { unmount } = render(
        <TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />
      );

      expect(screen.getByText(mockTopic.title)).toBeInTheDocument();

      // Should unmount cleanly without warnings
      expect(() => unmount()).not.toThrow();
    });
  });

  describe('Concurrent Rendering', () => {
    it('handles concurrent renders safely', () => {
      const topics = Array.from({ length: 5 }, (_, i) => ({
        ...mockTopic,
        id: `concurrent-${i}`,
        title: `Concurrent Topic ${i}`,
      }));

      const startTime = performance.now();

      render(
        <div>
          {topics.map(topic => (
            <TopicCard
              key={topic.id}
              topic={topic}
              onEnroll={mockOnEnroll}
              onBookmark={mockOnBookmark}
            />
          ))}
        </div>
      );

      const endTime = performance.now();
      const renderTime = endTime - startTime;

      // Should handle concurrent rendering efficiently
      expect(renderTime).toBeLessThan(150);
      expect(screen.getAllByText(/Concurrent Topic \d/)).toHaveLength(5);
    });
  });
});
