import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './BarChart.css';

// 注册 Chart.js 组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
  };
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
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
        stacked: true,
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
        stacked: true,
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
  };

  return (
    <div className="bar-chart-container">
      <Bar options={options} data={data} />
    </div>
  );
};

export default BarChart; 