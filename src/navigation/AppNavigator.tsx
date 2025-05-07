import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DecibelMeterScreen from '../screens/DecibelMeterScreen';
import SoundLoggerScreen from '../screens/SoundLoggerScreen';
import EmergencyToolsScreen from '../screens/EmergencyToolsScreen';
import SettingsScreen from '../screens/SettingsScreen';

export type RootStackParamList = {
  Home: undefined;
  DecibelMeter: undefined;
  SoundLogger: undefined;
  EmergencyTools: undefined;
  Settings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2196F3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'dbTools' }}
        />
        <Stack.Screen 
          name="DecibelMeter" 
          component={DecibelMeterScreen}
          options={{ title: 'Decibel Meter' }}
        />
        <Stack.Screen 
          name="SoundLogger" 
          component={SoundLoggerScreen}
          options={{ title: 'Sound Logger' }}
        />
        <Stack.Screen 
          name="EmergencyTools" 
          component={EmergencyToolsScreen}
          options={{ title: 'Emergency Tools' }}
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{ title: 'Settings' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 