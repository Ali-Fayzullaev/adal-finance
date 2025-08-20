// src/i18n/routing.ts
export const locales = ['ru', 'kk'] as const;
export type Locale = typeof locales[number];

export const routing = {
  locales,
  defaultLocale: 'ru',
  localePrefix: 'always', // 👈 обязательно
  // pathnames: {...} // если используешь кастомные пути
} as const;
