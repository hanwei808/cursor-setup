import React from 'react';
import styled from 'styled-components';
import { useThemeContext } from './ThemeProvider';

/**
 * 按钮组件
 * @param {Object} props - 组件属性
 * @param {string} props.variant - 按钮变体 (primary, secondary, outline)
 * @param {string} props.size - 按钮大小 (small, medium, large)
 * @param {React.ReactNode} props.icon - 按钮图标
 * @param {boolean} props.fullWidth - 是否全宽
 * @returns {JSX.Element} 按钮组件
 */
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  icon, 
  fullWidth = false,
  ...props 
}) => {
  const { colors } = useThemeContext();
  
  return (
    <StyledButton 
      $variant={variant} 
      $size={size} 
      $fullWidth={fullWidth}
      $colors={colors}
      {...props}
    >
      {icon && <span className="icon">{icon}</span>}
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 500;
  border-radius: 8px;
  transition: all 0.3s;
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  
  /* 尺寸 */
  padding: ${props => {
    switch(props.$size) {
      case 'small': return '6px 12px';
      case 'large': return '12px 24px';
      default: return '10px 20px';
    }
  }};
  
  font-size: ${props => {
    switch(props.$size) {
      case 'small': return '14px';
      case 'large': return '18px';
      default: return '16px';
    }
  }};
  
  /* 变体 */
  background-color: ${props => {
    switch(props.$variant) {
      case 'primary': return props.$colors.primary;
      case 'secondary': return props.$colors.secondary;
      case 'outline': return 'transparent';
      default: return props.$colors.primary;
    }
  }};
  
  color: ${props => {
    switch(props.$variant) {
      case 'primary': 
      case 'secondary': return 'white';
      case 'outline': return props.$colors.primary;
      default: return 'white';
    }
  }};
  
  border: ${props => {
    return props.$variant === 'outline' 
      ? `1px solid ${props.$colors.primary}` 
      : 'none';
  }};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: ${props => {
      switch(props.$variant) {
        case 'primary': return props.$colors.primary + 'dd';
        case 'secondary': return props.$colors.secondary + 'dd';
        case 'outline': return props.$colors.primary + '11';
        default: return props.$colors.primary + 'dd';
      }
    }};
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
  
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default Button; 