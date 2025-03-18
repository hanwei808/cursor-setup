/**
 * 全局配置
 */
const config = {
  // API配置
  api: {
    baseUrl: 'https://vreelhdhadbg.sealoshzh.site',
    timeout: 15000,
  },
  
  // 默认日期
  defaultDate: '2025-02-01',
  
  // 图表配置
  chart: {
    colors: {
      loadForecast: '#1890ff',
      actualLoad: '#f5222d',
      renewable: '#52c41a',
      wind: '#722ed1',
      solar: '#faad14',
      hydro: '#13c2c2',
      nonMarket: '#fa8c16',
    },
    maxDataPoints: 500,
  },
  
  // 性能配置
  performance: {
    maxQueryRecords: 1000,
  },
};

export default config; 