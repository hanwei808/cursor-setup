# API 测试文档

## 概述

本测试套件用于测试电力BI系统的API接口，包括功能测试、错误处理测试、性能测试和负载测试。

## 测试内容

测试套件包含以下测试类型：

1. **基础功能测试**：验证API的基本功能是否正常工作
2. **高级功能测试**：测试更复杂的场景和边界条件
3. **错误处理测试**：验证API对错误输入的处理
4. **性能测试**：测试API的响应时间
5. **负载测试**：测试API在并发请求下的表现

## 测试文件结构

```
test/
├── api/
│   ├── powerForecast.test.js     # 基础功能测试
│   ├── powerForecast.advanced.test.js  # 高级功能测试
│   ├── loadTest.js               # 负载测试
│   └── utils.js                  # 测试工具函数
├── mocha.opts                    # Mocha配置
└── README.md                     # 测试文档
```

## 环境要求

- Node.js 16.0+
- npm 或 yarn

## 安装依赖

```bash
npm install
```

## 运行测试

### 运行所有API测试

```bash
npm run test:api
```

### 运行基础功能测试

```bash
npx mocha test/api/powerForecast.test.js
```

### 运行高级功能测试

```bash
npx mocha test/api/powerForecast.advanced.test.js
```

### 运行负载测试

```bash
# 默认并发数为10
node test/api/loadTest.js

# 指定并发数
node test/api/loadTest.js 20
```

## 测试内容详解

### 1. 基础功能测试 (powerForecast.test.js)

测试API的基本功能：

- 获取电力数据列表
- 使用时间范围过滤数据
- 获取统计数据
- 验证响应格式和字段

### 2. 高级功能测试 (powerForecast.advanced.test.js)

测试更复杂的场景：

- 数据格式和完整性验证
- 边界条件测试
- 数据一致性测试
- 排序验证

### 3. 错误处理测试

验证API对错误输入的处理：

- 无效的时间格式
- 缺少必要参数
- 无效的日期格式

### 4. 性能测试

验证API的响应时间是否符合要求（<500ms）：

- 无参数请求
- 带参数请求
- 统计接口请求

### 5. 负载测试 (loadTest.js)

测试API在并发请求下的表现：

- 并发请求响应时间
- 最小/最大/平均/中位数响应时间统计

## 测试结果解读

测试成功时，将显示类似以下输出：

```
  电力预测API测试
    GET /power-forecast
      ✓ 应返回默认电力数据列表
      ✓ 应返回指定时间范围内的电力数据
      ✓ 应返回错误信息当时间格式无效
      ✓ 应返回错误信息当只提供开始时间
    GET /power-forecast/stats
      ✓ 应返回指定日期的统计数据
      ✓ 应返回错误信息当未提供日期
      ✓ 应返回错误信息当日期格式无效
    API性能测试
      ✓ 应在500毫秒内响应

  8 passing (1s)
```

负载测试结果示例：

```
开始负载测试，并发数: 10

测试 GET /power-forecast
响应时间统计 (毫秒): { min: 120, max: 350, avg: 210.5, median: 205, count: 10 }

测试 GET /power-forecast?startTime=00:15&endTime=12:00
响应时间统计 (毫秒): { min: 130, max: 380, avg: 230.2, median: 225, count: 10 }

测试 GET /power-forecast/stats?date=2025-02-01
响应时间统计 (毫秒): { min: 110, max: 320, avg: 190.8, median: 185, count: 10 }

负载测试完成
``` 