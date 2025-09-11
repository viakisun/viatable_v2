import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const spinnerVariants = cva(
  'animate-spin rounded-full border-2 border-transparent',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12',
      },
      variant: {
        primary: 'border-primary-500 border-t-transparent',
        secondary: 'border-secondary-500 border-t-transparent',
        white: 'border-white border-t-transparent',
        neutral: 'border-neutral-500 border-t-transparent',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'primary',
    },
  }
);

export interface LoadingSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  children?: React.ReactNode;
}

const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ className, size, variant, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(spinnerVariants({ size, variant, className }))}
        {...props}
      >
        {children}
      </div>
    );
  }
);

LoadingSpinner.displayName = 'LoadingSpinner';

// Skeleton loader component
const Skeleton = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    width?: string;
    height?: string;
  }
>(({ className, width, height, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'animate-pulse bg-neutral-200 rounded',
        className
      )}
      style={{ width, height }}
      {...props}
    />
  );
});
Skeleton.displayName = 'Skeleton';

// Loading overlay component
interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  spinnerSize?: 'sm' | 'md' | 'lg' | 'xl';
  spinnerVariant?: 'primary' | 'secondary' | 'white' | 'neutral';
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  children,
  spinnerSize = 'lg',
  spinnerVariant = 'primary',
  message,
}) => {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
          <LoadingSpinner size={spinnerSize} variant={spinnerVariant} />
          {message && (
            <p className="mt-4 text-sm text-neutral-600 font-medium">
              {message}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export { LoadingSpinner, Skeleton, LoadingOverlay };
