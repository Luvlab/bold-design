import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  // Try to load locale messages, fallback to 'en' then 'fr'
  let messages;
  try {
    messages = (await import(`../messages/${locale}.json`)).default;
  } catch {
    try {
      messages = (await import('../messages/en.json')).default;
    } catch {
      messages = (await import('../messages/fr.json')).default;
    }
  }

  return { locale, messages };
});
