// components/LocaleSwitcherWrapper.tsx
"use client";

import { Suspense } from 'react';
import LocaleSwitcher from './LocaleSwitcher';

type Props = {
  p: { border: string; card: string; fg?: string; accent?: string };
};

export default function LocaleSwitcherWrapper({ p }: Props) {
  return (
    <Suspense fallback={
      <button
        className="h-9 px-3 rounded-full border inline-flex items-center gap-2"
        style={{borderColor: p.border}}
      >
        <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
        <div className="hidden md:inline h-4 w-16 bg-gray-200 rounded animate-pulse" />
      </button>
    }>
      <LocaleSwitcher p={p} />
    </Suspense>
  );
}