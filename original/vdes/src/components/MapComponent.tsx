import { useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Box } from '@mui/material';

interface MapComponentProps {
  onMapLoad?: (map: maplibregl.Map) => void;
}

export default function MapComponent({ onMapLoad }: MapComponentProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // 地図の初期化
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://tile.openstreetmap.jp/styles/osm-bright/style.json', // 日本のOpenStreetMapスタイル
      center: [130.4017, 33.5904], // 博多駅の座標
      zoom: 14,
      pitch: 0,
      bearing: 0
    });

    // ナビゲーションコントロールを追加
    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

    // スケールコントロールを追加
    map.current.addControl(new maplibregl.ScaleControl(), 'bottom-left');

    // フルスクリーンコントロールを追加
    map.current.addControl(new maplibregl.FullscreenControl(), 'top-right');

    // 現在地コントロールを追加
    map.current.addControl(
      new maplibregl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      }),
      'top-right'
    );

    // 地図読み込み完了時のコールバック
    map.current.on('load', () => {
      if (map.current && onMapLoad) {
        onMapLoad(map.current);
      }
    });

    // サンプルマーカーを追加
    new maplibregl.Marker({ color: '#FF4081' })
      .setLngLat([130.4017, 33.5904])
      .setPopup(
        new maplibregl.Popup({ offset: 25 })
          .setHTML('<h3>博多駅</h3><p>福岡県福岡市<br>VDESアプリケーションのサンプル地点</p>')
      )
      .addTo(map.current);

    // クリーンアップ関数
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [onMapLoad]);

  return (
    <Box 
      ref={mapContainer} 
      sx={{ 
        width: '100%', 
        height: '100%',
        '& .maplibregl-canvas': {
          outline: 'none'
        },
        '& .maplibregl-ctrl-group': {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }
      }} 
    />
  );
}