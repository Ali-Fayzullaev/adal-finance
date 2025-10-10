'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function PixelsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastUrlRef = useRef<string | null>(null);

  useEffect(() => {
    const url = `${window.location.pathname}${window.location.search || ''}`;

    // защита от дублей (актуально в dev/StrictMode)
    if (lastUrlRef.current === url) return;
    lastUrlRef.current = url;

    // Meta Pixel
    try {
      (window as any).fbq?.('track', 'PageView');
    } catch {}

    // TikTok Pixel
    try {
      (window as any).ttq?.page();
    } catch {}

    // Yandex.Metrika (SPA-хит)
    try {
      (window as any).ym?.(104202860, 'hit', url);
    } catch {}
  }, [pathname, searchParams]);

  return null;
}
