import React from 'react';

/**
 * A reusable button component with different variants and sizes
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.variant - Button variant (primary, secondary, outline, text)
 * @param {string} props.size - Button size (sm, md, lg)
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.fullWidth - Whether the button should take full width
 * @param {boolean} props.disabled - Whether the button is disabled
 * @param {Function} props.onClick - Click handler function
 * @param {string} props.type - Button type (button, submit, reset)
 */
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  ...rest 
}) => {
  // Base classes for all buttons
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Variant classes
  const variantClasses = {
    primary: 'text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 border border-transparent',
    secondary: 'text-white bg-secondary-600 hover:bg-secondary-700 focus:ring-secondary-500 border border-transparent',
    outline: 'text-gray-700 bg-white hover:bg-gray-50 focus:ring-primary-500 border border-gray-300',
    text: 'text-primary-600 bg-transparent hover:bg-gray-50 focus:ring-primary-500 border border-transparent',
    danger: 'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500 border border-transparent',
    success: 'text-white bg-green-600 hover:bg-green-700 focus:ring-green-500 border border-transparent',
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  
  // Width classes
  const widthClasses = fullWidth ? 'w-full' : '';
  
  // Disabled classes
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';
  
  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClasses} ${disabledClasses} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

/**
 * Button with an icon before the text
 */
Button.IconLeft = ({ 
  children, 
  icon, 
  ...rest 
}) => {
  return (
    <Button {...rest}>
      <span className="mr-2">{icon}</span>
      {children}
    </Button>
  );
};

/**
 * Button with an icon after the text
 */
Button.IconRight = ({ 
  children, 
  icon, 
  ...rest 
}) => {
  return (
    <Button {...rest}>
      {children}
      <span className="ml-2">{icon}</span>
    </Button>
  );
};

/**
 * Button with only an icon
 */
Button.Icon = ({ 
  icon, 
  size = 'md',
  ...rest 
}) => {
  const sizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-3',
  };
  
  return (
    <Button 
      className={sizeClasses[size]} 
      size={size} 
      {...rest}
    >
      {icon}
    </Button>
  );
};

export default Button;