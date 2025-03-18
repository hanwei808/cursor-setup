import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Layout, Space } from 'antd';
import { 
  BarChartOutlined, 
  LineChartOutlined, 
  DashboardOutlined,
  SettingOutlined
} from '@ant-design/icons';
import ThemeToggle from './ThemeToggle';
import { ThemeContext } from '../utils/themeContext';
import logo from '../assets/logo.svg';
import './Header.css';

const { Header: AntHeader } = Layout;

/**
 * 应用头部导航组件
 * @returns {JSX.Element} 头部导航栏
 */
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { darkMode } = useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    {
      key: '/power-forecast',
      icon: <LineChartOutlined />,
      label: '电力预测'
    },
    {
      key: '/power-stats',
      icon: <BarChartOutlined />,
      label: '电力统计'
    },
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: '数据看板'
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: '系统设置'
    }
  ];

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>电力系统</span>
          </Link>
        </div>

        {/* 桌面导航 */}
        <nav className="desktop-nav">
          <ul>
            {menuItems.map((item) => (
              <li key={item.key}>
                <Link 
                  to={item.key} 
                  className={location.pathname === item.key ? 'active' : ''}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          
          {/* 移动端菜单按钮 */}
          <button 
            className={`mobile-menu-button ${isMobileMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="菜单"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* 移动端导航 */}
      <nav className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul>
          {menuItems.map((item) => (
            <li key={item.key}>
              <Link 
                to={item.key} 
                className={location.pathname === item.key ? 'active' : ''}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header; 