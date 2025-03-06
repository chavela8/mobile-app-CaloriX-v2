
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { ThemeType } from "@/types";

type InterfaceSettings = {
  compact: boolean;
  sidebar: boolean;
  animations: boolean;
};

type AppearanceSettingsProps = {
  interfaceSettings: InterfaceSettings;
  handleInterfaceToggle: (setting: keyof InterfaceSettings) => void;
};

const AppearanceSettings = ({ interfaceSettings, handleInterfaceToggle }: AppearanceSettingsProps) => {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();

  const handleThemeChange = (newTheme: ThemeType) => {
    setTheme(newTheme);
  };

  return (
    <Card className="mb-6" id="appearance">
      <CardHeader>
        <CardTitle>{t.appearance}</CardTitle>
        <CardDescription>{t.customizeAppearance}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="theme">
          <TabsList className="mb-4">
            <TabsTrigger value="theme">{t.theme}</TabsTrigger>
            <TabsTrigger value="layout">{t.layout}</TabsTrigger>
          </TabsList>

          <TabsContent value="theme" className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center gap-2">
                <div className="w-full h-24 rounded-md bg-white border border-border flex items-center justify-center">
                  <span className="text-sm font-medium text-black">{t.light}</span>
                </div>
                <div className="flex items-center gap-1">
                  <input 
                    type="radio" 
                    name="theme" 
                    id="light" 
                    checked={theme === "light"}
                    onChange={() => handleThemeChange("light")}
                  />
                  <label htmlFor="light" className="text-sm">{t.light}</label>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="w-full h-24 rounded-md bg-neutral-900 border border-border flex items-center justify-center">
                  <span className="text-sm font-medium text-white">{t.dark}</span>
                </div>
                <div className="flex items-center gap-1">
                  <input 
                    type="radio" 
                    name="theme" 
                    id="dark" 
                    checked={theme === "dark"}
                    onChange={() => handleThemeChange("dark")}
                  />
                  <label htmlFor="dark" className="text-sm">{t.dark}</label>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="w-full h-24 rounded-md bg-gradient-to-b from-white to-neutral-900 border border-border flex items-center justify-center">
                  <span className="text-sm font-medium text-black">{t.system}</span>
                </div>
                <div className="flex items-center gap-1">
                  <input 
                    type="radio" 
                    name="theme" 
                    id="system" 
                    checked={theme === "system"}
                    onChange={() => handleThemeChange("system")}
                  />
                  <label htmlFor="system" className="text-sm">{t.system}</label>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="layout" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">{t.compactMode}</h4>
                <p className="text-xs text-muted-foreground">{t.reducePadding}</p>
              </div>
              <Switch 
                checked={interfaceSettings.compact} 
                onCheckedChange={() => handleInterfaceToggle('compact')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">{t.sidebar}</h4>
                <p className="text-xs text-muted-foreground">{t.showSidebar}</p>
              </div>
              <Switch 
                checked={interfaceSettings.sidebar} 
                onCheckedChange={() => handleInterfaceToggle('sidebar')}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">{t.animations}</h4>
                <p className="text-xs text-muted-foreground">{t.enableAnimations}</p>
              </div>
              <Switch 
                checked={interfaceSettings.animations} 
                onCheckedChange={() => handleInterfaceToggle('animations')}
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AppearanceSettings;
