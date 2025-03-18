import React from 'react';
import { TimePicker, Button } from 'antd';
import { FilterOutlined, ReloadOutlined } from '@ant-design/icons';
import moment from 'moment';
import './TimeFilter.css';

/**
 * 时间筛选组件
 * @param {string} startTime - 开始时间
 * @param {string} endTime - 结束时间
 * @param {function} onStartTimeChange - 开始时间变化回调
 * @param {function} onEndTimeChange - 结束时间变化回调
 * @param {function} onFilter - 筛选按钮点击回调
 */
function TimeFilter({ startTime, endTime, onStartTimeChange, onEndTimeChange, onFilter }) {
  const handleStartTimeChange = (time, timeString) => {
    onStartTimeChange(timeString);
  };

  const handleEndTimeChange = (time, timeString) => {
    onEndTimeChange(timeString);
  };
  
  const handleReset = () => {
    onStartTimeChange('00:00');
    onEndTimeChange('23:59');
    // 重置后自动触发筛选
    setTimeout(() => onFilter(), 0);
  };

  return (
    <div className="time-filter">
      <span className="time-filter-label">时间范围:</span>
      <div className="time-filter-inputs">
        <TimePicker
          value={startTime ? moment(startTime, 'HH:mm') : null}
          format="HH:mm"
          onChange={handleStartTimeChange}
          placeholder="开始时间"
          style={{ width: 120 }}
        />
        <span className="time-filter-separator">至</span>
        <TimePicker
          value={endTime ? moment(endTime, 'HH:mm') : null}
          format="HH:mm"
          onChange={handleEndTimeChange}
          placeholder="结束时间"
          style={{ width: 120 }}
        />
      </div>
      <div className="time-filter-buttons">
        <Button 
          className="time-filter-button reset"
          onClick={handleReset}
          icon={<ReloadOutlined />}
        >
          重置
        </Button>
        <Button 
          type="primary" 
          onClick={onFilter} 
          className="time-filter-button"
          icon={<FilterOutlined />}
        >
          筛选
        </Button>
      </div>
    </div>
  );
}

export default TimeFilter; 