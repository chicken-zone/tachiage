import { createTheme, type ThemeOptions } from '@mui/material/styles';

type ThemeMode = 'light' | 'dark';

// ベースとなる共通設定
const getBaseTheme = (mode: ThemeMode): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#90caf9' : '#1976d2',
      light: mode === 'dark' ? '#e3f2fd' : '#42a5f5',
      dark: mode === 'dark' ? '#42a5f5' : '#0d47a1',
      contrastText: mode === 'dark' ? '#0d47a1' : '#ffffff',
    },
    secondary: {
      main: mode === 'dark' ? '#ce93d8' : '#9c27b0',
      light: mode === 'dark' ? '#f3e5f5' : '#ba68c8',
      dark: mode === 'dark' ? '#ab47bc' : '#7b1fa2',
      contrastText: mode === 'dark' ? '#4a148c' : '#ffffff',
    },
    error: {
      main: mode === 'dark' ? '#e57373' : '#f44336',
      light: mode === 'dark' ? '#ef9a9a' : '#e57373',
      dark: mode === 'dark' ? '#c62828' : '#d32f2f',
    },
    warning: {
      main: mode === 'dark' ? '#ffb74d' : '#ff9800',
      light: mode === 'dark' ? '#ffcc80' : '#ffb74d',
      dark: mode === 'dark' ? '#f57c00' : '#f57c00',
    },
    info: {
      main: mode === 'dark' ? '#4fc3f7' : '#2196f3',
      light: mode === 'dark' ? '#81d4fa' : '#4fc3f7',
      dark: mode === 'dark' ? '#0288d1' : '#0288d1',
    },
    success: {
      main: mode === 'dark' ? '#81c784' : '#4caf50',
      light: mode === 'dark' ? '#a5d6a7' : '#81c784',
      dark: mode === 'dark' ? '#388e3c' : '#388e3c',
    },
    background: {
      default: mode === 'dark' ? '#121212' : '#fafafa',
      paper: mode === 'dark' ? '#1e1e1e' : '#ffffff',
    },
    text: {
      primary: mode === 'dark' ? '#ffffff' : 'rgba(0, 0, 0, 0.87)',
      secondary: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
    },
    divider: mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", "Noto Sans JP", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1.1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 8,
  },
});

