
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import { ThemeType } from "@/types";

// Import settings data
import { 
  languagesData, 
  regionsData, 
  timezonesData, 
  exchangeRates 
} from "@/components/settings/data/settingsData";

// Import settings components
import SettingsSidebar from "@/components/settings/SettingsSidebar";
import AccountSettings from "@/components/settings/AccountSettings";
import AppearanceSettings from "@/components/settings/AppearanceSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import SubscriptionSettings from "@/components/settings/SubscriptionSettings";
import LanguageSettings from "@/components/settings/LanguageSettings";
import HelpSupportSettings from "@/components/settings/HelpSupportSettings";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [region, setRegion] = useState(() => {
    return localStorage.getItem("region") || "ru";
  });
  const [timezone, setTimezone] = useState(() => {
    return localStorage.getItem("timezone") || "gmt+3";
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sync: true,
    push: true,
    mealReminders: true,
    achievements: true,
    weeklyReports: true
  });

  const [interfaceSettings, setInterfaceSettings] = useState({
    compact: false,
    sidebar: true,
    animations: true
  });

  const [currency, setCurrency] = useState({
    code: "RUB",
    symbol: "₽"
  });

  useEffect(() => {
    const selectedRegion = regionsData.find(r => r.code === region);
    if (selectedRegion) {
      setCurrency({
        code: selectedRegion.currency,
        symbol: selectedRegion.symbol
      });
    }
  }, [region]);

  const calculatePrice = (priceInRub: number) => {
    const rate = exchangeRates[currency.code as keyof typeof exchangeRates] || 1;
    const convertedPrice = (priceInRub * rate).toFixed(2);
    if (currency.code === "JPY" || currency.code === "KRW") {
      return Math.round(parseFloat(convertedPrice));
    }
    return convertedPrice;
  };

  const handleToggle = (setting: keyof typeof notifications) => {
    setNotifications(prev => {
      const newValue = !prev[setting];
      toast.success(`${newValue ? "Включено" : "Отключено"}`, {
        description: `Настройка "${setting}" ${newValue ? "активирована" : "деактивирована"}`
      });
      return {
        ...prev,
        [setting]: newValue
      };
    });
  };

  const handleInterfaceToggle = (setting: keyof typeof interfaceSettings) => {
    setInterfaceSettings(prev => {
      const newValue = !prev[setting];
      toast.success(`${newValue ? "Включено" : "Отключено"}`, {
        description: `Настройка "${setting}" ${newValue ? "активирована" : "деактивирована"}`
      });
      return {
        ...prev,
        [setting]: newValue
      };
    });
  };

  const handleThemeChange = (newTheme: ThemeType) => {
    setTheme(newTheme);
    toast.success(t.theme + " " + t.active, {
      description: `${
        newTheme === "light" 
          ? t.light 
          : newTheme === "dark" 
            ? t.dark 
            : newTheme === "system"
              ? t.system
              : newTheme
      }`
    });
  };

  const handleLogout = () => {
    toast.info("Выход из аккаунта", {
      description: "Вы успешно вышли из своего аккаунта"
    });
  };

  const handleSubscribe = (plan: string) => {
    toast.success("Подписка", {
      description: `Вы перешли к оформлению подписки "${plan}"`
    });
  };

  const handleSaveLanguage = () => {
    setLanguage(language);
    localStorage.setItem("region", region);
    localStorage.setItem("timezone", timezone);
    
    toast.success(t.saveSettings, {
      description: t.customizeLanguage
    });
    
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleSectionClick = (section: string) => {
    toast.info(`Переход к разделу "${section}"`, {
      description: `Выбран раздел "${section}" настроек`
    });
  };

  return (
    <div className="container mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{t.settings}</h1>
        <p className="text-muted-foreground">{t.customize}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <SettingsSidebar 
            handleSectionClick={handleSectionClick} 
            handleLogout={handleLogout} 
          />
        </div>

        <div className="lg:col-span-3">
          <AccountSettings 
            notifications={{
              email: notifications.email,
              sync: notifications.sync
            }} 
            handleToggle={handleToggle} 
          />

          <AppearanceSettings 
            interfaceSettings={interfaceSettings} 
            handleInterfaceToggle={handleInterfaceToggle} 
          />

          <NotificationSettings 
            notifications={{
              push: notifications.push,
              mealReminders: notifications.mealReminders,
              achievements: notifications.achievements,
              weeklyReports: notifications.weeklyReports
            }} 
            handleToggle={handleToggle} 
          />

          <SubscriptionSettings 
            currency={currency} 
            calculatePrice={calculatePrice} 
            handleSubscribe={handleSubscribe} 
          />

          <LanguageSettings 
            languagesData={languagesData}
            regionsData={regionsData}
            timezonesData={timezonesData}
            language={language}
            region={region}
            timezone={timezone}
            setLanguage={setLanguage}
            setRegion={setRegion}
            setTimezone={setTimezone}
            handleSaveLanguage={handleSaveLanguage}
          />

          <HelpSupportSettings handleSectionClick={handleSectionClick} />
        </div>
      </div>
    </div>
  );
};

export default Settings;
