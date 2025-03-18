import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Spin, message, Alert } from 'antd';
import TimeFilter from './TimeFilter';
import DataOverview from './DataOverview';
import ChartSection from './ChartSection';
import { powerForecastApi } from '../utils/api';
import { handleAbnormalData } from '../utils/dataProcess';
import { handleApiError, isApiResponseSuccess } from '../utils/errorHandler';
import { setGlobalLoading } from '../utils/loadingState';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [powerData, setPowerData] = useState<any[]>([]);
  const [timeRange, setTimeRange] = useState<{startTime?: string, endTime?: string}>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, [timeRange]);

  const fetchData = async () => {
    setLoading(true);
    setGlobalLoading(true);
    setError(null);
    
    try {
      const params: any = {};
      if (timeRange.startTime) params.startTime = timeRange.startTime;
      if (timeRange.endTime) params.endTime = timeRange.endTime;

      const response = await powerForecastApi.getPowerForecastData(params);
      
      // 处理响应数据
      if (isApiResponseSuccess(response)) {
        // 处理异常值和缺失值
        const processedData = handleAbnormalData(response.data);
        setPowerData(processedData);
      } else {
        const errorMsg = '获取数据失败：数据格式不正确';
        setError(errorMsg);
        message.error(errorMsg);
        setPowerData([]);
      }
    } catch (error: any) {
      const errorMsg = error.message || '获取电力数据失败';
      setError(errorMsg);
      handleApiError(error, '获取电力数据失败');
      setPowerData([]);
    } finally {
      setLoading(false);
      setGlobalLoading(false);
    }
  };

  const handleTimeChange = (range: {startTime?: string, endTime?: string}) => {
    setTimeRange(range);
  };

  const handleRefresh = () => {
    fetchData();
    message.success('正在刷新数据...');
  };

  return (
    <div className="dashboard">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card 
            title="时间筛选" 
            bordered={false}
            extra={
              <a onClick={handleRefresh} style={{ marginLeft: 8 }}>
                刷新数据
              </a>
            }
          >
            <TimeFilter onTimeChange={handleTimeChange} />
          </Card>
        </Col>
      </Row>
      
      {error && (
        <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
          <Col span={24}>
            <Alert
              message="数据获取错误"
              description={error}
              type="error"
              showIcon
              closable
              onClose={() => setError(null)}
            />
          </Col>
        </Row>
      )}
      
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          {loading ? (
            <div className="loading-container">
              <Spin size="large" tip="数据加载中..." />
            </div>
          ) : powerData.length === 0 ? (
            <div className="empty-data">
              <p>暂无数据，请调整查询条件后重试</p>
            </div>
          ) : (
            <>
              <DataOverview data={powerData} />
              <ChartSection data={powerData} />
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard; 