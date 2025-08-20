"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShieldCheck, ExternalLink, Printer, Check } from "lucide-react";

type Props = {
  theme: "light" | "dark";
  p: { border: string; accent: string };
  /** показывать модалку автоматически один раз (по умолчанию включено) */
  autoOnce?: boolean;
};

export default function CopyrightNotice({ theme, p, autoOnce = true }: Props) {
  const [open, setOpen] = useState(false);
  const [ack, setAck] = useState(false);

  // показать 1 раз за сессию
  useEffect(() => {
    if (!autoOnce) return;
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem("copyright_seen");
    if (!seen) setOpen(true);
  }, [autoOnce]);

  const onAccept = () => {
    setAck(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("copyright_seen", "1");
    }
    setOpen(false);
  };

  return (
    <>
      {/* Текстовый блок-кнопка внизу футера */}
      <div className="mt-8 text-center text-xs">
        <button
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 underline-offset-2 hover:underline"
          style={{ color: theme === "dark" ? "#ffffff" : "#51637A" }}
          aria-label="Открыть уведомление об авторских правах"
        >
          © {new Date().getFullYear()} ADAL Finance — Все права защищены
        </button>
      </div>

      {/* Модалка (краткая версия) */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="sm:max-w-lg rounded-2xl bb"
          style={{ borderColor: p.border, background: theme === "dark" ? "#242424" : "#fff" }}
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
              <ShieldCheck className="h-5 w-5" style={{ color: theme === "dark" ? "#ffffff" : "#51637A" }}/>
              <span style={{ color: theme === "dark" ? "#ffffff" : "#51637A" }}>Авторские права и использование материалов</span>
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm" style={{ color: theme === "dark" ? "#ffffff" : "#51637A" }}>
              Кратко: все материалы (логотип, тексты, дизайн и иллюстрации) защищены законом. Любое копирование
              или распространение возможно только с письменного разрешения ADAL Finance.
            </DialogDescription>
          </DialogHeader>

          <ul className="mt-3 space-y-2 text-xs sm:text-sm" style={{ color: theme === "dark" ? "#ffffff" : "#42526D" }}>
            <li>• Разрешено: просмотр сайта, сохранение ссылок, цитирование с указанием источника.</li>
            <li>• Запрещено: коммерческое использование, массовое копирование макетов/текстов/логотипа.</li>
            <li>• Товарные знаки и логотипы принадлежат ADAL Finance.</li>
          </ul>

          <DialogFooter className="mt-4 flex flex-col sm:flex-row sm:justify-between gap-2">
            <Link
              href="/legal/copyright"
              className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium"
              style={{ border: `1px solid ${p.border}` }}
            >
              <ExternalLink className="h-4 w-4" style={{ color: theme === "dark" ? "#ffffff" : "#51637A" }}/>
              <span style={{ color: theme === "dark" ? "#ffffff" : "#51637A" }}>Полная версия</span>
            </Link>

            <div className="flex gap-2">
              <Button
                type="button"
                // variant="ghost"
                onClick={() => window.print()}
                className="inline-flex items-center gap-2"
              >
                <Printer className="h-4 w-4" style={{ color: theme === "dark" ? "#ffffff" : "#ffffff" }}/>
               <span style={{ color: theme === "dark" ? "#ffffff" : "#ffffff" }}> Печать</span>
              </Button>
              <Button
                type="button"
                onClick={onAccept}
                className="inline-flex items-center gap-2 bg-green-500"
              >
                <Check className="h-4 w-4 text-white font-bold" />
               <span className=" text-white"> Принять</span>
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
