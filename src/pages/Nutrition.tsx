
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Apple, Beef, Coffee, Egg } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const Nutrition = () => {
  const [openAddMealDialog, setOpenAddMealDialog] = useState(false);
  const [mealType, setMealType] = useState("breakfast");
  
  const handleMealSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const mealTypeNames = {
      breakfast: "Завтрак",
      lunch: "Обед",
      dinner: "Ужин",
      snack: "Перекус"
    };
    
    toast.success(`Прием пищи добавлен: ${mealTypeNames[mealType as keyof typeof mealTypeNames]}`, {
      description: "Данные успешно сохранены в дневник питания",
    });
    setOpenAddMealDialog(false);
  };

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Питание</h1>
        <p className="text-muted-foreground">Отслеживайте приемы пищи и контролируйте потребление нутриентов</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Apple className="h-5 w-5 text-primary" />
              Завтрак
            </CardTitle>
            <CardDescription>08:30 • 450 ккал</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm">
              <li className="flex justify-between">
                <span>Овсянка с ягодами</span>
                <span className="text-muted-foreground">320 ккал</span>
              </li>
              <li className="flex justify-between">
                <span>Зеленый чай</span>
                <span className="text-muted-foreground">0 ккал</span>
              </li>
              <li className="flex justify-between">
                <span>Грецкие орехи</span>
                <span className="text-muted-foreground">130 ккал</span>
              </li>
            </ul>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-4"
              onClick={() => {
                setMealType("breakfast");
                setOpenAddMealDialog(true);
              }}
            >
              Добавить продукты
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Coffee className="h-5 w-5 text-primary" />
              Обед
            </CardTitle>
            <CardDescription>13:00 • 680 ккал</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm">
              <li className="flex justify-between">
                <span>Куриный суп</span>
                <span className="text-muted-foreground">220 ккал</span>
              </li>
              <li className="flex justify-between">
                <span>Салат с тунцом</span>
                <span className="text-muted-foreground">310 ккал</span>
              </li>
              <li className="flex justify-between">
                <span>Ржаной хлеб</span>
                <span className="text-muted-foreground">150 ккал</span>
              </li>
            </ul>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-4"
              onClick={() => {
                setMealType("lunch");
                setOpenAddMealDialog(true);
              }}
            >
              Добавить продукты
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Beef className="h-5 w-5 text-primary" />
              Ужин
            </CardTitle>
            <CardDescription>19:30 • 520 ккал</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm">
              <li className="flex justify-between">
                <span>Запеченный лосось</span>
                <span className="text-muted-foreground">280 ккал</span>
              </li>
              <li className="flex justify-between">
                <span>Овощи гриль</span>
                <span className="text-muted-foreground">120 ккал</span>
              </li>
              <li className="flex justify-between">
                <span>Киноа</span>
                <span className="text-muted-foreground">120 ккал</span>
              </li>
            </ul>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full mt-4"
              onClick={() => {
                setMealType("dinner");
                setOpenAddMealDialog(true);
              }}
            >
              Добавить продукты
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Добавить прием пищи</CardTitle>
          <CardDescription>Внесите данные о новом приеме пищи</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setOpenAddMealDialog(true)}>
            Добавить прием пищи
          </Button>
        </CardContent>
      </Card>

      {/* Add Meal Dialog */}
      <Dialog open={openAddMealDialog} onOpenChange={setOpenAddMealDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Добавление приема пищи</DialogTitle>
            <DialogDescription>
              Укажите тип приема пищи и добавьте продукты
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleMealSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="mealType" className="text-right">
                  Тип
                </Label>
                <Select 
                  value={mealType}
                  onValueChange={setMealType}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Выберите тип приема пищи" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="breakfast">Завтрак</SelectItem>
                    <SelectItem value="lunch">Обед</SelectItem>
                    <SelectItem value="dinner">Ужин</SelectItem>
                    <SelectItem value="snack">Перекус</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="product" className="text-right">
                  Продукт
                </Label>
                <Input
                  id="product"
                  placeholder="Например: Овсянка"
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="weight" className="text-right">
                  Вес (г)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="100"
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Добавить</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Nutrition;
