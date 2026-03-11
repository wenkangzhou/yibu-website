"use client";

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '@/lib/i18n';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    // 从 localStorage 读取语言设置
    const savedLang = localStorage.getItem('yibu-storage');
    if (savedLang) {
      try {
        const { state } = JSON.parse(savedLang);
        if (state?.language && state.language !== i18n.language) {
          i18n.changeLanguage(state.language);
        }
      } catch {
        // 忽略解析错误
      }
    }
  }, [i18n]);

  return <>{children}</>;
}
