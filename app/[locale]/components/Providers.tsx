// components/Providers.tsx
'use client';
import {NextIntlClientProvider} from 'next-intl';
import {Toaster} from 'sonner';

export default function Providers({
  locale, messages, children
}: { locale: string; messages: any; children: React.ReactNode }) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
      <Toaster position="top-right" richColors />
    </NextIntlClientProvider>
  );
}
