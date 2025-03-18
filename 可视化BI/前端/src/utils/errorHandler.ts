import { message } from 'antd';

/**
 * 处理API错误
 * @param {any} error - 错误对象
 * @param {string} customMessage - 自定义错误消息
 * @returns {string} 错误消息
 */
export const handleApiError = (error: any, customMessage?: string): string => {
  console.error('API错误:', error);
  
  // 获取错误消息
  let errorMessage = customMessage || '操作失败，请稍后重试';
  
  if (error.response) {
    // 服务器返回了错误状态码
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        errorMessage = data?.message || '请求参数错误';
        break;
      case 401:
        errorMessage = '未授权，请重新登录';
        break;
      case 403:
        errorMessage = '无权限访问该资源';
        break;
      case 404:
        errorMessage = '请求的资源不存在';
        break;
      case 500:
        errorMessage = '服务器内部错误';
        break;
      default:
        errorMessage = `请求失败 (${status})`;
    }
  } else if (error.request) {
    // 请求已发送但没有收到响应
    errorMessage = '网络连接失败，请检查网络设置或API服务是否可用';
  } else if (error.message) {
    // 请求设置时发生错误
    errorMessage = error.message;
  }
  
  // 显示错误消息
  message.error(errorMessage);
  
  return errorMessage;
};

/**
 * 检查API响应是否成功
 * @param {any} response - API响应
 * @returns {boolean} 是否成功
 */
export const isApiResponseSuccess = (response: any): boolean => {
  return response && response.status === 'success' && Array.isArray(response.data);
};

/**
 * 格式化API错误消息
 * @param {any} error - 错误对象
 * @returns {string} 格式化后的错误消息
 */
export const formatErrorMessage = (error: any): string => {
  if (!error) return '未知错误';
  
  if (typeof error === 'string') return error;
  
  if (error.message) return error.message;
  
  if (error.response?.data?.message) return error.response.data.message;
  
  return JSON.stringify(error);
};

export default {
  handleApiError,
  isApiResponseSuccess,
  formatErrorMessage
}; 