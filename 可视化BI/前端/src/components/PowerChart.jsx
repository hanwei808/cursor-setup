import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { Card, Spin, Empty, Radio } from 'antd';
import { 
  DownloadOutlined, 
  FullscreenOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { ThemeContext } from '../utils/themeContext';

/**
 * 电力图表组件
 * @param {Object} props - 组件属性
 * @param {string} props.title - 图表标题
 * @param {Array} props.data - 图表数据
 * @param {boolean} props.loading - 加载状态
 * @param {Function} props.onRefresh - 刷新回调
 * @param {Function} props.onDownload - 下载回调
 * @param {Function} props.onFullscreen - 全屏回调
 * @returns {JSX.Element} 电力图表
 */
const PowerChart = ({ 
  title, 
  data, 
  loading = false, 
  onRefresh, 
  onDownload, 
  onFullscreen 
}) => {
  const { darkMode } = useContext(ThemeContext);
  const [chartType, setChartType] = React.useState('line');
  
  if (!data || data.length === 0) {
    return (
      <Card 
        title={title}
        className="chart-card"
        extra={
          <div className="chart-actions">
            <ReloadOutlined onClick={onRefresh} />
          </div>
        }
      >
        {loading ? (
          <div className="chart-loading">
            <Spin size="large" />
          </div>
        ) : (
          <Empty description="暂无数据" />
        )}
      </Card>
    );
  }
  
  // 图表配置
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: darkMode ? '#f5f5f7' : '#1d1d1f',
          font: {
            family: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial',
            size: 12
          }
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: darkMode ? 'rgba(44, 44, 46, 0.9)' : 'rgba(255, 255, 255, 0.9)',
        titleColor: darkMode ? '#f5f5f7' : '#1d1d1f',
        bodyColor: darkMode ? '#a1a1a6' : '#86868b',
        borderColor: darkMode ? '#38383a' : '#d2d2d7',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          color: darkMode ? '#a1a1a6' : '#86868b'
        }
      },
      y: {
        grid: {
          color: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          color: darkMode ? '#a1a1a6' : '#86868b'
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart'
    }
  };
  
  return (
    <Card 
      title={title}
      className="chart-card"
      extra={
        <div className="chart-actions">
          <Radio.Group 
            value={chartType} 
            onChange={(e) => setChartType(e.target.value)}
            size="small"
            buttonStyle="solid"
          >
            <Radio.Button value="line">折线图</Radio.Button>
            <Radio.Button value="bar">柱状图</Radio.Button>
            <Radio.Button value="area">面积图</Radio.Button>
          </Radio.Group>
          <ReloadOutlined onClick={onRefresh} className="action-icon" />
          <DownloadOutlined onClick={onDownload} className="action-icon" />
          <FullscreenOutlined onClick={onFullscreen} className="action-icon" />
        </div>
      }
    >
      <div className="chart-container" style={{ height: '400px' }}>
        {loading ? (
          <div className="chart-loading">
            <Spin size="large" />
          </div>
        ) : (
          <Line data={data} options={chartOptions} />
        )}
      </div>
    </Card>
  );
};

export default PowerChart; 