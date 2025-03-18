import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import './LineChart.css';

// 注册 Chart.js 组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface LineChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
      fill?: boolean;
      tension?: number;
    }[];
  };
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          borderColor: 'rgba(0,0,0,0.1)',
          color: 'rgba(0,0,0,0.1)',
          display: true
        },
        ticks: {
          color: 'rgba(0,0,0,0.6)'
        }
      },
      x: {
        grid: {
          display: false,
          borderColor: 'rgba(0,0,0,0.1)',
          color: 'rgba(0,0,0,0.1)'
        },
        ticks: {
          color: 'rgba(0,0,0,0.6)'
        }
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 2,
        hoverRadius: 4,
      },
    },
  };

  return (
    <div className="line-chart-container">
      <Line options={options} data={data} />
    </div>
  );
};

export default LineChart; 