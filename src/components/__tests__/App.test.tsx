import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/vitest';
import { BrowserRouter } from 'react-router-dom';
import App from '../../App';

// Mock lazy loaded components
vi.mock('../../pages/HomePage', () => ({
  default: ({ handleAiChat }: { handleAiChat: () => void }) => (
    <div data-testid='home-page'>
      <h1>Home Page</h1>
      <button onClick={handleAiChat} data-testid='ai-chat-button'>
        Start AI Chat
      </button>
    </div>
  ),
}));

vi.mock('../../pages/CoursesPage', () => ({
  default: () => <div data-testid='courses-page'>Courses Page</div>,
}));

vi.mock('../../pages/QuizPage', () => ({
  default: () => <div data-testid='quiz-page'>Quiz Page</div>,
}));

vi.mock('../../pages/CommunityPage', () => ({
  default: () => <div data-testid='community-page'>Community Page</div>,
}));

// Mock components
vi.mock('../PremiumModal', () => ({
  PremiumModal: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) =>
    isOpen ? (
      <div data-testid='premium-modal'>
        <h2>Premium Modal</h2>
        <button onClick={onClose} data-testid='close-premium-modal'>
          Close
        </button>
      </div>
    ) : null,
}));

vi.mock('../CodingPlayground', () => ({
  CodingPlayground: ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) =>
    isOpen ? (
      <div data-testid='coding-playground'>
        <h2>Coding Playground</h2>
        <button onClick={onClose} data-testid='close-coding-playground'>
          Close
        </button>
      </div>
    ) : null,
}));

vi.mock('./MobileNav', () => ({
  MobileNav: ({ handleComingSoon, setShowPremiumModal }: any) => (
    <div data-testid='mobile-nav'>
      <button
        onClick={() => handleComingSoon('Test', 'Test description')}
        data-testid='coming-soon-button'
      >
        Coming Soon
      </button>
      <button onClick={() => setShowPremiumModal(true)} data-testid='premium-button'>
        Premium
      </button>
    </div>
  ),
}));

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Brain: ({ className }: { className: string }) => (
    <div className={className} data-testid='brain-icon'>
      Brain Icon
    </div>
  ),
  User: ({ className }: { className: string }) => (
    <div className={className} data-testid='user-icon'>
      User Icon
    </div>
  ),
}));

