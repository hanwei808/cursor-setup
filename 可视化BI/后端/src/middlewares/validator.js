// 验证时间范围参数
exports.validateTimeRange = (req, res, next) => {
  const { startTime, endTime } = req.query
  
  // 如果有开始时间,必须有结束时间
  if ((startTime && !endTime) || (!startTime && endTime)) {
    return res.status(400).json({
      status: 'error',
      message: '开始时间和结束时间必须同时提供'
    })
  }

  // 验证时间格式 (HH:mm)
  const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/
  if (startTime && !timePattern.test(startTime)) {
    return res.status(400).json({
      status: 'error',
      message: '开始时间格式无效,应为 HH:mm'
    })
  }
  if (endTime && !timePattern.test(endTime)) {
    return res.status(400).json({
      status: 'error',
      message: '结束时间格式无效,应为 HH:mm'
    })
  }

  next()
}

// 验证日期参数
exports.validateDate = (req, res, next) => {
  const { date } = req.query
  
  if (!date) {
    return res.status(400).json({
      status: 'error',
      message: '日期参数必填'
    })
  }

  // 验证日期格式 (YYYY-MM-DD)
  const datePattern = /^\d{4}-\d{2}-\d{2}$/
  if (!datePattern.test(date)) {
    return res.status(400).json({
      status: 'error',
      message: '日期格式无效,应为 YYYY-MM-DD'
    })
  }

  next()
} 