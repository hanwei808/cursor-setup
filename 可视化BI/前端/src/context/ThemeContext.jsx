import React, { createContext, useState, useEffect } from 'react';
import { lightTheme, darkTheme } from '../styles/theme';

export const ThemeContext = createContext();

/**
 * 主题提供者组件
 * 管理应用的主题状态和切换功能
 * @param {object} props - 组件属性
 * @returns {JSX.Element} 主题上下文提供者
 */
export const ThemeProvider = ({ children }) => {
  // 从本地存储获取主题偏好，默认为亮色模式
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    // 如果有保存的主题设置，使用它；否则检查系统偏好
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // 检查系统偏好
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // 切换主题函数
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // 当主题改变时，更新本地存储和文档根元素的类
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    
    // 应用主题颜色到 CSS 变量
    const theme = isDarkMode ? darkTheme : lightTheme;
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ theme: isDarkMode ? darkTheme : lightTheme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * 主题使用钩子
 * @returns {object} 主题上下文
 */
export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 