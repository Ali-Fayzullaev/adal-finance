"use client";

import {useState} from "react";
import Image from "next/image";
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Button} from "@/components/ui/button";
import {Menu, Clock, MapPin, Palette as PaletteIcon} from "lucide-react";
import LocaleSwitcher from "./LocaleSwitcher";
import type { PaletteKey } from "@/app/theme";
import logo from "@/public/logo.png";

type Props = {
  t: (k: string, opts?: any) => string; // передадим useTranslations из страницы
  p: { border: string; card: string; accent?: string; fg?: string };
  theme: PaletteKey;
  setTheme: (k: PaletteKey) => void;
  palettes: Record<PaletteKey, { name: string; bg: string }>;
};

export default function MobileMenu({t, p, theme, setTheme, palettes}: Props) {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {/* гамбургер – видно только на мобилке */}
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="md:hidden h-9 w-9 rounded-full border"
          style={{borderColor: p.border}}
          aria-label={t("nav.menu", {default: "Меню"})}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[calc(100%-2rem)] sm:max-w-sm p-4"
        style={{background: p.card}}
      >
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Image src={logo} alt="logo" width={28} height={28} className="rounded-full" />
            <span className="text-sm font-semibold tracking-widest">ADAL FINANCE</span>
          </SheetTitle>
        </SheetHeader>

        {/* ссылки */}
        <nav className="mt-6 grid gap-1.5 text-sm">
          <a href="#services" onClick={close} className="rounded-lg px-3 py-2 hover:bg-black/5">
            {t("nav.services", {default: "Услуги"})}
          </a>
          <a href="#process" onClick={close} className="rounded-lg px-3 py-2 hover:bg_black/5 hover:bg-black/5">
            {t("nav.process", {default: "Как мы работаем"})}
          </a>
          <a href="#reviews" onClick={close} className="rounded-lg px-3 py-2 hover:bg-black/5">
            {t("nav.reviews", {default: "Отзывы"})}
          </a>
          <a href="#faq" onClick={close} className="rounded-lg px-3 py-2 hover:bg-black/5">
            {t("nav.faq", {default: "Частые вопросы"})}
          </a>
          <a href="#contacts" onClick={close} className="rounded-lg px-3 py-2 hover:bg-black/5">
            {t("nav.contacts", {default: "Контакты"})}
          </a>
        </nav>

        {/* переключатель языка */}
        <div className="mt-6 border-t pt-4">
          <LocaleSwitcher p={p} />
        </div>

        {/* переключение темы (палитры) */}
        <div className="mt-4">
          <div className="mb-2 inline-flex items-center gap-2 text-xs opacity-70">
            <PaletteIcon className="h-4 w-4" />
            <span>{t("nav.theme", {default: "Тема"})}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(palettes) as PaletteKey[]).map((key) => (
              <button
                key={key}
                onClick={() => setTheme(key)}
                className="h-7 w-7 rounded-full border"
                style={{
                  background: palettes[key].bg,
                  borderColor: p.border,
                  boxShadow: theme === key ? `0 0 0 2px ${p.accent}` : "none",
                }}
                aria-label={palettes[key].name}
                title={palettes[key].name}
              />
            ))}
          </div>
        </div>

        {/* шапка расписания/адрес при желании */}
        <div className="mt-6 border-t pt-4 text-xs opacity-70 flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>{t("offices.shymkent.hours", {default: "Пн–Сб 10:00–19:00"})}</span>
        </div>
      </SheetContent>
    </Sheet>
  );
}
