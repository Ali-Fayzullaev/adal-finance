// i18n/request.ts
import {getRequestConfig} from 'next-intl/server';
import {locales, defaultLocale} from '@/i18n';

export default getRequestConfig(async ({locale}) => {
  // нормализуем локаль (фолбэк на дефолтную)
  const activeLocale =
    (locale && (locales as readonly string[]).includes(locale)) ? locale : defaultLocale;

  const messages = (await import(`../messages/${activeLocale}.json`)).default;

  // ✅ ВАЖНО: вернуть и locale, и messages
  return {
    locale: activeLocale,
    messages
  };
});
