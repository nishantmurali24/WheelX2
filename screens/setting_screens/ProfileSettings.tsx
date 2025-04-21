import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import { useTheme } from '../../context/ThemeContext';

const ProfileSettingsScreen = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
      <Text style={[styles.cardTitle, { color: isDark ? '#fff' : '#000' }]}>Profile Settings</Text>

        <View style={[styles.card, isDark ? styles.darkCard : styles.lightCard]}>

          <View style={styles.row}>
            <Text style={[styles.label, { color: isDark ? '#aaa' : '#555' }]}>Name:</Text>
            <Text style={[styles.value, { color: isDark ? '#fff' : '#000' }]}>Nishant Murali</Text>
          </View>

          <View style={styles.row}>
            <Text style={[styles.label, { color: isDark ? '#aaa' : '#555' }]}>Email:</Text>
            <Text style={[styles.value, { color: isDark ? '#fff' : '#000' }]}>nishant_murali@tamu.edu</Text>
          </View>

          <View style={styles.row}>
            <Text style={[styles.label, { color: isDark ? '#aaa' : '#555' }]}>Phone:</Text>
            <Text style={[styles.value, { color: isDark ? '#fff' : '#000' }]}>+1 (405) 697-XXXX</Text>
          </View>

          <View style={styles.row}>
            <Text style={[styles.label, { color: isDark ? '#aaa' : '#555' }]}>Account Created:</Text>
            <Text style={[styles.value, { color: isDark ? '#fff' : '#000' }]}>January 15, 2025</Text>
          </View>
        </View>
      </View>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    width: '100%',
  },
  card: {
    padding: 20,
    borderRadius: 12,
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  darkCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  lightCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  cardTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  row: {
    marginBottom: 10,
  },
  label: {
    fontSize: 20,
    marginBottom: 2,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ProfileSettingsScreen;


