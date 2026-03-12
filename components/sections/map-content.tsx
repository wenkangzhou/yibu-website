"use client"

import { useTranslation } from 'react-i18next';
import { useMemo, useCallback, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, ScaleControl, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Crosshair } from "lucide-react";

interface City {
  name: string;
  nameEn: string;
  coordinates: [number, number];
  country: string;
  isHome?: boolean;
}

interface MapContentProps {
  cities: City[];
}

// 自定义图标
function createCustomIcon(isHome: boolean) {
  return L.divIcon({
    className: "custom-marker",
    html: isHome
      ? `<div style="
          width: 24px;
          height: 24px;
          background: #ef4444;
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
        ">🏠</div>`
      : `<div style="
          width: 16px;
          height: 16px;
          background: #3b82f6;
          border: 2px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 6px rgba(0,0,0,0.25);
        "></div>`,
    iconSize: isHome ? [24, 24] : [16, 16],
    iconAnchor: isHome ? [12, 12] : [8, 8],
    popupAnchor: [0, -10],
  });
}

// 定位按钮组件 - 必须放在 MapContainer 内部
function LocateButton() {
  const map = useMap();
  const [locating, setLocating] = useState(false);

  const handleLocate = useCallback(() => {
    if (!navigator.geolocation) {
      alert('您的浏览器不支持地理定位');
      return;
    }

    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        map.flyTo([latitude, longitude], 13, {
          duration: 1.5,
        });
        
        // 添加临时标记显示当前位置
        const marker = L.marker([latitude, longitude], {
          icon: L.divIcon({
            className: "current-location-marker",
            html: `<div style="
              width: 16px;
              height: 16px;
              background: #10b981;
              border: 3px solid white;
              border-radius: 50%;
              box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.3), 0 2px 8px rgba(0,0,0,0.3);
              animation: pulse 2s infinite;
            "></div>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8],
          }),
        }).addTo(map);
        
        marker.bindPopup('您在这里').openPopup();
        
        setTimeout(() => setLocating(false), 1000);
      },
      (error) => {
        setLocating(false);
        let message = '无法获取位置';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = '请允许访问位置信息';
            break;
          case error.POSITION_UNAVAILABLE:
            message = '位置信息不可用';
            break;
          case error.TIMEOUT:
            message = '获取位置超时';
            break;
        }
        alert(message);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, [map]);

  return (
    <button
      onClick={handleLocate}
      disabled={locating}
      className="leaflet-control leaflet-bar absolute bottom-8 right-4 z-[400] w-10 h-10 bg-white dark:bg-slate-800 rounded shadow-md hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center border-0"
      title="定位到当前位置"
      style={{ position: 'absolute', bottom: '32px', right: '16px' }}
    >
      <Crosshair className={`w-5 h-5 text-slate-600 dark:text-slate-300 ${locating ? 'animate-pulse' : ''}`} />
    </button>
  );
}

export function MapContent({ cities }: MapContentProps) {
  const { t, i18n } = useTranslation();

  // 计算地图中心点（所有城市的平均位置）
  const center: [number, number] = useMemo(() => {
    const avgLat = cities.reduce((sum, c) => sum + c.coordinates[0], 0) / cities.length;
    const avgLng = cities.reduce((sum, c) => sum + c.coordinates[1], 0) / cities.length;
    return [avgLat, avgLng];
  }, [cities]);

  return (
    <div className="aspect-[16/9] w-full relative">
      <MapContainer
        center={center}
        zoom={4}
        minZoom={3}
        maxZoom={18}
        scrollWheelZoom={true}
        style={{ width: "100%", height: "100%" }}
        zoomControl={false}
      >
        {/* Carto 瓦片图层 - 显示街道、道路等详细信息 */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={19}
        />
        
        {/* 缩放控件 - 右上角 */}
        <ZoomControl position="topright" />
        
        {/* 距离标尺 - 左下角 */}
        <ScaleControl 
          position="bottomleft" 
          metric={true}
          imperial={false}
          maxWidth={150}
        />
        
        {/* 定位按钮 - 必须在 MapContainer 内部 */}
        <LocateButton />
        
        {/* 城市标记 */}
        {cities.map((city) => (
          <Marker
            key={city.name}
            position={city.coordinates}
            icon={createCustomIcon(!!city.isHome)}
          >
            <Popup>
              <div className="text-center">
                <div className="font-medium">
                  {i18n.language === 'zh' ? city.name : city.nameEn}
                </div>
                {city.isHome && (
                  <div className="text-xs text-red-500 mt-1">{t('map.myHome')}</div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* 脉冲动画样式 */}
      <style jsx global>{`
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.3), 0 2px 8px rgba(0,0,0,0.3);
          }
          50% {
            box-shadow: 0 0 0 8px rgba(16, 185, 129, 0.1), 0 2px 8px rgba(0,0,0,0.3);
          }
          100% {
            box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.3), 0 2px 8px rgba(0,0,0,0.3);
          }
        }
      `}</style>
    </div>
  );
}
