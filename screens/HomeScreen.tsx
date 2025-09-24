import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BackgroundWrapper from '../components/BackgroundWrapper';
import { useTheme } from '../context/ThemeContext';

const ESP32_IP = 'http://10.250.149.119';


const DashboardScreen = () => {
  const userName = "John Doe";
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const connectionStatus = "connected";

  const [temperature, setTemperature] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [lastActivity, setLastActivity] = useState("—");
  const [rideTime, setRideTime] = useState(0); // total ride time in seconds
  const [lastCommandTime, setLastCommandTime] = useState(null); // timestamp of last motor command

  useEffect(() => {
  const fetchTemperature = async () => {
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=30.6187&longitude=-96.3383&hourly=temperature_2m&temperature_unit=fahrenheit`
      );
      const data = await res.json();
      // take the first hour's temperature as current
      setTemperature(data.hourly.temperature_2m[0]);
    } catch (err) {
      console.error("Error fetching weather:", err);
    }
  };

  fetchTemperature();

  // refresh every hour
  const interval = setInterval(fetchTemperature, 60 * 60 * 1000);
  return () => clearInterval(interval);
}, []);


  useEffect(() => {
  // This interval runs every second
  const interval = setInterval(async () => {
    try {
      const res = await fetch(`${ESP32_IP}/status`);
      const data = await res.json();
      const now = Date.now();

      // If motors are active, update last command time
      if (data.motorsActive) {
        setLastActivity(new Date(now).toLocaleTimeString());
        setLastCommandTime(now);
      }

      // Wheelchair is active if within 30s of last command
      const active = lastCommandTime && now - lastCommandTime <= 30 * 1000;
      setIsActive(active);

      // Increment ride time while active
      if (active) {
        setRideTime(prev => prev + 1); // increment by 1 second
      }

    } catch (err) {
      console.error("Error fetching status:", err);
    }
  }, 1000); // every second

  return () => clearInterval(interval);
}, [lastCommandTime]);


  const handleEmergency = () => {
    alert('Emergency alert sent!');
  };

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        {/* Welcome */}
        <Text style={[styles.welcomeText, { color: isDark ? '#fff' : '#000' }]}>
          Welcome, {userName}!
        </Text>

       {/* Middle: Tesla-style big status */}
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusCircle,
              { backgroundColor: isActive ? '#4CAF50' : '#1c1c1cff' }, // green when active, dark when dormant
            ]}
          >
            <Text style={styles.statusText}>
              {isActive ? 'Active' : 'Dormant'}
            </Text>
            <Text style={styles.speedText}>
              {isActive ? 'Moving motors' : 'Stopped'}
            </Text>
            <Text style={styles.subText}>
              Last: {lastActivity}
            </Text>
          </View>
        </View>


        {/* Top section: Battery + Weather */}
        <View style={styles.row}>
          <View style={[styles.card, isDark ? styles.darkCard : styles.lightCard]}>
            <Text style={[styles.cardTitle, { color: isDark ? '#fff' : '#000' }]}>Status</Text>
            <Text style={[styles.cardContent, { color: isDark ? '#ddd' : '#333' }]}>{connectionStatus}</Text>
          </View>

          <View style={[styles.card, isDark ? styles.darkCard : styles.lightCard]}>
            <Text style={[styles.cardTitle, { color: isDark ? '#fff' : '#000' }]}>Weather</Text>
            <Text style={[styles.cardContent, { color: isDark ? '#ddd' : '#333' }]}>
              {temperature !== null ? `${temperature}°F` : 'Loading...'}
            </Text>
          </View>
        </View>

        {/* Middle section: Connection + Ride Time */}
        <View style={styles.row}>
          <View style={[styles.card, isDark ? styles.darkCard : styles.lightCard]}>
            <Text style={[styles.cardTitle, { color: isDark ? '#fff' : '#000' }]}>Last</Text>
            <Text style={[styles.cardContent, { color: isDark ? '#ddd' : '#333' }]}>{lastActivity}</Text>
          </View>
          <View style={[styles.card, isDark ? styles.darkCard : styles.lightCard]}>
            <Text style={[styles.cardTitle, { color: isDark ? '#fff' : '#000' }]}>Ride Time</Text>
            <Text style={[styles.cardContent, { color: isDark ? '#ddd' : '#333' }]}>
              {Math.floor(rideTime / 60)}m {rideTime % 60}s
            </Text>
          </View>
        </View>

        {/* Emergency button pinned at bottom */}
        <TouchableOpacity style={styles.emergencyButton} onPress={handleEmergency}>
          <Text style={styles.emergencyText}>EMERGENCY</Text>
        </TouchableOpacity>
      </View>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    paddingTop: 60,
    justifyContent: 'flex-start',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  batteryContainer: {
    alignItems: 'center',
    width: '45%',
  },
  batteryText: {
    fontSize: 16,
    fontWeight: 'bold',
    position: 'absolute',
    top: '38%',
  },
  card: {
    padding: 15,
    borderRadius: 12,
    width: '45%',
    alignItems: 'center',
  },
  darkCard: { backgroundColor: '#000' },
  lightCard: { backgroundColor: 'rgba(0,0,0,0.05)' },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardContent: {
    fontSize: 14,
  },
  statusContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusCircle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  statusText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  speedText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  subText: {
    fontSize: 14,
    color: 'white',
  },
  buttonsContainer: {
    width: '100%',
    marginTop: 15,
    alignItems: 'center',
  },
  button: {
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: '80%',
    alignItems: 'center',
  },
  darkButton: { backgroundColor: '#000' },
  lightButton: { backgroundColor: 'rgba(0,0,0,0.05)' },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  emergencyButton: {
    backgroundColor: '#D32F2F',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 'auto',
  },
  emergencyText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default DashboardScreen;
