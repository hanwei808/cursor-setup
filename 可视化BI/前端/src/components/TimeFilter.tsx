import React, { useState } from 'react';
import { Row, Col, DatePicker, TimePicker, Button } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import config from '../utils/config';
import './TimeFilter.css';

interface TimeFilterProps {
  onTimeChange: (range: { startTime?: string; endTime?: string }) => void;
}

const TimeFilter: React.FC<TimeFilterProps> = ({ onTimeChange }) => {
  const [date, setDate] = useState<Dayjs | null>(dayjs(config.defaultDate));
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);

  const handleDateChange = (value: Dayjs | null) => {
    setDate(value);
  };

  const handleStartTimeChange = (time: Dayjs | null) => {
    setStartTime(time);
  };

  const handleEndTimeChange = (time: Dayjs | null) => {
    setEndTime(time);
  };

  const handleSearch = () => {
    const range: { startTime?: string; endTime?: string } = {};
    
    if (startTime) {
      range.startTime = startTime.format('HH:mm');
    }
    
    if (endTime) {
      range.endTime = endTime.format('HH:mm');
    }
    
    onTimeChange(range);
  };

  const handleReset = () => {
    setDate(dayjs(config.defaultDate));
    setStartTime(null);
    setEndTime(null);
    onTimeChange({});
  };

  return (
    <div className="time-filter">
      <Row gutter={16} align="middle">
        <Col xs={24} sm={8} md={6} lg={4}>
          <DatePicker 
            placeholder="选择日期" 
            value={date}
            onChange={handleDateChange}
            style={{ width: '100%' }}
            defaultValue={dayjs(config.defaultDate)}
            disabled
          />
        </Col>
        <Col xs={24} sm={8} md={6} lg={4}>
          <TimePicker 
            placeholder="开始时间" 
            value={startTime}
            onChange={handleStartTimeChange}
            format="HH:mm"
            minuteStep={15}
            style={{ width: '100%' }}
          />
        </Col>
        <Col xs={24} sm={8} md={6} lg={4}>
          <TimePicker 
            placeholder="结束时间" 
            value={endTime}
            onChange={handleEndTimeChange}
            format="HH:mm"
            minuteStep={15}
            style={{ width: '100%' }}
          />
        </Col>
        <Col xs={24} sm={8} md={6} lg={4} style={{ display: 'flex' }}>
          <Button type="primary" onClick={handleSearch} style={{ marginRight: 8 }}>
            查询
          </Button>
          <Button onClick={handleReset}>重置</Button>
        </Col>
      </Row>
    </div>
  );
};

export default TimeFilter; 