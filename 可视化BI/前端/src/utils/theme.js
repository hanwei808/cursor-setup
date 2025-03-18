/**
 * 主题配置文件
 * 定义亮色模式和夜间模式的颜色变量
 */

// 亮色主题
const lightTheme = {
  primary: '#0066cc',
  secondary: '#5ac8fa',
  success: '#34c759',
  warning: '#ff9500',
  danger: '#ff3b30',
  info: '#5856d6',
  
  background: '#ffffff',
  cardBackground: '#f5f5f7',
  textPrimary: '#1d1d1f',
  textSecondary: '#86868b',
  border: '#d2d2d7',
  
  chartColors: ['#0066cc', '#5ac8fa', '#34c759', '#ff9500', '#ff3b30', '#5856d6'],
  
  shadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
};

// 夜间主题
const darkTheme = {
  primary: '#0a84ff',
  secondary: '#64d2ff',
  success: '#30d158',
  warning: '#ff9f0a',
  danger: '#ff453a',
  info: '#6e6aff',
  
  background: '#1d1d1f',
  cardBackground: '#2c2c2e',
  textPrimary: '#f5f5f7',
  textSecondary: '#aeaeb2',
  border: '#3a3a3c',
  
  chartColors: ['#0a84ff', '#64d2ff', '#30d158', '#ff9f0a', '#ff453a', '#6e6aff'],
  
  shadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
};

export { lightTheme, darkTheme };

/**
 * 主题切换钩子
 * @param {string} mode - 主题模式
 * @returns {Object} 当前主题配置
 */
export const useTheme = (mode) => {
  return mode === 'light' ? lightTheme : darkTheme;
}; 