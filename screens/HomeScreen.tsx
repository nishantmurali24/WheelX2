import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import BackgroundWrapper from '../components/BackgroundWrapper';
import { useTheme } from '../context/ThemeContext';

const DashboardScreen = () => {
  const userName = "John Doe";
  const batteryLevel = 80;
  const systemStatus = "Active";
  const lastActivity = "2 hours ago";
  const wheelchairSpeed = "1.2 mph";
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <Text style={[styles.welcomeText, { color: isDark ? '#fff' : '#000' }]}>Welcome, {userName}!</Text>

        <View style={styles.topSection}>
          <View style={styles.batteryContainer}>
            <Svg height="120" width="120" viewBox="0 0 100 100">
              <Circle cx="50" cy="50" r="40" stroke="#444" strokeWidth="8" fill="none" />
              <Circle
                cx="50"
                cy="50"
                r="40"
                stroke="#4CAF50"
                strokeWidth="8"
                fill="none"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 * (1 - batteryLevel / 100)}
                strokeLinecap="round"
              />
            </Svg>
            <Text style={[styles.batteryText, { color: isDark ? 'white' : 'black' }]}>{batteryLevel}%</Text>
          </View>

          <View style={[styles.card, isDark ? styles.darkCard : styles.lightCard]}>
            <Text style={[styles.cardTitle, { color: isDark ? '#fff' : '#000' }]}>System Status</Text>
            <Text style={[styles.cardContent, { color: isDark ? '#ddd' : '#333' }]}>{systemStatus}</Text>
          </View>
        </View>

        <View style={styles.middleSection}>
          <View style={[styles.card, isDark ? styles.darkCard : styles.lightCard]}>
            <Text style={[styles.cardTitle, { color: isDark ? '#fff' : '#000' }]}>Last Activity</Text>
            <Text style={[styles.cardContent, { color: isDark ? '#ddd' : '#333' }]}>{lastActivity}</Text>
          </View>

          <View style={[styles.card, isDark ? styles.darkCard : styles.lightCard]}>
            <Text style={[styles.cardTitle, { color: isDark ? '#fff' : '#000' }]}>Speed</Text>
            <Text style={[styles.cardContent, { color: isDark ? '#ddd' : '#333' }]}>{wheelchairSpeed}</Text>
          </View>
        </View>

        <View style={styles.buttonsContainer}>
          {['Driving Stats', 'Charging Stats', 'Locate Wheelchair'].map(label => (
            <TouchableOpacity
              key={label}
              style={[styles.button, isDark ? styles.darkButton : styles.lightButton]}
              onPress={() => {}}
            >
              <Text style={[styles.buttonText, { color: isDark ? '#fff' : '#000' }]}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  middleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  batteryContainer: {
    alignItems: 'center',
    width: '45%',
  },
  batteryText: {
    fontSize: 18,
    fontWeight: 'bold',
    position: 'absolute',
    top: '40%',
  },
  card: {
    padding: 20,
    borderRadius: 12,
    width: '45%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
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
  buttonsContainer: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
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
});


export default DashboardScreen;