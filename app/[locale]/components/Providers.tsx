// app/[locale]/components/Providers.tsx
"use client";

import {NextIntlClientProvider} from "next-intl";
import {ThemeProvider} from "next-themes";
import type {ReactNode} from "react";

export default function Providers({
  children,
  locale,
  messages
}: {
  children: ReactNode;
  locale: string;
  messages: any; // AbstractIntlMessages
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
