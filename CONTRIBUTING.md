# Contributing to CodeMentor Academy

This document outlines the conventions and processes for contributing to
CodeMentor Academy. These guidelines ensure consistent code quality,
maintainable architecture, and efficient collaboration.

## Development Philosophy

CodeMentor Academy follows these core principles:

- **Mobile-first responsive design** ensures accessibility across all devices
- **Performance optimization** through code splitting, lazy loading, and React
  optimizations
- **Type safety** with comprehensive TypeScript coverage
- **Accessibility-first** approach meeting WCAG 2.1 AA standards
- **Component isolation** for maintainable, reusable UI elements

## Development Setup

Before contributing, ensure your development environment is properly configured:

1. **Node.js**: Version 18.0 or higher
2. **npm**: Latest stable version
3. **Git**: Configured with your name and email
4. **Editor**: VS Code recommended with TypeScript, ESLint, and Prettier
   extensions

## Code Standards

### TypeScript Conventions

- **Strict mode enabled**: All new code must use TypeScript with strict settings
- **Interface over type**: Use interfaces for object shapes, types for
  unions/primitives
- **Generic constraints**: Use generics for reusable components and utilities
- **Import organization**: Group imports by external libraries, then internal
  modules

```typescript
// ✅ Preferred
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Topic } from '../types/Topic';
import { TopicCard } from '../components/TopicCard';

// ❌ Avoid
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TopicCard } from '../components/TopicCard';
import type { Topic } from '../types/Topic';
```

### React Conventions

- **Functional components**: Use arrow functions for components
- **Custom hooks**: Prefix with `use` (e.g., `useProgress`, `useAuth`)
- **Prop destructuring**: Always destructure props in component signatures
- **Default props**: Use default parameters instead of defaultProps

```typescript
// ✅ Preferred
interface TopicCardProps {
  topic: Topic;
  onEnroll?: (topicId: string) => void;
  isBookmarked?: boolean;
}

export const TopicCard = ({
  topic,
  onEnroll,
  isBookmarked = false,
}: TopicCardProps) => {
  // Component implementation
};

// ❌ Avoid
export function TopicCard(props: TopicCardProps) {
  const { topic, onEnroll, isBookmarked } = props;
  // Component implementation
}
```

### Component Documentation

All reusable components must include JSDoc comments:

````typescript
/**
 * TopicCard displays lesson information in a card format.
 *
 * Used across course listings, dashboard, and search results.
 * Implements mobile-first responsive design with touch-friendly interactions.
 *
 * @param topic - Lesson data including title, description, and metadata
 * @param onEnroll - Optional callback when user enrolls in lesson
 * @param isBookmarked - Whether the lesson is bookmarked by user
 * @param progress - Completion percentage (0-100)
 * @returns JSX element representing the lesson card
 *
 * @example
 * ```tsx
 * <TopicCard
 *   topic={lessonData}
 *   onEnroll={handleEnroll}
 *   progress={75}
 * />
 * ```
 */
````

### CSS and Styling Conventions

- **Mobile-first**: Write CSS for mobile, then use responsive modifiers
- **Utility classes**: Prefer Tailwind utilities over custom CSS when possible
- **Semantic naming**: Use descriptive class names for custom components
- **Responsive typography**: Use clamp() for fluid text scaling

```css
/* ✅ Mobile-first approach */
.component {
  padding: 1rem;
  font-size: clamp(1rem, 1rem + 0.5vw, 1.25rem);
}

@media (min-width: 768px) {
  .component {
    padding: 2rem;
  }
}
```

## Git Workflow

### Branch Naming Convention

Use descriptive branch names that clearly indicate the type of work:

```
feature/user-authentication          # New features
fix/mobile-navigation-bug            # Bug fixes
chore/dependency-updates             # Maintenance tasks
docs/component-api-reference          # Documentation
refactor/progress-state-management    # Refactoring
```

### Commit Message Standards

