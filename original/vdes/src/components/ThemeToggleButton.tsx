import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeMode } from '../context/ThemeContext';

interface ThemeToggleButtonProps {
  size?: 'small' | 'medium' | 'large';
  sx?: object;
}

export const ThemeToggleButton: React.FC<ThemeToggleButtonProps> = ({ 
  size = 'medium',
  sx = {} 
}) => {
  const { mode, toggleMode } = useThemeMode();

  return (
    <Tooltip title={mode === 'dark' ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}>
      <IconButton
        onClick={toggleMode}
        size={size}
        sx={{
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'rotate(180deg)',
          },
          ...sx,
        }}
        aria-label="テーマ切り替え"
      >
        {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
      </IconButton>
    </Tooltip>
  );
};