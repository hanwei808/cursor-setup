import React, { useState, useEffect } from 'react';
import TimeFilter from '../components/TimeFilter';
import DataCard from '../components/DataCard';
import ChartComponent from '../components/Chart';
import './PowerForecast.css';

/**
 * 电力预测页面
 * 展示电力预测数据和图表
 */
function PowerForecast() {
  const [startTime, setStartTime] = useState('00:00');
  const [endTime, setEndTime] = useState('23:59');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  
  // 模拟数据加载
  const fetchData = () => {
    setLoading(true);
    
    // 模拟API请求延迟
    setTimeout(() => {
      // 模拟数据
      const mockData = {
        summary: {
          hydroPower: {
            value: 12345.67,
            unit: 'MW',
            change: 234.56,
            trend: 'up'
          },
          loadForecast: {
            value: 15678.90,
            unit: 'MW',
            change: -123.45,
            trend: 'down'
          },
          peakLoad: {
            value: 18765.43,
            unit: 'MW',
            change: 432.10,
            trend: 'up'
          }
        },
        chartData: {
          labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
          datasets: [
            {
              label: '水电含抽蓄发电出力预测',
              data: [9500, 9300, 9100, 9400, 10200, 11500, 12300, 12800, 12500, 11800, 10500, 9800],
              borderColor: '#0066cc',
              backgroundColor: 'rgba(0, 102, 204, 0.1)',
              fill: true,
              tension: 0.4
            },
            {
              label: '负荷预测',
              data: [12000, 11500, 11000, 11800, 14500, 16800, 17500, 17800, 17200, 16500, 15000, 13500],
              borderColor: '#ff9500',
              backgroundColor: 'rgba(255, 149, 0, 0.1)',
              fill: true,
              tension: 0.4
            }
          ]
        }
      };
      
      setData(mockData);
      setLoading(false);
    }, 1000);
  };
  
  // 初始加载数据
  useEffect(() => {
    fetchData();
  }, []);
  
  // 处理筛选
  const handleFilter = () => {
    fetchData();
  };
  
  return (
    <div className="power-forecast-page">
      <div className="page-header">
        <h1>电力预测分析</h1>
        <p>查看和分析水电发电出力和负荷预测数据</p>
      </div>
      
      <TimeFilter
        startTime={startTime}
        endTime={endTime}
        onStartTimeChange={setStartTime}
        onEndTimeChange={setEndTime}
        onFilter={handleFilter}
      />
      
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>加载数据中...</p>
        </div>
      ) : data ? (
        <>
          <div className="data-cards-grid">
            <DataCard
              title="水电含抽蓄发电出力预测"
              value={data.summary.hydroPower.value}
              unit={data.summary.hydroPower.unit}
              icon="power"
              trend={data.summary.hydroPower.trend}
              change={data.summary.hydroPower.change}
            />
            
            <DataCard
              title="负荷预测"
              value={data.summary.loadForecast.value}
              unit={data.summary.loadForecast.unit}
              icon="forecast"
              trend={data.summary.loadForecast.trend}
              change={data.summary.loadForecast.change}
            />
            
            <DataCard
              title="峰值负荷"
              value={data.summary.peakLoad.value}
              unit={data.summary.peakLoad.unit}
              icon="load"
              trend={data.summary.peakLoad.trend}
              change={data.summary.peakLoad.change}
            />
          </div>
          
          <ChartComponent
            type="line"
            data={data.chartData}
            title="电力预测趋势图"
            description={`时间范围: ${startTime} - ${endTime}`}
            options={{
              plugins: {
                tooltip: {
                  mode: 'index',
                  intersect: false
                }
              }
            }}
          />
        </>
      ) : (
        <div className="no-data-message">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h3>暂无数据</h3>
          <p>请调整筛选条件后重试</p>
        </div>
      )}
    </div>
  );
}

export default PowerForecast; 