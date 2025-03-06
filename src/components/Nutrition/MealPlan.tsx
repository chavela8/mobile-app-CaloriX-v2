import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { formatTranslation } from '../../utils/localization';

interface Meal {
  id: string;
  name: string;
  calories: number;
  time: string;
}

const MealPlan: React.FC<{ meals: Meal[] }> = ({ meals }) => {
  const { t } = useTranslation();

  const renderMeal = ({ item }: { item: Meal }) => (
    <View style={styles.mealItem}>
      <Text style={styles.mealTime}>{item.time}</Text>
      <Text style={styles.mealName}>
        {formatTranslation('meals.name', { name: item.name })}
      </Text>
      <Text style={styles.mealCalories}>
        {t('meals.calories', { count: item.calories })}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('nutrition.mealPlanTitle')}</Text>
      <FlatList
        data={meals}
        renderItem={renderMeal}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
  },
  list: {
    padding: 16,
  },
  mealItem: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 8,
  },
  mealTime: {
    fontSize: 14,
    color: '#666',
  },
  mealName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  mealCalories: {
    fontSize: 14,
    color: '#333',
  },
});

export default MealPlan; 