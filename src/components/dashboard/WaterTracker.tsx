
import React, { useState } from "react";
import { Droplet, Plus, Minus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function WaterTracker() {
  const [water, setWater] = useState(1200); // in ml
  const target = 2500; // daily target in ml
  
  const percentage = Math.min(Math.round((water / target) * 100), 100);
  
  const handleAdd = () => {
    setWater(prev => Math.min(prev + 250, target));
  };
  
  const handleRemove = () => {
    setWater(prev => Math.max(prev - 250, 0));
  };
  
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <Droplet className="h-5 w-5 text-blue-500" />
          Водный баланс
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="relative w-32 h-32 mb-4">
            <div className="absolute inset-0 rounded-full border-4 border-muted"></div>
            <div className="absolute bottom-0 left-0 right-0 bg-blue-500/80 transition-all duration-700" style={{ height: `${percentage}%`, borderRadius: "0 0 7rem 7rem" }}></div>
            <div className={cn(
              "absolute inset-0 flex flex-col items-center justify-center text-center transition-colors duration-300",
              percentage > 70 ? "text-white" : "text-foreground"
            )}>
              <span className="text-xl font-bold">{water} мл</span>
              <span className="text-xs">{percentage}%</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3">
            Цель: {target} мл
          </p>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleRemove}
              disabled={water <= 0}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Button onClick={handleAdd} disabled={water >= target}>
              <Plus className="h-4 w-4 mr-1" />
              250 мл
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
