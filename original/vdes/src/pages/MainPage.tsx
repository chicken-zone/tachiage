import { Link } from "react-router-dom";
import { Button, Box, Typography, Paper, IconButton, Tooltip } from "@mui/material";
import { ArrowBack, Map, Layers, Terrain, Satellite, MoreVert, Settings, Info } from "@mui/icons-material";
import { useState, useRef } from "react";
import maplibregl from 'maplibre-gl';
import MapComponent from '../components/MapComponent';
import { ThemeToggleButton } from '../components/ThemeToggleButton';
import { useThemeMode } from '../context/ThemeContext';

export default function MainPage() {
  const { mode } = useThemeMode();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentMapStyle, setCurrentMapStyle] = useState('standard');
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [mapInfo, setMapInfo] = useState({
    center: [130.4017, 33.5904] as [number, number],
    zoom: 14
  });

  // 地図コントロール関数
  const handleZoomIn = () => {
    if (mapRef.current) {
      mapRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapRef.current) {
      mapRef.current.zoomOut();
    }
  };

  const handleFlyToLocation = () => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: [130.4017, 33.5904],
        zoom: 16
      });
    }
  };

  // 地図スタイル切り替え機能
  const handleMapStyleChange = (style: string) => {
    if (mapRef.current) {
      let styleUrl = '';
      switch (style) {
        case 'standard':
          styleUrl = 'https://tile.openstreetmap.jp/styles/osm-bright/style.json';
          break;
        case 'satellite':
          // 衛星画像スタイル（OpenStreetMapベース）
          styleUrl = 'https://tile.openstreetmap.jp/styles/osm-bright/style.json';
          break;
        case 'terrain':
          // 地形図スタイル
          styleUrl = 'https://tile.openstreetmap.jp/styles/osm-bright/style.json';
          break;
        default:
          styleUrl = 'https://tile.openstreetmap.jp/styles/osm-bright/style.json';
      }
      
      mapRef.current.setStyle(styleUrl);
      setCurrentMapStyle(style);
    }
  };

  const handleMapLoad = (map: maplibregl.Map) => {
    mapRef.current = map;
    
    // 地図移動時の座標・ズーム更新
    map.on('moveend', () => {
      const center = map.getCenter();
      const zoom = map.getZoom();
      setMapInfo({
        center: [center.lng, center.lat],
        zoom: Math.round(zoom * 10) / 10
      });
    });
  };

  const sidebarContent = (
    <Box sx={{ width: { xs: 280, md: 320 }, p: 3, height: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Map color="primary" />
        <Typography variant="h6" component="h2">
          地図アプリケーション
        </Typography>
      </Box>
      
      <Typography variant="body2" color="text.secondary" paragraph>
        MapLibre GLを使用したインタラクティブな地図アプリケーション
      </Typography>
      
      {/* コントロールセクション */}
      <Paper 
        elevation={1} 
        sx={{ 
          p: 2, 
          mt: 3,
          backgroundColor: mode === 'dark' ? '#2d2d2d' : '#f5f5f5',
          borderRadius: 2,
          border: mode === 'dark' 
            ? '1px solid rgba(255, 255, 255, 0.1)' 
            : '1px solid rgba(0, 0, 0, 0.12)'
        }}
      >
        <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Settings fontSize="small" />
          地図コントロール
        </Typography>
        
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Button variant="outlined" size="small" fullWidth onClick={handleZoomIn}>
            ズームイン
          </Button>
          <Button variant="outlined" size="small" fullWidth onClick={handleZoomOut}>
            ズームアウト
          </Button>
          <Button variant="outlined" size="small" fullWidth onClick={handleFlyToLocation}>
            博多駅へ移動
          </Button>
        </Box>
      </Paper>

      {/* レイヤーセクション */}
      <Paper 
        elevation={1} 
        sx={{ 
          p: 2, 
          mt: 3,
          backgroundColor: mode === 'dark' ? '#2d2d2d' : '#f5f5f5',
          borderRadius: 2,
          border: mode === 'dark' 
            ? '1px solid rgba(255, 255, 255, 0.1)' 
            : '1px solid rgba(0, 0, 0, 0.12)'
        }}
      >
        <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Layers fontSize="small" />
          レイヤー設定
        </Typography>
        
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Button variant="text" size="small" fullWidth sx={{ justifyContent: 'flex-start' }}>
            標準地図
          </Button>
          <Button variant="text" size="small" fullWidth sx={{ justifyContent: 'flex-start' }}>
            衛星画像
          </Button>
          <Button variant="text" size="small" fullWidth sx={{ justifyContent: 'flex-start' }}>
            地形図
          </Button>
        </Box>
      </Paper>

      {/* 情報セクション */}
      <Paper 
        elevation={1} 
        sx={{ 
          p: 2, 
          mt: 3,
          backgroundColor: mode === 'dark' ? '#2d2d2d' : '#f5f5f5',
          borderRadius: 2,
          border: mode === 'dark' 
            ? '1px solid rgba(255, 255, 255, 0.1)' 
            : '1px solid rgba(0, 0, 0, 0.12)'
        }}
      >
        <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Info fontSize="small" />
          地図情報
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          座標: {mapInfo.center[1].toFixed(4)}, {mapInfo.center[0].toFixed(4)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ズームレベル: {mapInfo.zoom}
        </Typography>
      </Paper>

      {/* テーマ設定セクション */}
      <Paper 
        elevation={1} 
        sx={{ 
          p: 2, 
          mt: 3,
          backgroundColor: mode === 'dark' ? '#2d2d2d' : '#f5f5f5',
          borderRadius: 2,
          border: mode === 'dark' 
            ? '1px solid rgba(255, 255, 255, 0.1)' 
            : '1px solid rgba(0, 0, 0, 0.12)'
        }}
      >
        <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Settings fontSize="small" />
          テーマ設定
        </Typography>
        
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
          <ThemeToggleButton size="large" />
        </Box>
      </Paper>
    </Box>
  );

  return (
    <Box sx={{ height: '100vh', display: 'flex' }}>
      {/* 左側縦型ナビゲーションバー */}
      <Paper 
        elevation={3}
        sx={{ 
          width: 64,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: mode === 'dark' ? '#1e1e1e' : 'primary.main',
          borderRadius: 0,
          zIndex: 1200
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          gap: 1,
          py: 2,
          width: '100%'
        }}>
          {/* トップページに戻るボタン */}
          <Tooltip title="トップページに戻る" placement="right">
            <IconButton
              component={Link}
              to="/"
              sx={{ 
                color: mode === 'dark' ? '#90caf9' : 'white',
                '&:hover': { 
                  backgroundColor: mode === 'dark' 
                    ? 'rgba(144, 202, 249, 0.1)' 
                    : 'rgba(255, 255, 255, 0.1)' 
                }
              }}
            >
              <ArrowBack />
            </IconButton>
          </Tooltip>

          {/* セパレーター */}
          <Box sx={{ 
            width: '80%', 
            height: 1, 
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            my: 1
          }} />

          {/* 地図スタイル切り替えボタン群 */}
          <Tooltip title="標準地図" placement="right">
            <IconButton
              onClick={() => handleMapStyleChange('standard')}
              sx={{ 
                color: mode === 'dark' ? '#90caf9' : 'white',
                backgroundColor: currentMapStyle === 'standard' 
                  ? (mode === 'dark' ? 'rgba(144, 202, 249, 0.2)' : 'rgba(255, 255, 255, 0.2)') 
                  : 'transparent',
                '&:hover': { 
                  backgroundColor: mode === 'dark' 
                    ? 'rgba(144, 202, 249, 0.1)' 
                    : 'rgba(255, 255, 255, 0.1)' 
                }
              }}
            >
              <Map />
            </IconButton>
          </Tooltip>

          <Tooltip title="衛星画像" placement="right">
            <IconButton
              onClick={() => handleMapStyleChange('satellite')}
              sx={{ 
                color: mode === 'dark' ? '#90caf9' : 'white',
                backgroundColor: currentMapStyle === 'satellite' 
                  ? (mode === 'dark' ? 'rgba(144, 202, 249, 0.2)' : 'rgba(255, 255, 255, 0.2)') 
                  : 'transparent',
                '&:hover': { 
                  backgroundColor: mode === 'dark' 
                    ? 'rgba(144, 202, 249, 0.1)' 
                    : 'rgba(255, 255, 255, 0.1)' 
                }
              }}
            >
              <Satellite />
            </IconButton>
          </Tooltip>

          <Tooltip title="地形図" placement="right">
            <IconButton
              onClick={() => handleMapStyleChange('terrain')}
              sx={{ 
                color: mode === 'dark' ? '#90caf9' : 'white',
                backgroundColor: currentMapStyle === 'terrain' 
                  ? (mode === 'dark' ? 'rgba(144, 202, 249, 0.2)' : 'rgba(255, 255, 255, 0.2)') 
                  : 'transparent',
                '&:hover': { 
                  backgroundColor: mode === 'dark' 
                    ? 'rgba(144, 202, 249, 0.1)' 
                    : 'rgba(255, 255, 255, 0.1)' 
                }
              }}
            >
              <Terrain />
            </IconButton>
          </Tooltip>

          {/* セパレーター */}
          <Box sx={{ 
            width: '80%', 
            height: 1, 
            backgroundColor: mode === 'dark' 
              ? 'rgba(144, 202, 249, 0.2)' 
              : 'rgba(255, 255, 255, 0.2)',
            my: 1
          }} />

          {/* サブメニュー開閉ボタン */}
          <Tooltip title="メニュー" placement="right">
            <IconButton
              onClick={() => setSidebarOpen(!sidebarOpen)}
              sx={{ 
                color: mode === 'dark' ? '#90caf9' : 'white',
                backgroundColor: sidebarOpen 
                  ? (mode === 'dark' ? 'rgba(144, 202, 249, 0.2)' : 'rgba(255, 255, 255, 0.2)') 
                  : 'transparent',
                '&:hover': { 
                  backgroundColor: mode === 'dark' 
                    ? 'rgba(144, 202, 249, 0.1)' 
                    : 'rgba(255, 255, 255, 0.1)' 
                }
              }}
            >
              <MoreVert />
            </IconButton>
          </Tooltip>
        </Box>

        {/* 下部のアプリ名表示 */}
        <Box sx={{ 
          mt: 'auto', 
          mb: 2,
          transform: 'rotate(-90deg)',
          transformOrigin: 'center',
          whiteSpace: 'nowrap'
        }}>
          <Typography 
            variant="caption" 
            sx={{ 
              color: mode === 'dark' 
                ? 'rgba(144, 202, 249, 0.7)' 
                : 'rgba(255, 255, 255, 0.7)',
              fontSize: '10px',
              letterSpacing: '1px'
            }}
          >
            VDES
          </Typography>
        </Box>
      </Paper>

      {/* メインコンテンツエリア */}
      <Box sx={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        {/* メイン地図エリア - 全画面表示 */}
        <MapComponent onMapLoad={handleMapLoad} />
        
        {/* 右上タイトル表示 */}
        <Paper
          elevation={2}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            px: 3,
            py: 1,
            backgroundColor: mode === 'dark' 
              ? 'rgba(30, 30, 30, 0.9)' 
              : 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)',
            borderRadius: 2,
            zIndex: 1100
          }}
        >
          <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 600 }}>
            VDES - 地図アプリケーション
          </Typography>
        </Paper>
        
        {/* オーバーレイサイドバー（左側ナビの右側に表示） */}
        {sidebarOpen && (
          <Paper 
            elevation={8} 
            sx={{ 
              position: 'absolute',
              top: 16,
              left: 16,
              width: { xs: 280, md: 320 },
              maxHeight: 'calc(100% - 32px)',
              borderRadius: 2,
              overflow: 'auto',
              zIndex: 1000,
              backgroundColor: mode === 'dark' 
                ? 'rgba(30, 30, 30, 0.95)' 
                : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.3s ease',
              boxShadow: mode === 'dark'
                ? '0 8px 32px rgba(0, 0, 0, 0.5)'
                : '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}
          >
            {sidebarContent}
          </Paper>
        )}
      </Box>
    </Box>
  );
}