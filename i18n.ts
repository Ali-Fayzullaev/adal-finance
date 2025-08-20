// i18n.ts (в корне рядом с /messages)
import {getRequestConfig} from 'next-intl/server';

export const locales = ['ru', 'kk'] as const;
export const defaultLocale = 'ru';
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({locale}) => {
  const allowed = new Set<string>(locales as unknown as string[]);
  const resolvedLocale = (locale && allowed.has(locale)) ? locale : defaultLocale;

  try {
    const messages = (await import(`./messages/${resolvedLocale}.json`)).default;
    return {locale: resolvedLocale, messages}; // Важно: вернуть и locale, и messages
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[i18n] Failed to load messages for', resolvedLocale, e);
    }
    const messages = (await import(`./messages/${defaultLocale}.json`)).default;
    return {locale: resolvedLocale, messages};
  }
});
