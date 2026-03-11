"use client"

import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, Gamepad2, BookOpen, Trophy } from "lucide-react";

export function Hobbies() {
  const { t } = useTranslation();

  const hobbies = [
    {
      key: 'cars',
      icon: Car,
      gradient: 'from-red-500 to-orange-500',
      bgGradient: 'from-red-50 to-orange-50/50 dark:from-red-950/30 dark:to-orange-950/20',
      borderColor: 'border-red-100 dark:border-red-800',
      iconBg: 'bg-gradient-to-br from-red-500 to-orange-500',
    },
    {
      key: 'lego',
      icon: Gamepad2,
      gradient: 'from-sky-500 to-blue-500',
      bgGradient: 'from-sky-50 to-blue-50/50 dark:from-sky-950/30 dark:to-blue-950/20',
      borderColor: 'border-sky-100 dark:border-sky-800',
      iconBg: 'bg-gradient-to-br from-sky-500 to-blue-500',
    },
    {
      key: 'reading',
      icon: BookOpen,
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-50 to-teal-50/50 dark:from-emerald-950/30 dark:to-teal-950/20',
      borderColor: 'border-emerald-100 dark:border-emerald-800',
      iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-500',
    },
    {
      key: 'sports',
      icon: Trophy,
      gradient: 'from-violet-500 to-purple-500',
      bgGradient: 'from-violet-50 to-purple-50/50 dark:from-violet-950/30 dark:to-purple-950/20',
      borderColor: 'border-violet-100 dark:border-violet-800',
      iconBg: 'bg-gradient-to-br from-violet-500 to-purple-500',
    },
  ];

  return (
    <section id="hobbies" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-2">
            <span className="text-2xl">🎯</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {t('hobbies.title')}
          </h2>
          <p className="max-w-[600px] text-muted-foreground text-lg">
            {t('hobbies.subtitle')}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {hobbies.map((hobby) => (
            <Card 
              key={hobby.key} 
              className={`group relative overflow-hidden border-2 ${hobby.borderColor} bg-gradient-to-br ${hobby.bgGradient} hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
            >
              {/* 装饰背景 */}
              <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${hobby.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
              
              <CardHeader className="relative">
                <div className={`h-14 w-14 rounded-2xl ${hobby.iconBg} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <hobby.icon className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-xl font-bold">{t(`hobbies.${hobby.key}.title`)}</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <CardDescription className="text-sm leading-relaxed text-muted-foreground/90">
                  {t(`hobbies.${hobby.key}.description`)}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
