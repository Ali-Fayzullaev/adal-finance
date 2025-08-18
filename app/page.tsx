"use client";

// ADAL Finance — Landing v5 (off‑canvas + новая палитра)
// Новое:
// • Off‑canvas меню для маленьких экранов (shadcn/ui Sheet + lucide-react Menu/Phone/MapPin/Instagram).
// • Полная смена цветовой схемы: добавлены пресеты и переключатель (по умолчанию — светлая «Arctic Light»).
// • Чистый белый фон, читаемая сине‑графитовая типографика, улучшенные карточки.
// • Все прежние секции сохранены: Услуги, О нас, Отзывы, FAQ, Контакты, WhatsApp CTA.

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Instagram,
  MessageSquare,
  Building2,
  ShieldCheck,
  Timer,
  Percent,
  FileCheck,
  MapPin,
  Phone,
  ArrowRight,
  Quote,
  Menu
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

const LOGO_SRC = "/logo.png"; // замените на реальный путь

// —— Цветовые пресеты (легко менять) ——
const palettes = {
  // Светлая: белый фон, глубокий синий текст/акцент
  light: {
    name: "Arctic Light",
    bg: "#ffffff",
    fg: "#041E41",
    card: "#F5F8FF",
    border: "#E6ECF5",
    accent: "#0B5FFF", // насыщённый синий акцент
  },
  // Тёмная (предыдущая)
  dark: {
    name: "Midnight",
    bg: "#041E41",
    fg: "#ffffff",
    card: "rgba(255,255,255,0.06)",
    border: "rgba(255,255,255,0.12)",
    accent: "#ffffff",
  },
  // Премиум: светлый фон + золотой акцент
  gold: {
    name: "Royal Gold",
    bg: "#FFFEFB",
    fg: "#18202B",
    card: "#F9F7F2",
    border: "#EDE9DD",
    accent: "#C9A227",
  },
} as const;

type PaletteKey = keyof typeof palettes;

// WhatsApp номера (замените Актау на реальный)
const WA_NUMBERS = {
  shymkent: "77071058031",
  aktau: "7700YYYYYYY",
};

