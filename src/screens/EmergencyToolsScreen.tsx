import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../context/ThemeContext';
import Sound from 'react-native-sound';

const EmergencyToolsScreen = () => {
  const { colors } = useTheme();
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [isSilentAreaMonitoring, setIsSilentAreaMonitoring] = useState(false);
  const [silentAreaThreshold, setSilentAreaThreshold] = useState(60); // dB
  const [sosSound, setSosSound] = useState<Sound | null>(null);

  useEffect(() => {
    // Initialize SOS sound
    const sound = new Sound('sos.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Failed to load sound', error);
        return;
      }
      setSosSound(sound);
    });

    return () => {
      if (sosSound) {
        sosSound.release();
      }
    };
  }, []);

  const toggleSOS = useCallback(() => {
    if (!sosSound) {
      Alert.alert('Error', 'SOS sound not loaded');
      return;
    }

    if (isSOSActive) {
      sosSound.stop();
    } else {
      sosSound.setNumberOfLoops(-1); // Loop indefinitely
      sosSound.play((success) => {
        if (!success) {
          console.log('Sound playback failed');
        }
      });
    }
    setIsSOSActive(!isSOSActive);
  }, [isSOSActive, sosSound]);

  const toggleSilentAreaMonitoring = useCallback(() => {
    setIsSilentAreaMonitoring(!isSilentAreaMonitoring);
  }, [isSilentAreaMonitoring]);

  const adjustThreshold = useCallback((increment: boolean) => {
    setSilentAreaThreshold(prev => {
      const newValue = increment ? prev + 5 : prev - 5;
      return Math.max(30, Math.min(100, newValue)); // Limit between 30-100 dB
    });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* SOS Section */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <View style={styles.sectionHeader}>
          <Icon name="warning" size={24} color="#F44336" />
          <Text style={[styles.sectionTitle, { color: colors.text }]}>SOS Signal</Text>
        </View>
        <Text style={[styles.sectionDescription, { color: colors.text }]}>
          Emit a loud SOS signal to attract attention in emergency situations
        </Text>
        <TouchableOpacity
          style={[styles.sosButton, isSOSActive && styles.sosButtonActive]}
          onPress={toggleSOS}
        >
          <Icon
            name={isSOSActive ? 'stop' : 'play-arrow'}
            size={32}
            color="#fff"
          />
          <Text style={styles.sosButtonText}>
            {isSOSActive ? 'Stop SOS' : 'Start SOS'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Silent Area Monitor Section */}
      <View style={[styles.section, { backgroundColor: colors.card }]}>
        <View style={styles.sectionHeader}>
          <Icon name="volume-off" size={24} color="#2196F3" />
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Silent Area Monitor
          </Text>
        </View>
        <Text style={[styles.sectionDescription, { color: colors.text }]}>
          Get notified when noise levels exceed the threshold
        </Text>
        
        <View style={styles.thresholdControl}>
          <TouchableOpacity
            style={styles.thresholdButton}
            onPress={() => adjustThreshold(false)}
          >
            <Icon name="remove" size={24} color="#2196F3" />
          </TouchableOpacity>
          
          <Text style={[styles.thresholdValue, { color: colors.text }]}>
            {silentAreaThreshold} dB
          </Text>
          
          <TouchableOpacity
            style={styles.thresholdButton}
            onPress={() => adjustThreshold(true)}
          >
            <Icon name="add" size={24} color="#2196F3" />
          </TouchableOpacity>
        </View>

        <View style={styles.switchContainer}>
          <Text style={[styles.switchLabel, { color: colors.text }]}>
            Enable Monitoring
          </Text>
          <Switch
            value={isSilentAreaMonitoring}
            onValueChange={toggleSilentAreaMonitoring}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isSilentAreaMonitoring ? '#2196F3' : '#f4f3f4'}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  sectionDescription: {
    fontSize: 14,
    marginBottom: 16,
    opacity: 0.8,
  },
  sosButton: {
    backgroundColor: '#F44336',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
  },
  sosButtonActive: {
    backgroundColor: '#D32F2F',
  },
  sosButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  thresholdControl: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  thresholdButton: {
    padding: 8,
  },
  thresholdValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  switchLabel: {
    fontSize: 16,
  },
});

export default EmergencyToolsScreen; 