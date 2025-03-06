
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Planner = () => {
  const [openMealDialog, setOpenMealDialog] = useState(false);
  const [openTemplateDialog, setOpenTemplateDialog] = useState(false);
  const [mealName, setMealName] = useState("");
  const [mealTime, setMealTime] = useState("");
  const [mealType, setMealType] = useState("breakfast");
  const [templateName, setTemplateName] = useState("");
  const [templateDescription, setTemplateDescription] = useState("");

  const handleAddMeal = () => {
    setOpenMealDialog(true);
  };
  
  const handleCreateTemplate = () => {
    setOpenTemplateDialog(true);
  };

  const handleMealSubmit = (e) => {
    e.preventDefault();
    toast.success("Прием пищи добавлен", {
      description: `${mealName} запланирован на ${mealTime}`
    });
    setMealName("");
    setMealTime("");
    setMealType("breakfast");
    setOpenMealDialog(false);
  };

  const handleTemplateSubmit = (e) => {
    e.preventDefault();
    toast.success("Шаблон создан", {
      description: `Шаблон "${templateName}" успешно создан`
    });
    setTemplateName("");
    setTemplateDescription("");
    setOpenTemplateDialog(false);
  };

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Планирование</h1>
        <p className="text-muted-foreground">Планируйте питание и активность на будущее</p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Предыдущий день</span>
          </Button>
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
            <span className="font-medium">Сегодня, 27 февраля 2025</span>
          </div>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Следующий день</span>
          </Button>
        </div>
        <Button onClick={handleAddMeal}>
          <Plus className="h-4 w-4 mr-2" />
          Добавить
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>План питания</CardTitle>
              <CardDescription>Запланированные приемы пищи на сегодня</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4 p-3 rounded-md hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Завтрак</h4>
                    <span className="text-sm text-muted-foreground">08:00</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Нет запланированных блюд</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start gap-4 p-3 rounded-md hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Обед</h4>
                    <span className="text-sm text-muted-foreground">13:00</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Нет запланированных блюд</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start gap-4 p-3 rounded-md hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Ужин</h4>
                    <span className="text-sm text-muted-foreground">19:00</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Нет запланированных блюд</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Календарь</CardTitle>
              <CardDescription>Февраль 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground">
                <p>Функция календаря будет доступна в ближайшем обновлении</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Шаблоны питания</CardTitle>
              <CardDescription>Создавайте и используйте шаблоны питания</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center text-muted-foreground mb-4">
                <p>У вас еще нет созданных шаблонов</p>
              </div>
              <Button className="w-full" onClick={handleCreateTemplate}>
                <Plus className="h-4 w-4 mr-2" />
                Создать шаблон
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Meal dialog */}
      <Dialog open={openMealDialog} onOpenChange={setOpenMealDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Добавление приема пищи</DialogTitle>
            <DialogDescription>
              Заполните информацию о новом приеме пищи
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleMealSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="meal-type" className="text-right">
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
                <Label htmlFor="meal-name" className="text-right">
                  Название
                </Label>
                <Input
                  id="meal-name"
                  value={mealName}
                  onChange={(e) => setMealName(e.target.value)}
                  className="col-span-3"
                  placeholder="Название блюда"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="meal-time" className="text-right">
                  Время
                </Label>
                <Input
                  id="meal-time"
                  type="time"
                  value={mealTime}
                  onChange={(e) => setMealTime(e.target.value)}
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

      {/* Template dialog */}
      <Dialog open={openTemplateDialog} onOpenChange={setOpenTemplateDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Создание шаблона</DialogTitle>
            <DialogDescription>
              Создайте новый шаблон питания для повторного использования
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleTemplateSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="template-name" className="text-right">
                  Название
                </Label>
                <Input
                  id="template-name"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  className="col-span-3"
                  placeholder="Название шаблона"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="template-description" className="text-right">
                  Описание
                </Label>
                <Input
                  id="template-description"
                  value={templateDescription}
                  onChange={(e) => setTemplateDescription(e.target.value)}
                  className="col-span-3"
                  placeholder="Краткое описание"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Создать</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Planner;
