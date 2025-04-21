import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import RemoteControlScreen from './screens/RemoteControlScreen';
import  HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import { ThemeProvider } from './context/ThemeContext';
import SettingsStack from './screens/SettingsStack'; 


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function AppNavigator({ setIsAuthenticated }: { setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: 'black', // Makes the tab bar black
          },
          tabBarActiveTintColor: 'white', // Active tab color
          tabBarInactiveTintColor: 'gray', // Inactive tab color
          headerStyle: { backgroundColor: 'black' }, // Header background black
          headerTitleStyle: { color: 'white' }, // Header text color
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen
          name="Controls"
          component={RemoteControlScreen}
        />
        <Tab.Screen
          name="Settings"
          children={() => <SettingsStack onLogout={() => setIsAuthenticated(false)} />}
        />
      </Tab.Navigator>
    </View>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isAuthenticated ? (
            <Stack.Screen name="Login">
              {(props) => <LoginScreen {...props} onLogin={() => setIsAuthenticated(true)} />}
            </Stack.Screen>
          ) : (
            <Stack.Screen name="Home">
              {(props) => <AppNavigator {...props} setIsAuthenticated={setIsAuthenticated} />}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
