"use client";

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
  Menu,
  ListChecks,
  CheckCircle2,
  Mail,
  Navigation,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

const LOGO_SRC = "/logo.png"; // замените на реальный путь
const NIGHT = "#1d1c1c"; 

// —— Цветовые пресеты ——
const palettes = {
  light: {
    name: "Arctic Light",
    bg: "#ffffff",
    fg: "#0E1B2B",
    card: "#F6F8FC",
    border: "#E7ECF3",
    accent: "#0B5FFF",
    soft: "linear-gradient(180deg, rgba(11,95,255,0.08), rgba(11,95,255,0))",
  },
  dark: {
    name: "Midnight",
    bg: "#242424",
    fg: "#ffffff",
    card: "rgba(255,255,255,0.06)",
    border: "rgba(255,255,255,0.12)",
    accent: "#ffffff",
    soft: "linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0))",
  },
  gold: {
    name: "Royal Gold",
    bg: "#FFFEFB",
    fg: "#18202B",
    card: "#F9F7F2",
    border: "#EDE9DD",
    accent: "#C9A227",
    soft: "linear-gradient(180deg, rgba(201,162,39,0.12), rgba(201,162,39,0))",
  },
} as const;

type PaletteKey = keyof typeof palettes;

// WhatsApp номера (замените Актау на реальный)
const WA_NUMBERS = {
  shymkent: "77089810031",
  aktau: "77773058803",
};

const makeWaLink = (phone: string, text: string) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

const badges = [
  { Icon: Timer, text: "Решение за 30 минут" },
  { Icon: Percent, text: "Минимальная ставка" },
  { Icon: FileCheck, text: "Минимум документов" },
];

const services = [
  {
    Icon: ShieldCheck,
    title: "Залоговый кредит",
    desc: "Сумма до 100 млн ₸. Прозрачные условия и сопровождение на каждом этапе.",
  },
  {
    Icon: Building2,
    title: "Кредит для ИП",
    desc: "Оформление до 25 млн ₸ для действующих ИП. Быстрое решение, минимум бумаг.",
  },
  {
    Icon: MessageSquare,
    title: "Консалтинг",
    desc: "Подбор банка с лучшими ставками и защитой от скрытых платежей.",
  },
];

const testimonials = [
  {
    text: "Получил одобрение быстрее, чем ожидал. Условия честные, команда всегда на связи.",
    author: "Ермек, Шымкент",
  },
  {
    text: "Помогли оформить займ под залог, всё объяснили простым языком.",
    author: "Жанна, Актау",
  },
  {
    text: "Помогли оформить займ под залог, всё объяснили простым языком. Помогли оформить займ под залог, всё объяснили простым языком. Помогли оформить займ под залог, всё объяснили простым языком.",
    author: "Жанна, Актау",
  },
  {
    text: "Помогли оформить займ под залог, всё объяснили простым языком.",
    author: "Жанна, Актау",
  },
];

const faqs = [
  {
    q: "Вы работаете онлайн?",
    a: "Рассмотрение и оформление — в офисе. Онлайн не рассматриваем.",
  },
  {
    q: "Какие суммы доступны?",
    a: "Без залога — до 25 млн ₸ (для ИП). Под залог — до 100 млн ₸.",
  },
  {
    q: "Сколько времени занимает?",
    a: "Первичное решение обычно в течение 30 минут при наличии необходимых данных.",
  },
  {
    q: "Где вы находитесь?",
    a: "Шымкент, Ерімбетова 59. По Актау — уточняйте в WhatsApp.",
  },
];

const steps = [
  {
    Icon: ListChecks,
    title: "Заявка",
    desc: "Пишете нам в WhatsApp: цель, сумма, срок.",
  },
  {
    Icon: FileCheck,
    title: "Документы",
    desc: "Присылаете базовый пакет, мы проверяем и подбираем банк.",
  },
  {
    Icon: Timer,
    title: "Решение",
    desc: "Предварительное одобрение обычно в день обращения.",
  },
  {
    Icon: CheckCircle2,
    title: "Оформление",
    desc: "Встреча в офисе и выдача средств.",
  },
];

