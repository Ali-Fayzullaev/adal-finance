// src/i18n/navigation.ts
import {createNavigation} from 'next-intl/navigation';
// или createSharedPathnamesNavigation для v3.x
import {routing} from './routing';

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
//  или:
//  createSharedPathnamesNavigation(routing);
