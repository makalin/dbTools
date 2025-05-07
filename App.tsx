import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import DecibelMeter from './src/components/DecibelMeter';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <DecibelMeter />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
});

export default App; 