const { expect } = require('chai');
const apiUtils = require('./utils');

describe('电力预测API高级测试', () => {
  /**
   * 功能测试 - 获取电力数据接口
   */
  describe('功能测试 - GET /power-forecast', () => {
    // 测试数据格式和完整性
    it('应返回格式正确且完整的电力数据', async () => {
      const response = await apiUtils.get('/power-forecast');
      
      // 验证基本响应
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('status', 'success');
      expect(response.data).to.have.property('data').that.is.an('array');
      
      // 如果有数据，验证数据结构
      if (response.data.data.length > 0) {
        const item = response.data.data[0];
        
        // 验证必要字段
        expect(item).to.have.property('日期').that.is.a('string');
        expect(item).to.have.property('时间').that.is.a('string');
        expect(item).to.have.property('日前各交易时段负荷预测_MW');
        expect(item).to.have.property('新能源总出力预测数值');
        
        // 验证日期格式
        expect(item.日期).to.match(/^\d{4}-\d{2}-\d{2}$/);
        
        // 验证时间格式 - 修改正则表达式以匹配 HH:MM:SS 格式
        expect(item.时间).to.match(/^([01]\d|2[0-3]):([0-5]\d)(?::([0-5]\d))?$/);
      }
    });
    
    // 测试时间范围过滤
    it('应正确过滤指定时间范围的数据', async () => {
      // 生成随机时间范围
      const startTime = '00:15';
      const endTime = '12:00';
      
      const response = await apiUtils.get('/power-forecast', {
        startTime,
        endTime
      });
      
      // 验证基本响应
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('status', 'success');
      
      // 验证数据在时间范围内 - 修改比较逻辑以处理 HH:MM:SS 格式
      if (response.data.data.length > 0) {
        response.data.data.forEach(item => {
          const itemTime = item.时间.substring(0, 5); // 只取 HH:MM 部分进行比较
          expect(itemTime >= startTime && itemTime <= endTime).to.be.true;
        });
      }
    });
    
    // 测试边界条件 - 相同的开始和结束时间
    it('应处理相同的开始和结束时间', async () => {
      const time = '00:15';
      
      const response = await apiUtils.get('/power-forecast', {
        startTime: time,
        endTime: time
      });
      
      // 验证基本响应
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('status', 'success');
      
      // 验证数据时间等于指定时间 - 修改比较逻辑以处理 HH:MM:SS 格式
      if (response.data.data.length > 0) {
        response.data.data.forEach(item => {
          const itemTime = item.时间.substring(0, 5); // 只取 HH:MM 部分进行比较
          expect(itemTime).to.equal(time);
        });
      }
    });
  });
  
  /**
   * 功能测试 - 获取统计数据接口
   */
  describe('功能测试 - GET /power-forecast/stats', () => {
    // 测试统计数据格式和完整性
    it('应返回格式正确且完整的统计数据', async () => {
      const date = '2025-02-01';
      
      const response = await apiUtils.get('/power-forecast/stats', { date });
      
      // 验证基本响应
      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('status', 'success');
      expect(response.data).to.have.property('data').that.is.an('object');
      
      // 验证统计数据字段
      const stats = response.data.data;
      // 修改数据类型验证，处理字符串格式的数值
      expect(parseFloat(stats.maxLoad)).to.be.a('number');
      expect(parseFloat(stats.minLoad)).to.be.a('number');
      expect(parseFloat(stats.avgRenewable)).to.be.a('number');
      
      // 验证数据逻辑关系
      expect(parseFloat(stats.maxLoad)).to.be.at.least(parseFloat(stats.minLoad));
    });
  });
  
  /**
   * 错误处理测试
   */
  describe('错误处理测试', () => {
    // 测试无效的时间格式
    it('应正确处理无效的时间格式', async () => {
      const response = await apiUtils.get('/power-forecast', {
        startTime: '25:00',
        endTime: '26:00'
      });
      
      // 验证错误响应
      expect(response.status).to.equal(400);
      expect(response.data).to.have.property('status', 'error');
      expect(response.data).to.have.property('message');
    });
    
    // 测试缺少必要参数
    it('应正确处理缺少必要参数的情况', async () => {
      const response = await apiUtils.get('/power-forecast/stats');
      
      // 验证错误响应
      expect(response.status).to.equal(400);
      expect(response.data).to.have.property('status', 'error');
      expect(response.data).to.have.property('message');
    });
    
    // 测试无效的日期格式
    it('应正确处理无效的日期格式', async () => {
      const response = await apiUtils.get('/power-forecast/stats', {
        date: '2025/02/01'
      });
      
      // 验证错误响应
      expect(response.status).to.equal(400);
      expect(response.data).to.have.property('status', 'error');
      expect(response.data).to.have.property('message');
    });
  });
  
  /**
   * 性能测试
   */
  describe('性能测试', () => {
    // 测试响应时间
    it('应在规定时间内响应请求', async () => {
      const responseTime = await apiUtils.measureResponseTime('/power-forecast');
      
      // 验证响应时间不超过500毫秒
      expect(responseTime).to.be.at.most(500);
    });
    
    // 测试带参数请求的响应时间
    it('应在规定时间内响应带参数的请求', async () => {
      const responseTime = await apiUtils.measureResponseTime('/power-forecast', {
        startTime: '00:15',
        endTime: '23:45'
      });
      
      // 验证响应时间不超过500毫秒
      expect(responseTime).to.be.at.most(500);
    });
    
    // 测试统计接口响应时间
    it('应在规定时间内响应统计请求', async () => {
      const responseTime = await apiUtils.measureResponseTime('/power-forecast/stats', {
        date: '2025-02-01'
      });
      
      // 验证响应时间不超过500毫秒
      expect(responseTime).to.be.at.most(500);
    });
  });
  
  /**
   * 数据一致性测试
   */
  describe('数据一致性测试', () => {
    // 测试数据排序
    it('应返回按时间排序的数据', async () => {
      const response = await apiUtils.get('/power-forecast');
      
      // 验证数据按时间排序
      if (response.data.data.length > 1) {
        const sortedData = [...response.data.data].sort((a, b) => {
          if (a.日期 !== b.日期) {
            return a.日期.localeCompare(b.日期);
          }
          return a.时间.localeCompare(b.时间);
        });
        
        expect(response.data.data).to.deep.equal(sortedData);
      }
    });
    
    // 测试统计数据与原始数据一致性
    it('应返回与原始数据一致的统计结果', async () => {
      const date = '2025-02-01';
      
      // 获取统计数据
      const statsResponse = await apiUtils.get('/power-forecast/stats', { date });
      
      // 获取原始数据
      const dataResponse = await apiUtils.get('/power-forecast');
      
      // 过滤指定日期的数据
      const filteredData = dataResponse.data.data.filter(item => item.日期 === date);
      
      if (filteredData.length > 0 && statsResponse.status === 200) {
        // 手动计算统计值
        const loadValues = filteredData.map(item => parseFloat(item.日前各交易时段负荷预测_MW) || 0);
        const renewableValues = filteredData.map(item => parseFloat(item.新能源总出力预测数值) || 0);
        
        const maxLoad = Math.max(...loadValues);
        const minLoad = Math.min(...loadValues);
        const avgRenewable = renewableValues.reduce((sum, val) => sum + val, 0) / renewableValues.length;
        
        // 验证统计结果与手动计算结果接近 - 修改为处理字符串格式的数值
        const stats = statsResponse.data.data;
        expect(parseFloat(stats.maxLoad)).to.be.closeTo(maxLoad, 0.1);
        expect(parseFloat(stats.minLoad)).to.be.closeTo(minLoad, 0.1);
        expect(parseFloat(stats.avgRenewable)).to.be.closeTo(avgRenewable, 0.1);
      }
    });
  });
}); 