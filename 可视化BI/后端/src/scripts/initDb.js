/**
 * 数据库初始化脚本
 * 用于创建数据库表结构
 * 
 * 使用方法:
 * node src/scripts/initDb.js [--force]
 * 
 * 参数:
 * --force: 强制重建表(会删除现有数据)
 */

require('dotenv').config()
const { syncDatabase } = require('../config/database')

// 检查是否有 --force 参数
const forceReset = process.argv.includes('--force')

async function initDatabase() {
  console.log('开始初始化数据库...')
  console.log(forceReset ? '警告: 将强制重建表结构,所有数据将被删除!' : '将保留现有数据')
  
  try {
    await syncDatabase(forceReset)
    console.log('数据库初始化完成')
    process.exit(0)
  } catch (error) {
    console.error('数据库初始化失败:', error)
    process.exit(1)
  }
}

initDatabase() 