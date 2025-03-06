import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

interface ProfileHeaderProps {
  username: string;
  level: number;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ username, level }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.level}>
        {t('profile.level', { level })}
      </Text>
      <Text style={styles.description}>
        {t('profile.description')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  level: {
    fontSize: 16,
    color: '#666',
  },
  description: {
    marginTop: 8,
    textAlign: 'center',
  },
});

export default ProfileHeader; 