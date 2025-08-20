"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShieldCheck, ExternalLink, Printer, Check } from "lucide-react";

type Props = {
  theme: "light" | "dark";
  p: { border: string; accent: string };
  autoOnce?: boolean;
};

const SEEN_KEY = "copyright_seen_v1"; // 👈 один ключ на все локали

export default function CopyrightNotice({ theme, p, autoOnce = true }: Props) {
  const t = useTranslations("copyrightNotice");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!autoOnce) return;
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem(SEEN_KEY);
    if (!seen) setOpen(true);
  }, [autoOnce]); // 👈 locale не нужен

  const onAccept = () => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(SEEN_KEY, "1"); // 👈 пишем тот же ключ
    }
    setOpen(false);
  };

  const year = new Date().getFullYear();
  const fg = theme === "dark" ? "#ffffff" : "#51637A";

  return (
    <>
      <div className="mt-8 text-center text-xs">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 underline-offset-2 hover:underline"
          style={{ color: fg }}
          aria-label={t("footer.ariaOpen", { default: "Открыть уведомление об авторских правах" })}
        >
          {t("footer.button", {
            year,
            brand: "ADAL Finance",
            default: `© ${year} ADAL Finance — Все права защищены`,
          })}
        </button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="sm:max-w-lg rounded-2xl"
          style={{ borderColor: p.border, background: theme === "dark" ? "#242424" : "#fff" }}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
              <ShieldCheck className="h-5 w-5" style={{ color: fg }} />
              <span style={{ color: fg }}>
                {t("modal.title", { default: "Авторские права и использование материалов" })}
              </span>
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm" style={{ color: fg }}>
              {t("modal.description", {
                default:
                  "Кратко: все материалы (логотип, тексты, дизайн и иллюстрации) защищены законом. Любое копирование или распространение возможно только с письменного разрешения ADAL Finance.",
              })}
            </DialogDescription>
          </DialogHeader>

          <ul className="mt-3 space-y-2 text-xs sm:text-sm" style={{ color: theme === "dark" ? "#ffffff" : "#42526D" }}>
            <li>• {t("modal.points.allowed", { default: "Разрешено: просмотр сайта, сохранение ссылок, цитирование с указанием источника." })}</li>
            <li>• {t("modal.points.prohibited", { default: "Запрещено: коммерческое использование, массовое копирование макетов/текстов/логотипа." })}</li>
            <li>• {t("modal.points.trademarks", { default: "Товарные знаки и логотипы принадлежат ADAL Finance." })}</li>
          </ul>

          <DialogFooter className="mt-4 flex flex-col sm:flex-row sm:justify-between gap-2">
            <Link
              href="/legal/copyright"
              prefetch
              className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium"
              style={{ border: `1px solid ${p.border}` }}
            >
              <ExternalLink className="h-4 w-4" style={{ color: fg }} />
              <span style={{ color: fg }}>{t("actions.fullVersion", { default: "Полная версия" })}</span>
            </Link>

            <div className="flex gap-2">
              <Button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2">
                <Printer className="h-4 w-4" />
                <span>{t("actions.print", { default: "Печать" })}</span>
              </Button>
              <Button type="button" onClick={onAccept} className="inline-flex items-center gap-2 bg-green-500">
                <Check className="h-4 w-4 text-white font-bold" />
                <span className="text-white">{t("actions.accept", { default: "Принять" })}</span>
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
