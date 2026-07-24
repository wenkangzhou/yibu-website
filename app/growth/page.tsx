"use client";

import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Users,
  BookOpen,
  Languages,
  Palette,
  Calculator,
  FlaskConical,
  Dumbbell,
  TrendingUp,
  Target,
  FileText,
  Download,
  EyeOff,
  ArrowRight,
} from "lucide-react";

const domainIcons: Record<string, React.ElementType> = {
  lifeSocial: Heart,
  chinese: BookOpen,
  english: Languages,
  art: Palette,
  science: FlaskConical,
  math: Calculator,
  pe: Dumbbell,
};

const domainColors: Record<string, string> = {
  lifeSocial: 'from-rose-500 to-pink-500',
  chinese: 'from-red-500 to-orange-500',
  english: 'from-blue-500 to-indigo-500',
  art: 'from-violet-500 to-purple-500',
  science: 'from-emerald-500 to-teal-500',
  math: 'from-amber-500 to-yellow-500',
  pe: 'from-cyan-500 to-sky-500',
};

const domainBgColors: Record<string, string> = {
  lifeSocial: 'from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/20',
  chinese: 'from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/20',
  english: 'from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/20',
  art: 'from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/20',
  science: 'from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20',
  math: 'from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/20',
  pe: 'from-cyan-50 to-sky-50 dark:from-cyan-950/30 dark:to-sky-950/20',
};

