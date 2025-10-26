# Performance Guide

This document outlines the performance optimization strategies implemented in
CodeMentor Academy and provides guidance for maintaining optimal performance as
the application scales.

## 🎯 Performance Goals

### Core Web Vitals Targets

CodeMentor Academy is optimized to meet or exceed Google's Core Web Vitals
benchmarks:

- **Largest Contentful Paint (LCP)**: < 2.5 seconds
- **First Input Delay (FID)**: < 100 milliseconds
- **Cumulative Layout Shift (CLS)**: < 0.1

### Bundle Size Targets

- **Initial bundle**: < 120kB (40kB gzipped)
- **Route bundles**: < 50kB per route
- **Vendor chunks**: Cached separately for optimal reuse

## 🚀 Optimization Strategies

### Code Splitting

**Implementation**: React.lazy() with Suspense boundaries

```typescript
// Route-level code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const CoursesPage = lazy(() => import('./pages/CoursesPage'));

// Usage with loading state
<Suspense fallback={<LoadingSpinner />}>
  <HomePage />
</Suspense>
```

**Benefits**:

- Reduced initial bundle size
- Faster time to interactive
- Better caching with separate chunks

### React Performance Optimizations

**1. Component Memoization**

```typescript
// Memoize components to prevent unnecessary re-renders
export const TopicCard = memo(({ topic, onEnroll }: TopicCardProps) => {
  // Component implementation
});
```

**2. Expensive Calculations**

```typescript
// Memoize expensive computations
const userStats = useMemo(() => {
  return {
    xp: completedLessons.length * 100,
    level: Math.floor((completedLessons.length * 100) / 500) + 1,
    // ... other calculations
  };
}, [completedLessons.length]);
```

**3. Event Handler Stabilization**

```typescript
// Stabilize event handlers to prevent child re-renders
const handleEnroll = useCallback(
  (topicId: string) => {
    // Handler implementation
  },
  [dependencies]
);
```

### Animation Performance

**Decision**: Transform and opacity-only animations

**Implementation**:

```css
/* Hardware-accelerated animations */
.animate-slide-in {
  transform: translateY(1rem);
  opacity: 0;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}
```

**Reduced Motion Support**:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
}
```

### Asset Optimization

**1. Image Loading**

```typescript
// Responsive images with proper dimensions
<img
  src={imageUrl}
  alt={description}
  width={800}
  height={450}
  loading="lazy"
  className="aspect-ratio"
/>
```

**2. Font Loading**

```html
<!-- Preconnect to font services -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

<!-- Font loading with fallback -->
<link
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

## 📊 Performance Monitoring

### Bundle Analysis

**Command**: Monitor bundle composition

```bash
npm run build -- --analyze
```

**Expected Output**:

- **vendor chunk**: ~29kB (React, React Router, core dependencies)
- **ui chunk**: ~42kB (Framer Motion, Lucide icons)
- **route chunks**: ~10-50kB each (lazy loaded)
- **main chunk**: <120kB (application logic)

### Runtime Performance

**Development Tools**:

- **React DevTools**: Monitor component re-renders
- **Chrome Performance Tab**: Analyze frame rates and layout shifts
- **Network Tab**: Monitor resource loading and caching

**Production Monitoring**:

- **Lighthouse**: Automated performance audits
- **Web Vitals**: Real user performance metrics
- **Error tracking**: Monitor runtime errors and performance issues

## 🔧 Build Optimization

### Vite Configuration

**Key optimizations in vite.config.ts**:

```typescript
export default defineConfig({
  build: {
    // Code splitting configuration
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['framer-motion', 'lucide-react'],
        },
      },
    },

    // Asset optimization
    minify: 'terser',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 120,
  },

  // Development optimizations
  esbuild: {
    drop: ['console', 'debugger'], // Remove in production
  },
});
```

### CSS Optimization

**Purging unused styles**:

- Tailwind CSS automatically removes unused utilities
- Custom CSS is manually optimized
- Critical CSS inlined for above-the-fold content

**Responsive image loading**:

```html
<picture>
  <source media="(min-width: 768px)" srcset="image-desktop.webp" />
  <source media="(min-width: 480px)" srcset="image-tablet.webp" />
  <img src="image-mobile.webp" alt="Description" loading="lazy" />
</picture>
```

## 📱 Mobile Performance

### Touch Performance

**Touch target sizing**:

