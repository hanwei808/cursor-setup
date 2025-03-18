import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, ThunderboltOutlined, SafetyOutlined } from '@ant-design/icons';
import './DataOverview.css';

interface DataOverviewProps {
  data: any[];
}

const DataOverview: React.FC<DataOverviewProps> = ({ data }) => {
  // 如果没有数据，返回空
  if (!data || data.length === 0) {
    return null;
  }

  // 获取最新数据
  const latestData = data[0];

  // 计算统计数据
  const calculateStats = () => {
    const loadForecast = parseFloat(latestData['日前各交易时段负荷预测_MW']) || 0;
    const actualLoad = parseFloat(latestData['电网实际负荷实时系统备用信息_负荷']) || 0;
    const renewablePower = parseFloat(latestData['新能源总出力预测数值']) || 0;
    const positiveReserve = parseFloat(latestData['电网实际负荷实时系统备用信息_正备用']) || 0;
    const negativeReserve = parseFloat(latestData['电网实际负荷实时系统备用信息_负备用']) || 0;
    
    // 计算负荷预测与实际负荷的差值百分比
    const loadDiff = actualLoad ? ((loadForecast - actualLoad) / actualLoad) * 100 : 0;
    
    return {
      loadForecast,
      actualLoad,
      renewablePower,
      positiveReserve,
      negativeReserve,
      loadDiff
    };
  };

  const stats = calculateStats();

  return (
    <div className="data-overview">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="负荷预测 (MW)"
              value={stats.loadForecast}
              precision={2}
              valueStyle={{ color: '#3f8600' }}
              prefix={<ArrowUpOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="实际负荷 (MW)"
              value={stats.actualLoad}
              precision={2}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ArrowDownOutlined />}
              suffix={
                <small style={{ fontSize: '14px', color: stats.loadDiff > 0 ? '#3f8600' : '#cf1322' }}>
                  {stats.loadDiff > 0 ? '+' : ''}{stats.loadDiff.toFixed(2)}%
                </small>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="新能源出力 (MW)"
              value={stats.renewablePower}
              precision={2}
              valueStyle={{ color: '#1890ff' }}
              prefix={<ThunderboltOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card>
            <Statistic
              title="系统备用 (MW)"
              value={stats.positiveReserve}
              precision={2}
              valueStyle={{ color: '#722ed1' }}
              prefix={<SafetyOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DataOverview; 