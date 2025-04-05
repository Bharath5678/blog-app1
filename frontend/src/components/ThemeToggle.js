import React, { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <label className="theme-toggle" title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
      <input 
        type="checkbox" 
        checked={theme === 'dark'} 
        onChange={toggleTheme} 
      />
      <span className="theme-toggle-slider"></span>
    </label>
  );
}

export default ThemeToggle; 