import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import Icon from 'react-native-vector-icons/MaterialIcons';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const FeatureCard = ({ 
  title, 
  icon, 
  onPress 
}: { 
  title: string; 
  icon: string; 
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <Icon name={icon} size={32} color="#2196F3" />
    <Text style={styles.cardTitle}>{title}</Text>
  </TouchableOpacity>
);

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const features = [
    { title: 'Decibel Meter', icon: 'mic', screen: 'DecibelMeter' },
    { title: 'Sound Logger', icon: 'assessment', screen: 'SoundLogger' },
    { title: 'Emergency Tools', icon: 'warning', screen: 'EmergencyTools' },
    { title: 'Settings', icon: 'settings', screen: 'Settings' },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to dbTools</Text>
        <Text style={styles.subtitle}>Your Sound Environment Assistant</Text>
      </View>
      <View style={styles.grid}>
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            icon={feature.icon}
            onPress={() => navigation.navigate(feature.screen as keyof RootStackParamList)}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    backgroundColor: '#2196F3',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  card: {
    width: '45%',
    aspectRatio: 1,
    backgroundColor: '#fff',
    margin: '2.5%',
    borderRadius: 10,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen; 