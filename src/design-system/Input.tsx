import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../utils/cn';

const inputVariants = cva(
  'w-full rounded-lg border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-neutral-300 bg-white text-neutral-900 placeholder:text-neutral-500 focus:border-primary-500 focus:ring-primary-500',
        error: 'border-error-500 bg-white text-neutral-900 placeholder:text-neutral-500 focus:border-error-500 focus:ring-error-500',
        success: 'border-success-500 bg-white text-neutral-900 placeholder:text-neutral-500 focus:border-success-500 focus:ring-success-500',
        ghost: 'border-transparent bg-neutral-100 text-neutral-900 placeholder:text-neutral-500 focus:border-primary-500 focus:ring-primary-500',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  leftAddon?: React.ReactNode;
  rightAddon?: React.ReactNode;
  rows?: number;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    variant, 
    size, 
    label, 
    error, 
    helperText, 
    leftIcon, 
    rightIcon, 
    leftAddon, 
    rightAddon,
    id,
    rows,
    ...props 
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;
    const currentVariant = hasError ? 'error' : variant;

    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium text-neutral-700 mb-2"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {leftAddon && (
            <div className="absolute left-0 top-0 h-full flex items-center pl-3 text-neutral-500">
              {leftAddon}
            </div>
          )}
          
          {leftIcon && (
            <div className="absolute left-0 top-0 h-full flex items-center pl-3 text-neutral-400">
              {leftIcon}
            </div>
          )}
          
          {rows ? (
            <textarea
              id={inputId}
              className={cn(
                inputVariants({ variant: currentVariant, size, className }),
                leftIcon && 'pl-10',
                leftAddon && 'pl-12',
                rightIcon && 'pr-10',
                rightAddon && 'pr-12'
              )}
              ref={ref as React.Ref<HTMLTextAreaElement>}
              rows={rows}
              {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            />
          ) : (
            <input
              id={inputId}
              className={cn(
                inputVariants({ variant: currentVariant, size, className }),
                leftIcon && 'pl-10',
                leftAddon && 'pl-12',
                rightIcon && 'pr-10',
                rightAddon && 'pr-12'
              )}
              ref={ref}
              {...props}
            />
          )}
          
          {rightIcon && (
            <div className="absolute right-0 top-0 h-full flex items-center pr-3 text-neutral-400">
              {rightIcon}
            </div>
          )}
          
          {rightAddon && (
            <div className="absolute right-0 top-0 h-full flex items-center pr-3 text-neutral-500">
              {rightAddon}
            </div>
          )}
        </div>
        
        {(error || helperText) && (
          <div className="mt-2">
            {error && (
              <p className="text-sm text-error-600 flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            )}
            {!error && helperText && (
              <p className="text-sm text-neutral-500">{helperText}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
