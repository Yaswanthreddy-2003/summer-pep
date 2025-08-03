import React from 'react';

/**
 * A reusable card component with customizable styling
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.hover - Whether to add hover effects
 * @param {boolean} props.clickable - Whether the card is clickable
 * @param {Function} props.onClick - Click handler function
 */
const Card = ({ 
  children, 
  className = '', 
  hover = false,
  clickable = false,
  onClick = null,
  ...rest 
}) => {
  const baseClasses = 'bg-white rounded-lg shadow-md overflow-hidden';
  const hoverClasses = hover ? 'transition-transform duration-300 hover:shadow-lg hover:-translate-y-1' : '';
  const clickableClasses = clickable ? 'cursor-pointer' : '';
  
  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </div>
  );
};

/**
 * Card header component
 */
Card.Header = ({ children, className = '', ...rest }) => {
  return (
    <div className={`p-4 border-b border-gray-200 ${className}`} {...rest}>
      {children}
    </div>
  );
};

/**
 * Card body component
 */
Card.Body = ({ children, className = '', ...rest }) => {
  return (
    <div className={`p-4 ${className}`} {...rest}>
      {children}
    </div>
  );
};

/**
 * Card footer component
 */
Card.Footer = ({ children, className = '', ...rest }) => {
  return (
    <div className={`p-4 border-t border-gray-200 ${className}`} {...rest}>
      {children}
    </div>
  );
};

/**
 * Card image component
 */
Card.Image = ({ src, alt, className = '', ...rest }) => {
  return (
    <div className="w-full">
      <img 
        src={src} 
        alt={alt || 'Card image'} 
        className={`w-full object-cover ${className}`} 
        {...rest} 
      />
    </div>
  );
};

/**
 * Card title component
 */
Card.Title = ({ children, className = '', ...rest }) => {
  return (
    <h3 className={`text-xl font-bold text-gray-900 ${className}`} {...rest}>
      {children}
    </h3>
  );
};

/**
 * Card subtitle component
 */
Card.Subtitle = ({ children, className = '', ...rest }) => {
  return (
    <h4 className={`text-sm text-gray-500 ${className}`} {...rest}>
      {children}
    </h4>
  );
};

export default Card;