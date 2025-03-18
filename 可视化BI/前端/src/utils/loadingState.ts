import { useState, useEffect } from 'react';

/**
 * 全局加载状态管理
 */
let globalLoadingState = false;
let listeners: Function[] = [];

/**
 * 设置全局加载状态
 * @param {boolean} isLoading - 是否加载中
 */
export const setGlobalLoading = (isLoading: boolean): void => {
  globalLoadingState = isLoading;
  // 通知所有监听器
  listeners.forEach(listener => listener(isLoading));
};

/**
 * 获取全局加载状态
 * @returns {boolean} 是否加载中
 */
export const getGlobalLoading = (): boolean => {
  return globalLoadingState;
};

/**
 * 添加加载状态监听器
 * @param {Function} listener - 监听器函数
 */
export const addLoadingListener = (listener: Function): void => {
  listeners.push(listener);
};

/**
 * 移除加载状态监听器
 * @param {Function} listener - 监听器函数
 */
export const removeLoadingListener = (listener: Function): void => {
  listeners = listeners.filter(l => l !== listener);
};

/**
 * 使用全局加载状态的Hook
 * @returns {boolean} 是否加载中
 */
export const useGlobalLoading = (): boolean => {
  const [isLoading, setIsLoading] = useState<boolean>(globalLoadingState);
  
  useEffect(() => {
    // 监听全局加载状态变化
    const handleLoadingChange = (loading: boolean) => {
      setIsLoading(loading);
    };
    
    // 添加监听器
    addLoadingListener(handleLoadingChange);
    
    // 组件卸载时移除监听器
    return () => {
      removeLoadingListener(handleLoadingChange);
    };
  }, []);
  
  return isLoading;
};

export default {
  setGlobalLoading,
  getGlobalLoading,
  useGlobalLoading
}; 