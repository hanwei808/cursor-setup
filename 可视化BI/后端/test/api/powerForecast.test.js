const axios = require('axios');
const { expect } = require('chai');

// 基础URL
const BASE_URL = 'https://cidjdkmkznoh.sealoshzh.site/api';

describe('电力预测API测试', () => {
  /**
   * 测试获取电力数据接口
   */
  describe('GET /power-forecast', () => {
    // 测试无参数请求
    it('应返回默认电力数据列表', async () => {
      try {
        const response = await axios.get(`${BASE_URL}/power-forecast`);
        
        // 验证响应状态
        expect(response.status).to.equal(200);
        
        // 验证响应格式
        expect(response.data).to.have.property('status', 'success');
        expect(response.data).to.have.property('data');
        expect(response.data.data).to.be.an('array');
        
        // 验证数据字段
        if (response.data.data.length > 0) {
          const firstItem = response.data.data[0];
          expect(firstItem).to.have.property('日期');
          expect(firstItem).to.have.property('时间');
          expect(firstItem).to.have.property('日前各交易时段负荷预测_MW');
          expect(firstItem).to.have.property('新能源总出力预测数值');
        }
      } catch (error) {
        throw error;
      }
    });

    // 测试时间范围参数
    it('应返回指定时间范围内的电力数据', async () => {
      try {
        const startTime = '00:15';
        const endTime = '00:45';
        const response = await axios.get(`${BASE_URL}/power-forecast?startTime=${startTime}&endTime=${endTime}`);
        
        // 验证响应状态
        expect(response.status).to.equal(200);
        
        // 验证响应格式
        expect(response.data).to.have.property('status', 'success');
        expect(response.data).to.have.property('data');
        expect(response.data.data).to.be.an('array');
        
        // 验证时间范围
        if (response.data.data.length > 0) {
          response.data.data.forEach(item => {
            // 修改比较逻辑以处理 HH:MM:SS 格式
            const itemTime = item.时间.substring(0, 5); // 只取 HH:MM 部分进行比较
            expect(itemTime >= startTime && itemTime <= endTime).to.be.true;
          });
        }
      } catch (error) {
        throw error;
      }
    });

    // 测试无效时间格式
    it('应返回错误信息当时间格式无效', async () => {
      try {
        const response = await axios.get(`${BASE_URL}/power-forecast?startTime=25:00&endTime=26:00`);
        // 这里应该失败，所以不应该执行到这里
        expect.fail('请求应该失败但成功了');
      } catch (error) {
        // 验证错误响应
        expect(error.response.status).to.equal(400);
        expect(error.response.data).to.have.property('status', 'error');
        expect(error.response.data).to.have.property('message');
      }
    });

    // 测试缺少结束时间
    it('应返回错误信息当只提供开始时间', async () => {
      try {
        const response = await axios.get(`${BASE_URL}/power-forecast?startTime=00:15`);
        // 这里应该失败，所以不应该执行到这里
        expect.fail('请求应该失败但成功了');
      } catch (error) {
        // 验证错误响应
        expect(error.response.status).to.equal(400);
        expect(error.response.data).to.have.property('status', 'error');
        expect(error.response.data).to.have.property('message');
      }
    });
  });

  /**
   * 测试获取统计数据接口
   */
  describe('GET /power-forecast/stats', () => {
    // 测试有效日期参数
    it('应返回指定日期的统计数据', async () => {
      try {
        const date = '2025-02-01';
        const response = await axios.get(`${BASE_URL}/power-forecast/stats?date=${date}`);
        
        // 验证响应状态
        expect(response.status).to.equal(200);
        
        // 验证响应格式
        expect(response.data).to.have.property('status', 'success');
        expect(response.data).to.have.property('data');
        
        // 验证统计数据字段
        expect(response.data.data).to.have.property('maxLoad');
        expect(response.data.data).to.have.property('minLoad');
        expect(response.data.data).to.have.property('avgRenewable');
      } catch (error) {
        throw error;
      }
    });

    // 测试缺少日期参数
    it('应返回错误信息当未提供日期', async () => {
      try {
        const response = await axios.get(`${BASE_URL}/power-forecast/stats`);
        // 这里应该失败，所以不应该执行到这里
        expect.fail('请求应该失败但成功了');
      } catch (error) {
        // 验证错误响应
        expect(error.response.status).to.equal(400);
        expect(error.response.data).to.have.property('status', 'error');
        expect(error.response.data).to.have.property('message', '日期参数必填');
      }
    });

    // 测试无效日期格式
    it('应返回错误信息当日期格式无效', async () => {
      try {
        const response = await axios.get(`${BASE_URL}/power-forecast/stats?date=2025/02/01`);
        // 这里应该失败，所以不应该执行到这里
        expect.fail('请求应该失败但成功了');
      } catch (error) {
        // 验证错误响应
        expect(error.response.status).to.equal(400);
        expect(error.response.data).to.have.property('status', 'error');
        expect(error.response.data).to.have.property('message');
      }
    });
  });

  /**
   * 测试性能要求
   */
  describe('API性能测试', () => {
    it('应在500毫秒内响应', async () => {
      try {
        const startTime = Date.now();
        await axios.get(`${BASE_URL}/power-forecast`);
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        
        expect(responseTime).to.be.at.most(500);
      } catch (error) {
        throw error;
      }
    });
  });
}); 