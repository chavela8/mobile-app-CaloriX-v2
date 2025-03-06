
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/context/LanguageContext";

type NotificationsState = {
  push: boolean;
  mealReminders: boolean;
  achievements: boolean;
  weeklyReports: boolean;
};

type NotificationSettingsProps = {
  notifications: NotificationsState;
  handleToggle: (setting: keyof NotificationsState) => void;
};

const NotificationSettings = ({ notifications, handleToggle }: NotificationSettingsProps) => {
  const { t } = useLanguage();

  return (
    <Card className="mb-6" id="notifications">
      <CardHeader>
        <CardTitle>{t.notifications}</CardTitle>
        <CardDescription>{t.customizeNotifications}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium">{t.pushNotifications}</h4>
            <p className="text-xs text-muted-foreground">{t.receivePush}</p>
          </div>
          <Switch checked={notifications.push} onCheckedChange={() => handleToggle('push')} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium">{t.mealReminders}</h4>
            <p className="text-xs text-muted-foreground">{t.getMealReminders}</p>
          </div>
          <Switch checked={notifications.mealReminders} onCheckedChange={() => handleToggle('mealReminders')} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium">{t.achievements}</h4>
            <p className="text-xs text-muted-foreground">{t.achievementNotifications}</p>
          </div>
          <Switch checked={notifications.achievements} onCheckedChange={() => handleToggle('achievements')} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium">{t.weeklyReports}</h4>
            <p className="text-xs text-muted-foreground">{t.getWeeklyReports}</p>
          </div>
          <Switch checked={notifications.weeklyReports} onCheckedChange={() => handleToggle('weeklyReports')} />
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
