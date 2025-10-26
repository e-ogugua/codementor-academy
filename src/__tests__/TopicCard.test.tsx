import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { TopicCard } from '../components/TopicCard';

const mockTopic = {
  id: '1',
  title: 'PC Repair & Troubleshooting',
  slug: 'pc-repair',
  description:
    'Quick practical fixes for Windows hardware & software. Learn systematic troubleshooting, common failure patterns, and hands-on repair techniques.',
  tags: ['hardware', 'repair', 'windows'],
  difficulty: 'Beginner' as const,
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
} as any;

const mockTopicWithPrerequisites = {
  ...mockTopic,
  id: '2',
  title: 'Advanced React Patterns',
  slug: 'advanced-react',
  difficulty: 'Advanced' as const,
  prerequisites: ['JavaScript', 'React Basics', 'TypeScript'],
  price: '$99',
  originalPrice: '$149',
} as any;

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

describe('TopicCard', () => {
  const mockOnEnroll = vi.fn();
  const mockOnBookmark = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders topic information correctly', () => {
      render(<TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />);

      expect(screen.getByRole('article')).toBeInTheDocument();
      expect(screen.getByText(mockTopic.title)).toBeInTheDocument();
      expect(screen.getByText(mockTopic.description)).toBeInTheDocument();
      expect(screen.getByText('Beginner')).toBeInTheDocument();
      expect(screen.getByText('Featured')).toBeInTheDocument();
      expect(screen.getByText('$39')).toBeInTheDocument();
    });

    it('renders difficulty badge with correct styling', () => {
      render(<TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />);

      const difficultyBadge = screen.getByText('Beginner');
      expect(difficultyBadge).toHaveClass('bg-green-500/20', 'text-green-400');
    });

    it('renders featured badge when topic is featured', () => {
      render(<TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />);

      const featuredBadge = screen.getByText('Featured');
      expect(featuredBadge).toHaveClass('bg-cyber-purple/20', 'text-cyber-purple');
    });

    it('renders tags correctly', () => {
      render(<TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />);

      expect(screen.getByText('hardware')).toBeInTheDocument();
      expect(screen.getByText('repair')).toBeInTheDocument();
      expect(screen.getByText('windows')).toBeInTheDocument();
    });

    it('shows "+X more" when there are more than 3 tags', () => {
      const topicWithManyTags = {
        ...mockTopic,
        tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5'],
      };

      render(
        <TopicCard topic={topicWithManyTags} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />
      );

      expect(screen.getByText('+2 more')).toBeInTheDocument();
    });

    it('renders duration and learning outcomes correctly', () => {
      render(<TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />);

      expect(screen.getByText('2h 0m')).toBeInTheDocument();
      expect(screen.getByText('4 outcomes')).toBeInTheDocument();
    });

    it('renders pricing information correctly', () => {
      render(
        <TopicCard
          topic={mockTopicWithPrerequisites}
          onEnroll={mockOnEnroll}
          onBookmark={mockOnBookmark}
        />
      );

      expect(screen.getByText('$99')).toBeInTheDocument();
      expect(screen.getByText('$149')).toBeInTheDocument();
    });

    it('renders prerequisites when available', () => {
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
      expect(screen.getByText('+1 more')).toBeInTheDocument();
    });

    it('does not render prerequisites section when no prerequisites', () => {
      render(<TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />);

      expect(screen.queryByText('Prerequisites:')).not.toBeInTheDocument();
    });
  });

  describe('Progress Display', () => {
    it('renders progress bar when progress > 0', () => {
      render(
        <TopicCard
          topic={mockTopic}
          onEnroll={mockOnEnroll}
          onBookmark={mockOnBookmark}
          progress={50}
        />
      );

      expect(screen.getByText('Progress')).toBeInTheDocument();
      expect(screen.getByText('50%')).toBeInTheDocument();
      expect(screen.getByRole('progressbar', { hidden: true })).toBeInTheDocument();
    });

    it('does not render progress section when progress = 0', () => {
      render(
        <TopicCard
          topic={mockTopic}
          onEnroll={mockOnEnroll}
          onBookmark={mockOnBookmark}
          progress={0}
        />
      );

      expect(screen.queryByText('Progress')).not.toBeInTheDocument();
      expect(screen.queryByRole('progressbar', { hidden: true })).not.toBeInTheDocument();
    });

    it('sets progress bar width correctly', () => {
      render(
        <TopicCard
          topic={mockTopic}
          onEnroll={mockOnEnroll}
          onBookmark={mockOnBookmark}
          progress={75}
        />
      );

      const progressBar = screen.getByRole('progressbar', { hidden: true });
      expect(progressBar).toHaveStyle({ width: '75%' });
    });
  });

  describe('Interactions', () => {
    it('calls onEnroll when enroll button is clicked', async () => {
      const user = userEvent.setup();
      render(<TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />);

      const enrollButton = screen.getByRole('button', { name: /enroll now/i });
      await user.click(enrollButton);

      expect(mockOnEnroll).toHaveBeenCalledWith(mockTopic.id);
    });

    it('calls onBookmark when bookmark button is clicked', async () => {
      const user = userEvent.setup();
      render(<TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />);

      const bookmarkButton = screen.getByLabelText('Add bookmark');
      await user.click(bookmarkButton);

      expect(mockOnBookmark).toHaveBeenCalledWith(mockTopic.id);
    });

    it('shows correct bookmark button state', () => {
      const { rerender } = render(
        <TopicCard
          topic={mockTopic}
          onEnroll={mockOnEnroll}
          onBookmark={mockOnBookmark}
          isBookmarked={false}
        />
      );

      let bookmarkButton = screen.getByLabelText('Add bookmark');
      expect(bookmarkButton).toHaveClass('text-gray-400');

      rerender(
        <TopicCard
          topic={mockTopic}
          onEnroll={mockOnEnroll}
          onBookmark={mockOnBookmark}
          isBookmarked={true}
        />
      );

      bookmarkButton = screen.getByLabelText('Remove bookmark');
      expect(bookmarkButton).toHaveClass('text-cyber-purple');
    });

    it('handles keyboard navigation for enroll button', async () => {
      const user = userEvent.setup();
      render(<TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />);

      const enrollButton = screen.getByRole('button', { name: /enroll now/i });
      enrollButton.focus();
      expect(enrollButton).toHaveFocus();

      await user.keyboard('{Enter}');
      expect(mockOnEnroll).toHaveBeenCalledWith(mockTopic.id);
    });

    it('handles keyboard navigation for bookmark button', async () => {
      const user = userEvent.setup();
      render(<TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />);

      const bookmarkButton = screen.getByLabelText('Add bookmark');
      bookmarkButton.focus();
      expect(bookmarkButton).toHaveFocus();

      await user.keyboard('{Enter}');
      expect(mockOnBookmark).toHaveBeenCalledWith(mockTopic.id);
    });

    it('handles space key for keyboard navigation', async () => {
      const user = userEvent.setup();
      render(<TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />);

      const enrollButton = screen.getByRole('button', { name: /enroll now/i });
      enrollButton.focus();
      await user.keyboard(' ');

      expect(mockOnEnroll).toHaveBeenCalledWith(mockTopic.id);
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />);

      const article = screen.getByRole('article');
      expect(article).toHaveAttribute('aria-labelledby', `topic-${mockTopic.id}-title`);

      const title = screen.getByRole('heading', { level: 3 });
      expect(title).toHaveAttribute('id', `topic-${mockTopic.id}-title`);
    });

    it('bookmark button has proper aria-label', () => {
      render(
        <TopicCard
          topic={mockTopic}
          onEnroll={mockOnEnroll}
          onBookmark={mockOnBookmark}
          isBookmarked={false}
        />
      );

      const bookmarkButton = screen.getByLabelText('Add bookmark');
      expect(bookmarkButton).toBeInTheDocument();

      // Test bookmarked state
      render(
        <TopicCard
          topic={mockTopic}
          onEnroll={mockOnEnroll}
          onBookmark={mockOnBookmark}
          isBookmarked={true}
        />
      );

      const bookmarkedButton = screen.getByLabelText('Remove bookmark');
      expect(bookmarkedButton).toBeInTheDocument();
    });

    it('has proper focus indicators', () => {
      render(<TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />);

      const enrollButton = screen.getByRole('button', { name: /enroll now/i });
      expect(enrollButton).toHaveClass('focus:ring-2', 'focus:ring-cyber-cyan');

      const bookmarkButton = screen.getByLabelText('Add bookmark');
      expect(bookmarkButton).toHaveClass('focus:ring-2', 'focus:ring-cyber-cyan');
    });

    it('has proper heading structure', () => {
      render(<TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />);

      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent(mockTopic.title);
    });

    it('buttons have minimum touch target size', () => {
      render(<TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />);

      const enrollButton = screen.getByRole('button', { name: /enroll now/i });
      expect(enrollButton).toHaveClass('min-h-[48px]');

      const bookmarkButton = screen.getByLabelText('Add bookmark');
      expect(bookmarkButton).toHaveClass('min-h-[44px]', 'min-w-[44px]');
    });
  });

  describe('Styling and Animations', () => {
    it('applies highlight styles when isHighlighted is true', () => {
      render(
        <TopicCard
          topic={mockTopic}
          onEnroll={mockOnEnroll}
          onBookmark={mockOnBookmark}
          isHighlighted={true}
        />
      );

      const article = screen.getByRole('article');
      expect(article).toHaveClass('border-cyber-cyan', 'ring-2', 'ring-cyber-cyan/30');
    });

    it('applies hover styles correctly', () => {
      render(<TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />);

      const article = screen.getByRole('article');
      expect(article).toHaveClass('hover:border-purple-400/40');

      const title = screen.getByRole('heading', { level: 3 });
      expect(title).toHaveClass('group-hover:text-cyber-cyan');
    });

    it('applies difficulty-based colors correctly', () => {
      render(<TopicCard topic={mockTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />);

      let difficultyBadge = screen.getByText('Beginner');
      expect(difficultyBadge).toHaveClass('bg-green-500/20', 'text-green-400');

      const intermediateTopic = { ...mockTopic, difficulty: 'Intermediate' as const };
      render(
        <TopicCard topic={intermediateTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />
      );

      difficultyBadge = screen.getByText('Intermediate');
      expect(difficultyBadge).toHaveClass('bg-yellow-500/20', 'text-yellow-400');

      const advancedTopic = { ...mockTopic, difficulty: 'Advanced' as const };
      render(
        <TopicCard topic={advancedTopic} onEnroll={mockOnEnroll} onBookmark={mockOnBookmark} />
      );

      difficultyBadge = screen.getByText('Advanced');
      expect(difficultyBadge).toHaveClass('bg-red-500/20', 'text-red-400');
    });
  });

  describe('Edge Cases', () => {
    it('handles missing optional props gracefully', () => {
      render(<TopicCard topic={mockTopic} />);

      expect(screen.getByText(mockTopic.title)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /enroll now/i })).toBeInTheDocument();
      expect(screen.getByLabelText('Add bookmark')).toBeInTheDocument();
    });

    it('handles long descriptions with line clamping', () => {
      const topicWithLongDescription = {
        ...mockTopic,
        description:
          'This is a very long description that should be clamped to two lines and show ellipsis at the end when it exceeds the maximum length allowed by the CSS line-clamp utility class.',
      };

      render(
        <TopicCard
          topic={topicWithLongDescription}
          onEnroll={mockOnEnroll}
          onBookmark={mockOnBookmark}
        />
      );

      const description = screen.getByText(topicWithLongDescription.description);
      expect(description).toHaveClass('line-clamp-2');
    });

    it('handles zero duration correctly', () => {
      const topicWithZeroDuration = {
        ...mockTopic,
        duration_estimate: 0,
      };

      render(
        <TopicCard
          topic={topicWithZeroDuration}
          onEnroll={mockOnEnroll}
          onBookmark={mockOnBookmark}
        />
      );

      expect(screen.getByText('0h 0m')).toBeInTheDocument();
    });
  });
});
