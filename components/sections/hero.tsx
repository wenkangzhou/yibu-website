"use client"

import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Loader2 } from "lucide-react";
import { calculateAge, YIBU_BIRTH_DATE } from "@/lib/age";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

// 响应式视频源配置
const VIDEO_SOURCES = {
  desktop: '/assets/hero-background-v2.mp4',      // 大屏幕：高质量
  mobile: '/assets/hero-background-compressed.mp4', // 小屏幕：压缩版
};

// 断点：lg = 1024px
const BREAKPOINT_LG = 1024;

export function Hero() {
  const { t, i18n } = useTranslation();
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [posterLoaded, setPosterLoaded] = useState(false);
  const [currentVideoSrc, setCurrentVideoSrc] = useState(VIDEO_SOURCES.mobile);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const age = calculateAge(YIBU_BIRTH_DATE, i18n.language as 'zh' | 'en');

  // 监听窗口大小变化，切换视频源
  useEffect(() => {
    const updateVideoSource = () => {
      const isLargeScreen = window.innerWidth >= BREAKPOINT_LG;
      const newSrc = isLargeScreen ? VIDEO_SOURCES.desktop : VIDEO_SOURCES.mobile;
      
      if (newSrc !== currentVideoSrc) {
        setCurrentVideoSrc(newSrc);
        setVideoLoaded(false); // 切换视频时重置加载状态
      }
    };

    // 初始检测
    updateVideoSource();

    // 监听 resize
    window.addEventListener('resize', updateVideoSource);
    return () => window.removeEventListener('resize', updateVideoSource);
  }, [currentVideoSrc]);

  // 视频源变化时重新加载
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      const playVideo = async () => {
        try {
          await videoRef.current?.play();
        } catch {
          // 自动播放被阻止
        }
      };
      playVideo();
    }
  }, [currentVideoSrc]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-sky-900">
      {/* 背景层 */}
      <div className="absolute inset-0 z-0">
        {/* 第1层：渐变背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-600 via-indigo-600 to-purple-700" />
        
        {/* 第2层：封面图（模糊预览） */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${posterLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <img
            src="/assets/video-poster.jpg"
            alt=""
            className="w-full h-full object-cover blur-sm scale-105"
            onLoad={() => setPosterLoaded(true)}
          />
        </div>
        
        {/* 第3层：响应式视频 */}
        <video
          ref={videoRef}
          key={currentVideoSrc} // key 变化会强制重新创建 video 元素
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
          autoPlay
          muted
          loop
          playsInline
          webkit-playsinline="true"
          x5-playsinline="true"
          poster="/assets/video-poster.jpg"
          onLoadedData={handleVideoLoad}
          onCanPlay={handleVideoLoad}
          preload="auto"
        >
          <source src={currentVideoSrc} type="video/mp4" />
        </video>
        
        {/* 遮罩层 */}
        <div className="absolute inset-0 bg-black/25" />
        
        {/* 加载指示器 */}
        {!videoLoaded && (
          <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm text-white/70 text-xs">
            <Loader2 className="h-3 w-3 animate-spin" />
            <span>{t('hero.loading')}</span>
          </div>
        )}
        
        {/* 静音按钮 */}
        {videoLoaded && (
          <button
            onClick={toggleMute}
            className="absolute bottom-6 right-6 z-20 p-3 rounded-full bg-black/30 backdrop-blur-sm text-white/80 hover:bg-black/50 hover:text-white transition-all"
            aria-label={isMuted ? t('hero.unmute') : t('hero.mute')}
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
        )}
      </div>

      {/* Content - 左侧内容居中 */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center text-center max-w-3xl py-20">
          {/* 头像 */}
          <div className="flex flex-col items-center gap-4 mb-6">
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-4 ring-white/40 shadow-2xl">
              <Image
                src="/assets/avatar.JPG"
                alt="Yibu Avatar"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="text-white drop-shadow-lg">
              <div className="text-base text-white/80 mb-1">{t('about.name')}</div>
              <div className="text-xl font-medium">{age}</div>
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-7xl text-white drop-shadow-lg">
              {t('hero.greeting')}
            </h1>
            <p className="text-lg md:text-xl text-white/95 drop-shadow-md max-w-2xl">
              {t('hero.subtitle', { age })}
            </p>
          </div>
          
          <div className="mt-8">
            <a href="#about">
              <Button size="lg" className="bg-white text-sky-900 hover:bg-white/90 font-semibold px-10 py-6 text-lg shadow-lg backdrop-blur-sm">
                {t('hero.cta')}
              </Button>
            </a>
          </div>
        </div>
      </div>
      
      {/* 滚动提示 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center pt-2 backdrop-blur-sm">
          <div className="w-1 h-2 bg-white/90 rounded-full" />
        </div>
      </div>
    </section>
  );
}
