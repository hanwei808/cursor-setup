import React from 'react';
import styled from 'styled-components';
import { useThemeContext } from './ThemeProvider';

/**
 * 卡片组件
 * @param {Object} props - 组件属性
 * @param {string} props.title - 卡片标题
 * @param {React.ReactNode} props.icon - 卡片图标
 * @param {boolean} props.hoverable - 是否有悬停效果
 * @returns {JSX.Element} 卡片组件
 */
const Card = ({ 
  children, 
  title, 
  icon, 
  hoverable = true,
  ...props 
}) => {
  const { colors } = useThemeContext();
  
  return (
    <StyledCard 
      $hoverable={hoverable}
      $colors={colors}
      {...props}
    >
      {(title || icon) && (
        <CardHeader>
          {icon && <CardIcon>{icon}</CardIcon>}
          {title && <CardTitle>{title}</CardTitle>}
        </CardHeader>
      )}
      <CardContent>
        {children}
      </CardContent>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  background-color: ${props => props.$colors.cardBackground};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${props => props.$colors.mode === 'light' 
    ? '0 4px 12px rgba(0, 0, 0, 0.08)' 
    : '0 4px 12px rgba(0, 0, 0, 0.3)'};
  transition: transform 0.3s, box-shadow 0.3s;
  
  ${props => props.$hoverable && `
    &:hover {
      transform: translateY(-4px);
      box-shadow: ${props.$colors.mode === 'light' 
        ? '0 8px 24px rgba(0, 0, 0, 0.12)' 
        : '0 8px 24px rgba(0, 0, 0, 0.4)'};
    }
  `}
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid ${props => props.theme.colors?.border || '#eee'};
`;

const CardIcon = styled.div`
  margin-right: 12px;
  display: flex;
  align-items: center;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
`;

const CardContent = styled.div`
  padding: 20px;
`;

export default Card; 