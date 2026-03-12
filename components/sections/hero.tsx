"use client"

import { useTranslation } from 'react-i18next';
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Loader2, Play } from "lucide-react";
import { calculateAge, YIBU_BIRTH_DATE } from "@/lib/age";
import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";

const VIDEO_SOURCES = {
  desktop: '/assets/hero-background-v2.mp4',
  desktopWeixin: '/assets/hero-background-v2-weixin.mp4',
  mobile: '/assets/hero-background-compressed.mp4',
};

const BREAKPOINT_LG = 1024;
const LOADING_TIMEOUT = 10000;

export function Hero() {
  const { t, i18n } = useTranslation();
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPlayButton, setShowPlayButton] = useState(false);
  const [currentVideoSrc, setCurrentVideoSrc] = useState<string>(VIDEO_SOURCES.mobile);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const age = calculateAge(YIBU_BIRTH_DATE, i18n.language as 'zh' | 'en');

  const isWeixin = useCallback(() => {
    if (typeof window === 'undefined') return false;
    return /MicroMessenger/i.test(window.navigator.userAgent);
  }, []);

  const getVideoSource = useCallback(() => {
    const isLargeScreen = window.innerWidth >= BREAKPOINT_LG;
    if (isLargeScreen) {
      return isWeixin() ? VIDEO_SOURCES.desktopWeixin : VIDEO_SOURCES.desktop;
    }
    return VIDEO_SOURCES.mobile;
  }, [isWeixin]);

  // 清理计时器
  const clearLoadingTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // 开始加载计时
  const startLoadingTimer = useCallback(() => {
    clearLoadingTimeout();
    setIsLoading(true);
    
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      setShowPlayButton(true);
    }, LOADING_TIMEOUT);
  }, [clearLoadingTimeout]);

  // 处理视频源变化
  useEffect(() => {
    const handleResize = () => {
      const newSrc = getVideoSource();
      if (newSrc !== currentVideoSrc) {
        setCurrentVideoSrc(newSrc);
        setIsPlaying(false);
        startLoadingTimer();
      }
    };

    // 初始设置
    setCurrentVideoSrc(getVideoSource());
    startLoadingTimer();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearLoadingTimeout();
    };
  }, [currentVideoSrc, getVideoSource, startLoadingTimer, clearLoadingTimeout]);

  const handlePlay = async () => {
    if (!videoRef.current) return;
    
    setIsLoading(true); // 点击后立即显示 loading
    
    try {
      await videoRef.current.play();
      setIsPlaying(true);
      setShowPlayButton(false);
      setIsLoading(false);
      clearLoadingTimeout();
    } catch {
      setIsLoading(false);
      setShowPlayButton(true);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
    setIsLoading(false);
    setShowPlayButton(false);
    clearLoadingTimeout();
  };

  const handleVideoWaiting = () => {
    setIsLoading(true);
  };

  // 渲染右下角按钮
  const renderButton = () => {
    // 1. 加载中
    if (isLoading) {
      return (
        <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      );
    }
    
    // 2. 显示播放按钮
    if (showPlayButton && !isPlaying) {
      return (
        <button
          onClick={handlePlay}
          className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-all"
        >
          <Play className="h-6 w-6 ml-0.5" fill="currentColor" />
        </button>
      );
    }
    
    // 3. 静音按钮
    if (isPlaying) {
      return (
        <button
          onClick={toggleMute}
          className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-all"
        >
          {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
        </button>
      );
    }
    
    return null;
  };

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-sky-900">
      {/* 背景层 */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-600 via-indigo-600 to-purple-700" />
        
        <div className="absolute inset-0">
          <Image
            src="/assets/video-poster.jpg"
            alt=""
            fill
            className="object-cover blur-sm scale-105"
            priority
          />
        </div>
        
        <video
          ref={videoRef}
          src={currentVideoSrc}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
          autoPlay={!isWeixin()}
          muted={isMuted}
          loop
          playsInline
          webkit-playsinline="true"
          x5-playsinline="true"
          onPlay={handleVideoPlay}
          onWaiting={handleVideoWaiting}
        />
        
        <div className="absolute inset-0 bg-black/25" />
      </div>

      {/* 右下角按钮 */}
      <div className="absolute bottom-6 right-6 z-30">
        {renderButton()}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center text-center max-w-3xl py-20">
          <div className="mb-6">
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-4 ring-white/40 shadow-2xl">
              <Image
                src="/assets/avatar.JPG"
                alt="Yibu Avatar"
                fill
                className="object-cover"
                priority
              />
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
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center pt-2 backdrop-blur-sm">
          <div className="w-1 h-2 bg-white/90 rounded-full" />
        </div>
      </div>
    </section>
  );
}
