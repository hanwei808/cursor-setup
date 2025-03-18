import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ThemeProvider from './components/ThemeProvider';
import Layout from './components/Layout';
import PowerForecast from './pages/PowerForecast';
import PowerStats from './pages/PowerStats';
import './styles/global.css';

/**
 * 应用主入口
 * 包含路由和主题提供者
 */
function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<PowerForecast />} />
            <Route path="/stats" element={<PowerStats />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App; 