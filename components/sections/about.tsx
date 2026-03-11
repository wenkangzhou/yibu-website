"use client"

import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, School, Users, Languages, Baby } from "lucide-react";
import { calculateAge, YIBU_BIRTH_DATE } from "@/lib/age";
import Image from "next/image";

export function About() {
  const { t, i18n } = useTranslation();
  const age = calculateAge(YIBU_BIRTH_DATE, i18n.language as 'zh' | 'en');

  const infoItems = [
    { icon: Baby, label: t('about.ageLabel'), value: age },
    { icon: Calendar, label: t('about.birthday'), value: '' },
    { icon: School, label: t('about.school'), value: t('about.class') },
    { icon: Languages, label: t('about.languages'), value: '' },
  ];

  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {t('about.title')}
          </h2>
        </div>
        
        <div className="grid gap-6 lg:grid-cols-2 max-w-5xl mx-auto">
          <Card className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-indigo-500/10" />
            <CardHeader>
              <CardTitle className="flex items-center gap-4">
                {/* 头像 */}
                <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-sky-200 dark:ring-sky-800 shrink-0">
                  <Image
                    src="/assets/avatar.JPG"
                    alt="Yibu Avatar"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="text-2xl">{t('about.name')}</div>
                  <div className="text-sm font-normal text-muted-foreground">Yibu Zhou</div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {t('about.description')}
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300">
                  {age}
                </Badge>
                <Badge variant="secondary" className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300">
                  {t('about.languages')}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            {infoItems.map((item, index) => (
              <Card key={index} className="group hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center shrink-0">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
                    {item.value && (
                      <p className="text-base font-semibold truncate">{item.value}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