Follow [Conventional Commits](https://conventionalcommits.org/) format:

```
type(scope): description

Examples:
feat(quiz): add keyboard navigation support
fix(mobile): resolve touch target sizing issues
docs(components): update TopicCard JSDoc comments
refactor(progress): optimize state calculations with useMemo
chore(deps): update React to v19.1.1
```

**Commit Types:**

- `feat`: New feature or functionality
- `fix`: Bug fix
- `docs`: Documentation changes
- `refactor`: Code restructuring without functionality changes
- `chore`: Maintenance tasks, dependency updates
- `test`: Test additions or modifications
- `perf`: Performance improvements
- `ci`: CI/CD configuration changes

### Pull Request Process

1. **Create feature branch** from the latest `main` branch
2. **Make atomic changes** - one feature or fix per PR
3. **Write tests** for new functionality when applicable
4. **Update documentation** if adding new features or changing APIs
5. **Run quality checks** before submitting:

```bash
npm run lint
npm run type-check
npm run build
```

6. **Create pull request** with clear description:
   - **Summary**: What the PR does and why
   - **Changes**: List of modified files and their purpose
   - **Testing**: How the changes were tested
   - **Breaking changes**: Any API changes or breaking modifications

## Code Review Process

### What Reviewers Look For

1. **Functionality correctness**: Does the code work as intended?
2. **Code quality**: Follows TypeScript and React best practices
3. **Performance impact**: No unnecessary re-renders or heavy computations
4. **Accessibility**: Proper ARIA attributes and keyboard navigation
5. **Mobile responsiveness**: Works correctly across all breakpoints
6. **Documentation**: Updated comments and API documentation

### Review Checklist

- [ ] Code follows TypeScript and React conventions
- [ ] Components include proper JSDoc documentation
- [ ] Mobile-first responsive design implemented
- [ ] Accessibility features (ARIA, keyboard nav) included
- [ ] Performance optimizations (memo, callback, lazy loading) applied
- [ ] Tests pass (when applicable)
- [ ] Linting passes without errors
- [ ] No breaking changes to existing APIs

### Review Response Guidelines

- **Address all comments** before requesting re-review
- **Explain decisions** when choosing alternative approaches
- **Test changes** on different devices and browsers
- **Update documentation** if implementation details change

## Testing Requirements

### Unit Tests

- **Component testing**: Use React Testing Library for component behavior
- **Hook testing**: Test custom hooks in isolation
- **Utility testing**: Test helper functions and calculations
- **Mock external dependencies**: API calls, localStorage, etc.

### Integration Tests

- **User workflows**: Test complete user journeys
- **Form submissions**: Validate form handling and validation
- **Navigation**: Test routing and state persistence

### Performance Tests

- **Bundle size**: Monitor for unexpected increases
- **Load times**: Test on slow connections and devices
- **Memory usage**: Check for memory leaks in long-running components

## Quality Assurance

### Automated Checks

All commits must pass these automated checks:

```bash
# Pre-commit hooks
npm run lint           # ESLint code quality
npm run type-check     # TypeScript compilation
npm run format         # Code formatting

# Pre-push checks
npm run build          # Production build
npm run test           # Test suite (when implemented)
npm run audit          # Security vulnerabilities
```

### Manual Testing Checklist

Before submitting a PR:

- [ ] **Mobile devices**: Test on iPhone SE, iPad, Android devices
- [ ] **Breakpoints**: Verify layouts at 320px, 768px, 1024px, 1280px+
- [ ] **Keyboard navigation**: Tab through all interactive elements
- [ ] **Screen readers**: Test with VoiceOver or NVDA
- [ ] **Performance**: Check DevTools for layout shifts and slow renders
- [ ] **Cross-browser**: Test in Chrome, Firefox, Safari, Edge

## Communication Guidelines

### Issue Reporting

When reporting bugs or requesting features:

1. **Clear title**: Summarize the issue in the title
2. **Reproduction steps**: Provide exact steps to reproduce
3. **Expected vs actual**: Describe what should happen vs what does happen
4. **Environment details**: Browser, OS, device information
5. **Screenshots**: Visual evidence when applicable

### Feature Requests

1. **Use case**: Explain why this feature is needed
2. **Implementation ideas**: Suggest technical approach if known
3. **Alternatives considered**: Other solutions you've evaluated
4. **Impact assessment**: How it affects existing functionality

## Architecture Decisions

When proposing architectural changes:

1. **Document rationale**: Explain why the change is necessary
2. **Consider alternatives**: Evaluate other approaches
3. **Migration strategy**: Plan for backwards compatibility
4. **Performance impact**: Assess bundle size and runtime effects
5. **Testing strategy**: Define how to verify the changes work

## Community Guidelines

### Code of Conduct

- **Respectful communication**: All contributors deserve respect
- **Constructive feedback**: Focus on code, not personalities
- **Inclusive language**: Use inclusive terms and examples
- **Credit contributions**: Acknowledge others' work appropriately

### Getting Help

1. **Documentation first**: Check README, docs/, and existing issues
2. **Clear questions**: Provide context and specific details
3. **Minimal reproduction**: Create isolated examples when possible
4. **Follow up**: Respond to questions and provide updates

## Release Process

### Version Management

- **Semantic versioning**: Follow semver (major.minor.patch)
- **Breaking changes**: Increment major version for API changes
- **New features**: Increment minor version for new functionality
- **Bug fixes**: Increment patch version for fixes

### Release Checklist

- [ ] All tests pass
- [ ] Documentation updated
- [ ] Migration guides for breaking changes
- [ ] Bundle size analysis completed
- [ ] Performance benchmarks run
- [ ] Accessibility audit completed
- [ ] Cross-browser testing done

## License and Attribution

All contributions to CodeMentor Academy are subject to the project's license
terms. By contributing, you agree that your work may be used according to the
project's licensing requirements.

---

**Developed by CEO – Chukwuka Emmanuel Ogugua**

_Part of the EmmanuelOS Learning Suite_
