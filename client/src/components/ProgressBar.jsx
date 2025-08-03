import React from 'react';

/**
 * A progress bar component for displaying scores or completion percentages
 * 
 * @param {Object} props - Component props
 * @param {number} props.value - Current value (0-100)
 * @param {string} props.label - Label text
 * @param {string} props.color - Color of the progress bar (tailwind color class)
 * @param {boolean} props.showValue - Whether to show the value
 * @param {string} props.size - Size of the progress bar (sm, md, lg)
 * @param {string} props.className - Additional CSS classes
 */
const ProgressBar = ({
  value = 0,
  label,
  color = 'primary',
  showValue = true,
  size = 'md',
  className = '',
  ...rest
}) => {
  // Ensure value is between 0 and 100
  const normalizedValue = Math.min(Math.max(0, value), 100);
  
  // Map color to Tailwind classes
  const getColorClass = () => {
    const colorMap = {
      primary: 'bg-primary-500',
      secondary: 'bg-secondary-500',
      success: 'bg-green-500',
      danger: 'bg-red-500',
      warning: 'bg-yellow-500',
      info: 'bg-blue-500',
      gray: 'bg-gray-500',
    };
    
    return colorMap[color] || colorMap.primary;
  };
  
  // Map size to height classes
  const getSizeClass = () => {
    const sizeMap = {
      xs: 'h-1',
      sm: 'h-2',
      md: 'h-3',
      lg: 'h-4',
      xl: 'h-5',
    };
    
    return sizeMap[size] || sizeMap.md;
  };
  
  return (
    <div className={`w-full ${className}`} {...rest}>
      {label && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showValue && (
            <span className="text-sm font-medium text-gray-700">{Math.round(normalizedValue)}%</span>
          )}
        </div>
      )}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${getSizeClass()}`}>
        <div 
          className={`${getColorClass()} rounded-full transition-all duration-300 ease-in-out`} 
          style={{ width: `${normalizedValue}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;