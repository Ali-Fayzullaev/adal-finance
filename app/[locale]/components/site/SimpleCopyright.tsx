// components/site/SimpleCopyright.tsx
'use client';

import * as React from 'react';
import { Link } from '@/i18n/navigation';

type Props = {
  theme?: 'light' | 'dark';
};

export default function SimpleCopyright({ theme = 'light' }: Props) {
  const fg = theme === 'dark' ? '#ffffff' : '#51637A';
  const currentYear = new Date().getFullYear();

  return (
    <div className="mt-8 text-center text-xs">
      <Link
        href="/legal/copyright"
        className="inline-flex items-center gap-2 underline-offset-2 hover:underline"
        style={{ color: fg }}
      >
        © {currentYear} ADAL Finance — Все права защищены
      </Link>
    </div>
  );
}