// src/i18n/navigation.ts
import {createNavigation} from 'next-intl/navigation';

export const locales = ['ru', 'kk'] as const;
export const localePrefix = 'always'; // важно
export const defaultLocale = 'ru';

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation({
    locales,
    localePrefix
  });
