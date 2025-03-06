
import React from "react";
import { MoreHorizontal, Plus, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MealType } from "@/types";

interface MealCardProps {
  mealType: MealType;
  title: string;
  calories: number;
  items: { name: string; calories: number; protein: number; carbs: number; fat: number }[];
  onAddMeal: () => void;
}

export function MealCard({ mealType, title, calories, items, onAddMeal }: MealCardProps) {
  const getMealIcon = () => {
    switch (mealType) {
      case "breakfast":
        return "☕️";
      case "lunch":
        return "🍲";
      case "dinner":
        return "🍽️";
      case "snack":
        return "🥪";
      default:
        return "🍎";
    }
  };

  return (
    <Card className="shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium flex items-center gap-2">
          <span className="text-xl">{getMealIcon()}</span>
          {title}
        </CardTitle>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onAddMeal}
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Добавить</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Меню</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px] bg-background border border-border">
              <DropdownMenuItem className="cursor-pointer">
                <Edit className="h-4 w-4 mr-2" />
                Редактировать
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Копировать из вчера
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Сбросить
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        {items.length > 0 ? (
          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={index} className="flex justify-between py-1 border-b last:border-0 border-border/50">
                <div className="text-sm">{item.name}</div>
                <div className="text-sm text-muted-foreground">{item.calories} ккал</div>
              </div>
            ))}
            <div className="flex justify-between pt-2">
              <div className="text-sm font-medium">Всего</div>
              <div className="text-sm font-medium">{calories} ккал</div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-muted-foreground text-sm mb-4">
              Вы еще не добавили продукты в этот прием пищи
            </p>
            <Button onClick={onAddMeal} variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Добавить продукты
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
