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

  const toggleListening = () => {
    setListening(!listening);

    if (!listening) {
      setTimeout(() => {
        setInferredDirection('Forward');
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
        <Text style={[styles.subtitle, { color: isDark ? '#ccc' : '#333' }]}>
          Press "Talk" and give a command like Forward, Left, Right, or Stop.
        </Text>

        <View style={styles.directionBox}>
          <Text
            style={[styles.directionText, { color: isDark ? 'white' : 'black' }]}
            numberOfLines={2}
          >
            {inferredDirection}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.talkButton,
            listening ? styles.activeButton : styles.inactiveButton,
          ]}
          onPress={toggleListening}
        >
          <Text style={styles.talkButtonText}>
            {listening ? 'Listening...' : 'Talk'}
          </Text>
        </TouchableOpacity>

        {/* Emergency button pinned to bottom */}
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 40,
    paddingTop: 60,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  directionBox: {
    width: width * 0.6,
    height: width * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#888',
    backgroundColor: '#464646ff',
    marginBottom: 40,
    padding: 10,
  },
  directionText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
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
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  talkButtonText: {
    color: 'white',
    fontSize: 18,
    alignItems: 'center',
    fontWeight: 'bold',
  },
  emergencyButton: {
    backgroundColor: '#D32F2F',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 'auto', // ✅ pins to bottom, just like Dashboard
    width: '100%',
  },
  emergencyText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default VoiceDirectionScreen;
