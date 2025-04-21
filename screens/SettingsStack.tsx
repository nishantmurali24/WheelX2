// screens/SettingsStack.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsScreen from './SettingsScreen';
import ProfileSettings from './setting_screens/ProfileSettings';
import PrivacySettings from './setting_screens/PrivacySettings';
import HelpAndSupport from './setting_screens/HelpAndSupport';

const Stack = createStackNavigator();

const SettingsStack = ({ onLogout }: { onLogout: () => void }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SettingsMain">
        {(props) => <SettingsScreen {...props} onLogout={onLogout} />}
      </Stack.Screen>
      <Stack.Screen name="ProfileSettings" component={ProfileSettings} />
      <Stack.Screen name="PrivacySettings" component={PrivacySettings} />
      <Stack.Screen name="HelpAndSupport" component={HelpAndSupport} />
    </Stack.Navigator>
  );
};

export default SettingsStack;
