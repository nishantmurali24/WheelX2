import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Dimensions, Platform } from 'react-native';
import { WebView } from 'react-native-webview';  // Import WebView

const { width, height } = Dimensions.get('window'); // Get screen dimensions

const loadingThreshold = Platform.OS === 'ios' ? 0.88 : 0.78; // Adjust threshold

const JAVASCRIPT_TO_DISABLE_ZOOM = `
  (function() {
    const meta = document.createElement('meta');
    meta.setAttribute('content', 'width=${width}, user-scalable=no');
    meta.setAttribute('name', 'viewport');
    document.getElementsByTagName('head')[0].appendChild(meta);
  })();
`;

export function LiveStreamingView() {
  const [progress, setProgress] = useState(0);  // Track loading progress
  const [isError, setIsError] = useState(false); // Error state

  const handleForward = () => console.log("Move forward");
  const handleBackward = () => console.log("Move backward");
  const handleLeft = () => console.log("Move left");
  const handleRight = () => console.log("Move right");

  if (isError) return <Text style={styles.errorMessage}>Error loading stream</Text>;

  return (
    <ImageBackground 
      source={require('../assets/Loginbp.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Camera View</Text>

        {/* MJPEG stream using WebView with progress and error handling */}
        <View style={styles.streamContainer}>
          <WebView
            source={{ uri: 'http://10.169.0.13' }}  // Replace with your MJPG stream URL
            style={styles.streamVideo}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            originWhitelist={['*']}  // Allow cross-origin requests
            mixedContentMode="always" // For mixed HTTP/HTTPS content
            onError={() => setIsError(true)}
            onLoadProgress={({ nativeEvent }) => setProgress(nativeEvent.progress)} // Track load progress
            renderLoading={() => (progress < loadingThreshold ? <Text>Loading...</Text> : <></>)}
            onHttpError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.log('HTTP error: ', nativeEvent.statusCode);
            }}
            onLoad={() => console.log('Stream loaded successfully')}
            startInLoadingState={true}
            bounces={false}
            scrollEnabled={false}
            setBuiltInZoomControls={false}
            injectedJavaScript={JAVASCRIPT_TO_DISABLE_ZOOM}
            onMessage={() => {}}
          />
        </View>

        {/* Direction control buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={handleForward}>
            <Text style={styles.buttonText}>↑</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={handleLeft}>
            <Text style={styles.buttonText}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleRight}>
            <Text style={styles.buttonText}>→</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button} onPress={handleBackward}>
            <Text style={styles.buttonText}>↓</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 50,
    marginVertical: -7.5,
    marginHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
  },
  streamContainer: {
    marginBottom: 20,
    alignItems: 'center',
    maxHeight: height * 0.4,
  },
  streamVideo: {
    width: width * 0.9,
    height: height * 0.3,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'black', // Background color while loading
  },
  errorMessage: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
  }
});

export default LiveStreamingView;
