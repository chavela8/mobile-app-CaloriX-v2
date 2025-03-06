
import React, { useRef, useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface MacroDistributionProps {
  protein: number;
  carbs: number;
  fat: number;
  className?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: { color: string } }>;
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  const { t } = useLanguage();
  
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover p-2 rounded-md border shadow-sm">
        <p className="text-sm font-medium" style={{ color: payload[0].payload.color }}>
          {payload[0].name}: {payload[0].value}г
        </p>
      </div>
    );
  }
  return null;
};

export function MacroDistribution({ protein, carbs, fat, className }: MacroDistributionProps) {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [chartSize, setChartSize] = useState({ width: 0, height: 0 });
  
  const data = [
    { name: t.protein, value: protein, color: "hsl(210 84% 60%)" },
    { name: t.carbs, value: carbs, color: "hsl(160 84% 60%)" },
    { name: t.fat, value: fat, color: "hsl(30 84% 60%)" }
  ];
  
  const total = protein + carbs + fat;
  
  // Update chart size on window resize
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setChartSize({ 
          width, 
          height: Math.min(width * 0.7, 200) // Responsive height based on width
        });
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    
    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);
  
  // Calculate inner and outer radius based on container size
  const outerRadius = Math.min(chartSize.width, chartSize.height) * 0.35;
  const innerRadius = outerRadius * 0.6;
  
  return (
    <div className={cn("flex flex-col space-y-4", className)} ref={containerRef}>
      <h3 className="text-lg font-semibold">{t.macroDistribution}</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                  stroke="transparent" 
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex flex-col space-y-2">
        {data.map((macro) => (
          <div key={macro.name} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: macro.color }} 
              />
              <span className="text-sm font-medium">{macro.name}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {macro.value}г ({Math.round((macro.value / total) * 100) || 0}%)
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
