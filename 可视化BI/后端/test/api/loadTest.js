const axios = require('axios');
const apiUtils = require('./utils');

/**
 * 并发请求函数
 * @param {string} endpoint - API端点
 * @param {object} params - 请求参数
 * @param {number} concurrency - 并发数
 * @returns {Promise<Array>} - 响应时间数组(毫秒)
 */
async function concurrentRequests(endpoint, params = {}, concurrency = 10) {
  const requests = [];
  
  for (let i = 0; i < concurrency; i++) {
    requests.push(apiUtils.measureResponseTime(endpoint, params));
  }
  
  return Promise.all(requests);
}

/**
 * 计算统计数据
 * @param {Array<number>} times - 响应时间数组
 * @returns {object} - 统计结果
 */
function calculateStats(times) {
  const min = Math.min(...times);
  const max = Math.max(...times);
  const avg = times.reduce((sum, time) => sum + time, 0) / times.length;
  const median = times.sort((a, b) => a - b)[Math.floor(times.length / 2)];
  
  return {
    min,
    max,
    avg,
    median,
    count: times.length
  };
}

/**
 * 运行负载测试
 * @param {number} concurrency - 并发数
 */
async function runLoadTest(concurrency = 10) {
  console.log(`开始负载测试，并发数: ${concurrency}`);
  
  // 测试无参数请求
  console.log('\n测试 GET /power-forecast');
  const times1 = await concurrentRequests('/power-forecast', {}, concurrency);
  console.log('响应时间统计 (毫秒):', calculateStats(times1));
  
  // 测试带时间范围的请求
  console.log('\n测试 GET /power-forecast?startTime=00:15&endTime=12:00');
  const times2 = await concurrentRequests('/power-forecast', {
    startTime: '00:15',
    endTime: '12:00'
  }, concurrency);
  console.log('响应时间统计 (毫秒):', calculateStats(times2));
  
  // 测试统计接口
  console.log('\n测试 GET /power-forecast/stats?date=2025-02-01');
  const times3 = await concurrentRequests('/power-forecast/stats', {
    date: '2025-02-01'
  }, concurrency);
  console.log('响应时间统计 (毫秒):', calculateStats(times3));
  
  console.log('\n负载测试完成');
}

// 如果直接运行此文件，执行负载测试
if (require.main === module) {
  // 默认并发数为10，可通过命令行参数修改
  const concurrency = process.argv[2] ? parseInt(process.argv[2]) : 10;
  runLoadTest(concurrency).catch(console.error);
}

module.exports = {
  runLoadTest,
  concurrentRequests,
  calculateStats
}; 