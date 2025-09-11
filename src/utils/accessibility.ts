// Accessibility utilities and hooks

import React, { useEffect, useRef, useState } from 'react';

// Focus management
export function useFocusManagement() {
  const focusableElements = useRef<HTMLElement[]>([]);
  const currentIndex = useRef(0);

  const updateFocusableElements = (container: HTMLElement) => {
    const elements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;
    focusableElements.current = Array.from(elements);
  };

  const focusNext = () => {
    if (focusableElements.current.length === 0) return;
    currentIndex.current = (currentIndex.current + 1) % focusableElements.current.length;
    focusableElements.current[currentIndex.current]?.focus();
  };

  const focusPrevious = () => {
    if (focusableElements.current.length === 0) return;
    currentIndex.current = currentIndex.current === 0 
      ? focusableElements.current.length - 1 
      : currentIndex.current - 1;
    focusableElements.current[currentIndex.current]?.focus();
  };

  const focusFirst = () => {
    if (focusableElements.current.length > 0) {
      currentIndex.current = 0;
      focusableElements.current[0]?.focus();
    }
  };

  const focusLast = () => {
    if (focusableElements.current.length > 0) {
      currentIndex.current = focusableElements.current.length - 1;
      focusableElements.current[currentIndex.current]?.focus();
    }
  };

  return {
    updateFocusableElements,
    focusNext,
    focusPrevious,
    focusFirst,
    focusLast
  };
}

// Keyboard navigation hook
export function useKeyboardNavigation(
  onEscape?: () => void,
  onEnter?: () => void,
  onArrowUp?: () => void,
  onArrowDown?: () => void,
  onArrowLeft?: () => void,
  onArrowRight?: () => void
) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          onEscape?.();
          break;
        case 'Enter':
        case ' ':
          event.preventDefault();
          onEnter?.();
          break;
        case 'ArrowUp':
          event.preventDefault();
          onArrowUp?.();
          break;
        case 'ArrowDown':
          event.preventDefault();
          onArrowDown?.();
          break;
        case 'ArrowLeft':
          event.preventDefault();
          onArrowLeft?.();
          break;
        case 'ArrowRight':
          event.preventDefault();
          onArrowRight?.();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onEscape, onEnter, onArrowUp, onArrowDown, onArrowLeft, onArrowRight]);
}

// Screen reader announcements
export function useScreenReaderAnnouncements() {
  const [announcements, setAnnouncements] = useState<string[]>([]);

  const announce = (message: string) => {
    setAnnouncements(prev => [...prev, message]);
    
    // Clear announcement after a delay
    setTimeout(() => {
      setAnnouncements(prev => prev.slice(1));
    }, 1000);
  };

  return { announcements, announce };
}

// ARIA live region component
export function AriaLiveRegion({ announcements }: { announcements: string[] }) {
  return React.createElement('div', {
    'aria-live': 'polite',
    'aria-atomic': 'true',
    className: 'sr-only'
  }, announcements.map((announcement, index) => 
    React.createElement('div', { key: index }, announcement)
  ));
}

// Skip link component
export function SkipLink({ href, children }: { href: string; children: React.ReactNode }) {
  return React.createElement('a', {
    href,
    className: 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-lg z-50'
  }, children);
}

// Focus trap hook
export function useFocusTrap(isActive: boolean) {
  const containerRef = useRef<HTMLElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const container = containerRef.current;
    if (!container) return;

    // Store the previously focused element
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Get all focusable elements within the container
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus the first element
    firstElement?.focus();

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);

    return () => {
      document.removeEventListener('keydown', handleTabKey);
      // Restore focus to the previously focused element
      previousActiveElement.current?.focus();
    };
  }, [isActive]);

  return containerRef;
}

