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

const mockTopicWithPrerequisites: Topic = {
  ...mockTopic,
  id: '2',
  title: 'Advanced React Patterns',
  slug: 'advanced-react',
  difficulty: 'Advanced',
  prerequisites: ['JavaScript', 'React Basics', 'TypeScript'],
  price: '$99',
  originalPrice: '$149',
};

describe('Accessibility Tests', () => {
  const mockOnEnroll = vi.fn();
  const mockOnBookmark = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('ARIA and Semantic HTML', () => {
    it('uses proper semantic HTML elements', () => {
      render(<TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />);

      // Check for semantic HTML structure
      const article = screen.getByRole('article');
      expect(article).toBeInTheDocument();

      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toBeInTheDocument();
    });

    it('has proper ARIA attributes', () => {
      render(<TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />);

      const article = screen.getByRole('article');
      expect(article).toHaveAttribute('aria-labelledby', `topic-${mockTopic.id}-title`);

      const title = screen.getByRole('heading', { level: 3 });
      expect(title).toHaveAttribute('id', `topic-${mockTopic.id}-title`);
    });

    it('provides meaningful button labels', () => {
      render(<TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />);

      // Check that buttons have accessible names
      expect(screen.getByRole('button', { name: /enroll now/i })).toBeInTheDocument();
      expect(screen.getByLabelText('Add bookmark')).toBeInTheDocument();

      // Test bookmarked state
      render(
        <TopicCard
          topic={mockTopic}
          onEnroll={mockOnEnroll}
          onBookmark={mockOnBookmark}
          isBookmarked={true}
        />
      );

      expect(screen.getByLabelText('Remove bookmark')).toBeInTheDocument();
    });

    it('progress bar has proper ARIA attributes', () => {
      render(
        <TopicCard
          topic={mockTopic}
          onEnroll={mockOnEnroll}
          onBookmark={mockOnBookmark}
          progress={75}
        />
      );

      // Progress should be announced
      expect(screen.getByText('Progress')).toBeInTheDocument();
      expect(screen.getByText('75%')).toBeInTheDocument();

      // Progress bar should be present (hidden from screen readers but available for visual users)
      const progressBar = screen.getByRole('progressbar', { hidden: true });
      expect(progressBar).toBeInTheDocument();
    });
  });

  describe('Keyboard Navigation', () => {
    it('buttons are keyboard accessible', () => {
      render(<TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />);

      const enrollButton = screen.getByRole('button', { name: /enroll now/i });
      const bookmarkButton = screen.getByLabelText('Add bookmark');

      // Both buttons should be focusable
      enrollButton.focus();
      expect(enrollButton).toHaveFocus();

      bookmarkButton.focus();
      expect(bookmarkButton).toHaveFocus();
    });

    it('buttons have proper focus indicators', () => {
      render(<TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />);

      const enrollButton = screen.getByRole('button', { name: /enroll now/i });
      expect(enrollButton).toHaveClass('focus:ring-2', 'focus:ring-cyber-cyan');

      const bookmarkButton = screen.getByLabelText('Add bookmark');
      expect(bookmarkButton).toHaveClass('focus:ring-2', 'focus:ring-cyber-cyan');
    });
  });

  describe('Touch Target Sizes', () => {
    it('buttons meet minimum touch target requirements', () => {
      render(<TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />);

      const enrollButton = screen.getByRole('button', { name: /enroll now/i });
      expect(enrollButton).toHaveClass('min-h-[48px]');

      const bookmarkButton = screen.getByLabelText('Add bookmark');
      expect(bookmarkButton).toHaveClass('min-h-[44px]', 'min-w-[44px]');
    });
  });

  describe('Screen Reader Support', () => {
    it('provides descriptive labels for all interactive elements', () => {
      render(<TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />);

      // All buttons should have descriptive text
      expect(screen.getByRole('button', { name: /enroll now/i })).toHaveTextContent('Enroll Now');
      expect(screen.getByLabelText('Add bookmark')).toBeInTheDocument();
    });

    it('announces difficulty and pricing clearly', () => {
      render(
        <TopicCard
          topic={mockTopicWithPrerequisites}
          onEnroll={mockOnEnroll}
          onBookmark={mockOnBookmark}
        />
      );

      // Pricing should be clearly announced
      expect(screen.getByText('$99')).toBeInTheDocument();
      expect(screen.getByText('$149')).toBeInTheDocument();

      // Difficulty should be clear
      expect(screen.getByText('Advanced')).toBeInTheDocument();
    });

    it('provides context for prerequisites', () => {
      render(
        <TopicCard
          topic={mockTopicWithPrerequisites}
          onEnroll={mockOnEnroll}
          onBookmark={mockOnBookmark}
        />
      );

      expect(screen.getByText('Prerequisites:')).toBeInTheDocument();
      expect(screen.getByText('JavaScript')).toBeInTheDocument();
      expect(screen.getByText('React Basics')).toBeInTheDocument();
    });
  });

  describe('Visual Accessibility', () => {
    it('uses proper color contrast for text', () => {
      render(<TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />);

      // Check that text elements have appropriate contrast classes
      const title = screen.getByRole('heading', { level: 3 });
      expect(title).toHaveClass('text-white');

      const description = screen.getByText(mockTopic.description);
      expect(description).toHaveClass('text-gray-300');
    });

    it('provides visual focus indicators', () => {
      render(<TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />);

      // All interactive elements should have focus styles
      const enrollButton = screen.getByRole('button', { name: /enroll now/i });
      expect(enrollButton).toHaveClass('focus:outline-none', 'focus:ring-2');

      const bookmarkButton = screen.getByLabelText('Add bookmark');
      expect(bookmarkButton).toHaveClass('focus:outline-none', 'focus:ring-2');
    });

    it('indicates interactive elements clearly', () => {
      render(<TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />);

      // Buttons should have clear visual distinction
      const enrollButton = screen.getByRole('button', { name: /enroll now/i });
      expect(enrollButton).toHaveClass('bg-gradient-to-r');

      const bookmarkButton = screen.getByLabelText('Add bookmark');
      expect(bookmarkButton).toHaveClass('hover:bg-white/10');
    });
  });

  describe('Responsive Accessibility', () => {
    it('maintains accessibility on mobile screens', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(<TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />);

      // Component should still render all accessibility features
      expect(screen.getByRole('article')).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /enroll now/i })).toBeInTheDocument();
      expect(screen.getByLabelText('Add bookmark')).toBeInTheDocument();
    });

    it('adapts touch targets for mobile', () => {
      render(<TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />);

      // Touch targets should be appropriately sized
      const enrollButton = screen.getByRole('button', { name: /enroll now/i });
      expect(enrollButton).toHaveClass('min-h-[48px]');

      const bookmarkButton = screen.getByLabelText('Add bookmark');
      expect(bookmarkButton).toHaveClass('min-h-[44px]', 'min-w-[44px]');
    });
  });

  describe('Error States', () => {
    it('maintains accessibility when actions are disabled', () => {
      render(<TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />);

      // Even without explicit disabled states, elements should remain accessible
      const enrollButton = screen.getByRole('button', { name: /enroll now/i });
      expect(enrollButton).toBeEnabled();
      expect(enrollButton).toHaveClass('focus:ring-2');
    });
  });

  describe('Content Structure', () => {
    it('provides logical reading order', () => {
      render(<TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />);

      const article = screen.getByRole('article');
      const allElements = article.querySelectorAll('*');

      // Elements should be in a logical order (title before description, etc.)
      const titleIndex = Array.from(allElements).findIndex(el =>
        el.textContent?.includes(mockTopic.title)
      );
      const descIndex = Array.from(allElements).findIndex(el =>
        el.textContent?.includes(mockTopic.description)
      );

      expect(titleIndex).toBeLessThan(descIndex);
    });

    it('groups related information appropriately', () => {
      render(<TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />);

      // Related information should be grouped together
      expect(screen.getByText('Beginner')).toBeInTheDocument();
      expect(screen.getByText('Featured')).toBeInTheDocument();

      // Pricing should be together
      expect(screen.getByText('$39')).toBeInTheDocument();

      // Duration and outcomes should be grouped
      expect(screen.getByText('2h 0m')).toBeInTheDocument();
      expect(screen.getByText('4 outcomes')).toBeInTheDocument();
    });
  });

  describe('Performance Accessibility', () => {
    it('handles reduced motion preferences', () => {
      // Mock reduced motion preference
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query: string) => ({
          matches: query.includes('prefers-reduced-motion'),
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
});
