interface SettingsItemProps {
  text: string;
  maxLines?: number;
}

const SettingsItem: React.FC<SettingsItemProps> = ({ text, maxLines = 2 }) => {
  return (
    <Text
      style={styles.settingsText}
      numberOfLines={maxLines}
      adjustsFontSizeToFit
    >
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  settingsText: {
    fontSize: 16,
    lineHeight: 24,
    flexShrink: 1,
    paddingHorizontal: 16,
  }
}); 