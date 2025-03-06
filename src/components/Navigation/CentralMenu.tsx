import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const SIDE_MENU_WIDTH = 60; // Ширина бокового меню

const CentralMenu: React.FC = () => {
  const screenWidth = Dimensions.get('window').width;
  
  return (
    <View style={[
      styles.container,
      { width: screenWidth - SIDE_MENU_WIDTH }
    ]}>
      <View style={styles.menuContent}>
        {menuItems.map((item, index) => (
          <MenuItem 
            key={index}
            title={item.title}
            icon={item.icon}
            onPress={item.onPress}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: SIDE_MENU_WIDTH,
    top: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
  },
  menuContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
    gap: 12,
  }
}); 