import React, { createContext, useState, useEffect, useContext } from 'react';
import { lightTheme, darkTheme } from '../utils/theme';

/**
 * 主题上下文
 * 提供主题状态和切换功能
 */
const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

/**
 * 主题提供者组件
 * @param {Object} props - 组件属性
 * @returns {JSX.Element} 主题提供者组件
 */
export const ThemeProvider = ({ children }) => {
  // 检查用户之前的主题偏好
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    
    // 检查系统偏好
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light';
  };

  const [themeMode, setThemeMode] = useState(getInitialTheme);
  const theme = themeMode === 'dark' ? darkTheme : lightTheme;

  // 切换主题
  const toggleTheme = () => {
    setThemeMode(prevMode => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newMode);
      return newMode;
    });
  };

  // 应用主题到文档根元素
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
    
    // 应用主题颜色到 CSS 变量
    Object.entries(theme).forEach(([key, value]) => {
      if (typeof value === 'object') {
        Object.entries(value).forEach(([subKey, subValue]) => {
          document.documentElement.style.setProperty(
            `--${key}-${subKey}`, 
            subValue
          );
        });
      } else {
        document.documentElement.style.setProperty(`--${key}`, value);
      }
    });
  }, [theme, themeMode]);

  return (
    <ThemeContext.Provider value={{ theme, themeMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider; 