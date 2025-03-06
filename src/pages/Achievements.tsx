
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Calendar, Flame, Target, Dumbbell, Apple, Heart, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const Achievements = () => {
  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Достижения</h1>
        <p className="text-muted-foreground">Отслеживайте свои успехи и получайте награды</p>
      </div>

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Ваш прогресс</h2>
          <p className="text-muted-foreground">Вы получили 3 из 24 доступных достижений</p>
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="h-6 w-6 text-primary" />
          <span className="text-xl font-medium">120 XP</span>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-primary" />
          Полученные достижения
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                  +30 XP
                </Badge>
              </div>
              <CardTitle className="mt-2">Первые шаги</CardTitle>
              <CardDescription>Внесли данные о питании 7 дней подряд</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Получено 10 февраля 2025</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Apple className="h-6 w-6 text-primary" />
                </div>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                  +50 XP
                </Badge>
              </div>
              <CardTitle className="mt-2">Сбалансированное питание</CardTitle>
              <CardDescription>Достигли идеального баланса макронутриентов</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Получено 15 февраля 2025</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                  +40 XP
                </Badge>
              </div>
              <CardTitle className="mt-2">Здоровый режим</CardTitle>
              <CardDescription>Питались регулярно 5 дней подряд</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">Получено 20 февраля 2025</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Доступные достижения</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                  <Flame className="h-6 w-6 text-muted-foreground" />
                </div>
                <Badge variant="outline">+70 XP</Badge>
              </div>
              <CardTitle className="mt-2">Постоянство</CardTitle>
              <CardDescription>Внесите данные о питании 30 дней подряд</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Прогресс</span>
                  <span>7/30 дней</span>
                </div>
                <Progress value={23} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                  <Target className="h-6 w-6 text-muted-foreground" />
                </div>
                <Badge variant="outline">+60 XP</Badge>
              </div>
              <CardTitle className="mt-2">Достижение цели</CardTitle>
              <CardDescription>Достигните своей целевой нормы калорий 15 дней подряд</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Прогресс</span>
                  <span>4/15 дней</span>
                </div>
                <Progress value={27} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                  <Dumbbell className="h-6 w-6 text-muted-foreground" />
                </div>
                <Badge variant="outline">+80 XP</Badge>
              </div>
              <CardTitle className="mt-2">Активный образ жизни</CardTitle>
              <CardDescription>Тренируйтесь не менее 3 раз в неделю в течение месяца</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Прогресс</span>
                  <span>1/4 недель</span>
                </div>
                <Progress value={25} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
