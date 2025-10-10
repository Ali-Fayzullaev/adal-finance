// i18n/request.ts
import {getRequestConfig} from 'next-intl/server';
import {locales, defaultLocale} from '@/i18n';

export default getRequestConfig(async ({requestLocale}) => {
  const requested = (await requestLocale) ?? defaultLocale;           // ← без ()
  const activeLocale = (locales as readonly string[]).includes(requested)
    ? requested
    : defaultLocale;

  return {
    locale: activeLocale,
    messages: (await import(`../messages/${activeLocale}.json`)).default
  };
});