export default function GrowthPage() {
  const { t } = useTranslation('growth');

  const domainKeys = ['lifeSocial', 'chinese', 'english', 'art', 'science', 'math', 'pe'];
  const trajectoryItems = [0, 1, 2, 3, 4, 5];
  const focusItems = [0, 1, 2];
  const challengeItems = [0, 1, 2, 3, 4, 5];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 pb-20">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-900 py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900 via-indigo-900 to-slate-900" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-sky-400 blur-3xl animate-blob" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-indigo-400 blur-3xl animate-blob animation-delay-2000" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-6 gap-1.5 bg-white/10 text-white hover:bg-white/20">
              <EyeOff className="h-3.5 w-3.5" />
              {t('hero.badge')}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tighter text-white drop-shadow-lg sm:text-5xl md:text-6xl">
              {t('hero.title')}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/90 drop-shadow-md">
              {t('hero.subtitle')}
            </p>
            <p className="mx-auto mt-4 max-w-xl text-sm text-white/70">
              {t('hero.notice')}
            </p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="mx-auto max-w-5xl space-y-16">
          {/* Overview */}
          <Card className="relative overflow-hidden border-2 border-sky-100 dark:border-sky-800 bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-sky-950/30 dark:to-indigo-950/20">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-sky-400 to-indigo-400 opacity-10" />
            <CardHeader className="relative">
              <CardTitle className="text-2xl font-bold">{t('overview.title')}</CardTitle>
            </CardHeader>
            <CardContent className="relative space-y-6">
              <blockquote className="border-l-4 border-sky-400 pl-4 text-lg font-medium italic text-foreground/90">
                “{t('overview.quote')}”
              </blockquote>
              <p className="text-muted-foreground leading-relaxed">
                {t('overview.summary')}
              </p>
              <div>
                <p className="mb-3 text-sm font-semibold text-muted-foreground">{t('overview.traits.title')}</p>
                <div className="flex flex-wrap gap-2">
                  {(t('overview.traits.items', { returnObjects: true }) as string[]).map((trait) => (
                    <Badge key={trait} variant="secondary" className="px-3 py-1">
                      {trait}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Semester overview */}
          <section>
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{t('semester.title')}</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-2 border-amber-100 dark:border-amber-800 bg-gradient-to-br from-amber-50 to-yellow-50/50 dark:from-amber-950/20 dark:to-yellow-950/10">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className="text-xl">{t('semester.s1.label')}</CardTitle>
                  </div>
                  <CardDescription className="text-xs font-medium text-amber-700/70 dark:text-amber-300/70">
                    {t('semester.s1.attendance')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t('semester.s1.highlight')}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-emerald-100 dark:border-emerald-800 bg-gradient-to-br from-emerald-50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/10">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className="text-xl">{t('semester.s2.label')}</CardTitle>
                  </div>
                  <CardDescription className="text-xs font-medium text-emerald-700/70 dark:text-emerald-300/70">
                    {t('semester.s2.attendance')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t('semester.s2.highlight')}
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Domains */}
          <section>
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{t('domains.title')}</h2>
              <p className="mt-3 text-muted-foreground">{t('domains.subtitle')}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {domainKeys.map((key) => {
                const Icon = domainIcons[key];
                return (
                  <Card
                    key={key}
                    className={`group relative overflow-hidden border-2 bg-gradient-to-br ${domainBgColors[key]} hover:shadow-lg transition-all duration-300`}
                  >
                    <div className={`absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br ${domainColors[key]} opacity-10 group-hover:opacity-20 transition-opacity`} />
                    <CardHeader className="relative flex flex-row items-center gap-4">
                      <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${domainColors[key]} flex items-center justify-center shrink-0 shadow-md`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="text-lg">{t(`domains.items.${key}.title`)}</CardTitle>
                    </CardHeader>
                    <CardContent className="relative space-y-4">
                      <div>
                        <p className="mb-1 text-xs font-semibold text-muted-foreground/80">{t('semester.s1.label')}</p>
                        <p className="text-sm leading-relaxed text-muted-foreground">{t(`domains.items.${key}.s1`)}</p>
                      </div>
                      <div>
                        <p className="mb-1 text-xs font-semibold text-muted-foreground/80">{t('semester.s2.label')}</p>
                        <p className="text-sm leading-relaxed text-muted-foreground">{t(`domains.items.${key}.s2`)}</p>
                      </div>
                      <div className="rounded-lg bg-background/60 p-3">
                        <p className="text-xs font-semibold text-foreground/80 mb-1">成长</p>
                        <p className="text-sm leading-relaxed text-foreground/90">{t(`domains.items.${key}.growth`)}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Growth trajectory */}
          <section>
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-3">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{t('trajectory.title')}</h2>
              <p className="mt-3 text-muted-foreground">{t('trajectory.subtitle')}</p>
            </div>
            <div className="space-y-4">
              {trajectoryItems.map((index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-[1fr_auto_1fr] items-center gap-4 p-5">
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-muted-foreground">{t('semester.s1.label')}</p>
                        <p className="text-sm text-muted-foreground">{t(`trajectory.items.${index}.from`)}</p>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                        <div className="text-sm font-bold text-primary">{t(`trajectory.items.${index}.title`)}</div>
                        <ArrowRight className="h-5 w-5 text-primary hidden md:block" />
                        <div className="h-8 w-px bg-primary/30 md:hidden" />
                      </div>
                      <div className="space-y-1 md:text-right">
                        <p className="text-xs font-semibold text-muted-foreground">{t('semester.s2.label')}</p>
                        <p className="text-sm font-medium text-foreground">{t(`trajectory.items.${index}.to`)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Challenges */}
          <section>
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-3">
                <Target className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{t('challenges.title')}</h2>
              <p className="mt-3 text-muted-foreground">{t('challenges.subtitle')}</p>
            </div>
            <Card className="border-2 border-slate-200 dark:border-slate-700">
              <CardContent className="p-6 md:p-8 space-y-5">
                <ul className="space-y-3">
                  {challengeItems.map((index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      {t(`challenges.items.${index}`)}
                    </li>
                  ))}
                </ul>
                <div className="rounded-lg bg-muted/50 p-4 text-sm leading-relaxed text-foreground/90">
                  {t('challenges.note')}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Family focus */}
          <section>
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{t('focus.title')}</h2>
              <p className="mt-3 text-muted-foreground">{t('focus.subtitle')}</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {focusItems.map((index) => (
                <Card key={index} className="relative overflow-hidden border-2 border-sky-100 dark:border-sky-800 bg-gradient-to-br from-sky-50 to-indigo-50/50 dark:from-sky-950/20 dark:to-indigo-950/10 hover:shadow-lg transition-all">
                  <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-sky-400/10" />
                  <CardHeader className="relative pb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-500 text-white font-bold shadow-md">
                      {index + 1}
                    </div>
                    <CardTitle className="text-lg mt-3">{t(`focus.items.${index}.title`)}</CardTitle>
                  </CardHeader>
                  <CardContent className="relative">
                    <p className="text-sm leading-relaxed text-muted-foreground">{t(`focus.items.${index}.desc`)}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Downloads */}
          <section>
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{t('downloads.title')}</h2>
              <p className="mt-3 text-muted-foreground">{t('downloads.subtitle')}</p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href="/assets/assessment/Yibu-中班-上学期-幼儿评估报告.pdf" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                  <Download className="h-4 w-4" />
                  {t('downloads.s1')}
                </Button>
              </a>
              <a href="/assets/assessment/Yibu-中班-下学期-幼儿评估报告.pdf" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="gap-2 w-full sm:w-auto">
                  <Download className="h-4 w-4" />
                  {t('downloads.s2')}
                </Button>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