// コンポーネントのカスタマイズ設定を取得する関数
const getComponentsTheme = (mode: ThemeMode) => ({
  components: {
    // ボタンコンポーネントのカスタマイズ
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none' as const,
          borderRadius: 8,
          fontWeight: 500,
          padding: '8px 16px',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.12)',
          },
        },
        containedPrimary: {
          background: mode === 'dark' 
            ? 'linear-gradient(135deg, #90caf9, #42a5f5)' 
            : 'linear-gradient(135deg, #1976d2, #42a5f5)',
          boxShadow: mode === 'dark' 
            ? '0 4px 16px rgba(144, 202, 249, 0.3)' 
            : '0 4px 16px rgba(25, 118, 210, 0.4)',
          color: mode === 'dark' ? '#0d47a1' : '#ffffff',
          '&:hover': {
            background: mode === 'dark' 
              ? 'linear-gradient(135deg, #e3f2fd, #90caf9)' 
              : 'linear-gradient(135deg, #0d47a1, #1976d2)',
            boxShadow: mode === 'dark' 
              ? '0 6px 20px rgba(144, 202, 249, 0.4)' 
              : '0 6px 20px rgba(25, 118, 210, 0.6)',
          },
        },
      },
      variants: [
        {
          props: { variant: 'gradient' as any },
          style: {
            background: mode === 'dark' 
              ? 'linear-gradient(135deg, #90caf9 30%, #ce93d8 90%)'
              : 'linear-gradient(135deg, #1976d2 30%, #9c27b0 90%)',
            border: 0,
            borderRadius: 8,
            boxShadow: mode === 'dark' 
              ? '0 4px 16px rgba(144, 202, 249, 0.3)'
              : '0 4px 16px rgba(25, 118, 210, 0.4)',
            color: mode === 'dark' ? '#0d47a1' : 'white',
            height: 48,
            padding: '0 30px',
          },
        },
      ],
    },

    // ペーパーコンポーネントのカスタマイズ
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          transition: 'box-shadow 0.2s ease-in-out',
        },
        elevation1: {
          boxShadow: mode === 'dark' 
            ? '0 2px 12px rgba(0,0,0,0.5)' 
            : '0 2px 8px rgba(0,0,0,0.12)',
          backgroundColor: mode === 'dark' ? '#1e1e1e' : '#ffffff',
          border: mode === 'dark' 
            ? '1px solid rgba(255, 255, 255, 0.12)' 
            : '1px solid rgba(0, 0, 0, 0.12)',
        },
        elevation2: {
          boxShadow: mode === 'dark' 
            ? '0 4px 20px rgba(0,0,0,0.6)' 
            : '0 4px 12px rgba(0,0,0,0.15)',
          backgroundColor: mode === 'dark' ? '#1e1e1e' : '#ffffff',
          border: mode === 'dark' 
            ? '1px solid rgba(255, 255, 255, 0.16)' 
            : '1px solid rgba(0, 0, 0, 0.15)',
        },
        elevation3: {
          boxShadow: mode === 'dark' 
            ? '0 8px 32px rgba(0,0,0,0.7)' 
            : '0 8px 16px rgba(0,0,0,0.18)',
          backgroundColor: mode === 'dark' ? '#1e1e1e' : '#ffffff',
          border: mode === 'dark' 
            ? '1px solid rgba(255, 255, 255, 0.20)' 
            : '1px solid rgba(0, 0, 0, 0.18)',
        },
      },
    },

    // カードコンポーネントのカスタマイズ
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
          },
        },
      },
    },

    // アイコンボタンのカスタマイズ
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          color: mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.54)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: mode === 'dark' 
              ? 'rgba(144, 202, 249, 0.2)' 
              : 'rgba(25, 118, 210, 0.04)',
            color: mode === 'dark' ? '#90caf9' : '#1976d2',
            transform: 'scale(1.05)',
          },
        },
      },
    },

    // テキストフィールドのカスタマイズ
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: mode === 'dark' ? '#1e1e1e' : '#ffffff',
            color: mode === 'dark' ? '#ffffff' : 'rgba(0, 0, 0, 0.87)',
            '& fieldset': {
              borderColor: mode === 'dark' 
                ? 'rgba(255, 255, 255, 0.23)' 
                : 'rgba(0, 0, 0, 0.23)',
            },
            '&:hover fieldset': {
              borderColor: mode === 'dark' ? '#90caf9' : '#1976d2',
            },
            '&.Mui-focused fieldset': {
              borderColor: mode === 'dark' ? '#90caf9 !important' : '#1976d2 !important',
              borderWidth: 2,
            },
          },
          '& .MuiInputLabel-root': {
            color: mode === 'dark' 
              ? 'rgba(255, 255, 255, 0.7)' 
              : 'rgba(0, 0, 0, 0.6)',
            '&.Mui-focused': {
              color: mode === 'dark' ? '#90caf9' : '#1976d2',
            },
          },
        },
      },
    },

    // チップコンポーネントのカスタマイズ
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          fontWeight: 500,
          backgroundColor: mode === 'dark' 
            ? 'rgba(144, 202, 249, 0.2)' 
            : 'rgba(25, 118, 210, 0.08)',
          color: mode === 'dark' ? '#90caf9' : '#1976d2',
          '&:hover': {
            backgroundColor: mode === 'dark' 
              ? 'rgba(144, 202, 249, 0.3)' 
              : 'rgba(25, 118, 210, 0.12)',
          },
        },
      },
    },

    // ツールチップのカスタマイズ
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: mode === 'dark' ? '#424242' : 'rgba(97, 97, 97, 0.92)',
          border: mode === 'dark' 
            ? '1px solid rgba(255, 255, 255, 0.12)' 
            : 'none',
          borderRadius: 8,
          fontSize: '0.75rem',
          padding: '8px 12px',
          color: '#ffffff',
        },
        arrow: {
          color: mode === 'dark' ? '#424242' : 'rgba(97, 97, 97, 0.92)',
        },
      },
    },

    // アプリバーのカスタマイズ
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'dark' ? '#1e1e1e' : '#1976d2',
          borderBottom: mode === 'dark' 
            ? '1px solid rgba(255, 255, 255, 0.12)' 
            : 'none',
          boxShadow: mode === 'dark' 
            ? '0 2px 12px rgba(0,0,0,0.5)' 
            : '0 2px 4px rgba(0,0,0,0.2)',
        },
      },
    },

    // ドロワーのカスタマイズ
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: mode === 'dark' ? '#1e1e1e' : '#ffffff',
          borderRight: mode === 'dark' 
            ? '1px solid rgba(255, 255, 255, 0.12)' 
            : '1px solid rgba(0, 0, 0, 0.12)',
        },
      },
    },
  },
});

// テーマを作成する関数
export const createCustomTheme = (mode: ThemeMode) => {
  const baseTheme = getBaseTheme(mode);
  const componentsTheme = getComponentsTheme(mode);
  
  return createTheme({
    ...baseTheme,
    ...componentsTheme,
  });
};

// デフォルトテーマ（ダークモード）
export const customTheme = createCustomTheme('dark');