import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import BackgroundWrapper from '../components/BackgroundWrapper';

type SettingsScreenProps = {
  navigation: NavigationProp<any>;
  onLogout: () => void;
};

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation, onLogout }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <View style={styles.optionsContainer}>
          <TouchableOpacity style={[styles.button, isDark ? styles.darkButton : styles.lightButton]} onPress={() => navigation.navigate('ProfileSettings')}>
            <Text style={[styles.buttonText, { color: isDark ? '#fff' : '#000' }]}>Profile Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, isDark ? styles.darkButton : styles.lightButton]} onPress={() => navigation.navigate('PrivacySettings')}>
            <Text style={[styles.buttonText, { color: isDark ? '#fff' : '#000' }]}>Privacy Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, isDark ? styles.darkButton : styles.lightButton]} onPress={() => navigation.navigate('HelpAndSupport')}>
            <Text style={[styles.buttonText, { color: isDark ? '#fff' : '#000' }]}>Help & Support</Text>
          </TouchableOpacity>

          <View style={[styles.card, isDark ? styles.darkCard : styles.lightCard]}>
            <Text style={[styles.cardTitle, { color: isDark ? '#fff' : '#000' }]}>Theme</Text>
            <View style={styles.themeSwitchContainer}>
              <Text style={[styles.cardContent, { color: isDark ? '#ddd' : '#333' }]}>Dark Mode</Text>
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isDark ? '#f5dd4b' : '#f4f3f4'}
              />
            </View>
          </View>

          <TouchableOpacity style={[styles.button, isDark ? styles.darkButton : styles.lightButton]} onPress={onLogout}>
            <Text style={[styles.buttonText, { color: isDark ? '#fff' : '#000' }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center',     // Center horizontally
    paddingHorizontal: 20,
    width: '100%',
  },
  optionsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
  },
  darkButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  lightButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    padding: 20,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
    marginBottom: 15,
  },
  darkCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  lightCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardContent: {
    fontSize: 16,
  },
  themeSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});

export default SettingsScreen;