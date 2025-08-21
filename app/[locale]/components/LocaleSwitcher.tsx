"use client";

import {useLocale} from "next-intl";
import {useRouter} from "@/i18n/navigation"; // твой next-intl router
import {Button} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import {Globe2, ChevronDown, Check} from "lucide-react";

type Props = {
  p: { border: string; card: string; fg?: string; accent?: string };
};

const LOCALES = [
  {code: "ru", label: "Русский"},
  {code: "kk", label: "Қазақша"},
] as const;

export default function LocaleSwitcher({p}: Props) {
  const locale = useLocale();
  const router = useRouter();
  const current = LOCALES.find(l => l.code === locale) ?? LOCALES[0];

  const switchTo = (target: (typeof LOCALES)[number]["code"]) => {
    if (typeof window === "undefined") return; // на всякий случай
    const {pathname, search, hash} = window.location;
    // сохраняем текущий путь, query и hash, меняем только локаль
    router.replace(`${pathname}${search ?? ""}${hash ?? ""}`, {locale: target});
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-9 px-3 rounded-full border inline-flex items-center gap-2"
          style={{borderColor: p.border}}
          aria-label="Change language"
        >
          <Globe2 className="h-4 w-4" />
          <span className="hidden md:inline text-xs font-medium">{current.label}</span>
          <ChevronDown className="hidden md:inline h-3.5 w-3.5 opacity-60" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="min-w-40"
        style={{borderColor: p.border, background: p.card}}
      >
        {LOCALES.map(l => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => switchTo(l.code)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="flex-1">{l.label}</span>
            {l.code === locale && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
