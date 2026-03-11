"use client"

import { useTranslation } from 'react-i18next';
import { Heart } from "lucide-react";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4 py-8 md:py-12 px-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{t('footer.madeWith')}</span>
          <Heart className="h-4 w-4 text-red-500 fill-red-500" />
          <span>{t('footer.forYibu')}</span>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()} {t('footer.copyright')}
        </p>
      </div>
    </footer>
  );
}
