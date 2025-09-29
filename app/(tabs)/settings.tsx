import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Minus, Plus, Smartphone, Moon, Sun } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
  const [fontSize, setFontSize] = useState(14);
  const [darkMode, setDarkMode] = useState(true);
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [showQuickCommands, setShowQuickCommands] = useState(true);
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const settings = await AsyncStorage.getItem('settings');
      if (settings) {
        const parsed = JSON.parse(settings);
        setFontSize(parsed.fontSize || 14);
        setDarkMode(parsed.darkMode !== false);
        setHapticFeedback(parsed.hapticFeedback !== false);
        setShowQuickCommands(parsed.showQuickCommands !== false);
        setAutoScroll(parsed.autoScroll !== false);
      }
    } catch (error) {
      console.log('Error loading settings:', error);
    }
  };

  const saveSettings = async (newSettings: any) => {
    try {
      await AsyncStorage.setItem('settings', JSON.stringify(newSettings));
    } catch (error) {
      console.log('Error saving settings:', error);
    }
  };

  const updateSetting = (key: string, value: any) => {
    const newSettings = {
      fontSize,
      darkMode,
      hapticFeedback,
      showQuickCommands,
      autoScroll,
      [key]: value,
    };
    
    switch (key) {
      case 'fontSize':
        setFontSize(value);
        break;
      case 'darkMode':
        setDarkMode(value);
        break;
      case 'hapticFeedback':
        setHapticFeedback(value);
        break;
      case 'showQuickCommands':
        setShowQuickCommands(value);
        break;
      case 'autoScroll':
        setAutoScroll(value);
        break;
    }
    
    saveSettings(newSettings);
  };

  const resetSettings = () => {
    Alert.alert(
      'Reset Settings',
      'Are you sure you want to reset all settings to default?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            const defaultSettings = {
              fontSize: 14,
              darkMode: true,
              hapticFeedback: true,
              showQuickCommands: true,
              autoScroll: true,
            };
            
            setFontSize(defaultSettings.fontSize);
            setDarkMode(defaultSettings.darkMode);
            setHapticFeedback(defaultSettings.hapticFeedback);
            setShowQuickCommands(defaultSettings.showQuickCommands);
            setAutoScroll(defaultSettings.autoScroll);
            
            saveSettings(defaultSettings);
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Display</Text>
          
          <View style={styles.setting}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Font Size</Text>
              <Text style={styles.settingDescription}>
                Adjust terminal text size ({fontSize}px)
              </Text>
            </View>
            <View style={styles.fontSizeControls}>
              <TouchableOpacity
                style={styles.fontSizeButton}
                onPress={() => updateSetting('fontSize', Math.max(10, fontSize - 1))}
              >
                <Minus size={20} color="#00ff00" />
              </TouchableOpacity>
              <Text style={[styles.fontSizeValue, { fontSize }]}>Aa</Text>
              <TouchableOpacity
                style={styles.fontSizeButton}
                onPress={() => updateSetting('fontSize', Math.min(24, fontSize + 1))}
              >
                <Plus size={20} color="#00ff00" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.setting}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Dark Mode</Text>
              <Text style={styles.settingDescription}>
                Use dark terminal theme
              </Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={(value) => updateSetting('darkMode', value)}
              trackColor={{ false: '#767577', true: '#00ff00' }}
              thumbColor={darkMode ? '#ffffff' : '#f4f3f4'}
            />
          </View>

          <View style={styles.setting}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Quick Commands</Text>
              <Text style={styles.settingDescription}>
                Show command buttons at the top
              </Text>
            </View>
            <Switch
              value={showQuickCommands}
              onValueChange={(value) => updateSetting('showQuickCommands', value)}
              trackColor={{ false: '#767577', true: '#00ff00' }}
              thumbColor={showQuickCommands ? '#ffffff' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Behavior</Text>
          
          <View style={styles.setting}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Haptic Feedback</Text>
              <Text style={styles.settingDescription}>
                Vibrate on interactions
              </Text>
            </View>
            <Switch
              value={hapticFeedback}
              onValueChange={(value) => updateSetting('hapticFeedback', value)}
              trackColor={{ false: '#767577', true: '#00ff00' }}
              thumbColor={hapticFeedback ? '#ffffff' : '#f4f3f4'}
            />
          </View>

          <View style={styles.setting}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Auto Scroll</Text>
              <Text style={styles.settingDescription}>
                Automatically scroll to new output
              </Text>
            </View>
            <Switch
              value={autoScroll}
              onValueChange={(value) => updateSetting('autoScroll', value)}
              trackColor={{ false: '#767577', true: '#00ff00' }}
              thumbColor={autoScroll ? '#ffffff' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions</Text>
          
          <TouchableOpacity style={styles.actionButton} onPress={resetSettings}>
            <Text style={styles.actionButtonText}>Reset All Settings</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoText}>
            Terminal Emulator v1.0{'\n'}
            Non-root Linux environment simulation{'\n'}
            Built with React Native & Expo
          </Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00ff00',
    marginBottom: 16,
  },
  setting: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: '500',
  },
  settingDescription: {
    fontSize: 14,
    color: '#999999',
    marginTop: 2,
  },
  fontSizeControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fontSizeButton: {
    padding: 8,
    backgroundColor: '#222222',
    borderRadius: 4,
    marginHorizontal: 4,
  },
  fontSizeValue: {
    color: '#ffffff',
    marginHorizontal: 12,
    fontWeight: 'bold',
  },
  actionButton: {
    backgroundColor: '#ff5555',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  infoSection: {
    marginTop: 32,
    padding: 16,
    backgroundColor: '#111111',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#333333',
  },
  infoText: {
    color: '#999999',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});