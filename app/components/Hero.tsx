"use client";

import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { PaletteKey, Palette } from "@/app/theme";
import FireworksOver from "./FireworksOnce";
type Badge = {
  Icon: React.ComponentType<{ className?: string }>;
  text: string;
};

interface HeroProps {
  theme: PaletteKey;
  p: Palette;
  city: "shymkent" | "aktau";
  setCity: (c: "shymkent" | "aktau") => void;
  waHref: string;
  badges: Badge[];
}

export default function Hero({
  theme,
  p,
  city,
  setCity,
  waHref,
  badges,
}: HeroProps) {
  const accentText = theme === "dark" ? "#041E41" : "#ffffff";
  const ctaRef = useRef<HTMLDivElement>(null);
  // анимации CTA (заметный, но не навязчивый)
  const ctaControls = useAnimation();
  const btnControls = useAnimation();
  const interactedRef = useRef(false);
  const markInteracted = () => {
    interactedRef.current = true;
  };

  useEffect(() => {
    (async () => {
      // вход
      await ctaControls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        boxShadow: [
          "0 12px 26px rgba(0,0,0,0.08)",
          "0 18px 50px rgba(0,0,0,0.18)",
        ],
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      });

      // мягкое свечение рамки (1 раз)
      await ctaControls.start({
        filter: [
          "drop-shadow(0 0 0px rgba(0,0,0,0))",
          `drop-shadow(0 0 14px ${p.accent}55)`,
          "drop-shadow(0 0 0px rgba(0,0,0,0))",
        ],
        transition: { duration: 1.2, times: [0, 0.5, 1] },
      });

      // лёгкий намёк на кнопку, если пользователь ничего не сделал
      setTimeout(() => {
        if (
          !interactedRef.current &&
          !window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
        ) {
          btnControls.start({
            rotate: [0, -1.6, 1.6, -1, 0],
            scale: [1, 1.02, 1],
            transition: { duration: 0.7 },
          });
        }
      }, 7000);
    })();
  }, [ctaControls, btnControls, p.accent]);

  return (
    <section className="py-12 sm:py-18 relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: p.soft }}
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 grid gap-10 lg:grid-cols-2 items-center">
        {/* Левый столбец */}
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
        {/* CTA WhatsApp — заметный */}
        <motion.div
          id="cta"
          ref={ctaRef}
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={ctaControls}
          className="lg:justify-self-end w-full relative"
        >
          {/* акцентная рамка */}
          <div
            className="rounded-2xl p-[2px] relative"
            style={{
              background: `radial-gradient(1200px 400px at 90% -10%, ${p.accent}55, transparent 60%)`,
            }}
          >
            <FireworksOver targetRef={ctaRef} />
            <Card
              className="rounded-2xl shadow-xl relative overflow-hidden"
              style={{
                background:
                  theme === "dark" ? "rgba(255,255,255,0.08)" : p.card,
                borderColor: p.border,
              }}
            >
              <CardContent className="p-5 sm:p-6 space-y-4 relative">
                {/* Блик-спотлайт: мягко проезжает 1 раз */}
                <motion.span
                  aria-hidden="true"
                  initial={{ x: "-120%", opacity: 0 }}
                  animate={{ x: "120%", opacity: [0, 0.6, 0] }}
                  transition={{ duration: 1.1, delay: 1.2, ease: "easeOut" }}
                  className="pointer-events-none absolute top-0 left-0 h-full w-1/3"
                  style={{
                    background:
                      "linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.32) 45%, transparent 100%)",
                    filter: "blur(8px)",
                  }}
                />

                <div
                  className="text-sm font-medium"
                  style={{ color: theme === "dark" ? "#E8EEF9" : "#51637A" }}
                >
                  Бесплатная консультация
                </div>

                {/* Переключатели города */}
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={() => {
                      setCity("shymkent");
                      markInteracted();
                    }}
                    className="rounded-xl"
                    style={{
                      background:
                        city === "shymkent" ? p.accent : "transparent",
                      color: city === "shymkent" ? accentText : p.fg,
                      border: `1px solid ${
                        city === "shymkent" ? p.accent : p.border
                      }`,
                    }}
                  >
                    Шымкент
                  </Button>
                  <Button
                    onClick={() => {
                      setCity("aktau");
                      markInteracted();
                    }}
                    className="rounded-xl"
                    style={{
                      background: city === "aktau" ? p.accent : "transparent",
                      color: city === "aktau" ? accentText : p.fg,
                      border: `1px solid ${
                        city === "aktau" ? p.accent : p.border
                      }`,
                    }}
                  >
                    Актау
                  </Button>
                </div>

                {/* Кнопка WhatsApp */}
                <motion.a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Написать нам в WhatsApp"
                  className="block rounded-2xl text-center py-3 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{
                    background: "#25D366", // ✅ всегда зелёный фон
                    color: "#ffffff", // ✅ белый текст
                    border: "1px solid #25D366", // ✅ зелёная обводка
                    boxShadow: "0 14px 34px rgba(0,0,0,0.18)",
                  }}
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  animate={btnControls}
                  onMouseEnter={markInteracted}
                  onClick={markInteracted}
                >
                  <span className="inline-flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Написать в WhatsApp
                  </span>
                </motion.a>

                <p
                  className="text-xs"
                  style={{ color: theme === "dark" ? "#E8EEF9" : "#51637A" }}
                >
                  Выберите город и напишите нам — ответим и подскажем
                  оптимальное решение.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
