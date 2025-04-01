import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Svg, Circle } from 'react-native-svg';

const DashboardScreen = () => {
  const userName = "John Doe"; // Replace with dynamic user info
  const batteryLevel = 80; // Replace with dynamic data (percentage)
  const systemStatus = "Active"; // Placeholder, replace with real data
  const lastActivity = "2 hours ago"; // Placeholder
  const wheelchairSpeed = "1.2 m/s"; // Placeholder

  return (
    <ImageBackground
      source={require('../assets/Loginbp.jpg')} // Background image
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome, {userName}!</Text>

        <View style={styles.topSection}>
          {/* Battery Health Circle */}
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
            <Text style={styles.batteryText}>{batteryLevel}%</Text>
          </View>

          {/* System Status Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>System Status</Text>
            <Text style={styles.cardContent}>{systemStatus}</Text>
          </View>
        </View>

        <View style={styles.middleSection}>
          {/* Last Activity Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Last Activity</Text>
            <Text style={styles.cardContent}>{lastActivity}</Text>
          </View>

          {/* Wheelchair Speed Indicator */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Speed</Text>
            <Text style={styles.cardContent}>{wheelchairSpeed}</Text>
          </View>
        </View>

        {/* Quick Access Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={() => { /* Navigate to driving stats */ }}>
            <Text style={styles.buttonText}>Driving Stats</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => { /* Charging stats */ }}>
            <Text style={styles.buttonText}>Charging Stats</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => { /* Locate wheelchair */ }}>
            <Text style={styles.buttonText}>Locate Wheelchair</Text>
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
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
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
    color: 'white',
    position: 'absolute',
    top: '40%',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 20,
    borderRadius: 12,
    width: '45%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
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
  buttonsContainer: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // Translucent button
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  emergencyButton: {
    backgroundColor: 'rgba(255, 59, 48, 0.7)', // Translucent emergency button
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default DashboardScreen;
