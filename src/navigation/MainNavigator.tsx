import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useNavigationState } from '@react-navigation/native';

const MainNavigator: React.FC = () => {
  const navigation = useNavigation();
  const navigationState = useNavigationState(state => state);

  const handleBackPress = () => {
    const canGoBack = navigationState.routes.length > 1;
    if (canGoBack) {
      navigation.goBack();
    } else {
      navigation.navigate('MainMenu');
    }
  };

  const handleLogoPress = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainMenu' }],
    });
  };

  return (
    <View style={styles.container}>
      <SideMenu visible={true} /> {/* Принудительно показываем боковое меню */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <BackIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogoPress}>
          <AppLogo />
        </TouchableOpacity>
      </View>
      {/* Основной контент */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    zIndex: 2,
  }
}); 