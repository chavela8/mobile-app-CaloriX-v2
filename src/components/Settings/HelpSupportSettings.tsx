
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";

type HelpSupportSettingsProps = {
  handleSectionClick: (section: string) => void;
};

const HelpSupportSettings = ({ handleSectionClick }: HelpSupportSettingsProps) => {
  const { t } = useLanguage();

  return (
    <Card id="help">
      <CardHeader>
        <CardTitle>{t.helpSupport}</CardTitle>
        <CardDescription>{t.getHelp}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => handleSectionClick(t.supportCenter)}>
          <h4 className="font-medium mb-1">{t.supportCenter}</h4>
          <p className="text-sm text-muted-foreground">{t.faqInstructions}</p>
        </div>

        <div className="p-4 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => handleSectionClick(t.contactUs)}>
          <h4 className="font-medium mb-1">{t.contactUs}</h4>
          <p className="text-sm text-muted-foreground">{t.contactSupport}</p>
        </div>

        <div className="p-4 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => handleSectionClick(t.tutorials)}>
          <h4 className="font-medium mb-1">{t.tutorials}</h4>
          <p className="text-sm text-muted-foreground">{t.tutorialDescription}</p>
        </div>

        <div className="p-4 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => handleSectionClick(t.reportProblem)}>
          <h4 className="font-medium mb-1">{t.reportProblem}</h4>
          <p className="text-sm text-muted-foreground">{t.reportBugs}</p>
        </div>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-muted-foreground">
          <p>{t.appVersion}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default HelpSupportSettings;
