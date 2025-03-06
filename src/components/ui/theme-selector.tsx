
import React from "react";
import { Check, Moon, Sun, PaintBucket } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/context/ThemeContext";
import { ThemeType } from "@/types";

const themes: { value: ThemeType; label: string; icon: React.ReactNode }[] = [
  {
    value: "light",
    label: "Светлая",
    icon: <Sun className="h-4 w-4" />,
  },
  {
    value: "dark",
    label: "Темная",
    icon: <Moon className="h-4 w-4" />,
  },
  {
    value: "creamy",
    label: "Сливочная",
    icon: <PaintBucket className="h-4 w-4" />,
  },
  {
    value: "blue-gray",
    label: "Сине-серая",
    icon: <PaintBucket className="h-4 w-4" />,
  },
];

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="h-9 w-9 rounded-full">
          {theme === "light" && <Sun className="h-4 w-4" />}
          {theme === "dark" && <Moon className="h-4 w-4" />}
          {theme === "creamy" && <PaintBucket className="h-4 w-4" />}
          {theme === "blue-gray" && <PaintBucket className="h-4 w-4" />}
          <span className="sr-only">Переключить тему</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36 bg-background border border-border">
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.value}
            className={`flex items-center justify-between cursor-pointer ${
              theme === t.value ? "bg-muted" : ""
            }`}
            onClick={() => setTheme(t.value)}
          >
            <div className="flex items-center gap-2">
              {t.icon}
              <span>{t.label}</span>
            </div>
            {theme === t.value && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
