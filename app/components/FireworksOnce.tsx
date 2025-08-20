"use client";

import { useEffect } from "react";
import type React from "react"; // ✅ для React.RefObject

type Props = {
  targetRef: React.RefObject<HTMLElement | null>;
  onceKey?: string;
};


export default function FireworksOver({ targetRef, onceKey = "hero_confetti_done" }: Props) {
  useEffect(() => {
    const el = targetRef.current;
    if (!el) return;

    // if (sessionStorage.getItem(onceKey)) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) return;

    const canvas = document.createElement("canvas");
    Object.assign(canvas.style, {
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: "50", // чуть выше на всякий случай
    });
    el.appendChild(canvas);

    let destroyed = false;

    
    const resize = () => {
      const rect = el.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2); // ✅ аккуратный DPR
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
    };

    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

   (async () => {
  try {
    const mod = await import("canvas-confetti");
    const confettiFactory = (mod.default ?? mod).create(canvas, {
      useWorker: false, // ⛔ без OffscreenCanvas, можно менять size
      resize: false,
    });

    // следим за изменением размеров элемента
    const ro = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
    });
    ro.observe(el);

    if (destroyed) return;

    // 🎉 залпы
    confettiFactory({
      particleCount: 90,
      spread: 70,
      startVelocity: 35,
      gravity: 0.9,
      origin: { x: 0.5, y: 0.05 },
      ticks: 120,
      scalar: 0.9,
    });

    setTimeout(() => {
      if (destroyed) return;
      confettiFactory({
        particleCount: 70,
        spread: 60,
        startVelocity: 40,
        gravity: 0.9,
        origin: { x: 0.8, y: 0.12 },
        ticks: 120,
        scalar: 0.8,
      });
    }, 220);

    sessionStorage.setItem(onceKey, "1");
  } catch {}
})();


    return () => {
      destroyed = true;
      ro.disconnect();
      canvas.remove();
    };
  }, [targetRef, onceKey]);

  return null;
}
