
import React from "react";
import { Calendar, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function StreakCard() {
  const streak = 7; // Current streak in days
  
  return (
    <Card className="shadow-sm hover:shadow-md transition-all duration-300">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Серия дней</h3>
              <p className="text-sm text-muted-foreground">Продолжайте в том же духе!</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Trophy className="h-5 w-5 text-amber-500" />
            <span className="text-2xl font-bold">{streak}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
