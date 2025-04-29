import React from "react";

const Button = ({ children, variant = "primary", size = "md", className, ...props }) => {
  const baseStyle = "inline-flex items-center justify-center rounded-md font-medium focus:outline-none transition-colors duration-150";
  
  const variantStyles = {
    primary: "bg-gray-400 text-white hover:bg-red-600", // Changed from bg-blue-600 to bg-red-600
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    outline: "bg-transparent border border-gray-600 text-gray-600 hover:bg-gray-100",
    danger: "bg-red-300 text-white hover:bg-red-300",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const classes = `${baseStyle} ${variantStyles[variant] || variantStyles.primary} ${sizeStyles[size] || sizeStyles.md} ${className}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;