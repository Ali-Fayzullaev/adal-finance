import type { Metadata } from "next";
import PrintShareBar from "@/app/[locale]/components/PrintShareBar";
import { Button } from "@/components/ui/button";
import {
  MoveLeft,
  ShieldCheck,
  Ban,
  Scale,
  Mail,
  BadgeCheck,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metaCopyright" });
  return { title: t("title"), description: t("description") };
}

export default async function CopyrightPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params; // 👈 берём локаль из сегмента
  const t = await getTranslations({ locale, namespace: "copyright" }); // 👈 явно

  const year = new Date().getFullYear();
  const intro = t.rich("intro", {
    year,
    strong: (chunks) => <span className="font-semibold">{chunks}</span>,
  });
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Заголовок */}
      <div className="flex items-center justify-between gap-3 border-b border-gray-200 dark:border-gray-700 pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {t("title")}
        </h1>
        <PrintShareBar />
      </div>

      {/* Контент */}
      <div className="mt-8 space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">
        <p className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/40 dark:to-yellow-800/20 p-4 rounded-xl shadow-sm border border-yellow-200 dark:border-yellow-800">
          {intro}
        </p>

        {/* ✅ Разрешённое */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 inline-flex items-center gap-2">
            <ShieldCheck className="h-5 w-5" />
            {t("allowed.title")}
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>{t("allowed.items.0")}</li>
            <li>{t("allowed.items.1")}</li>
          </ul>
        </section>

        {/* 🚫 Запрещённое */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 inline-flex items-center gap-2">
            <Ban className="h-5 w-5" />
            {t("prohibited.title")}
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>{t("prohibited.items.0")}</li>
            <li>{t("prohibited.items.1")}</li>
            <li>{t("prohibited.items.2")}</li>
          </ul>
        </section>

        {/* ™️ Товарные знаки */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 inline-flex items-center gap-2">
            <BadgeCheck className="h-5 w-5" />
            {t("trademarks.title")}
          </h2>
          <p>{t("trademarks.text", { brand: "ADAL Finance" })}</p>
        </section>

        {/* ⚖️ Ответственность */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 inline-flex items-center gap-2">
            <Scale className="h-5 w-5" />
            {t("liability.title")}
          </h2>
          <p>{t("liability.text")}</p>
        </section>

        {/* 📩 Контакты */}
        <section className="bg-gray-50 dark:bg-gray-800/40 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 inline-flex items-center gap-2">
            <Mail className="h-5 w-5" />
            {t("contacts.title")}
          </h2>
          <p>
            {t("contacts.text")}{" "}
            <a
              href="mailto:info@adalfinance.kz"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              info@adalfinance.kz
            </a>
          </p>
        </section>

        <Link href="/" locale={locale} prefetch className="inline-block">
          {" "}
          {/* 👈 фикс */}
          <Button className="bg-black inline-flex items-center gap-2">
            <MoveLeft className="h-4 w-4" />
            {t("back")}
          </Button>
        </Link>
      </div>
    </div>
  );
}
