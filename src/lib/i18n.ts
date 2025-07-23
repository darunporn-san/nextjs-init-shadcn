import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@public/locales/en/translation.json';
import th from '@public/locales/th/translation.json';

let initialized = false;

if (!initialized) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (i18n as any).use(initReactI18next).init({
    resources: {
      en: { translation: en },
      th: { translation: th },
    },
    lng: 'th',
    fallbackLng: 'th',
    interpolation: { escapeValue: false },
  });
  initialized = true;
}

export default i18n;
