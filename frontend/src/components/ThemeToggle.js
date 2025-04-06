import React, { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === 'dark';
  
  return (
    <div className="theme-toggle-wrapper">
      <label 
        className="theme-toggle" 
        title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        htmlFor="theme-toggle-input"
      >
        <span className="sr-only">
          {isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        </span>
        <input 
          id="theme-toggle-input"
          type="checkbox" 
          checked={isDark} 
          onChange={toggleTheme} 
          aria-checked={isDark}
          aria-label="Toggle dark mode"
        />
        <span className="theme-toggle-slider" aria-hidden="true"></span>
      </label>
    </div>
  );
}

export default ThemeToggle; 