export default function AdalFinanceLanding() {
  const [city, setCity] = useState<"shymkent" | "aktau">("shymkent");
  const [reviewIndex, setReviewIndex] = useState(0);
  const [theme, setTheme] = useState<PaletteKey>("gold");

  const p = useMemo(() => palettes[theme], [theme]);
  const accentText = theme === "dark" ? "#041E41" : "#ffffff";

  const ru =
    "Здравствуйте! Хочу получить бесплатную консультацию по ADAL Finance.";
  const waText = ru;
  const phone = city === "shymkent" ? WA_NUMBERS.shymkent : WA_NUMBERS.aktau;
  const waHref = makeWaLink(phone, waText);

  return (
    <div
      className="min-h-screen w-full"
      style={{ background: p.bg, color: p.fg }}
    >
      {/* Navbar */}
      <header
        className="sticky top-0 z-40 border-b backdrop-blur"
        style={{
          borderColor: p.border,
          background:
            theme === "dark" ? NIGHT : "rgba(255,255,255,0.7)",
        }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <img
                src={LOGO_SRC}
                alt="logo"
                className="h-8 w-8 rounded-full object-cover"
                style={{ boxShadow: `0 0 0 1px ${p.border}` }}
              />
              <span className="text-sm sm:text-base font-semibold tracking-widest">
                ADAL FINANCE
              </span>
            </div>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6 text-sm opacity-90">
              <a href="#services" className="hover:opacity-100">
                Услуги
              </a>
              <a href="#process" className="hover:opacity-100">
                Как мы работаем
              </a>
              <a href="#reviews" className="hover:opacity-100">
                Отзывы
              </a>
              <a href="#faq" className="hover:opacity-100">
                FAQ
              </a>
              <a href="#contacts" className="hover:opacity-100">
                Контакты
              </a>
              <div className="hidden lg:flex items-center gap-2">
                {(Object.keys(palettes) as PaletteKey[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => setTheme(key)}
                    className="h-6 w-6 rounded-full border"
                    style={{
                      background: palettes[key].bg,
                      borderColor: p.border,
                    }}
                    aria-label={palettes[key].name}
                  />
                ))}
              </div>
            </nav>

            {/* Mobile off-canvas */}
            <Sheet>
              <SheetTrigger className="md:hidden inline-flex">
                <Menu className="h-6 w-6" />
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80"
                style={{ background: p.bg, color: p.fg, borderColor: p.border }}
              >
                <SheetHeader>
                  <SheetTitle>Меню</SheetTitle>
                  <SheetDescription>Навигация по сайту</SheetDescription>
                </SheetHeader>
                <div className="mt-6 text-sm  px-2">
                  <nav className="flex flex-col gap-2">
                    {[
                      { href: "#services", label: "Услуги" },
                      { href: "#process", label: "Как мы работаем" },
                      { href: "#reviews", label: "Отзывы" },
                      { href: "#faq", label: "FAQ" },
                      { href: "#contacts", label: "Контакты" },
                    ].map((i) => (
                      <a
                        key={i.href}
                        href={i.href}
                        className="inline-flex items-center justify-between rounded-xl px-3 py-2 hover:opacity-90"
                        style={{
                          border: `1px solid ${p.border}`,
                          background:
                            theme === "dark"
                              ? "rgba(255,255,255,0.04)"
                              : p.card,
                        }}
                      >
                        <span>{i.label}</span>
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    ))}
                  </nav>

                  <div className="my-5 h-px" style={{ background: p.border }} />

                  <div className="space-y-2">
                    <div className="text-xs opacity-80">Цветовая схема</div>
                    <div className="flex items-center gap-3">
                      {(Object.keys(palettes) as PaletteKey[]).map((key) => (
                        <button
                          key={key}
                          onClick={() => setTheme(key)}
                          className="relative inline-flex items-center gap-2 rounded-full px-2 py-1"
                          style={{
                            border: `1px solid ${p.border}`,
                            boxShadow:
                              theme === key ? `0 0 0 2px ${p.accent}` : "none",
                          }}
                          aria-label={palettes[key].name}
                          title={palettes[key].name}
                        >
                          <span
                            className="h-5 w-5 rounded-full border"
                            style={{
                              background: palettes[key].bg,
                              borderColor: p.border,
                            }}
                          />
                          <span className="text-xs capitalize">
                            {palettes[key].name}
                          </span>
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
      <section className="py-12 sm:py-18 relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: p.soft }}
        />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl sm:text-5xl font-semibold leading-tight">
              Кредит до <span style={{ color: p.accent }}>100 млн ₸</span> под
              ваши цели
            </h1>
            <p
              className="mt-3 sm:mt-5 max-w-xl text-sm sm:text-base"
              style={{ color: theme === "dark" ? "#E8EEF9" : "#41536A" }}
            >
              Быстрое и понятное оформление. Минимальные ставки и минимум
              документов. Предварительное решение — в течение 30 минут.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {badges.map(({ Icon, text }, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs sm:text-sm shadow-sm"
                  style={{
                    border: `1px solid ${p.border}`,
                    background:
                      theme === "dark" ? "rgba(255,255,255,0.06)" : p.card,
                  }}
                >
                  <Icon className="h-4 w-4" /> {text}
                </span>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <a
                href="#cta"
                className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium shadow-md"
                style={{ background: p.accent, color: accentText }}
              >
                Получить консультацию <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          {/* CTA WhatsApp */}
          <motion.div
            id="cta"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="lg:justify-self-end w-full"
          >
            <Card
              className="rounded-2xl shadow-xl"
              style={{
                background:
                  theme === "dark" ? "rgba(255,255,255,0.08)" : p.card,
                borderColor: p.border,
              }}
            >
              <CardContent className="p-5 sm:p-6 space-y-4">
                <div
                  className="text-sm font-medium"
                  style={{
                    color: theme === "dark" ? "#E8EEF9" : "#51637A",
                  }}
                >
                  Бесплатная консультация
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={() => setCity("shymkent")}
                    className={`rounded-xl ${
                      city === "shymkent" ? "opacity-100" : "opacity-30"
                    }`}
                    style={{ background: p.accent, color: accentText }}
                  >
                    Шымкент
                  </Button>
                  <Button
                    onClick={() => setCity("aktau")}
                    className={`rounded-xl ${
                      city === "aktau" ? "opacity-100" : "opacity-30"
                    }`}
                    variant="outline"
                    style={{ background: p.accent, color: accentText }}
                  >
                    Актау
                  </Button>
                </div>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-2xl text-center py-3 font-medium hover:opacity-90"
                  style={{ border: `1px solid ${p.border}`, color: p.fg }}
                >
                  Написать в WhatsApp
                </a>
                <p
                  className="text-xs"
                  style={{ color: theme === "dark" ? "#E8EEF9" : "#51637A" }}
                >
                  Выберите город и напишите нам — ответим и подскажем
                  оптимальное решение.
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
              <Card
                key={i}
                className="rounded-2xl shadow-sm"
                style={{
                  background:
                    theme === "dark" ? "rgba(255,255,255,0.06)" : p.card,
                  borderColor: p.border,
                }}
              >
                <CardContent className="p-5">
                  <Icon
                    className="h-6 w-6"
                    style={{ color: theme === "dark" ? "#E8EEF9" : "#42526D" }}
                  />
                  <h3
                    className="mt-3 text-lg font-medium"
                    style={{ color: theme === "dark" ? "#E8EEF9" : "#42526D" }}
                  >
                    {title}
                  </h3>
                  <p
                    className="mt-2 text-sm"
                    style={{ color: theme === "dark" ? "#E8EEF9" : "#42526D" }}
                  >
                    {desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold">Как мы работаем</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ Icon, title, desc }, i) => (
              <Card
                key={i}
                className="rounded-2xl shadow-sm"
                style={{
                  background:
                    theme === "dark" ? "rgba(255,255,255,0.06)" : p.card,
                  borderColor: p.border,
                }}
              >
                <CardContent className="p-5">
                  <Icon
                    className="h-6 w-6"
                    style={{ color: theme === "dark" ? "#E8EEF9" : "#42526D" }}
                  />
                  <div
                    className="mt-3 text-sm uppercase tracking-wide opacity-70"
                    style={{ color: theme === "dark" ? "#E8EEF9" : "#42526D" }}
                  >
                    Шаг {i + 1}
                  </div>
                  <h3
                    className="text-lg font-medium"
                    style={{ color: theme === "dark" ? "#E8EEF9" : "#42526D" }}
                  >
                    {title}
                  </h3>
                  <p
                    className="mt-1 text-sm"
                    style={{ color: theme === "dark" ? "#E8EEF9" : "#42526D" }}
                  >
                    {desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Offices / Наши офисы */}
      <section id="offices" className="py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold">Наши офисы</h2>
            <a
              href="#contacts"
              className="text-xs hover:opacity-80"
              style={{ color: p.accent }}
            >
              Контакты
            </a>
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {/* Карта Шымкент */}
            <Card
              className="rounded-2xl shadow-sm overflow-hidden"
              style={{
                background:
                  theme === "dark" ? "rgba(255,255,255,0.06)" : p.card,
                borderColor: p.border,
              }}
            >
              <CardContent className="p-0">
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div
                      className="text-lg font-medium"
                      style={{
                        color: theme === "dark" ? "#E8EEF9" : "#42526D",
                      }}
                    >
                      Шымкент
                    </div>
                    <span className="inline-flex items-center gap-2 text-xs opacity-80">
                      <Clock
                        className="h-4 w-4"
                        style={{
                          color: theme === "dark" ? "#E8EEF9" : "#42526D",
                        }}
                      />{" "}
                      <span
                        style={{
                          color: theme === "dark" ? "#E8EEF9" : "#42526D",
                        }}
                      >
                        {" "}
                        Пн–Сб 10:00–19:00
                      </span>
                    </span>
                  </div>
                  <div
                    className="mt-2 inline-flex items-start gap-2 text-sm"
                    style={{ color: theme === "dark" ? "#E8EEF9" : "#42526D" }}
                  >
                    <MapPin className="mt-0.5 h-4 w-4" />
                    Улица Еримбетова, 59/7, 11 кабинет; 1 этаж
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      href="https://2gis.kz/shymkent/inside/70030076950815085/firm/70000001103431806?m=69.633628%2C42.342989%2F18"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:opacity-90"
                      style={{
                        border: `1px solid ${p.border}`,
                        background:
                          theme === "dark" ? "rgba(255,255,255,0.04)" : "#fff",
                      }}
                    >
                      <Navigation
                        className="h-4 w-4"
                        style={{
                          color: theme === "dark" ? "#E8EEF9" : "#42526D",
                        }}
                      />{" "}
                      <span
                        style={{
                          color: theme === "dark" ? "#E8EEF9" : "#42526D",
                        }}
                      >
                        Открыть в 2ГИС
                      </span>
                    </a>
                    <a
                      href={makeWaLink(WA_NUMBERS.shymkent, waText)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm shadow-sm hover:opacity-90"
                      style={{ background: "#25D366", color: "#fff" }}
                    >
                      <Phone className="h-4 w-4" /> WhatsApp
                    </a>
                  </div>
                </div>
                {/* Карта (Шымкент) */}
                <div
                  className="h-56 w-full border-t"
                  style={{ borderColor: p.border }}
                >
                  <iframe
                    title="Карта Актау — ADAL Finance"
                    src={`https://www.google.com/maps?hl=ru&ll=42.342989,69.633628&hl=ru&z=16&output=embed`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full border-0"
                    style={{
                      filter:
                        theme === "dark"
                          ? "invert(0.9) hue-rotate(180deg) contrast(0.9)"
                          : "none",
                    }}
                    allowFullScreen
                  />
                </div>
              </CardContent>
            </Card>

            {/* Карта Актау */}
            <Card
              className="rounded-2xl shadow-sm overflow-hidden"
              style={{
                background:
                  theme === "dark" ? "rgba(255,255,255,0.06)" : p.card,
                borderColor: p.border,
              }}
            >
              <CardContent className="p-0">
                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <div
                      className="text-lg font-medium"
                      style={{
                        color: theme === "dark" ? "#E8EEF9" : "#42526D",
                      }}
                    >
                      Актау
                    </div>
                    <span className="inline-flex items-center gap-2 text-xs opacity-80">
                      <Clock
                        className="h-4 w-4"
                        style={{
                          color: theme === "dark" ? "#E8EEF9" : "#42526D",
                        }}
                      />{" "}
                      <span
                        style={{
                          color: theme === "dark" ? "#E8EEF9" : "#42526D",
                        }}
                      >
                        {" "}
                        Пн–Сб 10:00–19:00
                      </span>
                    </span>
                  </div>
                  <div
                    className="mt-2 inline-flex items-start gap-2 text-sm"
                    style={{ color: theme === "dark" ? "#E8EEF9" : "#42526D" }}
                  >
                    <MapPin
                      className="mt-0.5 h-4 w-4"
                      style={{
                        color: theme === "dark" ? "#E8EEF9" : "#42526D",
                      }}
                    />
                    14-й микрорайон, БЦ «Каспий», офис 203
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      href="https://www.google.com/maps?q=43.6481,51.1722"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:opacity-90"
                      style={{
                        border: `1px solid ${p.border}`,
                        background:
                          theme === "dark" ? "rgba(255,255,255,0.04)" : "#fff",
                      }}
                    >
                      <Navigation
                        className="h-4 w-4"
                        style={{
                          color: theme === "dark" ? "#E8EEF9" : "#42526D",
                        }}
                      />{" "}
                      <span
                        style={{
                          color: theme === "dark" ? "#E8EEF9" : "#42526D",
                        }}
                      >
                        Открыть в 2ГИС
                      </span>
                    </a>
                    <a
                      href={makeWaLink(WA_NUMBERS.aktau, waText)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm shadow-sm hover:opacity-90"
                      style={{ background: "#25D366", color: "#fff" }}
                    >
                      <Phone className="h-4 w-4" /> WhatsApp
                    </a>
                  </div>
                </div>
                {/* Карта (Актау) */}
                <div
                  className="h-56 w-full border-t"
                  style={{ borderColor: p.border }}
                >
                  <iframe
                    title="Карта Актау — ADAL Finance"
                    src={`https://www.google.com/maps?hl=ru&ll=43.6481,51.1722&z=16&output=embed`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full border-0"
                    style={{
                      filter:
                        theme === "dark"
                          ? "invert(0.9) hue-rotate(180deg) contrast(0.9)"
                          : "none",
                    }}
                    allowFullScreen
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold">Отзывы клиентов</h2>

          {/* Карусель */}
          <div className="mt-6 relative">
            {/* Лента */}
            <div
              className="overflow-hidden rounded-2xl"
              style={{
                border: `1px solid ${p.border}`,
                background:
                  theme === "dark" ? "rgba(255,255,255,0.04)" : p.card,
              }}
            >
              <div
                data-track
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${reviewIndex * 100}%)` }}
              >
                {/* Слайды: 1 на экран (проще добавлять новые) */}
                {testimonials.map((t, i) => (
                  <div key={i} className="min-w-full p-5">
                    <Card
                      className="rounded-2xl shadow-sm h-full"
                      style={{
                        background:
                          theme === "dark" ? "rgba(255,255,255,0.06)" : "#fff",
                        borderColor: p.border,
                      }}
                    >
                      <CardContent className="p-5">
                        <Quote
                          className="h-6 w-6 mb-3"
                          style={{
                            color: theme === "dark" ? "#E8EEF9" : "#51637A",
                          }}
                        />
                        <p
                          className="text-base"
                          style={{
                            color: theme === "dark" ? "#E8EEF9" : "#2A3A4E",
                          }}
                        >
                          {t.text}
                        </p>
                        <div
                          className="mt-3 text-sm"
                          style={{
                            color: theme === "dark" ? "#E8EEF9" : "#51637A",
                          }}
                        >
                          — {t.author}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>

            {/* Управление */}
            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={() =>
                  setReviewIndex(
                    (reviewIndex - 1 + testimonials.length) %
                      testimonials.length
                  )
                }
                className="rounded-xl px-3 py-2 text-sm hover:opacity-90"
                style={{ border: `1px solid ${p.border}` }}
              >
                Предыдущий
              </button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setReviewIndex(i)}
                    aria-label={`Слайд ${i + 1}`}
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      background: i === reviewIndex ? p.accent : p.border,
                    }}
                  />
                ))}
              </div>
              <button
                onClick={() =>
                  setReviewIndex((reviewIndex + 1) % testimonials.length)
                }
                className="rounded-xl px-3 py-2 text-sm hover:opacity-90"
                style={{ border: `1px solid ${p.border}` }}
              >
                Следующий
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold">Частые вопросы</h2>
          <div
            className="mt-6 rounded-2xl p-2 sm:p-4 shadow-sm"
            style={{
              background: theme === "dark" ? "rgba(255,255,255,0.06)" : p.card,
              border: `1px solid ${p.border}`,
            }}
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left text-sm sm:text-base">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent
                    className="text-sm"
                    style={{ color: theme === "dark" ? "#E8EEF9" : "#42526D" }}
                  >
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer / Contacts */}
      <footer
        id="contacts"
        className="py-12"
        style={{
          borderTop: `1px solid ${p.border}`,
          background: theme === "dark" ? NIGHT : "#F9FAFB",
        }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-3 text-sm">
          {/* Лого + реквизиты */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <img
                src={LOGO_SRC}
                alt="logo"
                className="h-10 w-10 rounded-full object-cover"
                style={{ boxShadow: `0 0 0 1px ${p.border}` }}
              />
              <div>
                <div className="font-semibold text-lg">ADAL Finance</div>
                <div
                  style={{ color: theme === "dark" ? "#E8EEF9" : "#51637A" }}
                >
                  БИН:{" "}
                  <span className="inline-flex items-center  gap-2 hover:text-amber-500 font-bold">
                    200140024408
                  </span>
                </div>
              </div>
            </div>
            <p
              className="text-xs"
              style={{ color: theme === "dark" ? "#B8C7E0" : "#6B7A90" }}
            >
              Мы помогаем оформить финансирование до 100 млн ₸ быстро, удобно и
              на выгодных условиях.
            </p>
          </div>

          {/* Контакты */}
          <div className="flex flex-col gap-2">
            <h3 className="font-medium text-base mb-2">Контакты</h3>
            <div className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Ерімбетова 59, Шымкент
            </div>
            <a
              href="tel:+77071058031"
              className="inline-flex items-center gap-2 hover:text-blue-500"
            >
              <Phone className="h-4 w-4" /> +7 708 981 0031
            </a>
            <a
              href="https://www.instagram.com/adal_finance"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-pink-500"
            >
              <Instagram className="h-4 w-4" /> @adal_finance
            </a>
            <a
              href="mailto:info@adalfinance.kz"
              className="inline-flex items-center gap-2 hover:text-green-500"
            >
              <Mail className="h-4 w-4" /> info@adalfinance.kz
            </a>
          </div>

          {/* WhatsApp */}
          <div className="flex flex-col gap-3">
            <h3 className="font-medium text-base mb-2">
              Бесплатная консультация
            </h3>
            <p
              className="text-xs"
              style={{ color: theme === "dark" ? "#B8C7E0" : "#6B7A90" }}
            >
              Выберите ваш город и напишите нам:
            </p>
            <a
              href="https://wa.me/77089810031"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium shadow-sm"
              style={{ background: "#25D366", color: "white" }}
            >
              <Phone className="h-4 w-4" /> WhatsApp Шымкент
            </a>
            <a
              href="https://wa.me/77773058803"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium shadow-sm"
              style={{ background: "#25D366", color: "white" }}
            >
              <Phone className="h-4 w-4" /> WhatsApp Актау
            </a>
          </div>
        </div>

        {/* копирайт */}
        <div
          className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-8 text-xs text-center"
          style={{ color: theme === "dark" ? "#E8EEF9" : "#51637A" }}
        >
          © {new Date().getFullYear()} ADAL Finance. Все права защищены.
        </div>
      </footer>
    </div>
  );
}
