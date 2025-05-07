import React, { useState, useCallback } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import DecibelMeter from '../components/DecibelMeter';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { Platform } from 'react-native';

const DecibelMeterScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);

  const requestMicrophonePermission = useCallback(async () => {
    try {
      const permission = Platform.select({
        ios: PERMISSIONS.IOS.MICROPHONE,
        android: PERMISSIONS.ANDROID.RECORD_AUDIO,
      });

      if (!permission) {
        Alert.alert('Error', 'Platform not supported');
        return;
      }

      const result = await check(permission);
      
      if (result === RESULTS.DENIED) {
        const requestResult = await request(permission);
        setHasPermission(requestResult === RESULTS.GRANTED);
      } else if (result === RESULTS.GRANTED) {
        setHasPermission(true);
      } else {
        Alert.alert(
          'Permission Required',
          'Microphone access is required for decibel measurement.'
        );
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
      Alert.alert('Error', 'Failed to request microphone permission');
    }
  }, []);

  React.useEffect(() => {
    requestMicrophonePermission();
  }, [requestMicrophonePermission]);

  return (
    <View style={styles.container}>
      <DecibelMeter onDecibelChange={(decibels) => {
        // Handle decibel changes here
        console.log('Current decibels:', decibels);
      }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
});

export default DecibelMeterScreen; 