
import React, { useRef, useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useLanguage } from "@/context/LanguageContext";

interface WeeklyProgressProps {
  caloriesData: number[];
  proteinData: number[];
  className?: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; fill: string }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  const { t } = useLanguage();
  
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover p-3 rounded-md border shadow-md">
        <p className="font-medium mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.fill }}>
            {entry.name}: {entry.value} {entry.name === t.caloriesTotal ? "kcal" : "g"}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function WeeklyProgress({ caloriesData, proteinData, className }: WeeklyProgressProps) {
  const { t, language } = useLanguage();
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartSize, setChartSize] = useState({ width: 0, height: 0 });
  
  // Dynamic days labels based on language
  const getDaysLabels = () => {
    return language === 'ru' 
      ? ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"] 
      : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  };
  
  const days = getDaysLabels();
  
  // Prepare the data for the chart
  const data = days.map((day, index) => ({
    day,
    calories: caloriesData[index] || 0,
    protein: proteinData[index] || 0,
  }));
  
  // Update chart size on window resize
  useEffect(() => {
    const updateSize = () => {
      if (chartRef.current) {
        const width = chartRef.current.offsetWidth;
        const height = chartRef.current.offsetHeight || 270; // Default height
        setChartSize({ width, height });
      }
    };
    
    updateSize();
    window.addEventListener('resize', updateSize);
    
    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);
  
  // Determine if we're on a small screen
  const isSmallScreen = chartSize.width < 500;

  return (
    <div className={className} ref={chartRef}>
      <h3 className="text-lg font-semibold mb-4">{t.weeklyProgress}</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 15, left: isSmallScreen ? -15 : 0, bottom: 5 }}
            barGap={isSmallScreen ? 0 : 2}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="day" 
              tick={{ fontSize: isSmallScreen ? 10 : 12 }}
              tickLine={false}
              axisLine={{ stroke: "hsl(var(--border))" }}
              interval={isSmallScreen ? 1 : 0}
            />
            <YAxis 
              tick={{ fontSize: isSmallScreen ? 10 : 12 }}
              tickLine={false}
              axisLine={{ stroke: "hsl(var(--border))" }}
              tickFormatter={(value) => `${value}`}
              width={isSmallScreen ? 25 : 40}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              name={t.caloriesTotal}
              dataKey="calories" 
              fill="hsl(var(--primary))" 
              radius={[4, 4, 0, 0]}
              barSize={isSmallScreen ? 10 : 16}
            />
            <Bar 
              name={t.protein}
              dataKey="protein" 
              fill="hsl(210 84% 60%)" 
              radius={[4, 4, 0, 0]}
              barSize={isSmallScreen ? 10 : 16}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
