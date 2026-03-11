"use client"

import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ImageIcon, Palette, Sparkles } from "lucide-react";

export function Works() {
  const { t } = useTranslation();

  // 预留的占位卡片数据 - 从翻译文件获取
  const placeholderWorks = [
    { 
      id: 1, 
      titleKey: 'works.items.lego.title',
      descKey: 'works.items.lego.desc',
      color: 'from-pink-500 to-rose-500', 
      bgColor: 'from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/20', 
      borderColor: 'border-pink-100 dark:border-pink-800',
    },
    { 
      id: 2, 
      titleKey: 'works.items.art.title',
      descKey: 'works.items.art.desc',
      color: 'from-cyan-500 to-blue-500', 
      bgColor: 'from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/20', 
      borderColor: 'border-cyan-100 dark:border-cyan-800',
    },
    { 
      id: 3, 
      titleKey: 'works.items.crafts.title',
      descKey: 'works.items.crafts.desc',
      color: 'from-violet-500 to-purple-500', 
      bgColor: 'from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/20', 
      borderColor: 'border-violet-100 dark:border-violet-800',
    },
    { 
      id: 4, 
      titleKey: 'works.items.photos.title',
      descKey: 'works.items.photos.desc',
      color: 'from-orange-500 to-red-500', 
      bgColor: 'from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/20', 
      borderColor: 'border-orange-100 dark:border-orange-800',
    },
  ];

  return (
    <section id="works" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {placeholderWorks.map((work) => (
            <Card 
              key={work.id}
              className={`group relative overflow-hidden border-2 ${work.borderColor} bg-gradient-to-br ${work.bgColor} hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
            >
              {/* 装饰背景 */}
              <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${work.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
              
              <CardHeader className="relative">
                <div className="flex items-center justify-between mb-2">
                  <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${work.color} flex items-center justify-center shadow-md`}>
                    <ImageIcon className="h-5 w-5 text-white" />
                  </div>
                  <Badge variant="secondary" className="text-xs bg-background/80">
                    {t('works.comingSoon')}
                  </Badge>
                </div>
                <CardTitle className="text-lg font-bold">{t(work.titleKey)}</CardTitle>
                <CardDescription className="text-xs">{t(work.descKey)}</CardDescription>
              </CardHeader>
              <CardContent className="relative">
                {/* 图片占位区域 */}
                <div className="mt-2 flex flex-col items-center justify-center h-32 rounded-xl border-2 border-dashed border-muted-foreground/20 bg-muted/30 group-hover:bg-muted/50 transition-colors overflow-hidden">
                  <div className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br ${work.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/60">
                    <ImageIcon className="h-10 w-10 mb-2 opacity-50" />
                    <span className="text-xs font-medium">{t('works.placeholderTitle')}</span>
                    <span className="text-[10px] text-muted-foreground/40 mt-1">{t('works.placeholderImage')}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-muted/50 text-muted-foreground">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm">{t('works.placeholder')}</span>
            <Sparkles className="h-4 w-4" />
          </div>
        </div>
      </div>
    </section>
  );
}
