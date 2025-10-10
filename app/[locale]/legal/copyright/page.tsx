// app/[locale]/legal/copyright/page.tsx
import {
  ShieldCheck,
  Ban,
  BadgeCheck,
  Scale,
  Mail,
  MoveLeft,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default  function CopyrightPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Заголовок + панель печати/шаринга */}
      <div className="flex items-center justify-between gap-3 border-b border-gray-200 dark:border-gray-700 pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Авторские права
        </h1>
      </div>

      {/* Контент */}
      <div className="mt-8 space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">
        <p className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/40 dark:to-yellow-800/20 p-4 rounded-xl shadow-sm border border-yellow-200 dark:border-yellow-800">
          © 2025 ТОО «ADAL Finance». Все права защищены. Материалы сайта
          (тексты, логотипы, фирменный стиль, фотографии, графика, макеты
          интерфейсов) охраняются законодательством РК и международными
          соглашениями об охране авторских и смежных прав.
        </p>

        {/* ✅ Разрешённое */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 inline-flex items-center gap-2">
            <ShieldCheck className="h-5 w-5" />
            Разрешённое использование
          </h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Персональный просмотр материалов сайта и сохранение ссылок.</li>
            <li>
              Цитирование небольших фрагментов при указании активной ссылки на
              источник.
            </li>
          </ul>
        </section>

        {/* 🚫 Запрещённое */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 inline-flex items-center gap-2">
            <Ban className="h-5 w-5" />
            Запрещённое использование
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

        {/* ™️ Товарные знаки */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 inline-flex items-center gap-2">
            <BadgeCheck className="h-5 w-5" />
            Товарные знаки
          </h2>
          <p>
            Наименования и знаки ADAL Finance являются объектами
            интеллектуальной собственности и могут быть зарегистрированными
            товарными знаками. Любое использование допускается только с
            разрешения правообладателя.
          </p>
        </section>

        {/* ⚖️ Ответственность */}
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 inline-flex items-center gap-2">
            <Scale className="h-5 w-5" />
            Ответственность
          </h2>
          <p>
            Информация на сайте носит справочный характер и не является
            публичной офертой. Компания оставляет за собой право обновлять
            материалы без предварительного уведомления.
          </p>
        </section>

        {/* 📩 Контакты */}
        <section className="bg-gray-50 dark:bg-gray-800/40 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 inline-flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Контакты правообладателя
          </h2>
          <p>
            По вопросам использования материалов обращайтесь:
            <a
              href="mailto:info@adalfinance.kz"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              info@adalfinance.kz
            </a>
          </p>
        </section>

        {/* Кнопка назад */}
        <Link href="/" prefetch className="inline-block">
          <Button className="bg-black inline-flex items-center gap-2">
            <MoveLeft className="h-4 w-4" />
            Назад
          </Button>
        </Link>
      </div>
    </div>
  );
}
