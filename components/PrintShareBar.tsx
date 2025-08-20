"use client";

import { Button } from "@/components/ui/button";
import { Printer, Copy } from "lucide-react";
import { toast } from "sonner" 
export default function PrintShareBar() {
  const handlePrint = () => {
    window.print();
  };


  return (
    <div className="flex gap-2 print:hidden">
      <Button onClick={handlePrint} className="inline-flex items-center gap-2">
        <Printer className="h-4 w-4" />
        Печать
      </Button>
      <Button
        variant="outline"
        onClick={() => {
        navigator.clipboard.writeText(window.location.href)
        toast.success("Ссылка скопирована!")
      }}
        className="inline-flex items-center gap-2"
      >
        <Copy className="h-4 w-4" />
        Копировать ссылку
      </Button>
    </div>
  );
}
