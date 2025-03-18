/**
 * 数据处理工具函数
 * @param {any[]} data - 原始数据
 * @returns {any[]} 处理后的数据
 */
export const processData = (data: any[]): any[] => {
  if (!data || data.length === 0) {
    return [];
  }

  // 按时间排序
  return [...data].sort((a, b) => {
    return a.时间.localeCompare(b.时间);
  });
};

/**
 * 计算统计数据
 * @param {any[]} data - 原始数据
 * @returns {object} 统计结果
 */
export const calculateStats = (data: any[]): any => {
  if (!data || data.length === 0) {
    return {
      maxLoad: 0,
      minLoad: 0,
      avgLoad: 0,
      maxRenewable: 0,
      minRenewable: 0,
      avgRenewable: 0
    };
  }

  // 提取负荷和新能源数据
  const loadData = data.map(item => parseFloat(item['日前各交易时段负荷预测_MW']) || 0);
  const renewableData = data.map(item => parseFloat(item['新能源总出力预测数值']) || 0);

  // 计算最大值、最小值和平均值
  const maxLoad = Math.max(...loadData);
  const minLoad = Math.min(...loadData);
  const avgLoad = loadData.reduce((sum, val) => sum + val, 0) / loadData.length;

  const maxRenewable = Math.max(...renewableData);
  const minRenewable = Math.min(...renewableData);
  const avgRenewable = renewableData.reduce((sum, val) => sum + val, 0) / renewableData.length;

  return {
    maxLoad,
    minLoad,
    avgLoad,
    maxRenewable,
    minRenewable,
    avgRenewable
  };
};

/**
 * 格式化数值，保留两位小数
 * @param {number} value - 原始数值
 * @returns {string} 格式化后的数值
 */
export const formatNumber = (value: number): string => {
  return value.toFixed(2);
};

/**
 * 处理异常值和缺失值
 * @param {any[]} data - 原始数据
 * @returns {any[]} 处理后的数据
 */
export const handleAbnormalData = (data: any[]): any[] => {
  if (!data || data.length === 0) {
    return [];
  }

  return data.map(item => {
    const processedItem = { ...item };
    
    // 处理所有数值字段
    Object.keys(processedItem).forEach(key => {
      const value = processedItem[key];
      
      // 如果是数值字段但值为 null 或 undefined，设置为 0
      if (typeof value === 'string' && !isNaN(parseFloat(value))) {
        processedItem[key] = value === null || value === undefined ? '0' : value;
      }
    });
    
    return processedItem;
  });
}; 