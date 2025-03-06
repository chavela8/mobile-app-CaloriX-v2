
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, LineChart, PieChart, Apple } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Progress = () => {
  const [openWeightDialog, setOpenWeightDialog] = useState(false);
  const [weight, setWeight] = useState("");
  
  const handleWeightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process weight data
    toast.success("Данные о весе успешно сохранены", {
      description: `Текущий вес: ${weight} кг`,
    });
    setWeight("");
    setOpenWeightDialog(false);
  };

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Прогресс</h1>
        <p className="text-muted-foreground">Отслеживайте свои достижения и динамику изменений</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChart className="h-5 w-5 text-primary" />
              Вес
            </CardTitle>
            <CardDescription>Динамика изменения веса за последние 30 дней</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p>График изменения веса будет доступен после внесения данных</p>
              <Button className="mt-4" onClick={() => setOpenWeightDialog(true)}>Внести данные о весе</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-primary" />
              Калории
            </CardTitle>
            <CardDescription>Потребление калорий по дням</CardDescription>
          </CardHeader>
          <CardContent className="h-80 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <p>График потребления калорий будет доступен после внесения данных о питании</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5 text-primary" />
            Распределение нутриентов
          </CardTitle>
          <CardDescription>Соотношение белков, жиров и углеводов</CardDescription>
        </CardHeader>
        <CardContent className="h-80 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <p>График распределения нутриентов будет доступен после внесения данных о питании</p>
          </div>
        </CardContent>
      </Card>

      {/* Weight input dialog */}
      <Dialog open={openWeightDialog} onOpenChange={setOpenWeightDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Внесение данных о весе</DialogTitle>
            <DialogDescription>
              Введите ваш текущий вес, чтобы отслеживать динамику изменений
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleWeightSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="weight" className="text-right">
                  Вес
                </Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  placeholder="70.5"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Сохранить</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Progress;
