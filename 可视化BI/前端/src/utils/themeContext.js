import React, { createContext, useContext, useState, useEffect } from 'react';

// 定义主题颜色
const themes = {
  light: {
    primary: '#0071e3', // 苹果蓝
    secondary: '#86868b', // 苹果灰
    background: '#ffffff',
    cardBackground: '#f5f5f7',
    text: '#1d1d1f',
    textSecondary: '#86868b',
    border: '#d2d2d7',
    success: '#4cd964',
    warning: '#ff9500',
    error: '#ff3b30',
  },
  dark: {
    primary: '#2997ff', // 暗模式苹果蓝
    secondary: '#86868b',
    background: '#1d1d1f',
    cardBackground: '#2d2d2f',
    text: '#f5f5f7',
    textSecondary: '#a1a1a6',
    border: '#424245',
    success: '#32d74b',
    warning: '#ff9f0a',
    error: '#ff453a',
  }
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // 检测系统偏好
  const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // 从本地存储获取用户设置，如果没有则使用系统偏好
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || (prefersDarkMode ? 'dark' : 'light');
  });

  // 当模式改变时更新文档根元素的类名和本地存储
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  // 切换主题的函数
  const toggleTheme = () => {
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ mode, theme: themes[mode], toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 自定义钩子，方便在组件中使用主题
export const useTheme = () => useContext(ThemeContext); 