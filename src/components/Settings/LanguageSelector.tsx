import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import { changeLanguage, useCurrentLanguage, isLanguageSupported } from '../../utils/localization';

const LanguageSelector: React.FC = () => {
  const { t } = useTranslation();
  const currentLanguage = useCurrentLanguage();
  const [isLoading, setIsLoading] = useState(false);

  const handleLanguageChange = async (language: string) => {
    if (!isLanguageSupported(language)) return;
    
    setIsLoading(true);
    try {
      await changeLanguage(language);
    } catch (error) {
      console.error('Failed to change language:', error);
      // Показать ошибку пользователю
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('settings.language')}</Text>
      {isLoading ? (
        <ActivityIndicator size="small" color="#0000ff" />
      ) : (
        <View style={styles.languageList}>
          {/* Пример нескольких языков */}
          <LanguageButton 
            language="en"
            title="English"
            isSelected={currentLanguage === 'en'}
            onPress={() => handleLanguageChange('en')}
          />
          <LanguageButton 
            language="ru"
            title="Русский"
            isSelected={currentLanguage === 'ru'}
            onPress={() => handleLanguageChange('ru')}
          />
          {/* Добавьте остальные языки */}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  languageList: {
    gap: 8,
  },
});

export default LanguageSelector; 