// High contrast mode detection
export function useHighContrastMode() {
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-contrast: high)');
    setIsHighContrast(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsHighContrast(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return isHighContrast;
}

// Reduced motion detection
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

// Color scheme detection
export function useColorScheme() {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark' | 'no-preference'>('no-preference');

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setColorScheme(mediaQuery.matches ? 'dark' : 'light');

    const handleChange = (e: MediaQueryListEvent) => {
      setColorScheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return colorScheme;
}

// Accessibility testing utilities
export function validateAccessibility(element: HTMLElement): string[] {
  const issues: string[] = [];

  // Check for missing alt text on images
  const images = element.querySelectorAll('img');
  images.forEach((img, index) => {
    if (!img.alt && !img.getAttribute('aria-label')) {
      issues.push(`Image ${index + 1} is missing alt text`);
    }
  });

  // Check for missing labels on form inputs
  const inputs = element.querySelectorAll('input, select, textarea');
  inputs.forEach((input, index) => {
    const id = input.getAttribute('id');
    const ariaLabel = input.getAttribute('aria-label');
    const ariaLabelledBy = input.getAttribute('aria-labelledby');
    
    if (!id && !ariaLabel && !ariaLabelledBy) {
      issues.push(`Form input ${index + 1} is missing a label`);
    }
  });

  // Check for proper heading hierarchy
  const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let previousLevel = 0;
  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName.charAt(1));
    if (level > previousLevel + 1) {
      issues.push(`Heading ${index + 1} skips levels (h${previousLevel} to h${level})`);
    }
    previousLevel = level;
  });

  // Check for sufficient color contrast (simplified)
  const elements = element.querySelectorAll('*');
  elements.forEach((el, index) => {
    const style = window.getComputedStyle(el);
    const color = style.color;
    const backgroundColor = style.backgroundColor;
    
    // This is a simplified check - in a real implementation,
    // you'd use a proper color contrast calculation library
    if (color === backgroundColor) {
      issues.push(`Element ${index + 1} has insufficient color contrast`);
    }
  });

  return issues;
}

// ARIA utilities
export const ariaUtils = {
  // Generate unique IDs for ARIA relationships
  generateId: (prefix: string = 'aria') => {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  },

  // Set up ARIA relationships
  setupAriaRelationship: (controlId: string, targetId: string) => {
    const control = document.getElementById(controlId);
    const target = document.getElementById(targetId);
    
    if (control && target) {
      control.setAttribute('aria-controls', targetId);
      target.setAttribute('aria-labelledby', controlId);
    }
  },

  // Announce to screen readers
  announce: (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  }
};

// Keyboard shortcuts
export function useKeyboardShortcuts(shortcuts: Record<string, () => void>) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const modifiers = [];
      
      if (event.ctrlKey) modifiers.push('ctrl');
      if (event.altKey) modifiers.push('alt');
      if (event.shiftKey) modifiers.push('shift');
      if (event.metaKey) modifiers.push('meta');
      
      const shortcut = [...modifiers, key].join('+');
      
      if (shortcuts[shortcut]) {
        event.preventDefault();
        shortcuts[shortcut]();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}

// Accessibility testing component
export function AccessibilityTester() {
  const [issues, setIssues] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  const runTests = () => {
    const issues = validateAccessibility(document.body);
    setIssues(issues);
    setIsVisible(true);
  };

  if (!isVisible) {
    return React.createElement('button', {
      onClick: runTests,
      className: 'fixed bottom-4 right-4 bg-primary-600 text-white px-4 py-2 rounded-lg shadow-lg z-50',
      'aria-label': 'Run accessibility tests'
    }, 'Test A11y');
  }

  return React.createElement('div', {
    className: 'fixed bottom-4 right-4 bg-white border border-neutral-300 rounded-lg shadow-lg p-4 max-w-md z-50'
  }, [
    React.createElement('div', {
      key: 'header',
      className: 'flex items-center justify-between mb-3'
    }, [
      React.createElement('h3', {
        key: 'title',
        className: 'font-semibold text-neutral-900'
      }, 'Accessibility Issues'),
      React.createElement('button', {
        key: 'close',
        onClick: () => setIsVisible(false),
        className: 'text-neutral-500 hover:text-neutral-700',
        'aria-label': 'Close accessibility tester'
      }, '×')
    ]),
    issues.length === 0 
      ? React.createElement('p', {
          key: 'no-issues',
          className: 'text-success-600 text-sm'
        }, 'No accessibility issues found!')
      : React.createElement('ul', {
          key: 'issues-list',
          className: 'space-y-2 max-h-64 overflow-y-auto'
        }, issues.map((issue, index) => 
          React.createElement('li', {
            key: index,
            className: 'text-sm text-error-600'
          }, issue)
        ))
  ]);
}
