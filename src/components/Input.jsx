import React from 'react';

export function Input({ 
  type = 'text', 
  value, 
  onChange, 
  placeholder = '', 
  className = '', 
  ...props 
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      {...props}
    />
  );
}