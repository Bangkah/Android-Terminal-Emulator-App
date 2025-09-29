import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Terminal, Github, Mail, Globe } from 'lucide-react-native';

export default function AboutScreen() {
  const openLink = (url: string) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        
        <View style={styles.header}>
          <Terminal size={64} color="#00ff00" />
          <Text style={styles.appName}>Android Terminal</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>
            Android Terminal adalah aplikasi terminal emulator yang dirancang khusus 
            untuk perangkat Android tanpa memerlukan akses root. Aplikasi ini menyediakan 
            lingkungan terminal Linux yang disimulasikan dengan fitur-fitur lengkap 
            untuk pengembangan dan administrasi sistem.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featureList}>
            <Text style={styles.feature}>• Terminal emulator dengan command execution</Text>
            <Text style={styles.feature}>• Command history dan autocomplete</Text>
            <Text style={styles.feature}>• Copy/paste functionality</Text>
            <Text style={styles.feature}>• Adjustable font size</Text>
            <Text style={styles.feature}>• Quick command buttons</Text>
            <Text style={styles.feature}>• Dark terminal theme</Text>
            <Text style={styles.feature}>• Haptic feedback support</Text>
            <Text style={styles.feature}>• Full-screen terminal interface</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Supported Commands</Text>
          <View style={styles.commandList}>
            <Text style={styles.command}>help, clear, ls, pwd, whoami</Text>
            <Text style={styles.command}>date, echo, history, ps, df</Text>
            <Text style={styles.command}>free, uname</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technical Info</Text>
          <View style={styles.techInfo}>
            <Text style={styles.techItem}>Platform: React Native / Expo</Text>
            <Text style={styles.techItem}>Target SDK: 33+</Text>
            <Text style={styles.techItem}>Architecture: Non-root simulation</Text>
            <Text style={styles.techItem}>UI Framework: React Native</Text>
            <Text style={styles.techItem}>Icons: Lucide React Native</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Usage Instructions</Text>
          <Text style={styles.instructions}>
            1. Type commands in the input field at the bottom{'\n'}
            2. Press Enter or tap the play button to execute{'\n'}
            3. Use quick command buttons for common operations{'\n'}
            4. Long press on output lines to copy text{'\n'}
            5. Use up arrow to navigate command history{'\n'}
            6. Tap trash icon to clear terminal{'\n'}
            7. Customize settings in the Settings tab
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Limitations</Text>
          <Text style={styles.limitations}>
            • Ini adalah simulasi terminal, bukan environment Linux yang sesungguhnya{'\n'}
            • Command execution disimulasikan untuk tujuan demonstrasi{'\n'}
            • Tidak dapat mengakses sistem file Android yang sebenarnya{'\n'}
            • Package management (apt, yum) tidak tersedia{'\n'}
            • Network tools terbatas pada simulasi
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Dibuat dengan React Native & Expo{'\n'}
            © 2024 Android Terminal Emulator
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
  header: {
    alignItems: 'center',
    marginBottom: 32,
    paddingVertical: 24,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00ff00',
    marginTop: 16,
  },
  version: {
    fontSize: 16,
    color: '#999999',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00ff00',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#ffffff',
    lineHeight: 24,
  },
  featureList: {
    marginLeft: 8,
  },
  feature: {
    fontSize: 14,
    color: '#ffffff',
    lineHeight: 20,
    marginBottom: 4,
  },
  commandList: {
    backgroundColor: '#111111',
    padding: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#333333',
  },
  command: {
    fontSize: 14,
    color: '#00ff00',
    fontFamily: 'monospace',
    lineHeight: 20,
  },
  techInfo: {
    marginLeft: 8,
  },
  techItem: {
    fontSize: 14,
    color: '#ffffff',
    lineHeight: 20,
    marginBottom: 4,
  },
  instructions: {
    fontSize: 14,
    color: '#ffffff',
    lineHeight: 22,
  },
  limitations: {
    fontSize: 14,
    color: '#ffaa00',
    lineHeight: 22,
  },
  footer: {
    alignItems: 'center',
    marginTop: 32,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  footerText: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 18,
  },
});