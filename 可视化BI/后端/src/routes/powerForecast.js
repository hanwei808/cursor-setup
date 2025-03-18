const express = require('express')
const router = express.Router()
const powerForecastController = require('../controllers/powerForecastController')

// 获取电力数据列表
router.get('/power-forecast', powerForecastController.getPowerData)

// 获取统计数据
router.get('/power-forecast/stats', powerForecastController.getStats)

module.exports = router 