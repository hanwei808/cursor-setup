const { Sequelize } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  pool: {
    max: 50,
    min: 20,
    acquire: 30000,
    idle: 10000
  },
  logging: process.env.NODE_ENV === 'development' ? console.log : false
})

// 测试数据库连接
const testConnection = async () => {
  try {
    await sequelize.authenticate()
    console.log('数据库连接成功')
  } catch (error) {
    console.error('数据库连接失败:', error)
  }
}

// 同步数据库结构
const syncDatabase = async (force = false) => {
  try {
    await sequelize.sync({ force })
    console.log('数据库表结构同步' + (force ? '(强制重建)' : '') + '成功')
  } catch (error) {
    console.error('数据库表结构同步失败:', error)
  }
}

module.exports = {
  sequelize,
  testConnection,
  syncDatabase
} 