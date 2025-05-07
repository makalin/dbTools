import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SettingItem = ({ 
  title, 
  icon, 
  value, 
  onValueChange 
}: { 
  title: string; 
  icon: string; 
  value?: boolean; 
  onValueChange?: (value: boolean) => void;
}) => (
  <View style={styles.settingItem}>
    <View style={styles.settingLeft}>
      <Icon name={icon} size={24} color="#2196F3" style={styles.settingIcon} />
      <Text style={styles.settingTitle}>{title}</Text>
    </View>
    {onValueChange && (
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={value ? '#2196F3' : '#f4f3f4'}
      />
    )}
  </View>
);

const SettingsScreen = () => {
  const { theme, toggleTheme, colors } = useTheme();
  const [notifications, setNotifications] = React.useState(true);
  const [soundEffects, setSoundEffects] = React.useState(true);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Appearance</Text>
        <SettingItem
          title="Dark Mode"
          icon="brightness-4"
          value={theme === 'dark'}
          onValueChange={toggleTheme}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Notifications</Text>
        <SettingItem
          title="Enable Notifications"
          icon="notifications"
          value={notifications}
          onValueChange={setNotifications}
        />
        <SettingItem
          title="Sound Effects"
          icon="volume-up"
          value={soundEffects}
          onValueChange={setSoundEffects}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>About</Text>
        <TouchableOpacity style={styles.aboutItem}>
          <Icon name="info" size={24} color="#2196F3" style={styles.settingIcon} />
          <Text style={[styles.settingTitle, { color: colors.text }]}>Version 1.0.0</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 10,
    marginTop: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 15,
  },
  settingTitle: {
    fontSize: 16,
  },
  aboutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
});

export default SettingsScreen; 