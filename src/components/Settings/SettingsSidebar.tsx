
import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLanguage } from "@/context/LanguageContext";

type SettingsSidebarProps = {
  handleSectionClick: (section: string) => void;
  handleLogout: () => void;
};

const SettingsSidebar = ({ handleSectionClick, handleLogout }: SettingsSidebarProps) => {
  const { t } = useLanguage();

  // Settings sections
  const sections = [
    { id: "account", name: t.accountSettings, icon: "💼" },
    { id: "appearance", name: t.appearance, icon: "🎨" },
    { id: "notifications", name: t.notifications, icon: "🔔" },
    { id: "subscription", name: t.subscription, icon: "💳" },
    { id: "language", name: t.languageRegion, icon: "🌐" },
    { id: "help", name: t.helpSupport, icon: "❓" },
  ];

  return (
    <div className="space-y-4">
      <div className="border rounded-lg overflow-hidden">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="flex items-center gap-3 p-3 text-sm transition-colors hover:bg-muted border-b last:border-b-0"
            onClick={() => handleSectionClick(section.name)}
          >
            <span className="text-lg" aria-hidden="true">
              {section.icon}
            </span>
            <span>{section.name}</span>
          </a>
        ))}
      </div>

      <Alert variant="destructive" className="bg-destructive/10 border-destructive/30">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {t.logout} {t.removeAllData}
        </AlertDescription>
      </Alert>

      <Button 
        variant="destructive" 
        className="w-full"
        onClick={handleLogout}
      >
        <LogOut className="mr-2 h-4 w-4" />
        {t.logout}
      </Button>
    </div>
  );
};

export default SettingsSidebar;
