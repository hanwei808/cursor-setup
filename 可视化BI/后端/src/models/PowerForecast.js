const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')

const PowerForecast = sequelize.define(
  'PowerForecast',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    日期: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    时间: {
      type: DataTypes.TIME,
      allowNull: false
    },
    日前水电含抽蓄发电出力预测_MW: {
      type: DataTypes.DECIMAL(10, 2)
    },
    日前各交易时段负荷预测_MW: {
      type: DataTypes.DECIMAL(10, 2)
    },
    日前发电总出力预测_MW: {
      type: DataTypes.DECIMAL(10, 2)
    },
    日前各交易时段外来_外送_电交易计划_MW: {
      type: DataTypes.DECIMAL(10, 2)
    },
    日前非市场化机组出力_MW: {
      type: DataTypes.DECIMAL(10, 2)
    },
    新能源总出力预测数值: {
      type: DataTypes.DECIMAL(10, 2)
    },
    光电总出力预测数值: {
      type: DataTypes.DECIMAL(10, 2)
    },
    风电总出力预测数值: {
      type: DataTypes.DECIMAL(10, 2)
    },
    日前电力供需平衡预测: {
      type: DataTypes.DECIMAL(10, 2)
    },
    次周新能源出力预测: {
      type: DataTypes.DECIMAL(10, 2)
    },
    日前_实时各交易时段出清总电量及均价: {
      type: DataTypes.STRING(255)
    },
    电网实际负荷实时系统备用信息_负荷: {
      type: DataTypes.DECIMAL(10, 2)
    },
    电网实际负荷实时系统备用信息_正备用: {
      type: DataTypes.DECIMAL(10, 2)
    },
    电网实际负荷实时系统备用信息_负备用: {
      type: DataTypes.DECIMAL(10, 2)
    },
    非市场化机组实际出力曲线: {
      type: DataTypes.DECIMAL(10, 2)
    }
  },
  {
    tableName: 'power_forecast',
    timestamps: false,
    indexes: [
      {
        name: 'idx_date_time',
        fields: ['日期', '时间']
      },
      {
        name: 'idx_load_forecast',
        fields: ['日前各交易时段负荷预测_MW']
      },
      {
        name: 'idx_actual_load',
        fields: ['电网实际负荷实时系统备用信息_负荷']
      },
      {
        name: 'idx_renewable_forecast',
        fields: ['新能源总出力预测数值']
      }
    ]
  }
)

module.exports = PowerForecast 