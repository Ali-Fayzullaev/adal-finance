// app/theme.ts
export const palettes = {
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

export type PaletteKey = keyof typeof palettes;
export type Palette = typeof palettes[PaletteKey];
