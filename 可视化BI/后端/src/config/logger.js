const morgan = require('morgan')
const fs = require('fs')
const path = require('path')

// 创建日志目录
const logDir = path.join(__dirname, '../../logs')
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}

// 创建写入流
const accessLogStream = fs.createWriteStream(
  path.join(logDir, 'access.log'),
  { flags: 'a' }
)

// 自定义日志格式
const logFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms'

// 开发环境使用彩色日志
const devLogger = morgan('dev')

// 生产环境写入文件
const prodLogger = morgan(logFormat, { stream: accessLogStream })

module.exports = {
  devLogger,
  prodLogger
} 