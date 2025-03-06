
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";

type NotificationsState = {
  email: boolean;
  sync: boolean;
};

type AccountSettingsProps = {
  notifications: NotificationsState;
  handleToggle: (setting: keyof NotificationsState) => void;
};

const AccountSettings = ({ notifications, handleToggle }: AccountSettingsProps) => {
  const { t } = useLanguage();

  return (
    <Card className="mb-6" id="account">
      <CardHeader>
        <CardTitle>{t.accountSettings}</CardTitle>
        <CardDescription>{t.profileSettings}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium">{t.accountStatus}</h4>
            <p className="text-xs text-muted-foreground">{t.currentPlan}</p>
          </div>
          <Badge variant="outline">{t.freePlan}</Badge>
        </div>

        <Separator />

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium">{t.emailNotifications}</h4>
            <p className="text-xs text-muted-foreground">{t.receiveEmails}</p>
          </div>
          <Switch checked={notifications.email} onCheckedChange={() => handleToggle('email')} />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium">{t.syncData}</h4>
            <p className="text-xs text-muted-foreground">{t.autoSync}</p>
          </div>
          <Switch checked={notifications.sync} onCheckedChange={() => handleToggle('sync')} />
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountSettings;
