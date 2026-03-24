"use client"

import { useTranslation } from 'react-i18next';
import { useEffect, useState, useMemo } from "react";
import dynamic from 'next/dynamic';

// 城市坐标数据
const CITIES: Array<{
  name: string;
  nameEn: string;
  coordinates: [number, number];
  country: string;
  isHome?: boolean;
}> = [
  // 中国
  { name: "上海", nameEn: "Shanghai", coordinates: [31.2304, 121.4737], country: "CN", isHome: true },
  { name: "苏州", nameEn: "Suzhou", coordinates: [31.2989, 120.5853], country: "CN" },
  { name: "无锡", nameEn: "Wuxi", coordinates: [31.4912, 120.3119], country: "CN" },
  { name: "扬州", nameEn: "Yangzhou", coordinates: [32.3942, 119.4129], country: "CN" },
  { name: "杭州", nameEn: "Hangzhou", coordinates: [30.2741, 120.1551], country: "CN" },
  { name: "上虞", nameEn: "Shangyu", coordinates: [30.0325, 120.8681], country: "CN" },
  { name: "桐庐", nameEn: "Tonglu", coordinates: [29.7988, 119.6855], country: "CN" },
  { name: "宁波", nameEn: "Ningbo", coordinates: [29.8683, 121.5440], country: "CN" },
  { name: "长沙", nameEn: "Changsha", coordinates: [28.2282, 112.9388], country: "CN" },
  { name: "昆明", nameEn: "Kunming", coordinates: [24.8801, 102.8329], country: "CN" },
  { name: "大理", nameEn: "Dali", coordinates: [25.5894, 100.2257], country: "CN" },
  { name: "温州", nameEn: "Wenzhou", coordinates: [27.9943, 120.6994], country: "CN" },
  { name: "宁德", nameEn: "Ningde", coordinates: [26.6656, 119.5479], country: "CN" },
  { name: "福州", nameEn: "Fuzhou", coordinates: [26.0745, 119.2965], country: "CN" },
  { name: "绍兴", nameEn: "Shaoxing", coordinates: [30.0890, 120.5810], country: "CN" },
  // 日本
  { name: "大阪", nameEn: "Osaka", coordinates: [34.6937, 135.5022], country: "JP" },
  { name: "名古屋", nameEn: "Nagoya", coordinates: [35.1815, 136.9066], country: "JP" },
  { name: "高山市", nameEn: "Takayama", coordinates: [36.1425, 137.2519], country: "JP" },
  // 韩国
  { name: "首尔", nameEn: "Seoul", coordinates: [37.5665, 126.9780], country: "KR" },
  { name: "济州岛", nameEn: "Jeju", coordinates: [33.4996, 126.5312], country: "KR" },
];

// 动态导入 Leaflet 地图组件
const MapContent = dynamic(
  () => import('./map-content').then((mod) => mod.MapContent),
  {
    ssr: false,
    loading: () => (
      <div className="aspect-[16/9] w-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
        <div className="text-slate-400 text-center">
          <span className="text-4xl">🗺️</span>
          <p className="mt-2 text-sm">Loading map...</p>
        </div>
      </div>
    ),
  }
);

export function TravelMap() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 按国家分组统计
  const stats = useMemo(() => ({
    CN: CITIES.filter(c => c.country === "CN").length,
    JP: CITIES.filter(c => c.country === "JP").length,
    KR: CITIES.filter(c => c.country === "KR").length,
  }), []);

  if (!mounted) {
    return (
      <section id="map" className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-2">
              <span className="text-2xl">🗺️</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {t('map.title')}
            </h2>
            <p className="max-w-[600px] text-muted-foreground text-lg">
              {t('map.subtitle')}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <div className="px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-medium">
                🇨🇳 {t('map.china')}: {stats.CN} {t('map.cities')}
              </div>
              <div className="px-4 py-2 rounded-full bg-pink-100 text-pink-700 text-sm font-medium">
                🇯🇵 {t('map.japan')}: {stats.JP} {t('map.cities')}
              </div>
              <div className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                🇰🇷 {t('map.korea')}: {stats.KR} {t('map.cities')}
              </div>
            </div>
          </div>

          <div className="relative max-w-5xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-border">
            <div className="aspect-[16/9] w-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <div className="text-slate-400 text-center">
                <span className="text-4xl">🗺️</span>
                <p className="mt-2 text-sm">Loading map...</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="map" className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-2">
            <span className="text-2xl">🗺️</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {t('map.title')}
          </h2>
          <p className="max-w-[600px] text-muted-foreground text-lg">
            {t('map.subtitle')}
          </p>
          
          {/* 统计 */}
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <div className="px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-medium">
              🇨🇳 {t('map.china')}: {stats.CN} {t('map.cities')}
            </div>
            <div className="px-4 py-2 rounded-full bg-pink-100 text-pink-700 text-sm font-medium">
              🇯🇵 {t('map.japan')}: {stats.JP} {t('map.cities')}
            </div>
            <div className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
              🇰🇷 {t('map.korea')}: {stats.KR} {t('map.cities')}
            </div>
          </div>
        </div>

        {/* 地图容器 - 移除图例，只在地图内部显示 */}
        <div className="relative max-w-5xl mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-border">
          <MapContent cities={CITIES} />
        </div>
      </div>
    </section>
  );
}
