import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import BackgroundWrapper from '../components/BackgroundWrapper';
import { useTheme } from '../context/ThemeContext';

const { width, height } = Dimensions.get('window');
const loadingThreshold = Platform.OS === 'ios' ? 0.88 : 0.78;

const JAVASCRIPT_TO_DISABLE_ZOOM = `
  (function() {
    const meta = document.createElement('meta');
    meta.setAttribute('content', 'width=${width}, user-scalable=no');
    meta.setAttribute('name', 'viewport');
    document.getElementsByTagName('head')[0].appendChild(meta);
  })();
`;

const ESP32_S3_IP = 'http://10.251.92.164';

export function LiveStreamingView() {
  const [statusMessage, setStatusMessage] = useState('');
  const [progress, setProgress] = useState(0);
  const [isError, setIsError] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const sendCommand = async (command) => {
    try {
      await fetch(`${ESP32_S3_IP}/command`, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: command,
      });

      const pretty = {
        forward: 'Moving forward',
        backward: 'Moving backward',
        left: 'Turning left',
        right: 'Turning right',
        stop: 'Stopping motors',
      };
      setStatusMessage(pretty[command] || `Sent: ${command}`);
    } catch (error) {
      console.error('Error sending command:', error);
      setStatusMessage('Failed to send command');
    }
  };

  const handleCommandPressIn = (command) => sendCommand(command);
  const handleCommandPressOut = () => sendCommand('stop');

  if (isError)
    return (
      <Text style={{ color: 'red', fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginTop: 50 }}>
        Error loading stream
      </Text>
    );

  return (
    <BackgroundWrapper>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={[styles.title, { color: isDark ? 'white' : 'black' }]}>Camera View</Text>

        <View style={styles.streamContainer}>
          <WebView
            source={{ uri: 'http://10.169.1.62' }}
            style={styles.streamVideo}
            javaScriptEnabled
            domStorageEnabled
            originWhitelist={['*']}
            mixedContentMode="always"
            onError={() => setIsError(true)}
            onLoadProgress={({ nativeEvent }) => setProgress(nativeEvent.progress)}
            renderLoading={() => (progress < loadingThreshold ? <Text>Loading...</Text> : <></>)}
            onLoad={() => console.log('Stream loaded successfully')}
            startInLoadingState
            bounces={false}
            scrollEnabled={false}
            injectedJavaScript={JAVASCRIPT_TO_DISABLE_ZOOM}
          />
        </View>

        {['↑', '← →', '↓'].map((labelRow, i) => (
          <View key={i} style={styles.buttonRow}>
            {labelRow.split(' ').map((label, j) => (
              <TouchableOpacity
                key={j}
                style={[styles.button, isDark ? styles.darkButton : styles.lightButton]}
                onPressIn={() => {
                  switch (label) {
                    case '↑': handleCommandPressIn('forward'); break;
                    case '↓': handleCommandPressIn('backward'); break;
                    case '←': handleCommandPressIn('left'); break;
                    case '→': handleCommandPressIn('right'); break;
                    default: break;
                  }
                }}
                onPressOut={handleCommandPressOut}
              >
                <Text style={[styles.buttonText, { color: isDark ? 'white' : 'black' }]}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {/* Live ESP32 status message */}
        <View style={{ paddingBottom: 40 }}>
          <Text style={{
            fontSize: 16,
            padding: 10,
            textAlign: 'center',
            backgroundColor: isDark ? '#444' : '#eee',
            color: isDark ? '#fff' : '#000',
            borderRadius: 10,
            overflow: 'hidden',
          }}>
            {statusMessage || 'Waiting for command...'}
          </Text>
        </View>
      </ScrollView>
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  streamContainer: {
    width: width * 0.8,
    height: height * 0.35,
    marginBottom: 20,
    overflow: 'hidden',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'gray',
  },
  
  streamVideo: {
    flex: 1,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'black',
  },
  
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    borderRadius: 50,
    marginVertical: -7.5,
    marginHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  lightButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  buttonText: {
    fontSize: 25,
  },
});

export default LiveStreamingView;
