
import React from "react";
import { cn } from "@/lib/utils";

interface NutrientProgressBarProps {
  label: string;
  current: number;
  target: number;
  unit: string;
  color: string;
  className?: string;
}

export function NutrientProgressBar({
  label,
  current,
  target,
  unit,
  color,
  className,
}: NutrientProgressBarProps) {
  // Calculate percentage, capped at 100%
  const percentage = Math.min(Math.round((current / target) * 100), 100);
  
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-muted-foreground">
          {current} / {target} {unit}
        </span>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
