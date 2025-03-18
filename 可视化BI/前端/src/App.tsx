import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout, ConfigProvider, Menu } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import './App.css';
import Dashboard from './components/Dashboard';
import PowerForecast from './pages/PowerForecast';
import PowerStats from './pages/PowerStats';
import ErrorBoundary from './components/common/ErrorBoundary';

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  return (
    <ConfigProvider locale={zhCN}>
      <ErrorBoundary>
        <Router>
          <Layout className="layout">
            <Header className="header">
              <div className="logo">安徽电力交易中心 BI 系统</div>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ background: 'transparent', borderBottom: 'none', flex: 1, marginLeft: 24 }}
                items={[
                  { key: '/', label: '首页' },
                  { key: '/power-forecast', label: '电力预测' },
                  { key: '/power-stats', label: '电力统计' }
                ]}
                onSelect={({ key }) => {
                  // 直接使用 key 作为路径
                  window.location.href = key;
                }}
              />
            </Header>
            <Content className="content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/power-forecast" element={<PowerForecast />} />
                <Route path="/power-stats" element={<PowerStats />} />
              </Routes>
            </Content>
            <Footer className="footer">安徽电力交易中心 BI 系统 ©2025</Footer>
          </Layout>
        </Router>
      </ErrorBoundary>
    </ConfigProvider>
  );
};

export default App;