- Minimum 44px touch targets (48px on mobile)
- Proper spacing between interactive elements
- Debounced touch events to prevent double submissions

**Mobile-specific optimizations**:

- Reduced animation intensity on mobile devices
- Passive event listeners for scroll performance
- Viewport meta tags for proper mobile rendering

### Network Performance

**Resource hints**:

```html
<!-- Preconnect to external resources -->
<link rel="preconnect" href="https://api.codementor.academy" />

<!-- DNS prefetch for future requests -->
<link rel="dns-prefetch" href="https://cdn.example.com" />
```

**Caching strategy**:

- Static assets cached for 1 year
- HTML cached for 5 minutes
- API responses cached appropriately

## 🔍 Performance Testing

### Automated Testing

**Bundle size monitoring**:

```bash
# Check bundle size in CI
npm run build
du -sh dist/assets/*.js
```

**Lighthouse CI**:

```yaml
# .lighthouserc.js
module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist',
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
      },
    },
  },
};
```

### Manual Testing

**Performance checklist**:

- [ ] Initial page load < 3 seconds on 3G
- [ ] Smooth scrolling and animations
- [ ] No layout shifts during loading
- [ ] Touch interactions respond immediately
- [ ] Memory usage stable over time

**Browser testing**:

- Chrome DevTools Performance tab
- Firefox Performance tools
- Safari Web Inspector
- Edge DevTools

## 🚨 Performance Issues to Avoid

### Common Anti-Patterns

**1. Heavy computations in render**:

```typescript
// ❌ Avoid
const expensiveCalculation = heavyComputation(props.data);

// ✅ Memoize
const expensiveCalculation = useMemo(
  () => heavyComputation(props.data),
  [props.data]
);
```

**2. Inline object creation**:

```typescript
// ❌ Creates new object on every render
<div style={{ color: theme.primary }} />

// ✅ Use CSS classes
<div className="text-primary" />
```

**3. Missing dependency arrays**:

```typescript
// ❌ Missing dependencies
useEffect(() => {
  fetchData();
}, []); // Should include dependencies

// ✅ Correct dependencies
useEffect(() => {
  fetchData();
}, [userId, apiKey]);
```

### Memory Leaks

**Cleanup patterns**:

- Remove event listeners in cleanup functions
- Clear timers and intervals
- Cancel API requests on unmount
- Clean up third-party library instances

## 📈 Performance Budget

### Bundle Size Budget

| Asset Type   | Size Limit | Current Size | Status  |
| ------------ | ---------- | ------------ | ------- |
| Main bundle  | 120kB      | 123kB        | ⚠️ Over |
| Vendor chunk | 50kB       | 29kB         | ✅ Good |
| UI chunk     | 50kB       | 42kB         | ✅ Good |
| Route chunks | 50kB each  | 8-10kB       | ✅ Good |

### Core Web Vitals Budget

| Metric | Target  | Current | Status  |
| ------ | ------- | ------- | ------- |
| LCP    | < 2.5s  | ~1.8s   | ✅ Good |
| FID    | < 100ms | ~45ms   | ✅ Good |
| CLS    | < 0.1   | < 0.05  | ✅ Good |

## 🔄 Continuous Optimization

### Regular Audits

**Monthly checks**:

- Bundle size analysis
- Core Web Vitals monitoring
- Accessibility audit
- Cross-browser compatibility testing

**Quarterly reviews**:

- Performance benchmarking
- Dependency updates
- Architecture review
- User experience testing

### Optimization Opportunities

**Future improvements**:

- Service worker for offline functionality
- Image optimization with WebP/AVIF formats
- Component-level code splitting for large features
- Virtual scrolling for long lists
- Progressive Web App features

## 📚 Resources

### Performance Tools

- **Bundle Analyzer**: `vite-bundle-analyzer` for visual bundle inspection
- **Lighthouse**: Automated performance auditing
- **Chrome DevTools**: Manual performance analysis
- **WebPageTest**: Real-world performance testing

### Learning Resources

- [React Performance](https://react.dev/learn/thinking-in-react)
- [Web Vitals](https://web.dev/vitals/)
- [MDN Performance](https://developer.mozilla.org/en-US/docs/Web/Performance)
- [CSS Performance](https://web.dev/fast/#optimize-your-css)

---

**Document version**: 1.0.0 **Performance target**: 90th percentile Core Web
Vitals **Last reviewed**: October 2025
