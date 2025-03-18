import React from 'react';
import { ArrowUpOutlined, ArrowDownOutlined, ThunderboltOutlined, LineChartOutlined, DashboardOutlined } from '@ant-design/icons';
import './DataCard.css';

/**
 * 数据卡片组件
 * @param {string} title - 卡片标题
 * @param {number} value - 数值
 * @param {string} unit - 单位
 * @param {string} icon - 图标类型 (power, forecast, load)
 * @param {string} trend - 趋势 (up, down)
 * @param {number} change - 变化值
 */
function DataCard({ title, value, unit, icon, trend, change }) {
  // 根据图标类型选择图标
  const renderIcon = () => {
    switch (icon) {
      case 'power':
        return <ThunderboltOutlined />;
      case 'forecast':
        return <LineChartOutlined />;
      case 'load':
        return <DashboardOutlined />;
      default:
        return <ThunderboltOutlined />;
    }
  };

  // 格式化数值
  const formatValue = (val) => {
    if (typeof val !== 'number') return val;
    
    // 如果是整数，不显示小数点
    if (val % 1 === 0) return val.toLocaleString();
    
    // 否则保留两位小数
    return val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  return (
    <div className="data-card">
      <div className="data-card-header">
        <div className={`data-card-icon ${icon}`}>
          {renderIcon()}
        </div>
        <div className="data-card-title">{title}</div>
      </div>
      <div className="data-card-value">
        {formatValue(value)}
        <span className="data-card-unit">{unit}</span>
      </div>
      {change !== undefined && (
        <div className={`data-card-change ${trend}`}>
          <span className="data-card-change-icon">
            {trend === 'up' ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          </span>
          {formatValue(Math.abs(change))} {unit} ({trend === 'up' ? '增加' : '减少'})
        </div>
      )}
    </div>
  );
}

export default DataCard; 