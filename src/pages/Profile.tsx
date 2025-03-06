
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { User, Settings, Bell, Shield, FileText, TrendingUp, Trophy, Mail, Phone, MapPin, Calendar, Edit, Globe, Apple } from "lucide-react";
import { toast } from "sonner";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "Александр",
    lastName: "Иванов",
    email: "alex@example.com",
    phone: "+7 (XXX) XXX-XX-XX",
    height: "178",
    weight: "75.2",
    birthdate: "1990-01-01"
  });

  // Стейт для настроек переключателей
  const [switches, setSwitches] = useState({
    nutrition: true,
    achievements: true,
    reports: true,
    news: false,
    tips: true,
    analytics: true,
    recommendations: true
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleEditProfile = () => {
    setIsEditing(true);
    toast.info("Режим редактирования", {
      description: "Теперь вы можете изменить данные своего профиля"
    });
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast.success("Профиль обновлен", {
      description: "Данные профиля успешно сохранены"
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    toast.info("Редактирование отменено", {
      description: "Изменения не были сохранены"
    });
  };

  const handleToggleSwitch = (key: keyof typeof switches) => {
    setSwitches(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    
    const newValue = !switches[key];
    toast.success(`Настройка ${newValue ? "включена" : "отключена"}`, {
      description: `${key} ${newValue ? "активировано" : "деактивировано"}`
    });
  };

  const handleResetSettings = () => {
    toast.success("Настройки сброшены", {
      description: "Все настройки восстановлены по умолчанию"
    });
  };

  const handleSaveSettings = () => {
    toast.success("Настройки сохранены", {
      description: "Ваши настройки применены"
    });
  };

  const handleDisableAll = () => {
    setSwitches({
      nutrition: false,
      achievements: false,
      reports: false,
      news: false,
      tips: false,
      analytics: false,
      recommendations: false
    });
    toast.success("Все уведомления отключены", {
      description: "Вы не будете получать никаких уведомлений"
    });
  };

  const handleSaveNotifications = () => {
    toast.success("Настройки уведомлений сохранены", {
      description: "Ваши предпочтения по уведомлениям применены"
    });
  };

  const handleSecurityAction = (action: string) => {
    toast.success(action, {
      description: `Переход к настройке: ${action}`
    });
  };

  const handleDeleteData = () => {
    toast.error("Удаление данных", {
      description: "Вы уверены, что хотите удалить все данные? Это действие необратимо."
    });
  };

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Профиль</h1>
        <p className="text-muted-foreground">Управление персональной информацией и настройками</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <Button variant="outline" size="icon" className="absolute bottom-0 right-0 rounded-full bg-background">
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Изменить фото</span>
                  </Button>
                </div>
              </div>
              <CardTitle>Александр</CardTitle>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                  Бесплатный план
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">alex@example.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">+7 (XXX) XXX-XX-XX</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Регистрация: 01.02.2025</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Москва, Россия</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Русский (RU)</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleEditProfile}>Редактировать профиль</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Достижения</CardTitle>
              <CardDescription>Ваши текущие достижения</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Достижения</h4>
                    <p className="text-xs text-muted-foreground">3 из 24 получено</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => toast.success("Достижения", { description: "Открываем страницу с вашими достижениями" })}>Просмотр</Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Текущая серия</h4>
                    <p className="text-xs text-muted-foreground">7 дней подряд</p>
                  </div>
                </div>
                <Badge>120 XP</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="personal">
            <TabsList className="mb-6 grid grid-cols-4 h-auto">
              <TabsTrigger value="personal" className="py-2">
                <User className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Данные</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="py-2">
                <Settings className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Настройки</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="py-2">
                <Bell className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Уведомления</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="py-2">
                <Shield className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Приватность</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Личная информация</CardTitle>
                  <CardDescription>Обновите ваши персональные данные</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium">Имя</label>
                      <Input 
                        id="firstName" 
                        value={formData.firstName} 
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium">Фамилия</label>
                      <Input 
                        id="lastName" 
                        value={formData.lastName} 
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium">Телефон</label>
                    <Input 
                      id="phone" 
                      value={formData.phone} 
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <label htmlFor="height" className="text-sm font-medium">Рост (см)</label>
                    <Input 
                      id="height" 
                      type="number" 
                      value={formData.height} 
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="weight" className="text-sm font-medium">Вес (кг)</label>
                      <Input 
                        id="weight" 
                        type="number" 
                        value={formData.weight} 
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="birthdate" className="text-sm font-medium">Дата рождения</label>
                      <Input 
                        id="birthdate" 
                        type="date" 
                        value={formData.birthdate} 
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleCancelEdit} disabled={!isEditing}>Отмена</Button>
                  <Button onClick={handleSaveProfile} disabled={!isEditing}>Сохранить изменения</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Настройки приложения</CardTitle>
                  <CardDescription>Настройте приложение под свои предпочтения</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Язык</h3>
                    <select className="w-full px-3 py-2 rounded-md border border-input bg-background">
                      <option value="ru">Русский</option>
                      <option value="en">English</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Единицы измерения</h3>
                    <div className="flex space-x-4">
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="units" defaultChecked className="h-4 w-4" />
                        <span>Метрические (кг, см)</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="units" className="h-4 w-4" />
                        <span>Имперские (фунты, дюймы)</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Формат времени</h3>
                    <div className="flex space-x-4">
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="timeFormat" defaultChecked className="h-4 w-4" />
                        <span>24-часовой</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="timeFormat" className="h-4 w-4" />
                        <span>12-часовой (AM/PM)</span>
                      </label>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Дополнительные настройки</h3>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Автоматический расчет КБЖУ</h4>
                        <p className="text-xs text-muted-foreground">
                          Автоматически рассчитывать нутриенты на основе ваших целей
                        </p>
                      </div>
                      <div 
                        className={`h-6 w-11 rounded-full relative flex items-center px-1 cursor-pointer ${switches.nutrition ? 'bg-primary' : 'bg-muted'}`}
                        onClick={() => handleToggleSwitch('nutrition')}
                      >
                        <div className={`h-4 w-4 rounded-full bg-white absolute ${switches.nutrition ? 'right-1' : 'left-1'} transition-all`}></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Напоминания</h4>
                        <p className="text-xs text-muted-foreground">
                          Включить напоминания о внесении данных о питании
                        </p>
                      </div>
                      <div 
                        className={`h-6 w-11 rounded-full relative flex items-center px-1 cursor-pointer ${switches.achievements ? 'bg-primary' : 'bg-muted'}`}
                        onClick={() => handleToggleSwitch('achievements')}
                      >
                        <div className={`h-4 w-4 rounded-full bg-white absolute ${switches.achievements ? 'right-1' : 'left-1'} transition-all`}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleResetSettings}>Восстановить настройки по умолчанию</Button>
                  <Button onClick={handleSaveSettings}>Сохранить</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Настройки уведомлений</CardTitle>
                  <CardDescription>Управление уведомлениями приложения</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Уведомления приложения</h3>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Напоминания о питании</h4>
                        <p className="text-xs text-muted-foreground">
                          Напоминания о необходимости внести данные о приемах пищи
                        </p>
                      </div>
                      <div 
                        className={`h-6 w-11 rounded-full relative flex items-center px-1 cursor-pointer ${switches.nutrition ? 'bg-primary' : 'bg-muted'}`}
                        onClick={() => handleToggleSwitch('nutrition')}
                      >
                        <div className={`h-4 w-4 rounded-full bg-white absolute ${switches.nutrition ? 'right-1' : 'left-1'} transition-all`}></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Достижения и награды</h4>
                        <p className="text-xs text-muted-foreground">
                          Уведомления о полученных достижениях и наградах
                        </p>
                      </div>
                      <div 
                        className={`h-6 w-11 rounded-full relative flex items-center px-1 cursor-pointer ${switches.achievements ? 'bg-primary' : 'bg-muted'}`}
                        onClick={() => handleToggleSwitch('achievements')}
                      >
                        <div className={`h-4 w-4 rounded-full bg-white absolute ${switches.achievements ? 'right-1' : 'left-1'} transition-all`}></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Статистика и отчеты</h4>
                        <p className="text-xs text-muted-foreground">
                          Еженедельные отчеты о прогрессе и аналитика
                        </p>
                      </div>
                      <div 
                        className={`h-6 w-11 rounded-full relative flex items-center px-1 cursor-pointer ${switches.reports ? 'bg-primary' : 'bg-muted'}`}
                        onClick={() => handleToggleSwitch('reports')}
                      >
                        <div className={`h-4 w-4 rounded-full bg-white absolute ${switches.reports ? 'right-1' : 'left-1'} transition-all`}></div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Email уведомления</h3>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Новости и обновления</h4>
                        <p className="text-xs text-muted-foreground">
                          Информация о новых функциях и обновлениях приложения
                        </p>
                      </div>
                      <div 
                        className={`h-6 w-11 rounded-full relative flex items-center px-1 cursor-pointer ${switches.news ? 'bg-primary' : 'bg-muted'}`}
                        onClick={() => handleToggleSwitch('news')}
                      >
                        <div className={`h-4 w-4 rounded-full bg-white absolute ${switches.news ? 'right-1' : 'left-1'} transition-all`}></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Советы по питанию</h4>
                        <p className="text-xs text-muted-foreground">
                          Полезные статьи и советы по правильному питанию
                        </p>
                      </div>
                      <div 
                        className={`h-6 w-11 rounded-full relative flex items-center px-1 cursor-pointer ${switches.tips ? 'bg-primary' : 'bg-muted'}`}
                        onClick={() => handleToggleSwitch('tips')}
                      >
                        <div className={`h-4 w-4 rounded-full bg-white absolute ${switches.tips ? 'right-1' : 'left-1'} transition-all`}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleDisableAll}>Отключить все</Button>
                  <Button onClick={handleSaveNotifications}>Сохранить настройки</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle>Приватность и безопасность</CardTitle>
                  <CardDescription>Управление настройками приватности и безопасности</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Безопасность аккаунта</h3>

                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start" onClick={() => handleSecurityAction("Изменение пароля")}>
                        <Shield className="h-4 w-4 mr-2" />
                        Изменить пароль
                      </Button>
                      <Button variant="outline" className="w-full justify-start" onClick={() => handleSecurityAction("Двухфакторная аутентификация")}>
                        <FileText className="h-4 w-4 mr-2" />
                        Двухфакторная аутентификация
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Приватность данных</h3>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Данные для аналитики</h4>
                        <p className="text-xs text-muted-foreground">
                          Разрешить использовать анонимные данные для улучшения сервиса
                        </p>
                      </div>
                      <div 
                        className={`h-6 w-11 rounded-full relative flex items-center px-1 cursor-pointer ${switches.analytics ? 'bg-primary' : 'bg-muted'}`}
                        onClick={() => handleToggleSwitch('analytics')}
                      >
                        <div className={`h-4 w-4 rounded-full bg-white absolute ${switches.analytics ? 'right-1' : 'left-1'} transition-all`}></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium">Персонализированные рекомендации</h4>
                        <p className="text-xs text-muted-foreground">
                          Получать рекомендации на основе ваших данных
                        </p>
                      </div>
                      <div 
                        className={`h-6 w-11 rounded-full relative flex items-center px-1 cursor-pointer ${switches.recommendations ? 'bg-primary' : 'bg-muted'}`}
                        onClick={() => handleToggleSwitch('recommendations')}
                      >
                        <div className={`h-4 w-4 rounded-full bg-white absolute ${switches.recommendations ? 'right-1' : 'left-1'} transition-all`}></div>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Button variant="destructive" className="w-full" onClick={handleDeleteData}>
                      Удалить все данные и историю
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Это действие удалит все ваши данные и не может быть отменено
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
