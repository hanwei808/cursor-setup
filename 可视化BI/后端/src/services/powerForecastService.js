const { Op } = require('sequelize')
const PowerForecast = require('../models/PowerForecast')

class PowerForecastService {
  /**
   * 获取电力数据
   * @param {string} date - 日期 YYYY-MM-DD
   * @param {string} startTime - 开始时间 HH:mm
   * @param {string} endTime - 结束时间 HH:mm
   */
  async getPowerData(date, startTime, endTime) {
    const where = {}
    
    if (date) {
      where.日期 = date
    }
    
    if (startTime && endTime) {
      where.时间 = {
        [Op.between]: [startTime, endTime]
      }
    }

    return await PowerForecast.findAll({
      where,
      limit: 1000,
      order: [
        ['日期', 'ASC'],
        ['时间', 'ASC']
      ]
    })
  }

  /**
   * 获取统计数据
   * @param {string} date - 日期 YYYY-MM-DD
   */
  async getStats(date) {
    const where = date ? { 日期: date } : {}
    
    const stats = await PowerForecast.findAll({
      where,
      attributes: [
        [sequelize.fn('MAX', sequelize.col('日前各交易时段负荷预测_MW')), 'maxLoad'],
        [sequelize.fn('MIN', sequelize.col('日前各交易时段负荷预测_MW')), 'minLoad'],
        [sequelize.fn('AVG', sequelize.col('新能源总出力预测数值')), 'avgRenewable']
      ]
    })

    return stats[0]
  }
}

module.exports = new PowerForecastService() 