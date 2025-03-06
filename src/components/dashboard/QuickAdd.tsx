
import React, { useState } from "react";
import { Search, PlusCircle, Scan, Mic } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";

export function QuickAdd() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openScanDialog, setOpenScanDialog] = useState(false);
  const [openVoiceDialog, setOpenVoiceDialog] = useState(false);
  const [currentMeal, setCurrentMeal] = useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast.info(`${t.searchProduct}: ${searchQuery}`, {
      description: t.language === 'ru' 
        ? "Выполняется поиск продукта в базе данных..." 
        : "Searching for product in database...",
    });
    
    // Имитация задержки поиска
    setTimeout(() => {
      toast.success(t.language === 'ru' 
        ? "Найдено 5 продуктов" 
        : "Found 5 products", {
        description: t.language === 'ru' 
          ? "Показаны результаты поиска по запросу" 
          : "Showing search results for your query",
      });
    }, 1000);
    
    setSearchQuery("");
  };
  
  const handleQuickAdd = (meal: string) => {
    setCurrentMeal(meal);
    setOpenAddDialog(true);
  };
  
  const handleScan = () => {
    setOpenScanDialog(true);
  };
  
  const handleVoiceInput = () => {
    setOpenVoiceDialog(true);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`${t.language === 'ru' ? "Продукт добавлен в" : "Product added to"} ${currentMeal}`, {
      description: t.language === 'ru' ? "Данные успешно сохранены" : "Data successfully saved",
    });
    setOpenAddDialog(false);
  };
  
  const handleCloseScan = () => {
    setOpenScanDialog(false);
    toast.success(t.scanProduct, {
      description: t.language === 'ru' 
        ? "Продукт успешно распознан: Яблоко (52 ккал)" 
        : "Product successfully identified: Apple (52 kcal)",
    });
  };
  
  const handleCloseVoice = () => {
    setOpenVoiceDialog(false);
    toast.success(t.voiceInput, {
      description: t.language === 'ru' 
        ? "Голосовой ввод распознан: Куриная грудка 100г" 
        : "Voice input recognized: Chicken breast 100g",
    });
  };

  return (
    <Card className="shadow-sm">
      <CardContent className="p-5">
        <div className="flex flex-col space-y-4">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t.language === 'ru' ? "Найти продукт..." : "Find product..."}
                className="pl-9 pr-16"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute right-2 top-1.5 flex gap-1">
                <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={handleScan}>
                  <Scan className="h-4 w-4" />
                  <span className="sr-only">{t.scanProduct}</span>
                </Button>
                <Button type="button" variant="ghost" size="icon" className="h-7 w-7" onClick={handleVoiceInput}>
                  <Mic className="h-4 w-4" />
                  <span className="sr-only">{t.voiceInput}</span>
                </Button>
              </div>
            </div>
          </form>
          
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="gap-1" onClick={() => handleQuickAdd(t.breakfast)}>
              <PlusCircle className="h-4 w-4" />
              {t.breakfast}
            </Button>
            <Button variant="outline" size="sm" className="gap-1" onClick={() => handleQuickAdd(t.lunch)}>
              <PlusCircle className="h-4 w-4" />
              {t.lunch}
            </Button>
            <Button variant="outline" size="sm" className="gap-1" onClick={() => handleQuickAdd(t.dinner)}>
              <PlusCircle className="h-4 w-4" />
              {t.dinner}
            </Button>
            <Button variant="outline" size="sm" className="gap-1" onClick={() => handleQuickAdd(t.snack)}>
              <PlusCircle className="h-4 w-4" />
              {t.snack}
            </Button>
          </div>
          
          <h4 className="font-medium text-sm mt-2">{t.language === 'ru' ? "Недавно добавленные" : "Recently added"}</h4>
          <div className="grid grid-cols-2 gap-2">
            {[
              { name: t.language === 'ru' ? "Куриная грудка" : "Chicken breast", cal: 120 },
              { name: t.language === 'ru' ? "Гречка" : "Buckwheat", cal: 150 },
              { name: t.language === 'ru' ? "Творог 5%" : "Cottage cheese 5%", cal: 90 },
              { name: t.language === 'ru' ? "Яблоко" : "Apple", cal: 70 }
            ].map((item, index) => (
              <Button
                key={index}
                variant="ghost"
                className="justify-start h-auto py-2 px-3"
                onClick={() => {
                  toast.success(`${item.name} ${t.language === 'ru' ? "добавлен в дневник" : "added to journal"}`, {
                    description: `${item.cal} ${t.language === 'ru' ? "ккал добавлено в ваш дневник питания" : "calories added to your food diary"}`
                  });
                }}
              >
                <div className="flex flex-col items-start text-left">
                  <span className="text-sm">{item.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {item.cal} {t.language === 'ru' ? "ккал" : "kcal"}
                  </span>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
      
      {/* Quick Add Dialog */}
      <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t.language === 'ru' ? `Быстрое добавление в ${currentMeal}` : `Quick add to ${currentMeal}`}</DialogTitle>
            <DialogDescription>
              {t.language === 'ru' 
                ? "Укажите продукт и его количество для быстрого добавления" 
                : "Specify the product and its quantity for quick addition"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quickAddProduct" className="text-right">
                  {t.language === 'ru' ? "Продукт" : "Product"}
                </Label>
                <Input
                  id="quickAddProduct"
                  placeholder={t.language === 'ru' ? "Например: Яблоко" : "For example: Apple"}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quickAddWeight" className="text-right">
                  {t.language === 'ru' ? "Вес (г)" : "Weight (g)"}
                </Label>
                <Input
                  id="quickAddWeight"
                  type="number"
                  placeholder="100"
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">{t.add}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Scan Dialog */}
      <Dialog open={openScanDialog} onOpenChange={setOpenScanDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t.scanProduct}</DialogTitle>
            <DialogDescription>
              {t.language === 'ru' 
                ? "Отсканируйте штрих-код продукта камерой" 
                : "Scan the product barcode with the camera"}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-8">
            <div className="relative border-4 border-dashed border-muted-foreground/20 rounded-lg h-40 w-full flex items-center justify-center">
              <Scan className="h-12 w-12 text-muted-foreground/50" />
              <div className="absolute inset-0 bg-primary/5 animate-pulse rounded-lg"></div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleCloseScan}>{t.language === 'ru' ? "Готово" : "Done"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Voice Input Dialog */}
      <Dialog open={openVoiceDialog} onOpenChange={setOpenVoiceDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t.voiceInput}</DialogTitle>
            <DialogDescription>
              {t.language === 'ru' 
                ? "Произнесите название продукта и его количество" 
                : "Say the name of the product and its quantity"}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-8">
            <div className="relative rounded-full bg-primary/10 h-20 w-20 flex items-center justify-center">
              <Mic className="h-8 w-8 text-primary" />
              <div className="absolute inset-0 rounded-full border-2 border-primary/50 animate-ping"></div>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            {t.language === 'ru' 
              ? "Слушаю..." 
              : "Listening..."}
          </p>
          <DialogFooter>
            <Button onClick={handleCloseVoice}>{t.language === 'ru' ? "Готово" : "Done"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
