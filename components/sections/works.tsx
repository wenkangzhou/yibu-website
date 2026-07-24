"use client"

import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { Palette, X } from "lucide-react";

type Category = 'all' | 'performance' | 'art' | 'lego' | 'sports' | 'honors';

interface WorkItem {
  id: string;
  key: string;
  category: Category;
  src: string;
  aspectRatio: string;
}

export function Works() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [selectedImage, setSelectedImage] = useState<WorkItem | null>(null);

  const categories: { key: Category; labelKey: string }[] = [
    { key: 'all', labelKey: 'works.categories.all' },
    { key: 'performance', labelKey: 'works.categories.performance' },
    { key: 'art', labelKey: 'works.categories.art' },
    { key: 'lego', labelKey: 'works.categories.lego' },
    { key: 'sports', labelKey: 'works.categories.sports' },
    { key: 'honors', labelKey: 'works.categories.honors' },
  ];

  const filteredWorks = useMemo(() => {
    const works: WorkItem[] = [
      { id: 'dramaCowboy', key: 'dramaCowboy', category: 'performance', src: '/assets/optimized/performance/戏剧-牛仔.webp', aspectRatio: '2/3' },
      { id: 'dramaHunter', key: 'dramaHunter', category: 'performance', src: '/assets/optimized/performance/戏剧-猎人.webp', aspectRatio: '2/3' },
      { id: 'drawing', key: 'drawing', category: 'art', src: '/assets/optimized/art/画画.webp', aspectRatio: '2/3' },
      { id: 'swimmingPool', key: 'swimmingPool', category: 'art', src: '/assets/optimized/art/艺术作品-游泳馆.webp', aspectRatio: '4/3' },
      { id: 'legoRaceCar', key: 'legoRaceCar', category: 'lego', src: '/assets/optimized/lego/乐高-赛车.webp', aspectRatio: '4/3' },
      { id: 'legoBox', key: 'legoBox', category: 'lego', src: '/assets/optimized/lego/乐高-自制收纳盒.webp', aspectRatio: '4/3' },
      { id: 'calligraphy', key: 'calligraphy', category: 'honors', src: '/assets/optimized/honors/硬笔书法证书.webp', aspectRatio: '3/2' },
      { id: 'trailRunning', key: 'trailRunning', category: 'sports', src: '/assets/optimized/sports/越野跑.webp', aspectRatio: '2/3' },
      { id: 'nightRace', key: 'nightRace', category: 'sports', src: '/assets/optimized/sports/越野跑-夜赛.webp', aspectRatio: '3/2' },
      { id: 'cycling', key: 'cycling', category: 'sports', src: '/assets/optimized/sports/运动-骑自行车-无辅助轮.webp', aspectRatio: '3/4' },
      { id: 'runningRace', key: 'runningRace', category: 'sports', src: '/assets/optimized/sports/跑步-小班-六一两公里亲子跑.webp', aspectRatio: '4/3' },
      { id: 'hikingYuelu', key: 'hikingYuelu', category: 'sports', src: '/assets/optimized/sports/徒步-岳麓山.webp', aspectRatio: '3/4' },
      { id: 'hikingMeiwu', key: 'hikingMeiwu', category: 'sports', src: '/assets/optimized/sports/徒步-梅坞古道.webp', aspectRatio: '3/4' },
      { id: 'hikingMidui', key: 'hikingMidui', category: 'sports', src: '/assets/optimized/sports/徒步-米堆山.webp', aspectRatio: '3/4' },
      { id: 'hikingYushan', key: 'hikingYushan', category: 'sports', src: '/assets/optimized/sports/徒步-虞山.webp', aspectRatio: '3/4' },
    ];
    return activeCategory === 'all' ? works : works.filter(w => w.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="works" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-2">
            <Palette className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {t('works.title')}
          </h2>
          <p className="max-w-[600px] text-muted-foreground text-lg">
            {t('works.subtitle')}
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.key
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {t(cat.labelKey)}
            </button>
          ))}
        </div>

        {/* Masonry gallery */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 max-w-6xl mx-auto">
          {filteredWorks.map((work) => (
            <div
              key={work.id}
              className="break-inside-avoid mb-4 group relative overflow-hidden rounded-xl bg-muted cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
              onClick={() => setSelectedImage(work)}
            >
              <div className="relative w-full" style={{ aspectRatio: work.aspectRatio }}>
                <Image
                  src={work.src}
                  alt={t(`works.items.${work.key}.title`)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="text-white font-bold text-lg">{t(`works.items.${work.key}.title`)}</h3>
                  <p className="text-white/90 text-sm">{t(`works.items.${work.key}.desc`)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
            onClick={() => setSelectedImage(null)}
            aria-label={t('works.close') || 'Close'}
          >
            <X className="h-6 w-6" />
          </button>
          <div
            className="relative w-full max-w-5xl h-[85vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage.src}
              alt={t(`works.items.${selectedImage.key}.title`)}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
            <div className="absolute bottom-4 left-0 right-0 text-center text-white pointer-events-none">
              <h3 className="font-bold text-lg drop-shadow-md">{t(`works.items.${selectedImage.key}.title`)}</h3>
              <p className="text-white/90 text-sm drop-shadow-md">{t(`works.items.${selectedImage.key}.desc`)}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
