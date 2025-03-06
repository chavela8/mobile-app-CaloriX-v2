
// Import necessary components and hooks
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, BarChartHorizontal, DollarSign, LineChart, PieChart, TrendingUp, Utensils } from "lucide-react";
import { ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { toast } from "sonner";

// Sample data for the chart
const caloriesData = [
  { day: "Пн", calories: 1850 },
  { day: "Вт", calories: 2100 },
  { day: "Ср", calories: 1950 },
  { day: "Чт", calories: 2200 },
  { day: "Пт", calories: 2300 },
  { day: "Сб", calories: 1900 },
  { day: "Вс", calories: 2050 },
];

const activityData = [
  { day: "Пн", steps: 6500 },
  { day: "Вт", steps: 8200 },
  { day: "Ср", steps: 7300 },
  { day: "Чт", steps: 5900 },
  { day: "Пт", steps: 9100 },
  { day: "Сб", steps: 11200 },
  { day: "Вс", steps: 7800 },
];

const weightData = [
  { day: "1 фев", weight: 76.2 },
  { day: "7 фев", weight: 75.8 },
  { day: "14 фев", weight: 75.5 },
  { day: "21 фев", weight: 74.9 },
  { day: "26 фев", weight: 75.2 },
];

const Statistics = () => {
  const [activeTab, setActiveTab] = useState("nutrition");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    toast.info(`Выбрана вкладка "${value === "nutrition" ? "Питание" : value === "activity" ? "Активность" : "Вес"}"`);
  };

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Статистика</h1>
        <p className="text-muted-foreground">Аналитика питания и активности</p>
      </div>

      <Tabs defaultValue="nutrition" onValueChange={handleTabChange}>
        <TabsList className="mb-6">
          <TabsTrigger value="nutrition">Питание</TabsTrigger>
          <TabsTrigger value="activity">Активность</TabsTrigger>
          <TabsTrigger value="weight">Вес</TabsTrigger>
        </TabsList>

        <TabsContent value="nutrition">
          <div className="grid grid-cols-1 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-primary" />
                  Калории по дням
                </CardTitle>
                <CardDescription>За последние 7 дней</CardDescription>
              </CardHeader>
              <CardContent className="p-1">
                {/* Fixed chart size to fit within the card */}
                <div style={{ width: '100%', height: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={caloriesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="calories" name="Калории" fill="#f59e0b" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-center text-muted-foreground mt-2">
                  График калорий за последние 7 дней
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-primary" />
                    Источники калорий
                  </CardTitle>
                  <CardDescription>Распределение по приемам пищи</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <p>График будет доступен после внесения данных о питании</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChartHorizontal className="h-5 w-5 text-primary" />
                    Потребление нутриентов
                  </CardTitle>
                  <CardDescription>По сравнению с рекомендованными значениями</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <p>График будет доступен после внесения данных о питании</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <div className="grid grid-cols-1 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Активность по дням
                </CardTitle>
                <CardDescription>За последние 7 дней</CardDescription>
              </CardHeader>
              <CardContent className="p-1">
                {/* Fixed chart size to fit within the card */}
                <div style={{ width: '100%', height: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={activityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="steps" name="Шаги" fill="#3b82f6" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-sm text-center text-muted-foreground mt-2">
                  График количества шагов за последние 7 дней
                </p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Сожженные калории
                  </CardTitle>
                  <CardDescription>За последнюю неделю</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <p>График будет доступен после внесения данных об активности</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Utensils className="h-5 w-5 text-primary" />
                    Баланс калорий
                  </CardTitle>
                  <CardDescription>Потребление vs. Расход</CardDescription>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <p>График будет доступен после внесения данных о питании и активности</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="weight">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-primary" />
                Динамика веса
              </CardTitle>
              <CardDescription>За последний месяц</CardDescription>
            </CardHeader>
            <CardContent className="p-1">
              {/* Fixed chart size to fit within the card */}
              <div style={{ width: '100%', height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={weightData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis domain={['dataMin - 0.5', 'dataMax + 0.5']} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="weight" name="Вес (кг)" fill="#10b981" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-sm text-center text-muted-foreground mt-2">
                График изменения веса за последний месяц
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Statistics;
