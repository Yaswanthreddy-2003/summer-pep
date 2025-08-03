import React from 'react';

/**
 * A reusable loading spinner component with different sizes
 * 
 * @param {Object} props - Component props
 * @param {string} props.size - Spinner size (sm, md, lg)
 * @param {string} props.color - Spinner color (primary, secondary, gray)
 * @param {string} props.className - Additional CSS classes
 */
const LoadingSpinner = ({ 
  size = 'md', 
  color = 'primary',
  className = '',
  ...rest 
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-3',
    xl: 'h-16 w-16 border-4'
  };
  
  // Color classes
  const colorClasses = {
    primary: 'border-primary-200 border-t-primary-600',
    secondary: 'border-secondary-200 border-t-secondary-600',
    gray: 'border-gray-200 border-t-gray-600',
    white: 'border-gray-100 border-t-white'
  };
  
  return (
    <div className={`flex justify-center items-center ${className}`} {...rest}>
      <div 
        className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[color]}`}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

/**
 * Loading spinner with text
 */
LoadingSpinner.WithText = ({ 
  text = 'Loading...', 
  textPosition = 'right',
  textClassName = '',
  ...rest 
}) => {
  const positionClasses = {
    top: 'flex-col space-y-2',
    right: 'flex-row space-x-2',
    bottom: 'flex-col-reverse space-y-reverse space-y-2',
    left: 'flex-row-reverse space-x-reverse space-x-2'
  };
  
  return (
    <div className={`flex items-center justify-center ${positionClasses[textPosition]}`}>
      <LoadingSpinner {...rest} />
      <span className={`text-sm text-gray-500 ${textClassName}`}>{text}</span>
    </div>
  );
};

/**
 * Full page loading spinner overlay
 */
LoadingSpinner.FullPage = ({ 
  text = 'Loading...',
  ...rest 
}) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center">
        <LoadingSpinner size="lg" {...rest} />
        {text && <p className="mt-4 text-gray-700">{text}</p>}
      </div>
    </div>
  );
};

export default LoadingSpinner;