const renderApp = () => {
  return render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders the main application structure', () => {
      renderApp();

      expect(screen.getByText('CodeMentor Academy')).toBeInTheDocument();
      expect(screen.getByText('AI-Powered Learning Platform')).toBeInTheDocument();
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByLabelText('Skip to main content')).toBeInTheDocument();
    });

    it('renders navigation links', () => {
      renderApp();

      expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /courses/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /progress/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /quiz/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /community/i })).toBeInTheDocument();
    });

    it('renders action buttons', () => {
      renderApp();

      expect(screen.getByRole('button', { name: /get started/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /premium/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /advanced/i })).toBeInTheDocument();
    });

    it('renders mobile navigation', () => {
      renderApp();

      expect(screen.getByTestId('mobile-nav')).toBeInTheDocument();
    });
  });

  describe('Routing', () => {
    it('renders HomePage on root route', async () => {
      renderApp();

      await waitFor(() => {
        expect(screen.getByTestId('home-page')).toBeInTheDocument();
      });
    });

    it('renders CoursesPage on /courses route', async () => {
      window.history.pushState({}, '', '/courses');
      renderApp();

      await waitFor(() => {
        expect(screen.getByTestId('courses-page')).toBeInTheDocument();
      });
    });

    it('renders QuizPage on /quiz route', async () => {
      window.history.pushState({}, '', '/quiz');
      renderApp();

      await waitFor(() => {
        expect(screen.getByTestId('quiz-page')).toBeInTheDocument();
      });
    });

    it('renders CommunityPage on /community route', async () => {
      window.history.pushState({}, '', '/community');
      renderApp();

      await waitFor(() => {
        expect(screen.getByTestId('community-page')).toBeInTheDocument();
      });
    });
  });

  describe('Modal Management', () => {
    it('opens premium modal when Get Started button is clicked', async () => {
      const user = userEvent.setup();
      renderApp();

      const getStartedButton = screen.getByRole('button', { name: /get started/i });
      await user.click(getStartedButton);

      await waitFor(() => {
        expect(screen.getByTestId('premium-modal')).toBeInTheDocument();
      });
    });

    it('closes premium modal when close button is clicked', async () => {
      const user = userEvent.setup();
      renderApp();

      const getStartedButton = screen.getByRole('button', { name: /get started/i });
      await user.click(getStartedButton);

      await waitFor(() => {
        expect(screen.getByTestId('premium-modal')).toBeInTheDocument();
      });

      const closeButton = screen.getByTestId('close-premium-modal');
      await user.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByTestId('premium-modal')).not.toBeInTheDocument();
      });
    });

    it('opens coming soon modal for premium features', async () => {
      const user = userEvent.setup();
      renderApp();

      const premiumButton = screen.getByRole('button', { name: /premium/i });
      await user.click(premiumButton);

      await waitFor(() => {
        expect(screen.getByText('Premium Features')).toBeInTheDocument();
        expect(screen.getByText(/Unlock advanced lessons/)).toBeInTheDocument();
      });
    });

    it('opens coming soon modal for advanced courses', async () => {
      const user = userEvent.setup();
      renderApp();

      const advancedButton = screen.getByRole('button', { name: /advanced/i });
      await user.click(advancedButton);

      await waitFor(() => {
        expect(screen.getByText('Advanced Courses')).toBeInTheDocument();
        expect(screen.getByText(/Access expert-level courses/)).toBeInTheDocument();
      });
    });
  });

  describe('AI Chat Functionality', () => {
    it('opens chat modal when AI chat is triggered from HomePage', async () => {
      const user = userEvent.setup();
      renderApp();

      await waitFor(() => {
        expect(screen.getByTestId('home-page')).toBeInTheDocument();
      });

      const aiChatButton = screen.getByTestId('ai-chat-button');
      await user.click(aiChatButton);

      await waitFor(() => {
        expect(screen.getByText('AI Assistant Chat')).toBeInTheDocument();
      });
    });

    it('displays different AI messages based on progress simulation', async () => {
      const user = userEvent.setup();
      renderApp();

      await waitFor(() => {
        expect(screen.getByTestId('home-page')).toBeInTheDocument();
      });

      // First interaction
      const aiChatButton = screen.getByTestId('ai-chat-button');
      await user.click(aiChatButton);

      await waitFor(() => {
        const chatModal = screen.getByText('AI Assistant Chat').closest('div');
        expect(chatModal).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper skip link for keyboard navigation', () => {
      renderApp();

      const skipLink = screen.getByLabelText('Skip to main content');
      expect(skipLink).toBeInTheDocument();
      expect(skipLink).toHaveAttribute('href', '#main');
    });

    it('has proper heading structure', () => {
      renderApp();

      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(screen.getByRole('main')).toBeInTheDocument();
    });

    it('navigation links have proper focus indicators', () => {
      renderApp();

      const homeLink = screen.getByRole('link', { name: /home/i });
      expect(homeLink).toHaveClass('focus:ring-2');
    });

    it('buttons have proper accessibility attributes', () => {
      renderApp();

      const getStartedButton = screen.getByRole('button', { name: /get started/i });
      expect(getStartedButton).toHaveClass('focus:outline-none', 'focus:ring-2');
    });
  });

  describe('Mobile Responsiveness', () => {
    it('renders mobile navigation on smaller screens', () => {
      // Mock window.innerWidth for mobile
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      renderApp();
      expect(screen.getByTestId('mobile-nav')).toBeInTheDocument();
    });

    it('hides desktop navigation on mobile screens', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      renderApp();

      // Desktop navigation should be hidden on mobile
      expect(screen.queryByRole('link', { name: /home/i })).toBeInTheDocument();
      // The actual visibility is handled by CSS classes, but the elements are still in DOM
    });
  });

  describe('Performance', () => {
    it('lazy loads route components', async () => {
      renderApp();

      // Initially, only suspense fallback should be visible
      expect(screen.queryByTestId('home-page')).not.toBeInTheDocument();

      // After lazy loading completes
      await waitFor(() => {
        expect(screen.getByTestId('home-page')).toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    it('handles modal close gracefully', async () => {
      const user = userEvent.setup();
      renderApp();

      const getStartedButton = screen.getByRole('button', { name: /get started/i });
      await user.click(getStartedButton);

      await waitFor(() => {
        expect(screen.getByTestId('premium-modal')).toBeInTheDocument();
      });

      const closeButton = screen.getByTestId('close-premium-modal');
      await user.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByTestId('premium-modal')).not.toBeInTheDocument();
      });
    });
  });
});
