
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";

type LanguageSettingsProps = {
  languagesData: { code: string; name: string; flag: string }[];
  regionsData: { code: string; name: string; currency: string; symbol: string }[];
  timezonesData: { code: string; name: string; cities: string }[];
  language: string;
  region: string;
  timezone: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  setRegion: React.Dispatch<React.SetStateAction<string>>;
  setTimezone: React.Dispatch<React.SetStateAction<string>>;
  handleSaveLanguage: () => void;
};

const LanguageSettings = ({
  languagesData,
  regionsData,
  timezonesData,
  language,
  region,
  timezone,
  setLanguage,
  setRegion,
  setTimezone,
  handleSaveLanguage
}: LanguageSettingsProps) => {
  const { t } = useLanguage();

  return (
    <Card className="mb-6" id="language">
      <CardHeader>
        <CardTitle>{t.languageRegion}</CardTitle>
        <CardDescription>{t.customizeLanguage}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="language" className="text-sm font-medium">{t.appLanguage}</label>
          <select 
            id="language" 
            className="w-full px-3 py-2 rounded-md border border-input bg-background"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {languagesData.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.flag} {lang.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="region" className="text-sm font-medium">{t.region}</label>
          <select 
            id="region" 
            className="w-full px-3 py-2 rounded-md border border-input bg-background"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            {regionsData.map((reg) => (
              <option key={reg.code} value={reg.code}>
                {reg.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="timezone" className="text-sm font-medium">{t.timezone}</label>
          <select 
            id="timezone" 
            className="w-full px-3 py-2 rounded-md border border-input bg-background"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
          >
            {timezonesData.map((tz) => (
              <option key={tz.code} value={tz.code}>
                {tz.name} ({tz.cities})
              </option>
            ))}
          </select>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSaveLanguage}>{t.saveSettings}</Button>
      </CardFooter>
    </Card>
  );
};

export default LanguageSettings;
