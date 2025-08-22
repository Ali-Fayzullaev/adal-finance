"use client";

import { useMemo, useState } from "react";
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
  Quote,
  ListChecks,
  CheckCircle2,
  Mail,
  Navigation,
  Clock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslations, useLocale } from "next-intl"; // ✅ КЛИЕНТСКИЙ хук
import Image from "next/image";
import CopyrightNotice from "@/app/[locale]/components/CopyrightNotice";
import Hero from "@/app/[locale]/components/Hero";
import { palettes, type PaletteKey } from "../theme";
import logo from "@/public/logo.png";
import LocaleSwitcher from "@/app/[locale]/components/LocaleSwitcher";
import MobileMenu from "./components/MobileMenu";
const NIGHT = "#1d1c1c";

const WA_NUMBERS = {
  shymkent: "77089810031",
  aktau: "77773058803",
};

const makeWaLink = (phone: string, text: string) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

export default function AdalFinanceLanding() {
  const t = useTranslations(); // или useTranslations('landing') если у вас namespace

  // ===== общий state темы и города =====
  const [city, setCity] = useState<"shymkent" | "aktau">("shymkent");
  const [reviewIndex, setReviewIndex] = useState(0);
  const [theme, setTheme] = useState<PaletteKey>("gold");

  // ✅ локализуем шаблон WhatsApp
  const waText = t("waText", {
    default:
      "Здравствуйте! Хочу получить бесплатную консультацию по ADAL Finance.",
  });
  const locale = useLocale();
  const mapLang = locale === "kk" ? "kk" : "ru";
  const phone = city === "shymkent" ? WA_NUMBERS.shymkent : WA_NUMBERS.aktau;
  const waHref = makeWaLink(phone, waText);

  const p = useMemo(() => palettes[theme], [theme]);

  // === ЛОКАЛИЗОВАННЫЕ МАССИВЫ — внутри компонента, после t() ===
  const badges = useMemo(
    () => [
      { Icon: Timer, text: t("badges.0.text") },
      { Icon: Percent, text: t("badges.1.text") },
      { Icon: FileCheck, text: t("badges.2.text") },
    ],
    [t]
  );

  const services = useMemo(
    () => [
      {
        Icon: ShieldCheck,
        title: t("services.0.title"),
        desc: t("services.0.desc"),
      },
      {
        Icon: Building2,
        title: t("services.1.title"),
        desc: t("services.1.desc"),
      },
      {
        Icon: MessageSquare,
        title: t("services.2.title"),
        desc: t("services.2.desc"),
      },
    ],
    [t]
  );

  const testimonials = useMemo(
    () => [
      { text: t("testimonials.0.text"), author: t("testimonials.0.author") },
      { text: t("testimonials.1.text"), author: t("testimonials.1.author") },
    ],
    [t]
  );

  const faqs = useMemo(
    () => [
      { q: t("faqs.0.q"), a: t("faqs.0.a") },
      { q: t("faqs.1.q"), a: t("faqs.1.a") },
      { q: t("faqs.2.q"), a: t("faqs.2.a") },
      { q: t("faqs.3.q"), a: t("faqs.3.a") },
    ],
    [t]
  );

  const steps = useMemo(
    () => [
      { Icon: ListChecks, title: t("steps.0.title"), desc: t("steps.0.desc"),  step: t("steps.0.step") }, 
      { Icon: FileCheck, title: t("steps.1.title"), desc: t("steps.1.desc"), step: t("steps.1.step")},  
      { Icon: Timer, title: t("steps.2.title"), desc: t("steps.2.desc"), step: t("steps.2.step") }, 
      {
        Icon: CheckCircle2,
        title: t("steps.3.title"),
        desc: t("steps.3.desc"),
        step: t("steps.3.step")
      },
    ],
    [t]
  );

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
          background: theme === "dark" ? NIGHT : "rgba(255,255,255,0.7)",
        }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            {/* слева — логотип */}
            <div className="flex items-center gap-3">
              <Image
                src={logo}
                alt="logo"
                width={50}
                height={50}
                className="h-8 w-8 rounded-full object-cover"
                style={{ boxShadow: `0 0 0 1px ${p.border}` }}
              />
              <span className="text-sm sm:text-base font-semibold tracking-widest">
                ADAL FINANCE
              </span>
            </div>

            {/* справа: на мобилке — язык + гамбургер; на десктопе — язык + навигация + палитры */}
            <div className="flex items-center gap-2">
              {/* язык виден на всех экранах */}
              <LocaleSwitcher p={p} />

              {/* десктопная навигация */}
              <nav className="hidden md:flex items-center gap-6 text-sm opacity-90">
                <a href="#services" className="hover:opacity-100">
                  {t("nav.services", { default: "Услуги" })}
                </a>
                <a href="#process" className="hover:opacity-100">
                  {t("nav.process", { default: "Как мы работаем" })}
                </a>
                <a href="#reviews" className="hover:opacity-100">
                  {t("nav.reviews", { default: "Отзывы" })}
                </a>
                <a href="#faq" className="hover:opacity-100">
                  FAQ
                </a>
                <a href="#contacts" className="hover:opacity-100">
                  {t("nav.contacts", { default: "Контакты" })}
                </a>

                {/* палитры только на lg+ */}
                <div className="hidden lg:flex items-center gap-2">
                  {(Object.keys(palettes) as PaletteKey[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => setTheme(key)}
                      className="h-6 w-6 rounded-full border"
                      style={{
                        background: palettes[key].bg,
                        borderColor: p.border,
                        boxShadow:
                          theme === key ? `0 0 0 2px ${p.accent}` : "none",
                      }}
                      aria-label={palettes[key].name}
                      title={palettes[key].name}
                    />
                  ))}
                </div>
              </nav>

              {/* мобильное меню (гамбургер) */}
              <div className="md:hidden">
                <MobileMenu
                  t={t}
                  p={p}
                  theme={theme}
                  setTheme={setTheme}
                  palettes={palettes as any}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <Hero
        theme={theme}
        p={p}
        city={city}
        setCity={setCity}
        waHref={waHref}
        badges={badges}
      />

      {/* ...дальше ваш JSX без изменений, только заголовки можно тоже брать из t(...) */}
      {/* Services */}
      <section id="services" className="py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold">
            {t("headings.services", { default: "Что мы делаем" })}
          </h2>
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
          <h2 className="text-2xl font-semibold">
            {t("nav.process", { default: "Как мы работаем" })}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ Icon, title, desc, step }, i) => (
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
                    {step} 
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
            <h2 className="text-2xl font-semibold">
              {t("nav.offices", { default: "Наши офисы" })}
            </h2>
            <a
              href="#contacts"
              className="text-xs hover:opacity-80"
              style={{ color: p.accent }}
            >
              {t("nav.contacts", { default: "Контакты" })}
            </a>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {/* Шымкент */}
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
                      {t("cities.shymkent", { default: "Шымкент" })}
                    </div>
                    <span className="inline-flex items-center gap-2 text-xs opacity-80">
                      <Clock
                        className="h-4 w-4"
                        style={{
                          color: theme === "dark" ? "#E8EEF9" : "#42526D",
                        }}
                      />
                      <span
                        style={{
                          color: theme === "dark" ? "#E8EEF9" : "#42526D",
                        }}
                      >
                        {t("offices.shymkent.hours", {
                          default: "Пн–Сб 10:00–19:00",
                        })}
                      </span>
                    </span>
                  </div>

                  <div
                    className="mt-2 inline-flex items-start gap-2 text-sm"
                    style={{ color: theme === "dark" ? "#E8EEF9" : "#42526D" }}
                  >
                    <MapPin className="mt-0.5 h-4 w-4" />
                    {t("offices.shymkent.address", {
                      default: "Улица Еримбетова, 59/7, 11 кабинет; 1 этаж",
                    })}
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
                      />
                      <span
                        style={{
                          color: theme === "dark" ? "#E8EEF9" : "#42526D",
                        }}
                      >
                        {t("actions.openMap", { default: "Открыть на карте" })}
                      </span>
                    </a>

                    <a
                      href={makeWaLink(WA_NUMBERS.shymkent, waText)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm shadow-sm hover:opacity-90"
                      style={{ background: "#25D366", color: "#fff" }}
                    >
                      <Phone className="h-4 w-4" />{" "}
                      {t("actions.whatsapp", { default: "WhatsApp" })}
                    </a>
                  </div>
                </div>

                {/* Карта Шымкент */}
                <div
                  className="h-56 w-full border-t"
                  style={{ borderColor: p.border }}
                >
                  <iframe
                    title={t("titles.mapShymkent", {
                      default: "Карта Шымкент — ADAL Finance",
                    })}
                    src={`https://www.google.com/maps?ll=42.342989,69.633628&hl=${mapLang}&z=16&output=embed`}
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

            {/* Актау */}
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
                      {t("cities.aktau", { default: "Актау" })}
                    </div>
                    <span className="inline-flex items-center gap-2 text-xs opacity-80">
                      <Clock
                        className="h-4 w-4"
                        style={{
                          color: theme === "dark" ? "#E8EEF9" : "#42526D",
                        }}
                      />
                      <span
                        style={{
                          color: theme === "dark" ? "#E8EEF9" : "#42526D",
                        }}
                      >
                        {t("offices.aktau.hours", {
                          default: "Пн–Сб 10:00–19:00",
                        })}
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
                    {t("offices.aktau.address", {
                      default: "г.Актау 12/59",
                    })}
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
                      />
                      <span
                        style={{
                          color: theme === "dark" ? "#E8EEF9" : "#42526D",
                        }}
                      >
                        {t("actions.openMap", { default: "Открыть на карте" })}
                      </span>
                    </a>

                    <a
                      href={makeWaLink(WA_NUMBERS.aktau, waText)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm shadow-sm hover:opacity-90"
                      style={{ background: "#25D366", color: "#fff" }}
                    >
                      <Phone className="h-4 w-4" />{" "}
                      {t("actions.whatsapp", { default: "WhatsApp" })}
                    </a>
                  </div>
                </div>

                {/* Карта Актау */}
                <div
                  className="h-56 w-full border-t"
                  style={{ borderColor: p.border }}
                >
                  <iframe
                    title={t("titles.mapAktau", {
                      default: "Карта Актау — ADAL Finance",
                    })}
                    src={`https://www.google.com/maps?ll=43.6481,51.1722&hl=${mapLang}&z=16&output=embed`}
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
          <h2 className="text-2xl font-semibold">
            {t("nav.reviews", { default: "Отзывы клиентов" })}
          </h2>

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
                {t("buttons.prev", { default: "Предыдущий" })}
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
                {t("buttons.next", { default: "Следующий" })}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold">
            {t("nav.faq", { default: "Частые вопросы" })}
          </h2>
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
              <Image
                src={logo}
                alt="logo"
                width={40}
                height={40}
                className="h-10 w-10 rounded-full object-cover"
                style={{ boxShadow: `0 0 0 1px ${p.border}` }}
              />
              <div>
                <div className="font-semibold text-lg">ADAL Finance</div>
                <div
                  style={{ color: theme === "dark" ? "#E8EEF9" : "#51637A" }}
                >
                  {t("company.binLabel", { default: "БИН" })}:{" "}
                  <span className="inline-flex items-center gap-2 hover:text-amber-500 font-bold">
                    200140024408
                  </span>
                </div>
              </div>
            </div>
            <p
              className="text-xs"
              style={{ color: theme === "dark" ? "#B8C7E0" : "#6B7A90" }}
            >
              {t("company.about", {
                default:
                  "Мы помогаем оформить финансирование до 100 млн ₸ быстро, удобно и на выгодных условиях.",
              })}
            </p>
          </div>

          {/* Контакты */}
          <div className="flex flex-col gap-2">
            <h3 className="font-medium text-base mb-2">
              {t("nav.contacts", { default: "Контакты" })}
            </h3>
            <div className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" />{" "}
              {t("addresses.shymkent.short", {
                default: "Ерімбетова 59, Шымкент",
              })}
            </div>
            <div className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4" />{" "}
              {t("addresses.aktau.short", {
                default: "г.Актау 12/59",
              })}
            </div>
            <a
              href="tel:+77089810031"
              className="inline-flex items-center gap-2 hover:text-blue-500"
            >
              <Phone className="h-4 w-4" /> +7 708 981 0031{" "}
              {t("cities.shymkent")}
            </a>
            <a
              href="tel:+77773058803"
              className="inline-flex items-center gap-2 hover:text-blue-500"
            >
              <Phone className="h-4 w-4" /> +7 777 305 8803 {t("cities.aktau")}
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
              {t("cta.freeConsult", { default: "Бесплатная консультация" })}
            </h3>
            <p className="text-xs">
              {t("cta.chooseCity", {
                default: "Выберите ваш город и напишите нам:",
              })}
            </p>

            <a
              href={makeWaLink(WA_NUMBERS.shymkent, waText)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium shadow-sm"
              style={{ background: "#25D366", color: "white" }}
            >
              <Phone className="h-4 w-4" />
              {`${t("actionss.whatsapp", { default: "WhatsApp" })} ${t(
                "cities.shymkent",
                { default: "Шымкент" }
              )}`}
            </a>

            <a
              href={makeWaLink(WA_NUMBERS.aktau, waText)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium shadow-sm"
              style={{ background: "#25D366", color: "white" }}
            >
              <Phone className="h-4 w-4" />
              {`${t("actionss.whatsapp", { default: "WhatsApp" })} ${t(
                "cities.aktau",
                { default: "Актау" }
              )}`}
            </a>
          </div>
        </div>

        {/* копирайт */}
        <CopyrightNotice
          theme={theme === "dark" ? "dark" : "light"}
          p={p}
          autoOnce={false} // ← модалка не откроется сама
        />
      </footer>
    </div>
  );
}
