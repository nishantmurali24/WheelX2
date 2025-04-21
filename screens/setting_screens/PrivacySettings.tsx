import React from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import { useTheme } from '../../context/ThemeContext';

const PrivacySettings = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <Text style={[styles.title, { color: isDark ? 'white' : 'black' }]}>Privacy Settings</Text>

        {[
          'Share location with caregivers',
          'Allow activity tracking',
          'Enable diagnostics reporting',
        ].map((label, idx) => (
          <View key={idx} style={styles.settingRow}>
            <Text style={[styles.settingLabel, { color: isDark ? '#fff' : '#000' }]}>{label}</Text>
            <Switch value={true} disabled />
          </View>
        ))}
      </View>
    </BackgroundWrapper>
  );
};

export default PrivacySettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
  },
});
