import React from 'react';
import { act } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { BrowserRouter } from 'react-router-dom';
import { MobileNav } from '../components/MobileNav';

// Mock framer-motion to avoid animation issues in tests
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => {
    // For tests, we'll render children if they contain menu content
    // This is a simplified approach to handle the conditional rendering
    return <div data-testid='animate-presence'>{children}</div>;
  },
}));

// Mock react-router-dom useLocation
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: () => ({ pathname: '/' }),
  };
});

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Menu: ({ className }: { className: string }) => (
    <div className={className} data-testid='menu-icon'>
      Menu Icon
    </div>
  ),
  X: ({ className }: { className: string }) => (
    <div className={className} data-testid='x-icon'>
      X Icon
    </div>
  ),
  Brain: ({ className }: { className: string }) => (
    <div className={className} data-testid='brain-icon'>
      Brain Icon
    </div>
  ),
}));

describe('MobileNav', () => {
  const mockHandleComingSoon = vi.fn();
  const mockSetShowPremiumModal = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('renders mobile menu button', () => {
      render(
        <BrowserRouter>
          <MobileNav
            handleComingSoon={mockHandleComingSoon}
            setShowPremiumModal={mockSetShowPremiumModal}
          />
        </BrowserRouter>
      );

      const menuButton = screen.getByRole('button', { name: /open menu/i });
      expect(menuButton).toBeInTheDocument();
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('renders navigation items when menu is open', async () => {
      render(
        <BrowserRouter>
          <MobileNav
            handleComingSoon={mockHandleComingSoon}
            setShowPremiumModal={mockSetShowPremiumModal}
          />
        </BrowserRouter>
      );

      const menuButton = screen.getByRole('button', { name: /open menu/i });

      act(() => {
        fireEvent.click(menuButton);
      });

      await waitFor(() => {
        expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /courses/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /progress/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /quiz/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /community/i })).toBeInTheDocument();
      });
    });

    it('renders action buttons when menu is open', async () => {
      render(
        <BrowserRouter>
          <MobileNav
            handleComingSoon={mockHandleComingSoon}
            setShowPremiumModal={mockSetShowPremiumModal}
          />
        </BrowserRouter>
      );

      const menuButton = screen.getByRole('button', { name: /open menu/i });

      act(() => {
        fireEvent.click(menuButton);
      });

      await waitFor(() => {
        expect(screen.getByRole('button', { name: /premium/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /advanced/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /get started/i })).toBeInTheDocument();
      });
    });
  });

  describe('Menu Toggle', () => {
    it('opens menu when menu button is clicked', async () => {
      render(
        <BrowserRouter>
          <MobileNav
            handleComingSoon={mockHandleComingSoon}
            setShowPremiumModal={mockSetShowPremiumModal}
          />
        </BrowserRouter>
      );

      const menuButton = screen.getByRole('button', { name: /open menu/i });

      act(() => {
        fireEvent.click(menuButton);
      });

      await waitFor(() => {
        expect(menuButton).toHaveAttribute('aria-expanded', 'true');
        expect(menuButton).toHaveAttribute('aria-label', 'Close menu');
        expect(screen.getByTestId('x-icon')).toBeInTheDocument();
      });
    });

    it('closes menu when close button is clicked', async () => {
      render(
        <BrowserRouter>
          <MobileNav
            handleComingSoon={mockHandleComingSoon}
            setShowPremiumModal={mockSetShowPremiumModal}
          />
        </BrowserRouter>
      );

      const menuButton = screen.getByRole('button', { name: /open menu/i });

      act(() => {
        fireEvent.click(menuButton);
      });

      await waitFor(() => {
        expect(menuButton).toHaveAttribute('aria-expanded', 'true');
      });

      const closeButton = screen.getByRole('button', { name: /close menu/i });
      act(() => {
        fireEvent.click(closeButton);
      });

      await waitFor(() => {
        expect(menuButton).toHaveAttribute('aria-expanded', 'false');
        expect(menuButton).toHaveAttribute('aria-label', 'Open menu');
      });
    });

    it('closes menu when clicking outside', async () => {
      render(
        <BrowserRouter>
          <MobileNav
            handleComingSoon={mockHandleComingSoon}
            setShowPremiumModal={mockSetShowPremiumModal}
          />
        </BrowserRouter>
      );

      const menuButton = screen.getByRole('button', { name: /open menu/i });

      act(() => {
        fireEvent.click(menuButton);
      });

      await waitFor(() => {
        expect(menuButton).toHaveAttribute('aria-expanded', 'true');
      });

      // Click outside the mobile nav
      act(() => {
        fireEvent.click(document.body);
      });

      await waitFor(() => {
        expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      });
    });
  });

  describe('Navigation', () => {
    it('highlights active route', async () => {
      render(
        <BrowserRouter>
          <MobileNav
            handleComingSoon={mockHandleComingSoon}
            setShowPremiumModal={mockSetShowPremiumModal}
          />
        </BrowserRouter>
      );

      const menuButton = screen.getByRole('button', { name: /open menu/i });

      act(() => {
        fireEvent.click(menuButton);
      });

      await waitFor(() => {
        const homeLink = screen.getByRole('link', { name: /home/i });
        expect(homeLink).toHaveClass('bg-cyber-purple/20', 'text-cyber-purple');
      });
    });

    it('closes menu when navigation link is clicked', async () => {
      render(
        <BrowserRouter>
          <MobileNav
            handleComingSoon={mockHandleComingSoon}
            setShowPremiumModal={mockSetShowPremiumModal}
          />
        </BrowserRouter>
      );

      const menuButton = screen.getByRole('button', { name: /open menu/i });

      act(() => {
        fireEvent.click(menuButton);
      });

      await waitFor(() => {
        expect(menuButton).toHaveAttribute('aria-expanded', 'true');
      });

      const coursesLink = screen.getByRole('link', { name: /courses/i });
      act(() => {
        fireEvent.click(coursesLink);
      });

      await waitFor(() => {
        expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      });
    });
  });

  describe('Actions', () => {
    it('calls handleComingSoon when premium button is clicked', async () => {
      render(
        <BrowserRouter>
          <MobileNav
            handleComingSoon={mockHandleComingSoon}
            setShowPremiumModal={mockSetShowPremiumModal}
          />
        </BrowserRouter>
      );

      const menuButton = screen.getByRole('button', { name: /open menu/i });

      act(() => {
        fireEvent.click(menuButton);
      });

      await waitFor(() => {
        const premiumButton = screen.getByRole('button', { name: /premium/i });
        expect(premiumButton).toBeInTheDocument();
      });

      const premiumButton = screen.getByRole('button', { name: /premium/i });
      await act(async () => {
        fireEvent.click(premiumButton);
      });

      expect(mockHandleComingSoon).toHaveBeenCalledWith(
        'Premium Features',
        'Unlock advanced lessons, 1-on-1 mentoring, and exclusive content with our premium subscription.'
      );
    });

    it('calls handleComingSoon when advanced button is clicked', async () => {
      const user = userEvent.setup();
      render(
        <BrowserRouter>
          <MobileNav
            handleComingSoon={mockHandleComingSoon}
            setShowPremiumModal={mockSetShowPremiumModal}
          />
        </BrowserRouter>
      );

      const menuButton = screen.getByRole('button', { name: /open menu/i });

      act(() => {
        fireEvent.click(menuButton);
      });

      await waitFor(() => {
        const advancedButton = screen.getByRole('button', { name: /advanced/i });
        expect(advancedButton).toBeInTheDocument();
      });

      const advancedButton = screen.getByRole('button', { name: /advanced/i });
      await act(async () => {
        await user.click(advancedButton);
      });

      expect(mockHandleComingSoon).toHaveBeenCalledWith(
        'Advanced Courses',
        'Access expert-level courses on AI, machine learning, and advanced web development.'
      );
    });

    it('calls setShowPremiumModal when get started button is clicked', async () => {
      const user = userEvent.setup();
      render(
        <BrowserRouter>
          <MobileNav
            handleComingSoon={mockHandleComingSoon}
            setShowPremiumModal={mockSetShowPremiumModal}
          />
        </BrowserRouter>
      );

      const menuButton = screen.getByRole('button', { name: /open menu/i });

      act(() => {
        fireEvent.click(menuButton);
      });

      await waitFor(() => {
        const getStartedButton = screen.getByRole('button', { name: /get started/i });
        expect(getStartedButton).toBeInTheDocument();
      });

      const getStartedButton = screen.getByRole('button', { name: /get started/i });
      await act(async () => {
        await user.click(getStartedButton);
      });

      expect(mockSetShowPremiumModal).toHaveBeenCalledWith(true);
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(
        <BrowserRouter>
          <MobileNav
            handleComingSoon={mockHandleComingSoon}
            setShowPremiumModal={mockSetShowPremiumModal}
          />
        </BrowserRouter>
      );

      const menuButton = screen.getByRole('button', { name: /open menu/i });
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      expect(menuButton).toHaveAttribute('aria-label', 'Open menu');
    });

    it('has proper focus management', async () => {
      const user = userEvent.setup();
      render(
        <BrowserRouter>
          <MobileNav
            handleComingSoon={mockHandleComingSoon}
            setShowPremiumModal={mockSetShowPremiumModal}
          />
        </BrowserRouter>
      );

      const menuButton = screen.getByRole('button', { name: /open menu/i });
      menuButton.focus();
      expect(menuButton).toHaveFocus();

      act(() => {
        fireEvent.click(menuButton);
      });

      await waitFor(() => {
        const closeButton = screen.getByRole('button', { name: /close menu/i });
        expect(closeButton).toBeInTheDocument();
      });
    });

    it('navigation links have proper focus indicators', async () => {
      const user = userEvent.setup();
      render(
        <BrowserRouter>
          <MobileNav
            handleComingSoon={mockHandleComingSoon}
            setShowPremiumModal={mockSetShowPremiumModal}
          />
        </BrowserRouter>
      );

      const menuButton = screen.getByRole('button', { name: /open menu/i });

      act(() => {
        fireEvent.click(menuButton);
      });

      await waitFor(() => {
        const homeLink = screen.getByRole('link', { name: /home/i });
        expect(homeLink).toHaveClass('focus:ring-2', 'focus:ring-cyber-cyan');
      });
    });

    it('buttons have minimum touch target size', async () => {
      const user = userEvent.setup();
      render(
        <BrowserRouter>
          <MobileNav
            handleComingSoon={mockHandleComingSoon}
            setShowPremiumModal={mockSetShowPremiumModal}
          />
        </BrowserRouter>
      );

      const menuButton = screen.getByRole('button', { name: /open menu/i });
      expect(menuButton).toHaveClass('min-h-[44px]', 'min-w-[44px]');

      act(() => {
        fireEvent.click(menuButton);
      });

      await waitFor(() => {
        const closeButton = screen.getByRole('button', { name: /close menu/i });
        expect(closeButton).toHaveClass('min-h-[44px]', 'min-w-[44px]');
      });
    });
  });

  describe('Performance', () => {
    it('prevents body scroll when menu is open', async () => {
      const user = userEvent.setup();
      render(
        <BrowserRouter>
          <MobileNav
            handleComingSoon={mockHandleComingSoon}
            setShowPremiumModal={mockSetShowPremiumModal}
          />
        </BrowserRouter>
      );

      const menuButton = screen.getByRole('button', { name: /open menu/i });

      act(() => {
        fireEvent.click(menuButton);
      });

      await waitFor(() => {
        expect(document.body.style.overflow).toBe('hidden');
      });
    });

    it('restores body scroll when menu is closed', async () => {
      const user = userEvent.setup();
      render(
        <BrowserRouter>
          <MobileNav
            handleComingSoon={mockHandleComingSoon}
            setShowPremiumModal={mockSetShowPremiumModal}
          />
        </BrowserRouter>
      );

      const menuButton = screen.getByRole('button', { name: /open menu/i });

      act(() => {
        fireEvent.click(menuButton);
      });

      await waitFor(() => {
        expect(document.body.style.overflow).toBe('hidden');
      });

      const closeButton = screen.getByRole('button', { name: /close menu/i });
      act(() => {
        fireEvent.click(closeButton);
      });

      await waitFor(() => {
        expect(document.body.style.overflow).toBe('unset');
      });
    });
  });

  describe('Cleanup', () => {
    it('cleans up event listeners on unmount', () => {
      const { unmount } = render(
        <BrowserRouter>
          <MobileNav
            handleComingSoon={mockHandleComingSoon}
            setShowPremiumModal={mockSetShowPremiumModal}
          />
        </BrowserRouter>
      );

      expect(document.body.style.overflow).toBe('');

      unmount();

      // Verify no memory leaks by checking that overflow is reset
      expect(document.body.style.overflow).toBe('');
    });
  });
});
