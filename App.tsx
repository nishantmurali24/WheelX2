import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
enableScreens();

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RemoteControlScreen from './screens/RemoteControlScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import { ThemeProvider } from './context/ThemeContext';
import SettingsStack from './screens/SettingsStack'; 
import VoiceControlScreen from './screens/VoiceControlScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AppNavigator({ setIsAuthenticated }: { setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: 'black' },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        headerStyle: { backgroundColor: 'black' },
        headerTitleStyle: { color: 'white' },
      }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Voice Controls" component={VoiceControlScreen} />
      <Tab.Screen name="Remote Controls" component={RemoteControlScreen} />
      <Tab.Screen
        name="Settings"
        children={() => <SettingsStack onLogout={() => setIsAuthenticated(false)} />}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {!isAuthenticated ? (
            <>
              <Stack.Screen name="Login">
                {(props) => (
                  <LoginScreen
                    {...props}
                    onLogin={() => setIsAuthenticated(true)}
                  />
                )}
              </Stack.Screen>
              <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
            </>
          ) : (
            <Stack.Screen name="MainApp">
              {(props) => (
                <AppNavigator {...props} setIsAuthenticated={setIsAuthenticated} />
              )}
            </Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
