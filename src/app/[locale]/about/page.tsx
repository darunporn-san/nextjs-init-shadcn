'use client';
import I18nPage from '@/components/I18nPage';

export default function AboutPage() {
  return (
    <I18nPage>
      {(t) => (
        <div data-testid="about-page-root" id="about-page-root">
          <h1 data-testid="about-title" id="about-title">
            {t('aboutTitle')}
          </h1>
          <p data-testid="about-desc" id="about-desc">
            {t('aboutDesc')}
          </p>
        </div>
      )}
    </I18nPage>
  );
}
