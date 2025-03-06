
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/LanguageContext";

type SubscriptionSettingsProps = {
  currency: {
    code: string;
    symbol: string;
  };
  calculatePrice: (priceInRub: number) => string | number;
  handleSubscribe: (plan: string) => void;
};

const SubscriptionSettings = ({ currency, calculatePrice, handleSubscribe }: SubscriptionSettingsProps) => {
  const { t } = useLanguage();

  return (
    <Card className="mb-6" id="billing">
      <CardHeader>
        <CardTitle>{t.subscriptionBilling}</CardTitle>
        <CardDescription>{t.manageSubscription}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 p-4 border rounded-md">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h4 className="font-medium">{t.currentPlanTitle}</h4>
              <p className="text-sm text-muted-foreground">{t.freePlan}</p>
            </div>
            <Badge variant="outline">{t.active}</Badge>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              <span className="text-sm">{t.basicTracking}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              <span className="text-sm">{t.limitedHistory}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              <span className="text-sm">{t.basicReports}</span>
            </div>
          </div>
        </div>

        <h4 className="font-medium mb-4">{t.availablePlans}</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 border rounded-md hover:border-primary cursor-pointer transition-colors">
            <h5 className="font-medium mb-2">{t.premiumPlan}</h5>
            <p className="text-xl font-bold mb-2">{currency.symbol}{calculatePrice(299)}<span className="text-sm font-normal text-muted-foreground">/{t.month}</span></p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span className="text-sm">{t.advancedAnalytics}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span className="text-sm">{t.personalCoaching}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span className="text-sm">{t.unlimitedAccess}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span className="text-sm">{t.noAds}</span>
              </div>
            </div>
            <Button className="w-full" onClick={() => handleSubscribe(t.premiumPlan)}>{t.subscribeTo} {t.premiumPlan}</Button>
          </div>

          <div className="p-4 border rounded-md hover:border-primary cursor-pointer transition-colors">
            <h5 className="font-medium mb-2">{t.yearlyPlan}</h5>
            <p className="text-xl font-bold mb-2">{currency.symbol}{calculatePrice(2499)}<span className="text-sm font-normal text-muted-foreground">/{t.year}</span></p>
            <Badge className="mb-2">{t.savings}</Badge>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span className="text-sm">{t.premiumFeatures}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span className="text-sm">{t.prioritySupport}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span className="text-sm">{t.dataExport}</span>
              </div>
            </div>
            <Button className="w-full" onClick={() => handleSubscribe(t.yearlyPlan)}>{t.subscribeTo} {t.yearlyPlan}</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionSettings;
