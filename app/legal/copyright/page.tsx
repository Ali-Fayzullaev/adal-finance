import type { Metadata } from "next";
import PrintShareBar from "@/components/PrintShareBar";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";

import Link from "next/link";
export const metadata: Metadata = {
  title: "Авторские права — ADAL Finance",
  description:
    "Полная информация об авторских правах и условиях использования материалов сайта ADAL Finance.",
};

export default function CopyrightPage() {
  const year = new Date().getFullYear();

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Заголовок */}
      <div className="flex items-center justify-between gap-3 border-b border-gray-200 dark:border-gray-700 pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Авторские права
        </h1>
        <PrintShareBar />
      </div>

      {/* Основной контент */}
      <div className="mt-8 space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">
        <p className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/40 dark:to-yellow-800/20 p-4 rounded-xl shadow-sm border border-yellow-200 dark:border-yellow-800">
          © {year} <span className="font-semibold">ТОО «ADAL Finance»</span>.
          Все права защищены. Материалы сайта (тексты, логотипы, фирменный
          стиль, фотографии, графика, макеты интерфейсов) охраняются
          законодательством РК и международными соглашениями об охране авторских
          и смежных прав.
        </p>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
            ✅ Разрешённое использование
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Персональный просмотр материалов сайта и сохранение ссылок.</li>
            <li>
              Цитирование небольших фрагментов при указании активной ссылки на
              источник.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
            🚫 Запрещённое использование
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>
              Копирование, переработка и распространение материалов без
              письменного согласия правообладателя.
            </li>
            <li>
              Коммерческое использование логотипов, элементов дизайна и текстов
              без лицензии.
            </li>
            <li>
              Автоматизированное массовое скачивание контента (скрейпинг).
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
            ™️ Товарные знаки
          </h2>
          <p>
            Наименования и знаки{" "}
            <span className="font-semibold">ADAL Finance</span> являются
            объектами интеллектуальной собственности и могут быть
            зарегистрированными товарными знаками. Любое использование
            допускается только с разрешения правообладателя.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
            ⚖️ Ответственность
          </h2>
          <p>
            Информация на сайте носит справочный характер и не является
            публичной офертой. Компания оставляет за собой право обновлять
            материалы без предварительного уведомления.
          </p>
        </section>

        <section className="bg-gray-50 dark:bg-gray-800/40 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
            📩 Контакты правообладателя
          </h2>
          <p>
            По вопросам использования материалов обращайтесь:{" "}
            <a
              href="mailto:info@adalfinance.kz"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              info@adalfinance.kz
            </a>
          </p>
        </section>
        <Link href="/">
          <Button className="bg-black inline-flex items-center gap-2">
            <MoveLeft className="h-4 w-4" />
            Назад
          </Button>
        </Link>
      </div>
    </div>
  );
}