const makeWaLink = (phone: string, text: string) => `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

const badges = [
  { Icon: Timer, text: "Решение за 30 минут" },
  { Icon: Percent, text: "Минимальная ставка" },
  { Icon: FileCheck, text: "Минимум документов" },
];

const services = [
  { Icon: ShieldCheck, title: "Залоговый кредит", desc: "Сумма до 100 млн ₸. Прозрачные условия и сопровождение на каждом этапе." },
  { Icon: Building2, title: "Кредит для ИП", desc: "Тек ИП арқылы 25 млн ₸ дейін. Шешім тез, құжаттар аз." },
  { Icon: MessageSquare, title: "Консалтинг", desc: "Подбор банков с лучшими условиями. Защита от скрытых платежей." },
];

const testimonials = [
  { text: "Получил одобрение быстрее, чем ожидал. Условия честные, команда всегда на связи.", author: "Ермек, Шымкент" },
  { text: "Помогли оформить займ под залог, всё объяснили простым языком.", author: "Жанна, Актау" },
];

const faqs = [
  { q: "Вы работаете онлайн?", a: "Рассмотрение и оформление — в офисе. Онлайн не рассматриваем." },
  { q: "Какие суммы доступны?", a: "Без залога — до 25 млн ₸ (для ИП). Под залог — до 100 млн ₸." },
  { q: "Сколько времени занимает?", a: "Первичное решение обычно в течение 30 минут при наличии необходимых данных." },
  { q: "Где вы находитесь?", a: "Шымкент, Ерімбетова 59. По Актау — напишите нам в WhatsApp для уточнения." },
];

export default function AdalFinanceLanding() {
  const [city, setCity] = useState<"shymkent" | "aktau">("shymkent");
  const [theme, setTheme] = useState<PaletteKey>("light"); // по умолчанию — полностью новая светлая схема

  const p = useMemo(() => palettes[theme], [theme]);
  // Исправление контраста для кнопок с белым фоном в тёмной теме
  const accentText = theme === "dark" ? "#041E41" : "#ffffff";

  const kz = "Сәлеметсіз бе! ADAL Finance бойынша тегін кеңес алғым келеді.";
  const ru = "Здравствуйте! Хочу получить бесплатную консультацию по ADAL Finance.";
  const waText = `${ru} / ${kz}`;
  const phone = city === "shymkent" ? WA_NUMBERS.shymkent : WA_NUMBERS.aktau;
  const waHref = makeWaLink(phone, waText);

  return (
    <div className="min-h-screen w-full" style={{ background: p.bg, color: p.fg }}>
      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b" style={{ borderColor: p.border, background: theme === "dark" ? "rgba(4,30,65,0.7)" : "rgba(255,255,255,0.7)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <img src={LOGO_SRC} alt="logo" className="h-8 w-8 rounded-full object-cover" style={{ boxShadow: `0 0 0 1px ${p.border}` }} />
              <span className="text-sm sm:text-base font-semibold tracking-widest">ADAL FINANCE</span>
            </div>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6 text-sm opacity-90">
              <a href="#services" className="hover:opacity-100">Услуги</a>
              <a href="#about" className="hover:opacity-100">О нас</a>
              <a href="#reviews" className="hover:opacity-100">Отзывы</a>
              <a href="#faq" className="hover:opacity-100">FAQ</a>
              <a href="#contacts" className="hover:opacity-100">Контакты</a>
              <a href="https://www.instagram.com/adal_finance" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:opacity-100"><Instagram className="h-4 w-4"/>Instagram</a>
              <div className="hidden lg:flex items-center gap-2">
                {/** Переключатель палитры */}
                {(Object.keys(palettes) as PaletteKey[]).map(key => (
                  <button key={key} onClick={() => setTheme(key)} className="h-6 w-6 rounded-full border" style={{ background: palettes[key].bg, borderColor: p.border }} aria-label={palettes[key].name} />
                ))}
              </div>
            </nav>

            {/* Mobile off-canvas */}
            <Sheet>
              <SheetTrigger className="md:hidden inline-flex"><Menu className="h-6 w-6"/></SheetTrigger>
              <SheetContent side="right" className="w-80" style={{ background: p.bg, color: p.fg, borderColor: p.border }}>
                <SheetHeader>
                  <SheetTitle>Меню</SheetTitle>
                  <SheetDescription>Навигация по сайту</SheetDescription>
                </SheetHeader>
                <div className="mt-6 text-sm">
                  {/* Навигация — крупные кликабельные элементы */}
                  <nav className="flex flex-col gap-2">
                    {[
                      { href: '#services', label: 'Услуги' },
                      { href: '#about', label: 'О нас' },
                      { href: '#reviews', label: 'Отзывы' },
                      { href: '#faq', label: 'FAQ' },
                      { href: '#contacts', label: 'Контакты' },
                    ].map((i) => (
                      <a key={i.href} href={i.href}
                         className="inline-flex items-center justify-between rounded-xl px-3 py-2 hover:opacity-90"
                         style={{ border: `1px solid ${p.border}`, background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : p.card }}>
                        <span>{i.label}</span>
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    ))}

                    <a href="https://www.instagram.com/adal_finance" target="_blank" rel="noopener noreferrer"
                       className="inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 hover:opacity-90"
                       style={{ border: `1px solid ${p.border}`, background: theme === 'dark' ? 'rgba(255,255,255,0.06)' : p.card }}>
                      <Instagram className="h-4 w-4"/> Instagram
                    </a>
                  </nav>

                  {/* Разделитель */}
                  <div className="my-5 h-px" style={{ background: p.border }} />

                  {/* Палитры — подписи + выделение выбранной */}
                  <div className="space-y-2">
                    <div className="text-xs opacity-80">Цветовая схема</div>
                    <div className="flex items-center gap-3">
                      {(Object.keys(palettes) as PaletteKey[]).map((key) => (
                        <button
                          key={key}
                          onClick={() => setTheme(key)}
                          className="relative inline-flex items-center gap-2 rounded-full px-2 py-1"
                          style={{ border: `1px solid ${p.border}`, boxShadow: theme === key ? `0 0 0 2px ${p.accent}` : 'none' }}
                          aria-label={palettes[key].name}
                          title={palettes[key].name}
                        >
                          <span className="h-5 w-5 rounded-full border" style={{ background: palettes[key].bg, borderColor: p.border }} />
                          <span className="text-xs capitalize">{palettes[key].name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-12 sm:py-18">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-2 items-center">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl sm:text-5xl font-semibold leading-tight" style={{ color: p.fg }}>
              Кредит до <span style={{ color: p.accent }}>100 млн ₸</span> под ваши цели
            </h1>
            <p className="mt-3 sm:mt-5 max-w-xl text-sm sm:text-base" style={{ color: theme === "dark" ? "#E8EEF9" : "#42526D" }}>
              Тез және тиімді рәсімдеу. Минимальные ставки, минимум документов. Решение — за 30 минут.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {badges.map(({ Icon, text }, i) => (
                <span key={i} className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs sm:text-sm" style={{ border: `1px solid ${p.border}`, background: theme === "dark" ? "rgba(255,255,255,0.06)" : p.card }}>
                  <Icon className="h-4 w-4" /> {text}
                </span>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <a href="#cta" className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium" style={{ background: p.accent, color: accentText }}>
                Получить консультацию <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          {/* CTA WhatsApp */}
          <motion.div id="cta" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }} className="lg:justify-self-end w-full">
            <Card className="rounded-2xl" style={{ background: theme === "dark" ? "rgba(255,255,255,0.08)" : p.card, borderColor: p.border }}>
              <CardContent className="p-5 sm:p-6 space-y-4">
                <div className="text-sm font-medium">Тегін кеңес / Бесплатная консультация</div>
                <div className="grid grid-cols-2 gap-2">
                  <Button onClick={() => setCity("shymkent")} className={`rounded-xl ${city === "shymkent" ? "opacity-100" : "opacity-80"}`} style={{ background: p.accent, color: accentText }}>Шымкент</Button>
                  <Button onClick={() => setCity("aktau")} className={`rounded-xl ${city === "aktau" ? "opacity-100" : "opacity-80"}`} variant="outline" style={{ borderColor: p.border, color: p.fg }}>Актау</Button>
                </div>
                <a href={waHref} target="_blank" rel="noopener noreferrer" className="block rounded-2xl text-center py-3 font-medium hover:opacity-90" style={{ border: `1px solid ${p.border}`, color: p.fg }}>
                  Написать в WhatsApp
                </a>
                <p className="text-xs" style={{ color: theme === "dark" ? "#E8EEF9" : "#51637A" }}>
                  Для бесплатной консультации, выберите город и напишите на WhatsApp. / Тегін кеңес алу үшін, қалаңызды таңдап WhatsApp жазыңыз.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold">Что мы делаем</h2>
          <div className="mt-6 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ Icon, title, desc }, i) => (
              <Card key={i} className="rounded-2xl" style={{ background: theme === "dark" ? "rgba(255,255,255,0.06)" : p.card, borderColor: p.border }}>
                <CardContent className="p-5">
                  <Icon className="h-6 w-6" />
                  <h3 className="mt-3 text-lg font-medium">{title}</h3>
                  <p className="mt-2 text-sm" style={{ color: theme === "dark" ? "#E8EEF9" : "#42526D" }}>{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid gap-6 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">Почему именно мы</h2>
            <ul className="mt-4 space-y-2 text-sm" style={{ color: theme === "dark" ? "#E8EEF9" : "#42526D" }}>
              <li className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4"/>Подбираем банки с лучшими условиями</li>
              <li className="flex items-start gap-2"><FileCheck className="mt-0.5 h-4 w-4"/>Сопровождаем на всех этапах</li>
              <li className="flex items-start gap-2"><Percent className="mt-0.5 h-4 w-4"/>Защищаем от скрытых платежей</li>
              <li className="flex items-start gap-2"><Timer className="mt-0.5 h-4 w-4"/>Повышаем шанс одобрения</li>
            </ul>
          </div>
          <div className="rounded-2xl p-5 text-sm" style={{ background: theme == "dark" ? "rgba(255,255,255,0.06)" : p.card, border: `1px solid ${p.border}`, color: theme === "dark" ? "#E8EEF9" : "#42526D" }}>
            Adal Finance – сіздің сенімді серіктесіңіз. Біз несие рәсімдеуді жеңіл және түсінікті етеміз: уақытыңызды үнемдейміз, құжаттарды азайтамыз, шарттарды ашық көрсетеміз.
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold">Отзывы клиентов</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {testimonials.map((t, i) => (
              <Card key={i} className="rounded-2xl" style={{ background: theme === "dark" ? "rgba(255,255,255,0.06)" : p.card, borderColor: p.border }}>
                <CardContent className="p-5">
                  <Quote className="h-6 w-6 mb-3" />
                  <p className="text-sm" style={{ color: theme === "dark" ? "#E8EEF9" : "#42526D" }}>{t.text}</p>
                  <div className="mt-3 text-xs" style={{ color: theme === "dark" ? "#E8EEF9" : "#51637A" }}>— {t.author}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold">Частые вопросы</h2>
          <div className="mt-6 rounded-2xl p-2 sm:p-4" style={{ background: theme === "dark" ? "rgba(255,255,255,0.06)" : p.card, border: `1px solid ${p.border}` }}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-sm sm:text-base">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-sm" style={{ color: theme === "dark" ? "#E8EEF9" : "#42526D" }}>{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer / Contacts */}
      <footer id="contacts" className="py-10" style={{ borderTop: `1px solid ${p.border}` }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid gap-6 md:grid-cols-2 items-center text-sm">
          <div className="flex items-center gap-3">
            <img src={LOGO_SRC} alt="logo" className="h-8 w-8 rounded-full object-cover" style={{ boxShadow: `0 0 0 1px ${p.border}` }} />
            <div>
              <div className="font-medium">ADAL Finance</div>
              <div style={{ color: theme === "dark" ? "#E8EEF9" : "#51637A" }}>БИН: <span className="font-semibold" style={{ color: p.accent }}>200140024408</span></div>
            </div>
          </div>
          <div className="flex flex-col items-start md:items-end gap-1">
            <div className="inline-flex items-center gap-2"><MapPin className="h-4 w-4"/> Ерімбетова 59, Шымкент</div>
            <a href="tel:+77071058031" className="inline-flex items-center gap-2"><Phone className="h-4 w-4"/> +7 707 105 80 31</a>
            <a href="https://www.instagram.com/adal_finance" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2"><Instagram className="h-4 w-4"/> @adal_finance</a>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-6 text-xs" style={{ color: theme === "dark" ? "#E8EEF9" : "#51637A" }}>© {new Date().getFullYear()} ADAL Finance. Все права защищены.</div>
      </footer>
    </div>
  );
}
