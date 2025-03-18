import React from 'react';
import { Row, Col, Card, Tabs } from 'antd';
import LineChart from './charts/LineChart';
import BarChart from './charts/BarChart';
import config from '../utils/config';
import './ChartSection.css';

interface ChartSectionProps {
  data: any[];
}

const ChartSection: React.FC<ChartSectionProps> = ({ data }) => {
  // 如果没有数据，返回空
  if (!data || data.length === 0) {
    return null;
  }

  // 准备图表数据
  const prepareChartData = () => {
    // 按时间排序
    const sortedData = [...data].sort((a, b) => {
      return a.时间.localeCompare(b.时间);
    });

    // 限制数据点数量
    const maxPoints = config.chart.maxDataPoints;
    const step = sortedData.length > maxPoints ? Math.floor(sortedData.length / maxPoints) : 1;
    const limitedData = sortedData.filter((_, index) => index % step === 0);

    // 提取时间标签
    const timeLabels = limitedData.map(item => item.时间);

    // 提取各种数据
    const loadForecast = limitedData.map(item => parseFloat(item['日前各交易时段负荷预测_MW']) || 0);
    const actualLoad = limitedData.map(item => parseFloat(item['电网实际负荷实时系统备用信息_负荷']) || 0);
    const renewablePower = limitedData.map(item => parseFloat(item['新能源总出力预测数值']) || 0);
    const windPower = limitedData.map(item => parseFloat(item['风电总出力预测数值']) || 0);
    const solarPower = limitedData.map(item => parseFloat(item['光电总出力预测数值']) || 0);
    const hydroPower = limitedData.map(item => parseFloat(item['日前水电含抽蓄发电出力预测_MW']) || 0);
    const nonMarketPower = limitedData.map(item => parseFloat(item['非市场化机组实际出力曲线']) || 0);

    return {
      timeLabels,
      loadForecast,
      actualLoad,
      renewablePower,
      windPower,
      solarPower,
      hydroPower,
      nonMarketPower
    };
  };

  const chartData = prepareChartData();

  // 负荷预测与实际负荷对比数据
  const loadComparisonData = {
    labels: chartData.timeLabels,
    datasets: [
      {
        label: '负荷预测 (MW)',
        data: chartData.loadForecast,
        borderColor: config.chart.colors.loadForecast,
        backgroundColor: `${config.chart.colors.loadForecast}1A`, // 10% 透明度
        fill: true,
        tension: 0.4
      },
      {
        label: '实际负荷 (MW)',
        data: chartData.actualLoad,
        borderColor: config.chart.colors.actualLoad,
        backgroundColor: `${config.chart.colors.actualLoad}1A`, // 10% 透明度
        fill: true,
        tension: 0.4
      }
    ]
  };

  // 新能源出力预测数据
  const renewableData = {
    labels: chartData.timeLabels,
    datasets: [
      {
        label: '新能源总出力 (MW)',
        data: chartData.renewablePower,
        borderColor: config.chart.colors.renewable,
        backgroundColor: `${config.chart.colors.renewable}1A`, // 10% 透明度
        fill: true,
        tension: 0.4
      },
      {
        label: '风电出力 (MW)',
        data: chartData.windPower,
        borderColor: config.chart.colors.wind,
        backgroundColor: `${config.chart.colors.wind}1A`, // 10% 透明度
        fill: true,
        tension: 0.4
      },
      {
        label: '光电出力 (MW)',
        data: chartData.solarPower,
        borderColor: config.chart.colors.solar,
        backgroundColor: `${config.chart.colors.solar}1A`, // 10% 透明度
        fill: true,
        tension: 0.4
      }
    ]
  };

  // 电力供需平衡分析数据
  const powerBalanceData = {
    labels: chartData.timeLabels,
    datasets: [
      {
        label: '水电出力 (MW)',
        data: chartData.hydroPower,
        backgroundColor: config.chart.colors.hydro,
      },
      {
        label: '新能源出力 (MW)',
        data: chartData.renewablePower,
        backgroundColor: config.chart.colors.renewable,
      },
      {
        label: '非市场化机组出力 (MW)',
        data: chartData.nonMarketPower,
        backgroundColor: config.chart.colors.nonMarket,
      }
    ]
  };

  return (
    <div className="chart-section">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card title="电力数据可视化" bordered={false}>
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  key: '1',
                  label: '负荷预测与实际负荷对比',
                  children: <LineChart data={loadComparisonData} />,
                },
                {
                  key: '2',
                  label: '新能源出力预测趋势',
                  children: <LineChart data={renewableData} />,
                },
                {
                  key: '3',
                  label: '电力供需平衡分析',
                  children: <BarChart data={powerBalanceData} />,
                },
              ]}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ChartSection; 