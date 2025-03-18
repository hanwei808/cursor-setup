import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import './Chart.css';

/**
 * 图表组件
 * @param {string} type - 图表类型 (line, bar, pie, etc.)
 * @param {object} data - 图表数据
 * @param {string} title - 图表标题
 * @param {string} description - 图表描述
 * @param {object} options - 图表配置选项
 */
function ChartComponent({ type, data, title, description, options = {} }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      // 销毁旧图表
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // 创建新图表
      const ctx = chartRef.current.getContext('2d');
      
      // 默认配置
      const defaultOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            titleColor: '#333',
            bodyColor: '#666',
            borderColor: '#e6e6e6',
            borderWidth: 1,
            cornerRadius: 8,
            boxPadding: 6,
            usePointStyle: true,
          },
        },
        animation: {
          duration: 1000,
          easing: 'easeOutQuart',
        },
      };

      // 合并选项
      const mergedOptions = { ...defaultOptions, ...options };

      // 创建图表
      chartInstance.current = new Chart(ctx, {
        type,
        data,
        options: mergedOptions,
      });
    }

    // 组件卸载时销毁图表
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [type, data, options]);

  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3 className="chart-title">{title}</h3>
        {description && <p className="chart-description">{description}</p>}
      </div>
      <div className="chart-wrapper">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}

export default ChartComponent; 