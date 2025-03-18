const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
require('dotenv').config()

const { devLogger, prodLogger } = require('./config/logger')
const { testConnection, syncDatabase } = require('./config/database')
const errorHandler = require('./middlewares/errorHandler')
const { validateTimeRange, validateDate } = require('./middlewares/validator')
const powerForecastRoutes = require('./routes/powerForecast')

const app = express()

// 基础中间件
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(helmet())

// 日志中间件
if (process.env.NODE_ENV === 'development') {
  app.use(devLogger)
} else {
  app.use(prodLogger)
}

// 路由中间件
app.use('/api', validateTimeRange) // 全局时间验证
app.use('/api/power-forecast/stats', validateDate) // 统计接口日期验证
app.use('/api', powerForecastRoutes)

// 错误处理中间件
app.use(errorHandler)

// 启动服务器
const PORT = process.env.PORT || 3000
app.listen(PORT, async () => {
  // 测试数据库连接
  await testConnection()
  
  // 同步数据库结构
  await syncDatabase(false) // 参数为 false 表示不强制重建表
  
  console.log(`服务器运行在端口 ${PORT}`)
})

// 优雅关闭
process.on('SIGTERM', () => {
  console.log('收到 SIGTERM 信号,正在关闭服务器...')
  app.close(() => {
    console.log('服务器已关闭')
    process.exit(0)
  })
})

module.exports = app 