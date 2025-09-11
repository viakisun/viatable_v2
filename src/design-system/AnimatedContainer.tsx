import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../utils/cn';

interface AnimatedContainerProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'scaleIn' | 'bounceIn';
  delay?: number;
  duration?: number;
  className?: string;
  trigger?: boolean; // Manual trigger for animation
  threshold?: number; // Intersection observer threshold
}

const AnimatedContainer: React.FC<AnimatedContainerProps> = ({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration = 500,
  className,
  trigger = true,
  threshold = 0.1,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trigger) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
          }, delay);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay, threshold, trigger, hasAnimated]);

  const animationClasses = {
    fadeIn: isVisible ? 'animate-fade-in' : 'opacity-0',
    slideUp: isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-4',
    slideDown: isVisible ? 'animate-slide-down' : 'opacity-0 -translate-y-4',
    scaleIn: isVisible ? 'animate-scale-in' : 'opacity-0 scale-95',
    bounceIn: isVisible ? 'animate-bounce-in' : 'opacity-0 scale-75',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-500 ease-out',
        animationClasses[animation],
        className
      )}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
};

// Staggered animation for lists
interface StaggeredContainerProps {
  children: React.ReactNode[];
  staggerDelay?: number;
  animation?: 'fadeIn' | 'slideUp' | 'slideDown' | 'scaleIn' | 'bounceIn';
  className?: string;
}

const StaggeredContainer: React.FC<StaggeredContainerProps> = ({
  children,
  staggerDelay = 100,
  animation = 'slideUp',
  className,
}) => {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <AnimatedContainer
          key={index}
          animation={animation}
          delay={index * staggerDelay}
        >
          {child}
        </AnimatedContainer>
      ))}
    </div>
  );
};

// Floating animation component
interface FloatingElementProps {
  children: React.ReactNode;
  intensity?: 'low' | 'medium' | 'high';
  duration?: number;
  className?: string;
}

const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  intensity = 'medium',
  duration = 3000,
  className,
}) => {
  const intensityClasses = {
    low: 'animate-float',
    medium: 'animate-float',
    high: 'animate-float',
  };

  return (
    <div
      className={cn(intensityClasses[intensity], className)}
      style={{
        animationDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
};

// Glow effect component
interface GlowElementProps {
  children: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

const GlowElement: React.FC<GlowElementProps> = ({
  children,
  color = 'primary',
  intensity = 'medium',
  className,
}) => {
  const colorClasses = {
    primary: 'shadow-glow',
    secondary: 'shadow-lg',
    success: 'shadow-lg',
    warning: 'shadow-lg',
    error: 'shadow-lg',
  };

  const intensityClasses = {
    low: 'animate-pulse-slow',
    medium: 'animate-glow',
    high: 'animate-glow',
  };

  return (
    <div
      className={cn(
        colorClasses[color],
        intensityClasses[intensity],
        className
      )}
    >
      {children}
    </div>
  );
};

export { 
  AnimatedContainer, 
  StaggeredContainer, 
  FloatingElement, 
  GlowElement 
};
