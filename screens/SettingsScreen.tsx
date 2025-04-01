import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Switch } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

// Define the props for SettingsScreen
type SettingsScreenProps = {
  navigation: NavigationProp<any>;  // This will give you access to navigation methods like 'navigate'
  onLogout: () => void;
};

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation, onLogout }) => {
  const [isDarkMode, setIsDarkMode] = useState(false); // State for theme toggle

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <ImageBackground
      source={require('../assets/Loginbp.jpg')} // Background image
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Settings</Text>

        {/* Settings Options */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ProfileSettings')}
          >
            <Text style={styles.buttonText}>Profile Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('PrivacySettings')}
          >
            <Text style={styles.buttonText}>Privacy Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('HelpAndSupport')}
          >
            <Text style={styles.buttonText}>Help & Support</Text>
          </TouchableOpacity>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Theme</Text>
            <View style={styles.themeSwitchContainer}>
              <Text style={styles.cardContent}>Dark Mode</Text>
              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={onLogout}
          >
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
    width: '90%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 30,
    textAlign: 'center',
  },
  optionsContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Translucent button
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Translucent card for Theme toggle
    padding: 20,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  cardContent: {
    fontSize: 16,
    color: '#ddd',
  },
  themeSwitchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});

export default SettingsScreen;
