import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SearchBar from '../../components/SearchBar';
import AIInsights from '../../components/AIInsights';

const NutritionDiary: React.FC = () => {
  const handleSearch = async (query: string) => {
    // Реализация поиска
  };

  const handleScan = async () => {
    // Реализация сканирования
  };

  const handleVoiceInput = async () => {
    // Реализация голосового ввода
  };

  return (
    <View style={styles.container}>
      <SearchBar
        onSearch={handleSearch}
        onScan={handleScan}
        onVoiceInput={handleVoiceInput}
      />
      <AIInsights />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default NutritionDiary; 