import React from 'react';
import { Button, styled } from '@mui/material';
import type { ButtonProps } from '@mui/material';
import { alpha } from '@mui/material/styles';

// Styled Componentsを使用したカスタムボタン
export const GradientButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  border: 0,
  borderRadius: 25,
  boxShadow: `0 3px 5px 2px ${alpha(theme.palette.primary.main, 0.3)}`,
  color: 'white',
  height: 48,
  padding: '0 30px',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.secondary.dark} 90%)`,
    transform: 'translateY(-2px)',
    boxShadow: `0 6px 10px 4px ${alpha(theme.palette.primary.main, 0.3)}`,
  },
}));

// SXプロパティを使用したカスタムボタン
interface CustomButtonProps extends ButtonProps {
  glowing?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = ({ 
  children, 
  glowing = false, 
  ...props 
}) => {
  return (
    <Button
      {...props}
      sx={{
        borderRadius: 3,
        textTransform: 'none',
        fontWeight: 600,
        px: 3,
        py: 1.5,
        transition: 'all 0.2s ease-in-out',
        ...(glowing && {
          boxShadow: (theme) => `0 0 20px ${alpha(theme.palette.primary.main, 0.5)}`,
          animation: 'glow 2s ease-in-out infinite alternate',
          '@keyframes glow': {
            from: {
              boxShadow: (theme: any) => `0 0 20px ${alpha(theme.palette.primary.main, 0.5)}`,
            },
            to: {
              boxShadow: (theme: any) => `0 0 30px ${alpha(theme.palette.primary.main, 0.8)}`,
            },
          },
        }),
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: (theme) => `0 6px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
        },
        ...props.sx,
      }}
    >
      {children}
    </Button>
  );
};