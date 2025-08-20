// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always'
});

// ❗️Пропускаем _next, api, временные служебные пути и ЛЮБЫЕ файлы с расширениями
export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
