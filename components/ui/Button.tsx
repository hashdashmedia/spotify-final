
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  fullWidth = false,
  className = '', 
  ...props 
}) => {
  const baseStyles = 'font-bold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#121212]';
  
  const variantStyles = {
    primary: 'bg-[#1DB954] text-black hover:bg-[#1ed760] focus:ring-[#1DB954]',
    secondary: 'bg-white/10 text-white hover:bg-white/20 focus:ring-white/50',
    outline: 'bg-transparent border border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white focus:ring-gray-500',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const fullWidthStyles = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${fullWidthStyles} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
