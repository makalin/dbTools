import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../context/ThemeContext';

interface LogEntry {
  timestamp: number;
  decibels: number;
}

const SoundLoggerScreen = () => {
  const { colors } = useTheme();
  const [isRecording, setIsRecording] = useState(false);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [recordingInterval, setRecordingInterval] = useState<NodeJS.Timeout | null>(null);

  const startRecording = useCallback(() => {
    setIsRecording(true);
    const interval = setInterval(() => {
      // Simulate decibel readings (replace with actual microphone input)
      const newLog: LogEntry = {
        timestamp: Date.now(),
        decibels: Math.random() * 30 + 40, // Simulated values between 40-70 dB
      };
      setLogs(prevLogs => [...prevLogs, newLog]);
    }, 1000);
    setRecordingInterval(interval);
  }, []);

  const stopRecording = useCallback(() => {
    if (recordingInterval) {
      clearInterval(recordingInterval);
      setRecordingInterval(null);
    }
    setIsRecording(false);
  }, [recordingInterval]);

  const exportLogs = useCallback(() => {
    if (logs.length === 0) {
      Alert.alert('No Data', 'There are no logs to export.');
      return;
    }

    const csvContent = [
      'Timestamp,Decibels',
      ...logs.map(log => `${log.timestamp},${log.decibels}`),
    ].join('\n');

    // In a real app, you would use react-native-fs to save the file
    console.log('Exporting logs:', csvContent);
    Alert.alert('Success', 'Logs exported successfully!');
  }, [logs]);

  const clearLogs = useCallback(() => {
    Alert.alert(
      'Clear Logs',
      'Are you sure you want to clear all logs?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => setLogs([]),
        },
      ]
    );
  }, []);

  const chartData = {
    labels: logs.slice(-6).map(log => new Date(log.timestamp).toLocaleTimeString()),
    datasets: [
      {
        data: logs.slice(-6).map(log => log.decibels),
      },
    ],
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.chartContainer}>
        {logs.length > 0 ? (
          <LineChart
            data={chartData}
            width={Dimensions.get('window').width - 40}
            height={220}
            chartConfig={{
              backgroundColor: colors.card,
              backgroundGradientFrom: colors.card,
              backgroundGradientTo: colors.card,
              decimalPlaces: 1,
              color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            bezier
            style={styles.chart}
          />
        ) : (
          <View style={styles.emptyState}>
            <Icon name="assessment" size={48} color={colors.text} />
            <Text style={[styles.emptyStateText, { color: colors.text }]}>
              No data recorded yet
            </Text>
          </View>
        )}
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          style={[styles.button, isRecording ? styles.stopButton : styles.startButton]}
          onPress={isRecording ? stopRecording : startRecording}
        >
          <Icon
            name={isRecording ? 'stop' : 'fiber-manual-record'}
            size={24}
            color="#fff"
          />
          <Text style={styles.buttonText}>
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </Text>
        </TouchableOpacity>

        <View style={styles.secondaryButtons}>
          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={exportLogs}
            disabled={logs.length === 0}
          >
            <Icon name="file-download" size={24} color="#fff" />
            <Text style={styles.buttonText}>Export</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={clearLogs}
            disabled={logs.length === 0}
          >
            <Icon name="delete" size={24} color="#fff" />
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.logList}>
        {logs.map((log, index) => (
          <View key={index} style={[styles.logItem, { backgroundColor: colors.card }]}>
            <Text style={[styles.logTime, { color: colors.text }]}>
              {new Date(log.timestamp).toLocaleTimeString()}
            </Text>
            <Text style={[styles.logValue, { color: colors.text }]}>
              {log.decibels.toFixed(1)} dB
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  chartContainer: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  emptyState: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
  },
  emptyStateText: {
    marginTop: 10,
    fontSize: 16,
  },
  controls: {
    marginBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  stopButton: {
    backgroundColor: '#F44336',
  },
  secondaryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#2196F3',
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  logList: {
    flex: 1,
  },
  logItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  logTime: {
    fontSize: 14,
  },
  logValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SoundLoggerScreen; 