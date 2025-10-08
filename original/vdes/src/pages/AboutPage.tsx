import { Link } from "react-router-dom";
import { Button, Box, Typography, Container, Paper, Card, CardContent } from "@mui/material";
import { ArrowBack, Info, Code, Map } from "@mui/icons-material";

export default function AboutPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: { xs: 2, sm: 3 }
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
          }}
        >
          {/* ヘッダー */}
          <Paper 
            elevation={4} 
            sx={{ 
              p: 4, 
              textAlign: 'center',
              width: '100%',
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.9)'
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 3 }}>
              <Info color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="h3" component="h1" color="primary">
                About VDES
              </Typography>
            </Box>
            
            <Typography variant="h6" color="text.secondary" paragraph>
              地図アプリケーションの技術情報とプロジェクト概要
            </Typography>
          </Paper>

          {/* 技術スタック */}
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
            gap: 3,
            width: '100%'
          }}>
            <Card elevation={3}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Code color="primary" />
                  フロントエンド技術
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    • React 19.1.1 + TypeScript
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    • Material-UI (MUI) 7.3.4
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    • React Router DOM 7.9.3
                  </Typography>
                  <Typography variant="body1">
                    • Vite 7.1.7 (開発環境)
                  </Typography>
                </Box>
              </CardContent>
            </Card>

            <Card elevation={3}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Map color="primary" />
                  地図ライブラリ
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    • MapLibre GL JS 5.8.0
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    • React Map GL 8.1.0
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    • OpenStreetMap タイル
                  </Typography>
                  <Typography variant="body1">
                    • 日本語対応地図スタイル
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* プロジェクト情報 */}
          <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>
              プロジェクト概要
            </Typography>
            <Typography variant="body1" paragraph>
              VDESは、モダンなWeb技術を使用して構築されたインタラクティブな地図アプリケーションです。
              React + TypeScript + MapLibre GLの組み合わせにより、高性能で美しいユーザーインターフェースを実現しています。
            </Typography>
            <Typography variant="body1" paragraph>
              ファイルベースルーティングシステムを採用し、React Router v7スタイルの設定で
              スケーラブルなアプリケーション構造を提供します。
            </Typography>
          </Paper>

          {/* ナビゲーション */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button
              component={Link}
              to="/"
              variant="contained"
              startIcon={<ArrowBack />}
              sx={{ 
                px: 3, 
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none'
              }}
            >
              トップページ
            </Button>
            <Button
              component={Link}
              to="/main"
              variant="outlined"
              endIcon={<Map />}
              sx={{ 
                px: 3, 
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none'
              }}
            >
              地図を見る
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}