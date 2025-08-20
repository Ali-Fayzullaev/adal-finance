// app/[locale]/layout.tsx
import type {Metadata} from 'next';
import {getMessages, getTranslations} from 'next-intl/server';
import Providers from './components/Providers';
import {locales, type Locale} from '@/i18n';

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export async function generateMetadata(
  {params}: {params: Promise<{locale: Locale}>}
): Promise<Metadata> {
  const {locale} = await params; // <-- обязательно await
  const t = await getTranslations({locale, namespace: 'meta'});
  return { title: t('title'), description: t('description') };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: Locale}>;
}) {
  const {locale} = await params; // <-- обязательно await
  const messages = await getMessages({locale}); // <-- явно по этой локали
  return (
    <Providers locale={locale} messages={messages}>
      {children}
    </Providers>
  );
}
