const { Op } = require('sequelize')
const PowerForecast = require('../models/PowerForecast')

// 获取电力数据列表
exports.getPowerData = async (req, res) => {
  try {
    const { startTime, endTime } = req.query
    const where = {}

    // 如果有时间范围参数,添加时间过滤条件
    if (startTime && endTime) {
      where.时间 = {
        [Op.between]: [startTime, endTime]
      }
    }

    const data = await PowerForecast.findAll({
      where,
      limit: 1000, // 限制返回记录数
      order: [['日期', 'ASC'], ['时间', 'ASC']]
    })

    res.json({
      status: 'success',
      data
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    })
  }
}

// 获取统计数据
exports.getStats = async (req, res) => {
  try {
    const { date } = req.query

    if (!date) {
      return res.status(400).json({
        status: 'error',
        message: '日期参数必填'
      })
    }

    const stats = await PowerForecast.findOne({
      where: { 日期: date },
      attributes: [
        [
          PowerForecast.sequelize.fn('MAX', 
          PowerForecast.sequelize.col('日前各交易时段负荷预测_MW')),
          'maxLoad'
        ],
        [
          PowerForecast.sequelize.fn('MIN', 
          PowerForecast.sequelize.col('日前各交易时段负荷预测_MW')),
          'minLoad'
        ],
        [
          PowerForecast.sequelize.fn('AVG', 
          PowerForecast.sequelize.col('新能源总出力预测数值')),
          'avgRenewable'
        ]
      ]
    })

    res.json({
      status: 'success',
      data: stats
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    })
  }
} 