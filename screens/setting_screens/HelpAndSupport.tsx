import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BackgroundWrapper from '../../components/BackgroundWrapper';
import { useTheme } from '../../context/ThemeContext';

const HelpAndSupport = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <Text style={[styles.title, { color: isDark ? 'white' : 'black' }]}>Help & Support</Text>

        <View style={[styles.card, isDark ? styles.darkCard : styles.lightCard]}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#ccc' : '#333' }]}>FAQs</Text>
          <Text style={[styles.faqQ, { color: isDark ? '#fff' : '#000' }]}>Q: How do I connect to the wheelchair?</Text>
          <Text style={[styles.faqA, { color: isDark ? '#ccc' : '#444' }]}>A: Make sure you're connected to the same Wi-Fi as the device.</Text>

          <Text style={[styles.faqQ, { color: isDark ? '#fff' : '#000' }]}>Q: What if the camera doesn’t load?</Text>
          <Text style={[styles.faqA, { color: isDark ? '#ccc' : '#444' }]}>A: Ensure the ESP32-CAM is powered and reachable at the correct IP.</Text>
        </View>

        <View style={[styles.card, isDark ? styles.darkCard : styles.lightCard]}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#ccc' : '#333' }]}>Contact</Text>
          <Text style={[styles.contact, { color: isDark ? '#fff' : '#000' }]}>Email: support@wheelx.com</Text>
          <Text style={[styles.contact, { color: isDark ? '#fff' : '#000' }]}>Phone: +1 (800) 555-1212</Text>
        </View>
      </View>
    </BackgroundWrapper>
  );
};

export default HelpAndSupport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: '600',
    marginBottom: 10,
    justifyContent: 'center', 
  },
  faqQ: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  faqA: {
    marginBottom: 10,
  },
  contact: {
    fontSize: 16,
    marginTop: 5,
  },
  card: {
    padding: 20,
    borderRadius: 12,
    width: '100%',
    marginBottom: 15,
  },
  darkCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  lightCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
});
