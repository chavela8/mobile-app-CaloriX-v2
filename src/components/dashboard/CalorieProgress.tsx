
import React from "react";

interface CalorieProgressProps {
  consumed: number;
  target: number;
  remaining: number;
}

export function CalorieProgress({ consumed, target, remaining }: CalorieProgressProps) {
  // Calculate percentage consumed, capped at 100%
  const percentage = Math.min((consumed / target) * 100, 100);
  
  // Calculate properties of the SVG circle
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Background circle */}
        <svg className="w-full h-full" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="10"
          />
          
          {/* Progress circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 100 100)"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        
        {/* Text in the center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-3xl font-bold">{consumed}</div>
          <div className="text-sm text-muted-foreground">потреблено</div>
          <div className="text-sm font-medium mt-1">
            Осталось: {remaining} ккал
          </div>
        </div>
      </div>
      
      <div className="text-sm text-muted-foreground mt-2">
        Цель: {target} ккал
      </div>
    </div>
  );
}
