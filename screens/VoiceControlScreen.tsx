import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import BackgroundWrapper from '../components/BackgroundWrapper';
import { useTheme } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

export function VoiceDirectionScreen() {
  const [inferredDirection, setInferredDirection] = useState('Waiting for command...');
  const [listening, setListening] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Called when the user taps the "Talk" button
  const toggleListening = () => {
    setListening(!listening);

    // Placeholder: simulate voice command detection
    if (!listening) {
      // Here you would start voice recognition
      // Example simulation:
      setTimeout(() => {
        setInferredDirection('Forward'); // Replace with detected command
      }, 1500);
    } else {
      setInferredDirection('Waiting for command...');
    }
  };

  const handleEmergency = () => {
    alert('Emergency alert sent!');
  };

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <Text style={[styles.title, { color: isDark ? 'white' : 'black' }]}>
          Voice Direction Control
        </Text>

        <View style={styles.directionBox}>
          <Text style={[styles.directionText, { color: isDark ? 'white' : 'black' }]}>
            {inferredDirection}
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.talkButton, listening ? styles.activeButton : styles.inactiveButton]}
          onPress={toggleListening}
        >
          <Text style={styles.talkButtonText}>{listening ? 'Listening...' : 'Talk'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.emergencyButton} onPress={handleEmergency}>
          <Text style={styles.emergencyText}>EMERGENCY</Text>
        </TouchableOpacity>
      </View>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  directionBox: {
    width: width * 0.6,
    height: width * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#888',
    backgroundColor: '#f0f0f0',
    marginBottom: 40,
  },
  directionText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  talkButton: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
  },
  activeButton: {
    backgroundColor: '#4caf50',
  },
  inactiveButton: {
    backgroundColor: '#2196f3',
  },
  talkButtonText: {
    color: 'white',
    fontSize: 18,
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

export default VoiceDirectionScreen;
