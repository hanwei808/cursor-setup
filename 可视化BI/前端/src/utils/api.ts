import axios from 'axios';
import config from './config';
import { handleApiError } from './errorHandler';

// 创建axios实例
const apiClient = axios.create({
  baseURL: config.api.baseUrl,
  timeout: config.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    // 可以在这里添加认证信息等
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => {
    // 只返回数据部分
    return response.data;
  },
  (error) => {
    // 统一处理错误
    console.error('API请求错误:', error);
    return Promise.reject(error);
  }
);

// 电力数据API
export const powerForecastApi = {
  // 获取电力预测数据
  getPowerForecastData: async (params?: { startTime?: string; endTime?: string }) => {
    return apiClient.get('/api/power-forecast', { params });
  },
  
  // 获取电力统计数据
  getPowerStats: async (date: string = config.defaultDate) => {
    return apiClient.get('/api/power-forecast/stats', { params: { date } });
  }
};

export default {
  powerForecastApi
}; 