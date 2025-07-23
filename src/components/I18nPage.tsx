'use client';
import { useTranslation } from 'react-i18next';
import { ReactNode } from 'react';

interface I18nPageProps {
  children: (t: (key: string) => string) => ReactNode;
}

export default function I18nPage({ children }: I18nPageProps) {
  const { t } = useTranslation();
  return (
    <div id="i18n-page-root" data-testid="i18n-page-root">
      {children(t)}
    </div>
  );
}
