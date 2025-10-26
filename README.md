# CodeMentor Academy

CodeMentor Academy provides structured, modular learning paths for modern
developers. Built with React 19 and TypeScript, the platform delivers
interactive coding education through hands-on exercises, progress tracking, and
comprehensive assessment tools.

## Project Overview

This is a full-stack web application designed for interactive coding education.
The platform offers structured learning paths covering frontend and backend
development technologies, with built-in progress tracking, assessment tools, and
a responsive design optimized for all device types.

**Technology Stack:**

- **Frontend**: React 19 with TypeScript for type safety
- **Styling**: Tailwind CSS with custom design system and fluid typography
- **Animations**: Framer Motion for performant, accessible animations
- **Routing**: React Router DOM v7 with lazy loading
- **Build Tool**: Vite for fast development and optimized production builds
- **State Management**: React Context API with custom hooks
- **Charts**: Recharts for progress visualization
- **Code Splitting**: Dynamic imports for optimal bundle sizes

## Architecture Summary

```
src/
├── components/     # Reusable UI components with JSDoc documentation
│   ├── ui/        # Base UI primitives (buttons, inputs, modals)
│   └── features/  # Feature-specific components (quiz, progress, etc.)
├── pages/         # Route components with lazy loading
├── contexts/      # React Context providers for global state
├── data/          # Static content, course data, and configuration
├── types/         # TypeScript type definitions and interfaces
├── hooks/         # Custom React hooks with documentation
├── utils/         # Utility functions and helpers
├── styles/        # Global styles and CSS custom properties
└── lib/           # Third-party library configurations
```

**Key Architecture Decisions:**

- **Component-based architecture** for maintainable, reusable UI elements
- **Context API** for global state management instead of prop drilling
- **Lazy loading** for route components to optimize initial bundle size
- **Mobile-first responsive design** with fluid typography using clamp()
- **Performance optimization** with React.memo, useMemo, and useCallback
- **Accessibility-first** approach with semantic HTML and ARIA attributes

## Development Guide

### Prerequisites

- **Node.js**: Version 18.0 or higher
- **npm**: Latest stable version (comes with Node.js)
- **Modern browser**: Chrome, Firefox, Safari, or Edge with ES2022 support

### Local Development Setup

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd codementor-academy
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:** Navigate to
   [http://localhost:5173](http://localhost:5173)

The development server includes:

- Hot module replacement (HMR) for instant updates
- TypeScript compilation with error overlay
- ESLint integration for code quality
- Source maps for debugging

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Create production build
npm run preview      # Preview production build locally

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Auto-fix linting issues
npm run format       # Format code with Prettier

# Testing & Security
npm run test         # Run test suite (when implemented)
npm run audit        # Security audit of dependencies
npm run type-check   # TypeScript type checking
```

### Code Quality Standards

- **TypeScript**: Strict mode enabled for maximum type safety
- **ESLint**: Configured with React and TypeScript rules
- **Prettier**: Code formatting for consistent style
- **Import sorting**: Organized imports for better maintainability

## Deployment Guide

### Build Process

The application uses Vite's optimized build process with the following
configuration:

```bash
npm run build
```

**Build Output:**

- Code splitting into logical chunks (vendor, UI, routes)
- Asset optimization with compression
- CSS code splitting for better caching
- Bundle size warnings for performance monitoring

**Production Optimizations:**

- Minified JavaScript and CSS
- Tree shaking for unused code removal
- Image optimization and lazy loading
- Service worker for offline capability (when configured)

### Deployment Environments

**Development:**

- Local development server on port 5173
- Hot reload and error overlay enabled
- Source maps included for debugging

**Production:**

- Optimized build with code splitting
- Compressed assets for faster loading
- Removed console logs and debug statements
- CDN-ready static assets

**Recommended Hosting:**

- **Vercel**: Zero-config deployment with automatic optimizations
- **Netlify**: Built-in form handling and edge functions
- **GitHub Pages**: Static hosting for simple deployment

### Environment Variables

Create `.env.local` for development:

```bash
# API Configuration
VITE_API_BASE_URL=https://api.codementor.academy

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_ERROR_REPORTING=true

# Third-party Services
VITE_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
```

**Note:** Never commit `.env.local` or any files containing secrets to version
control.

## Contributing

Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed contribution
guidelines, including:

- Branch naming conventions
- Commit message standards
- Pull request process
- Code review expectations
- Testing requirements

## Documentation

Additional documentation is available in the [`docs/`](./docs/) folder:

- **Architecture Decisions**: Technical rationale for major design choices
- **Component API**: Complete reference for reusable components
- **Performance Guide**: Optimization strategies and best practices
- **Accessibility Guide**: WCAG compliance and testing procedures

## Support

For technical issues, feature requests, or questions about the codebase:

1. Check existing documentation in the `docs/` folder
2. Review open issues and discussions
3. Create a new issue with detailed reproduction steps
4. Follow the contribution guidelines for code submissions

## License

Private educational platform.

---

**Developed by CEO – Chukwuka Emmanuel Ogugua**

_Part of the EmmanuelOS Learning Suite_
