
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { AlertCircle, ChevronRight, Lightbulb, Sparkles, Plus, UserCog, ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

const Recommendations = () => {
  const navigate = useNavigate();
  const [openArticleDialog, setOpenArticleDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [currentTopic, setCurrentTopic] = useState(null);
  const [openAllArticlesDialog, setOpenAllArticlesDialog] = useState(false);

  const articles = [
    {
      id: 1,
      title: "Важность завтрака",
      description: "Почему завтрак считается самым важным приемом пищи",
      content: `Завтрак – важнейший прием пищи, который дает организму энергию после ночного голодания. 
      Исследования показывают, что люди, которые регулярно завтракают, имеют более низкий уровень холестерина и более стабильный уровень сахара в крови. 
      Завтрак также улучшает когнитивные функции и помогает контролировать вес, снижая вероятность переедания в течение дня.`
    },
    {
      id: 2,
      title: "Белки, жиры и углеводы",
      description: "Роль макронутриентов в здоровом питании",
      content: `Макронутриенты – основные питательные вещества, необходимые организму в больших количествах.
      
      Белки – строительный материал для тканей и мышц, участвуют в образовании гормонов и ферментов. Источники: мясо, рыба, яйца, бобовые.
      
      Жиры – концентрированный источник энергии, необходимы для усвоения жирорастворимых витаминов и работы гормональной системы. Полезные источники: авокадо, орехи, оливковое масло.
      
      Углеводы – основной источник быстрой энергии для организма. Лучше выбирать сложные углеводы: цельнозерновые продукты, овощи, которые обеспечивают длительное чувство сытости.`
    },
    {
      id: 3,
      title: "Как пить больше воды",
      description: "Простые способы увеличить потребление воды в течение дня",
      content: `Достаточное потребление воды критически важно для здоровья. Вот несколько способов пить больше воды:
      
      1. Носите с собой бутылку воды
      2. Установите напоминания на телефоне
      3. Добавляйте в воду дольки фруктов для вкуса
      4. Пейте стакан воды перед каждым приемом пищи
      5. Используйте приложения для отслеживания потребления воды
      6. Замените один напиток в день (кофе, сок) на воду
      
      Рекомендуемое потребление воды: 30 мл на 1 кг веса тела в день.`
    },
    {
      id: 4,
      title: "Планирование приемов пищи",
      description: "Как эффективно планировать питание на неделю",
      content: `Планирование питания помогает экономить время, деньги и поддерживать здоровый рацион. Рекомендации:

      1. Выделите время для планирования (например, воскресенье)
      2. Составьте список блюд на неделю
      3. Проверьте запасы продуктов и составьте список покупок
      4. Подготовьте некоторые блюда заранее
      5. Используйте контейнеры для порционного хранения
      
      Планирование особенно полезно для тех, кто следит за калориями или придерживается определенной диеты.`
    },
    {
      id: 5,
      title: "Питание до и после тренировки",
      description: "Оптимальное питание для поддержки физической активности",
      content: `Правильное питание до и после тренировки значительно влияет на результаты:

      До тренировки (за 1-2 часа):
      - Сложные углеводы для энергии (овсянка, банан)
      - Умеренное количество белка (яйца, йогурт)
      - Низкое содержание жиров и клетчатки
      
      После тренировки (в течение 30-60 минут):
      - Белок для восстановления мышц (протеиновый коктейль, куриная грудка)
      - Быстрые углеводы для восполнения гликогена (фрукты, рис)
      
      Не забывайте о гидратации до, во время и после тренировки.`
    }
  ];

  const topics = [
    {
      id: "балансировка питания",
      title: "Балансировка питания",
      content: `Сбалансированное питание – ключ к здоровью. Основные принципы:

      1. Соблюдение пропорций макронутриентов:
         - Белки: 25-30% от общих калорий
         - Жиры: 20-35% от общих калорий
         - Углеводы: 45-55% от общих калорий
      
      2. Разнообразие продуктов:
         - Минимум 5 порций фруктов и овощей в день
         - Ротация источников белка (животные и растительные)
         - Разные виды злаков и круп
      
      3. Умеренность порций:
         - Использование меньшей посуды
         - Следование правилу "тарелки": 1/2 - овощи, 1/4 - белки, 1/4 - углеводы
      
      4. Внимание к микронутриентам:
         - Кальций: молочные продукты, зелень, тофу
         - Железо: красное мясо, шпинат, чечевица
         - Витамин D: жирная рыба, яичные желтки, солнечный свет`
    },
    {
      id: "режим питания",
      title: "Режим питания",
      content: `Регулярное питание поддерживает стабильный уровень энергии и метаболизм:

      1. Оптимальный режим:
         - 3 основных приема пищи (завтрак, обед, ужин)
         - 1-2 перекуса между основными приемами
         - Интервалы между приемами пищи: 3-4 часа
      
      2. Завтрак:
         - Важнейший прием пищи, запускающий метаболизм
         - Идеальное время: в течение часа после пробуждения
         - Состав: сложные углеводы + белок + полезные жиры
      
      3. Последний прием пищи:
         - За 2-3 часа до сна
         - Легкоусвояемые продукты
         - Умеренный объем
      
      4. Временные ограничения:
         - Ограничение приема пищи в определенном временном окне (например, 8-10 часов)
         - Может помочь в контроле веса и улучшении метаболизма`
    }
  ];

  const handleStartData = () => {
    navigate('/nutrition');
  };

  const handleMoreDetails = (topic) => {
    setCurrentTopic(topics.find(t => t.id === topic));
    setOpenDetailsDialog(true);
  };

  const handleViewAllArticles = () => {
    setOpenAllArticlesDialog(true);
  };

  const handleReadArticle = (title) => {
    setCurrentArticle(articles.find(article => article.title === title));
    setOpenArticleDialog(true);
  };

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Рекомендации</h1>
        <p className="text-muted-foreground">Персонализированные советы на основе ваших данных</p>
      </div>

      <div className="mb-8">
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="text-center mb-4">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <h3 className="text-xl font-semibold mb-2">Недостаточно данных для анализа</h3>
              <p className="text-muted-foreground mb-6">
                Чтобы получить персонализированные рекомендации, внесите данные о питании и активности за несколько дней
              </p>
              <Button onClick={handleStartData}>
                Начать вносить данные
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-6">Общие рекомендации</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-primary" />
              Балансировка питания
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Старайтесь соблюдать следующее распределение макронутриентов для поддержания здорового обмена веществ:
            </p>
            <div className="space-y-4 mb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500 mt-1.5" />
                <div>
                  <p className="font-medium">Белки: 25-30% от общего потребления калорий</p>
                  <p className="text-sm text-muted-foreground">Необходимы для восстановления тканей и мышц</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500 mt-1.5" />
                <div>
                  <p className="font-medium">Жиры: 20-35% от общего потребления калорий</p>
                  <p className="text-sm text-muted-foreground">Важны для работы гормональной системы</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500 mt-1.5" />
                <div>
                  <p className="font-medium">Углеводы: 45-55% от общего потребления калорий</p>
                  <p className="text-sm text-muted-foreground">Основной источник энергии для организма</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => handleMoreDetails("балансировка питания")}>
              Подробнее
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Режим питания
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Регулярное питание помогает поддерживать стабильный уровень энергии и предотвращает переедание:
            </p>
            <div className="space-y-4 mb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-300 mt-1.5" />
                <div>
                  <p className="font-medium">Старайтесь питаться каждые 3-4 часа небольшими порциями</p>
                  <p className="text-sm text-muted-foreground">Поддерживает стабильный уровень сахара в крови</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-300 mt-1.5" />
                <div>
                  <p className="font-medium">Не пропускайте завтрак — он запускает метаболизм на весь день</p>
                  <p className="text-sm text-muted-foreground">Помогает избежать переедания в течение дня</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-300 mt-1.5" />
                <div>
                  <p className="font-medium">Последний прием пищи должен быть за 2-3 часа до сна</p>
                  <p className="text-sm text-muted-foreground">Способствует лучшему пищеварению и сну</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => handleMoreDetails("режим питания")}>
              Подробнее
            </Button>
          </CardFooter>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mb-6">Статьи по питанию</h2>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Полезные материалы</CardTitle>
            <Button variant="ghost" className="text-sm" onClick={handleViewAllArticles}>
              Все статьи
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <CardDescription>Подборка статей о правильном питании и здоровом образе жизни</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-3 rounded-md hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => handleReadArticle("Важность завтрака")}>
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
                <Lightbulb className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Важность завтрака</h4>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">Почему завтрак считается самым важным приемом пищи</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex items-start gap-4 p-3 rounded-md hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => handleReadArticle("Белки, жиры и углеводы")}>
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Белки, жиры и углеводы</h4>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">Роль макронутриентов в здоровом питании</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex items-start gap-4 p-3 rounded-md hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => handleReadArticle("Как пить больше воды")}>
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 text-primary">
                <Plus className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Как пить больше воды</h4>
                  <ExternalLink className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">Простые способы увеличить потребление воды в течение дня</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Article dialog */}
      <Dialog open={openArticleDialog} onOpenChange={setOpenArticleDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentArticle?.title}</DialogTitle>
            <DialogDescription>
              {currentArticle?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="my-4 whitespace-pre-line">
            <p>{currentArticle?.content}</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setOpenArticleDialog(false)}>Закрыть</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Topic details dialog */}
      <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{currentTopic?.title}</DialogTitle>
          </DialogHeader>
          <div className="my-4 whitespace-pre-line">
            <p>{currentTopic?.content}</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setOpenDetailsDialog(false)}>Закрыть</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* All articles dialog */}
      <Dialog open={openAllArticlesDialog} onOpenChange={setOpenAllArticlesDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Все статьи</DialogTitle>
            <DialogDescription>
              Полный список статей по питанию и здоровому образу жизни
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 my-4">
            {articles.map(article => (
              <div 
                key={article.id}
                className="p-3 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => {
                  setCurrentArticle(article);
                  setOpenAllArticlesDialog(false);
                  setOpenArticleDialog(true);
                }}
              >
                <h4 className="font-medium mb-1">{article.title}</h4>
                <p className="text-sm text-muted-foreground">{article.description}</p>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={() => setOpenAllArticlesDialog(false)}>Закрыть</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Recommendations;
