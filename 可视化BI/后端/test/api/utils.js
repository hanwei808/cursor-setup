const axios = require('axios');

/**
 * API测试工具函数
 */
const apiUtils = {
  /**
   * 基础URL
   */
  baseUrl: 'https://cidjdkmkznoh.sealoshzh.site/api',
  
  /**
   * 发送GET请求
   * @param {string} endpoint - API端点
   * @param {object} params - 查询参数
   * @returns {Promise} - Axios响应Promise
   */
  get: async (endpoint, params = {}) => {
    try {
      return await axios.get(`${apiUtils.baseUrl}${endpoint}`, { params });
    } catch (error) {
      return error.response;
    }
  },
  
  /**
   * 测量API响应时间
   * @param {string} endpoint - API端点
   * @param {object} params - 查询参数
   * @returns {Promise<number>} - 响应时间(毫秒)
   */
  measureResponseTime: async (endpoint, params = {}) => {
    const startTime = Date.now();
    await apiUtils.get(endpoint, params);
    const endTime = Date.now();
    return endTime - startTime;
  },
  
  /**
   * 生成随机日期字符串(YYYY-MM-DD)
   * @returns {string} - 日期字符串
   */
  randomDate: () => {
    const year = 2025;
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1;
    return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  },
  
  /**
   * 生成随机时间字符串(HH:mm)
   * @returns {string} - 时间字符串
   */
  randomTime: () => {
    const hour = Math.floor(Math.random() * 24);
    const minute = Math.floor(Math.random() * 4) * 15; // 15分钟间隔
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  }
};

module.exports = apiUtils; 