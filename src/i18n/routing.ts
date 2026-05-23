import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fr', 'mn', 'en', 'zh', 'ar', 'es', 'pt', 'de', 'ja', 'ko', 'ru', 'hi'],
  defaultLocale: 'fr',
  localePrefix: 'as-needed',
});
