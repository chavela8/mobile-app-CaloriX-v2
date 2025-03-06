
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NutrientProgressBar } from "@/components/dashboard/NutrientProgressBar";
import { CalorieProgress } from "@/components/dashboard/CalorieProgress";
import { MacroDistribution } from "@/components/dashboard/MacroDistribution";
import { MealCard } from "@/components/dashboard/MealCard";
import { WeeklyProgress } from "@/components/dashboard/WeeklyProgress";
import { AiInsight } from "@/components/dashboard/AiInsight";
import { WaterTracker } from "@/components/dashboard/WaterTracker";
import { StreakCard } from "@/components/dashboard/StreakCard";
import { QuickAdd } from "@/components/dashboard/QuickAdd";
import { toast } from "sonner";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/context/LanguageContext";

// Sample data
const caloriesData = [1800, 2100, 1950, 2050, 1800, 1600, 1900];
const proteinData = [120, 140, 130, 145, 125, 110, 135];

// Sample meal data
const meals = {
  breakfast: [
    { name: "Овсянка на молоке", calories: 220, protein: 7, carbs: 40, fat: 4 },
    { name: "Банан", calories: 105, protein: 1, carbs: 27, fat: 0 },
  ],
  lunch: [
    { name: "Куриная грудка", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { name: "Гречка", calories: 130, protein: 4, carbs: 25, fat: 1 },
    { name: "Овощной салат", calories: 45, protein: 1, carbs: 10, fat: 0 },
  ],
  dinner: [
    { name: "Творог 5%", calories: 120, protein: 18, carbs: 3, fat: 5 },
    { name: "Мед", calories: 65, protein: 0, carbs: 17, fat: 0 },
  ],
  snack: [],
};

// Calculate totals
const calculateTotals = () => {
  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;

  Object.values(meals).forEach(mealItems => {
    mealItems.forEach(item => {
      totalCalories += item.calories;
      totalProtein += item.protein;
      totalCarbs += item.carbs;
      totalFat += item.fat;
    });
  });

  return { totalCalories, totalProtein, totalCarbs, totalFat };
};

const { totalCalories, totalProtein, totalCarbs, totalFat } = calculateTotals();

// User targets
const targets = {
  calories: 2200,
  protein: 150,
  carbs: 220,
  fat: 73,
};

const Index = () => {
  const { t, language } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [openMealDialog, setOpenMealDialog] = useState(false);
  const [currentMealType, setCurrentMealType] = useState("");
  
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      day: 'numeric', 
      month: 'long' 
    };
    return date.toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', options);
  };

  const goToPreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleAddMeal = (mealType: string) => {
    setCurrentMealType(mealType);
    setOpenMealDialog(true);
  };

  const handleMealSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`${t.add}: ${currentMealType}`, {
      description: t.save,
    });
    setOpenMealDialog(false);
  };

  // Ref to measure tabs container width for responsive sizing
  const tabsRef = useRef<HTMLDivElement>(null);
  const [tabsWidth, setTabsWidth] = useState(0);
  
  // Update width measurement on resize
  useEffect(() => {
    const updateWidth = () => {
      if (tabsRef.current) {
        setTabsWidth(tabsRef.current.offsetWidth);
      }
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  return (
    <div className="container max-w-7xl mx-auto animate-fade-in py-4">
      <div className="flex flex-col space-y-6">
        {/* Date navigation */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{t.nutritionJournal}</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={goToPreviousDay} title={t.back}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2 px-3"
              onClick={goToToday}
            >
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">{formatDate(currentDate)}</span>
              <span className="sm:hidden">{t.today}</span>
            </Button>
            <Button variant="outline" size="icon" onClick={goToNextDay}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-sm">
                <CardContent className="pt-6">
                  <CalorieProgress 
                    consumed={totalCalories} 
                    target={targets.calories} 
                    remaining={Math.max(0, targets.calories - totalCalories)} 
                  />
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardContent className="p-6 space-y-4">
                  <NutrientProgressBar 
                    label={t.protein} 
                    current={totalProtein} 
                    target={targets.protein} 
                    unit={t.kg === "kg" ? "g" : "г"} 
                    color="bg-blue-500" 
                  />
                  <NutrientProgressBar 
                    label={t.carbs} 
                    current={totalCarbs} 
                    target={targets.carbs} 
                    unit={t.kg === "kg" ? "g" : "г"} 
                    color="bg-green-500" 
                  />
                  <NutrientProgressBar 
                    label={t.fat} 
                    current={totalFat} 
                    target={targets.fat} 
                    unit={t.kg === "kg" ? "g" : "г"} 
                    color="bg-amber-500" 
                  />
                </CardContent>
              </Card>
            </div>

            <div ref={tabsRef}>
              <Tabs defaultValue="meals" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="meals">{t.meals}</TabsTrigger>
                  <TabsTrigger value="analytics">{t.analytics}</TabsTrigger>
                </TabsList>
                <TabsContent value="meals" className="space-y-4 mt-4 animate-in">
                  <MealCard 
                    mealType="breakfast" 
                    title={t.breakfast}
                    calories={meals.breakfast.reduce((sum, item) => sum + item.calories, 0)}
                    items={meals.breakfast}
                    onAddMeal={() => handleAddMeal(t.breakfast)}
                  />
                  <MealCard 
                    mealType="lunch" 
                    title={t.lunch}
                    calories={meals.lunch.reduce((sum, item) => sum + item.calories, 0)}
                    items={meals.lunch}
                    onAddMeal={() => handleAddMeal(t.lunch)}
                  />
                  <MealCard 
                    mealType="dinner" 
                    title={t.dinner}
                    calories={meals.dinner.reduce((sum, item) => sum + item.calories, 0)}
                    items={meals.dinner}
                    onAddMeal={() => handleAddMeal(t.dinner)}
                  />
                  <MealCard 
                    mealType="snack" 
                    title={t.snack}
                    calories={meals.snack.reduce((sum, item) => sum + item.calories, 0)}
                    items={meals.snack}
                    onAddMeal={() => handleAddMeal(t.snack)}
                  />
                </TabsContent>
                <TabsContent value="analytics" className="space-y-4 mt-4 animate-in">
                  <Card className="shadow-sm">
                    <CardContent className="pt-6">
                      <MacroDistribution 
                        protein={totalProtein}
                        carbs={totalCarbs}
                        fat={totalFat}
                      />
                    </CardContent>
                  </Card>
                  <Card className="shadow-sm">
                    <CardContent className="pt-6">
                      <WeeklyProgress 
                        caloriesData={caloriesData}
                        proteinData={proteinData}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <QuickAdd />
            <WaterTracker />
            <AiInsight />
            <StreakCard />
          </div>
        </div>
      </div>

      {/* Add Meal Dialog */}
      <Dialog open={openMealDialog} onOpenChange={setOpenMealDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t.add}: {currentMealType}</DialogTitle>
            <DialogDescription>
              {t.add}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleMealSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="product" className="text-right">
                  {t.ingredient}
                </Label>
                <Input
                  id="product"
                  placeholder={language === 'ru' ? "Например: Куриная грудка" : "Example: Chicken breast"}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="weight" className="text-right">
                  {t.weight} (г)
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
              <Button type="submit">{t.add}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
