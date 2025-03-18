import React, { useState, useEffect } from 'react';
import TimeFilter from '../components/TimeFilter';
import DataCard from '../components/DataCard';
import ChartComponent from '../components/Chart';
import './PowerStats.css';

/**
 * 电力统计分析页面
 * 展示电力统计数据和分析图表
 */
function PowerStats() {
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
          averagePower: {
            value: 11234.56,
            unit: 'MW',
            change: 123.45,
            trend: 'up'
          },
          maxPower: {
            value: 15678.90,
            unit: 'MW',
            change: 345.67,
            trend: 'up'
          },
          efficiency: {
            value: 92.5,
            unit: '%',
            change: -1.5,
            trend: 'down'
          }
        },
        powerDistribution: {
          labels: ['水电', '火电', '风电', '光伏', '核电', '其他'],
          datasets: [{
            data: [35, 25, 15, 10, 12, 3],
            backgroundColor: [
              '#0066cc',
              '#ff3b30',
              '#34c759',
              '#ff9500',
              '#5856d6',
              '#8e8e93'
            ],
            borderWidth: 0
          }]
        },
        monthlyTrend: {
          labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          datasets: [{
            label: '月度发电量',
            data: [12500, 11800, 13200, 14500, 15800, 16700, 17500, 17800, 16500, 15200, 14000, 13500],
            backgroundColor: 'rgba(0, 102, 204, 0.7)',
            borderRadius: 6
          }]
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
    <div className="power-stats-page">
      <div className="page-header">
        <h1>电力统计分析</h1>
        <p>查看和分析电力生产和消耗的统计数据</p>
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
              title="平均发电功率"
              value={data.summary.averagePower.value}
              unit={data.summary.averagePower.unit}
              icon="power"
              trend={data.summary.averagePower.trend}
              change={data.summary.averagePower.change}
            />
            
            <DataCard
              title="最大发电功率"
              value={data.summary.maxPower.value}
              unit={data.summary.maxPower.unit}
              icon="load"
              trend={data.summary.maxPower.trend}
              change={data.summary.maxPower.change}
            />
            
            <DataCard
              title="发电效率"
              value={data.summary.efficiency.value}
              unit={data.summary.efficiency.unit}
              icon="forecast"
              trend={data.summary.efficiency.trend}
              change={data.summary.efficiency.change}
            />
          </div>
          
          <div className="charts-grid">
            <div className="chart-item">
              <ChartComponent
                type="pie"
                data={data.powerDistribution}
                title="电力来源分布"
                description="各类电力来源占比"
                options={{
                  plugins: {
                    legend: {
                      position: 'right'
                    }
                  }
                }}
              />
            </div>
            
            <div className="chart-item">
              <ChartComponent
                type="bar"
                data={data.monthlyTrend}
                title="月度发电量趋势"
                description="全年各月发电量统计"
              />
            </div>
          </div>
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

export default PowerStats; 