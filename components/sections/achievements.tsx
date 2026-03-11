"use client"

import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Gamepad2, Medal, Footprints, Bike, Sparkles } from "lucide-react";

export function Achievements() {
  const { t } = useTranslation();

  const achievements = [
    {
      key: 'lego',
      icon: Gamepad2,
      badge: '🏗️',
      gradient: 'from-amber-500 to-yellow-500',
      bgGradient: 'from-amber-50 to-yellow-50/50 dark:from-amber-950/30 dark:to-yellow-950/20',
      borderColor: 'border-amber-100 dark:border-amber-800',
    },
    {
      key: 'running',
      icon: Medal,
      badge: '🥇',
      gradient: 'from-yellow-500 to-amber-500',
      bgGradient: 'from-yellow-50 to-amber-50/50 dark:from-yellow-950/30 dark:to-amber-950/20',
      borderColor: 'border-yellow-100 dark:border-yellow-800',
    },
    {
      key: 'walking',
      icon: Footprints,
      badge: '🚶',
      gradient: 'from-emerald-500 to-green-500',
      bgGradient: 'from-emerald-50 to-green-50/50 dark:from-emerald-950/30 dark:to-green-950/20',
      borderColor: 'border-emerald-100 dark:border-emerald-800',
    },
    {
      key: 'cycling',
      icon: Bike,
      badge: '🚴',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50/50 dark:from-blue-950/30 dark:to-cyan-950/20',
      borderColor: 'border-blue-100 dark:border-blue-800',
    },
  ];

  return (
    <section id="achievements" className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-2">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {t('achievements.title')}
          </h2>
          <p className="max-w-[600px] text-muted-foreground text-lg">
            记录成长的每一个精彩瞬间
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {achievements.map((achievement) => (
            <Card 
              key={achievement.key} 
              className={`group relative overflow-hidden border-2 ${achievement.borderColor} bg-gradient-to-br ${achievement.bgGradient} hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
            >
              {/* 装饰背景 */}
              <div className={`absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br ${achievement.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
              
              <CardHeader className="flex flex-row items-center gap-4 relative">
                <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${achievement.gradient} flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <achievement.icon className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl font-bold">{t(`achievements.${achievement.key}.title`)}</CardTitle>
                    <span className="text-xl">{achievement.badge}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative">
                <CardDescription className="text-sm leading-relaxed text-muted-foreground/90">
                  {t(`achievements.${achievement.key}.description`)}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
