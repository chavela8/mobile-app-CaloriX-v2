import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { CurrentPlanInfo } from '../../components/CurrentPlanInfo';
import { SubscriptionButtons } from '../../components/SubscriptionButtons';
import { PlanBenefits } from '../../components/PlanBenefits';
import { BenefitItem } from '../../components/BenefitItem';
import { styles } from '../../styles/styles';

const SubscriptionManager: React.FC = () => {
  const [currentPlan, setCurrentPlan] = useState<SubscriptionPlan | null>(null);

  useEffect(() => {
    loadCurrentPlan();
  }, []);

  return (
    <View style={styles.container}>
      <CurrentPlanInfo plan={currentPlan} />
      <SubscriptionButtons />
      <PlanBenefits />
    </View>
  );
};

const PlanBenefits: React.FC = () => {
  const benefits = [
    'Персональный AI-тренер',
    'Неограниченные рецепты',
    'Расширенная аналитика',
    // ... другие преимущества
  ];

  return (
    <View style={styles.benefitsContainer}>
      {benefits.map((benefit, index) => (
        <BenefitItem key={index} text={benefit} />
      ))}
    </View>
  );
};

export default SubscriptionManager; 