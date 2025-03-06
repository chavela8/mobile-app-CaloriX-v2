import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';

// Типы для языковых ресурсов
interface TranslationKeys {
  profile: string;
  achievements: string;
  aiRecommendations: string;
  planning: string;
  statistics: string;
  progress: string;
  nutrition: string;
  foodDiary: string;
  [key: string]: string;
}

interface Resources {
  [language: string]: {
    translation: TranslationKeys;
  };
}

// Загрузка языковых файлов динамически
const loadLanguageResources = async (language: string) => {
  try {
    const module = await import(`./translations/${language}.json`);
    return module.default;
  } catch (error) {
    console.error(`Failed to load language: ${language}`, error);
    return null;
  }
};

// Инициализация локализации
export const setupLocalization = async () => {
  const fallbackLanguage = 'en';
  const savedLanguage = await AsyncStorage.getItem('userLanguage');
  const deviceLanguage = RNLocalize.getLocales()[0].languageCode;
  const initialLanguage = savedLanguage || deviceLanguage || fallbackLanguage;

  const resources: Resources = {};
  
  // Загружаем основной и запасной языки
  const [primaryLang, fallbackLang] = await Promise.all([
    loadLanguageResources(initialLanguage),
    loadLanguageResources(fallbackLanguage)
  ]);

  resources[initialLanguage] = { translation: primaryLang };
  resources[fallbackLanguage] = { translation: fallbackLang };

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: initialLanguage,
      fallbackLng: fallbackLanguage,
      interpolation: {
        escapeValue: false
      },
      react: {
        useSuspense: false
      }
    });

  return i18n;
};

// Смена языка с перезагрузкой интерфейса
export const changeLanguage = async (language: string): Promise<void> => {
  try {
    const newResources = await loadLanguageResources(language);
    if (!newResources) {
      throw new Error(`Language resources not found for: ${language}`);
    }

    i18n.addResourceBundle(language, 'translation', newResources);
    await i18n.changeLanguage(language);
    await AsyncStorage.setItem('userLanguage', language);

    // Отправляем событие для обновления компонентов
    EventEmitter.emit('LANGUAGE_CHANGED', language);
  } catch (error) {
    console.error('Failed to change language:', error);
    throw error;
  }
};

// Хук для получения текущего языка
export const useCurrentLanguage = () => {
  return i18n.language;
};

// Проверка поддержки языка
export const isLanguageSupported = (language: string): boolean => {
  const supportedLanguages = [
    'ru', 'en', 'es', 'fr', 'de', 'pt', 'it', 'tr', 'el', 'nl',
    'ar', 'zh', 'ja', 'ko', 'vi', 'th', 'hi', 'bn', 'jv', 'kk',
    'uk', 'be', 'sr', 'pl', 'hu', 'ro', 'az', 'hy', 'ka', 'cs',
    'sk', 'lt', 'lv', 'et', 'uz', 'ky', 'tk'
  ];
  return supportedLanguages.includes(language);
};

// Утилита для форматирования текста
export const formatTranslation = (key: keyof TranslationKeys, options?: object) => {
  return i18n.t(key, options);
}; 