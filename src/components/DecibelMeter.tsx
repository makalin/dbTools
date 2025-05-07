import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { accelerometer } from 'react-native-sensors';

interface DecibelMeterProps {
  onDecibelChange?: (decibels: number) => void;
}

const DecibelMeter: React.FC<DecibelMeterProps> = ({ onDecibelChange }) => {
  const [decibels, setDecibels] = useState<number>(0);

  useEffect(() => {
    const subscription = accelerometer.subscribe(({ x, y, z }) => {
      // This is a simplified example. In a real app, you would use the device's
      // microphone and proper audio processing to get actual decibel readings
      const simulatedDecibels = Math.abs(x * 100);
      setDecibels(simulatedDecibels);
      onDecibelChange?.(simulatedDecibels);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [onDecibelChange]);

  return (
    <View style={styles.container} testID="decibel-meter">
      <Text style={styles.title}>Decibel Meter</Text>
      <Text style={styles.reading} testID="decibel-reading">
        {decibels.toFixed(1)} dB
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  reading: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2196F3',
  },
});

export default DecibelMeter; 