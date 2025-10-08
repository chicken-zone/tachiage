import { Link } from "react-router-dom";
import { Button, Box, Typography, Container, Paper } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { ThemeToggleButton } from '../components/ThemeToggleButton';
import { useThemeMode } from '../context/ThemeContext';

export default function TopPage() {
  const { mode } = useThemeMode();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: mode === 'dark'
          ? 'linear-gradient(135deg, #1e1e1e 0%, #424242 100%)'
          : 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: { xs: 2, sm: 3 },
        position: 'relative'
      }}
    >
      {/* 右上のテーマ切り替えボタン */}
      <Box 
        sx={{ 
          position: 'absolute', 
          top: 16, 
          right: 16,
          zIndex: 1000
        }}
      >
        <ThemeToggleButton size="large" />
      </Box>

      <Container maxWidth="md">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
          }}
        >
          {/* メインカード */}
          <Paper 
            elevation={8} 
            sx={{ 
              p: { xs: 4, md: 6 }, 
              textAlign: 'center',
              width: '100%',
              borderRadius: 3,
              background: mode === 'dark'
                ? 'rgba(30, 30, 30, 0.95)'
                : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)'
            }}
          >
            {/* ロゴエリア */}
            <Box sx={{ mb: 4 }}>
              <Typography 
                variant="h1" 
                sx={{ 
                  fontSize: { xs: '3rem', md: '4rem' },
                  fontWeight: 'bold',
                  background: mode === 'dark'
                    ? 'linear-gradient(45deg, #90caf9, #ce93d8)'
                    : 'linear-gradient(45deg, #1976d2, #42a5f5)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2
                }}
              >
                VDES
              </Typography>
              <Typography variant="h5" color="text.primary" sx={{ fontWeight: 500 }}>
                地図アプリケーション
              </Typography>
            </Box>

            {/* 説明セクション */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" color="text.secondary" paragraph sx={{ mb: 3 }}>
                React + MapLibre + Material-UI を使用した
                <br />
                モダンな地図アプリケーション
              </Typography>
              
              {/* 機能紹介 */}
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                gap: 3,
                mb: 4
              }}>
                <Box>
                  <Typography variant="h4" sx={{ mb: 1 }}>🗺️</Typography>
                  <Typography variant="subtitle1" color="primary">地図表示</Typography>
                  <Typography variant="body2" color="text.secondary">
                    MapLibre GL JS
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ mb: 1 }}>⚡</Typography>
                  <Typography variant="subtitle1" color="primary">高速描画</Typography>
                  <Typography variant="body2" color="text.secondary">
                    React + TypeScript
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ mb: 1 }}>🎨</Typography>
                  <Typography variant="subtitle1" color="primary">美しいUI</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Material-UI
                  </Typography>
                </Box>
              </Box>
            </Box>
            
            {/* アクションボタン */}
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Button
                component={Link}
                to="/main"
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                sx={{ 
                  px: 5, 
                  py: 2,
                  borderRadius: 3,
                  textTransform: 'none',
                  fontSize: '1.2rem',
                  fontWeight: 600,
                  background: 'linear-gradient(45deg, #2196F3, #21CBF3)',
                  boxShadow: '0 8px 32px rgba(33, 150, 243, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1976D2, #00BCD4)',
                    boxShadow: '0 12px 40px rgba(33, 150, 243, 0.4)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                アプリケーションを開始
              </Button>
              
              <Button
                component={Link}
                to="/about"
                variant="outlined"
                size="large"
                sx={{ 
                  px: 4, 
                  py: 2,
                  borderRadius: 3,
                  textTransform: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  borderColor: 'rgba(255, 255, 255, 0.8)',
                  color: 'rgba(255, 255, 255, 0.9)',
                  '&:hover': {
                    borderColor: 'white',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: 'white'
                  }
                }}
              >
                詳細情報
              </Button>
            </Box>
          </Paper>

          {/* フッター情報 */}
          <Typography 
            variant="body2" 
            sx={{ 
              color: 'rgba(255, 255, 255, 0.8)',
              textAlign: 'center' 
            }}
          >
            Powered by React • MapLibre GL JS • Material-UI
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}