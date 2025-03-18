import React from 'react';
import { useTheme } from '../utils/themeContext';
import './ThemeToggle.css';

/**
 * 主题切换按钮组件
 * @returns {JSX.Element} 主题切换按钮
 */
const ThemeToggle = () => {
  const { mode, toggleTheme } = useTheme();
  
  return (
    <button 
      className="theme-toggle" 
      onClick={toggleTheme} 
      aria-label={`切换到${mode === 'light' ? '暗色' : '亮色'}模式`}
    >
      {mode === 'light' ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3ZM12 19C8.13 19 5 15.87 5 12C5 8.13 8.13 5 12 5C15.87 5 19 8.13 19 12C19 15.87 15.87 19 12 19Z" fill="currentColor"/>
          <path d="M12 7V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 15V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M7 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <path d="M15 12H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ) : (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor"/>
          <path d="M12 6V12L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle; 