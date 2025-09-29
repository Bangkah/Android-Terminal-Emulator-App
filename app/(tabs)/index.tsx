import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  Clipboard,
  Vibration,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { Copy, Play, Trash2, ChevronUp } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface TerminalLine {
  id: string;
  type: 'command' | 'output' | 'error';
  content: string;
  timestamp: Date;
}

const COMMON_COMMANDS = [
  { label: 'ls -la', command: 'ls -la' },
  { label: 'pwd', command: 'pwd' },
  { label: 'whoami', command: 'whoami' },
  { label: 'ps aux', command: 'ps aux' },
  { label: 'df -h', command: 'df -h' },
  { label: 'clear', command: 'clear' },
];

export default function TerminalScreen() {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: '0',
      type: 'output',
      content: 'Android Terminal Emulator v1.0',
      timestamp: new Date(),
    },
    {
      id: '1',
      type: 'output',
      content: 'Non-root Linux environment simulation',
      timestamp: new Date(),
    },
    {
      id: '2',
      type: 'output',
      content: 'Type "help" for available commands',
      timestamp: new Date(),
    },
  ]);
  
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [fontSize, setFontSize] = useState(14);
  const [showQuickCommands, setShowQuickCommands] = useState(true);
  
  const scrollViewRef = useRef<ScrollView>(null);
  const inputRef = useRef<TextInput>(null);
  const { width, height } = Dimensions.get('window');

  useEffect(() => {
    loadSettings();
    loadHistory();
  }, []);

  const loadSettings = async () => {
    try {
      const savedFontSize = await AsyncStorage.getItem('fontSize');
      if (savedFontSize) {
        setFontSize(parseInt(savedFontSize));
      }
    } catch (error) {
      console.log('Error loading settings:', error);
    }
  };

  const loadHistory = async () => {
    try {
      const savedHistory = await AsyncStorage.getItem('commandHistory');
      if (savedHistory) {
        setCommandHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.log('Error loading history:', error);
    }
  };

  const saveHistory = async (history: string[]) => {
    try {
      await AsyncStorage.setItem('commandHistory', JSON.stringify(history));
    } catch (error) {
      console.log('Error saving history:', error);
    }
  };

  const simulateCommand = (command: string): string[] => {
    const cmd = command.trim().toLowerCase();
    
    switch (cmd) {
      case 'help':
        return [
          'Available commands:',
          '  help         - Show this help message',
          '  clear        - Clear terminal',
          '  ls           - List directory contents',
          '  pwd          - Print working directory',
          '  whoami       - Print current user',
          '  date         - Show current date/time',
          '  echo [text]  - Echo text',
          '  history      - Show command history',
          '  ps           - Show running processes',
          '  df           - Show disk usage',
          '  free         - Show memory usage',
          '  uname        - System information',
        ];
        
      case 'clear':
        setLines([]);
        return [];
        
      case 'ls':
      case 'ls -la':
        return [
          'drwxr-xr-x  2 user user 4096 Jan 1 12:00 .',
          'drwxr-xr-x  3 user user 4096 Jan 1 12:00 ..',
          '-rw-r--r--  1 user user  220 Jan 1 12:00 .profile',
          '-rw-r--r--  1 user user 3526 Jan 1 12:00 .bashrc',
          'drwxr-xr-x  2 user user 4096 Jan 1 12:00 Documents',
          'drwxr-xr-x  2 user user 4096 Jan 1 12:00 Downloads',
        ];
        
      case 'pwd':
        return ['/data/data/com.terminalapp/files'];
        
      case 'whoami':
        return ['user'];
        
      case 'date':
        return [new Date().toString()];
        
      case 'history':
        return commandHistory.map((cmd, idx) => `${idx + 1}  ${cmd}`);
        
      case 'ps':
      case 'ps aux':
        return [
          'PID  USER     TIME  COMMAND',
          '1    root     0:01  init',
          '123  user     0:00  terminal',
          '124  user     0:00  sh',
        ];
        
      case 'df':
      case 'df -h':
        return [
          'Filesystem      Size  Used Avail Use% Mounted on',
          '/dev/root        8G   4G   4G  50% /',
          '/data           32G  16G  16G  50% /data',
        ];
        
      case 'free':
        return [
          '              total        used        free      shared',
          'Mem:        2048000      512000     1536000           0',
          'Swap:             0           0           0',
        ];
        
      case 'uname':
        return ['Android Terminal Emulator'];
        
      default:
        if (cmd.startsWith('echo ')) {
          return [command.substring(5)];
        }
        return [`${command}: command not found`];
    }
  };

  const executeCommand = (command: string) => {
    if (!command.trim()) return;

    const newLines: TerminalLine[] = [...lines];
    
    // Add command line
    newLines.push({
      id: Date.now().toString(),
      type: 'command',
      content: `$ ${command}`,
      timestamp: new Date(),
    });

    // Execute command and add output
    const output = simulateCommand(command);
    output.forEach((line, index) => {
      newLines.push({
        id: `${Date.now()}-${index}`,
        type: command.toLowerCase() === 'clear' ? 'output' : 
              line.includes('not found') ? 'error' : 'output',
        content: line,
        timestamp: new Date(),
      });
    });

    setLines(newLines);
    
    // Update command history
    const newHistory = [command, ...commandHistory.slice(0, 99)];
    setCommandHistory(newHistory);
    saveHistory(newHistory);
    
    setCurrentCommand('');
    setHistoryIndex(-1);

    // Vibrate on command execution
    if (Platform.OS !== 'web') {
      Vibration.vibrate(50);
    }

    // Auto-scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleQuickCommand = (command: string) => {
    setCurrentCommand(command);
    executeCommand(command);
  };

  const copyToClipboard = async (text: string) => {
    if (Platform.OS === 'web') {
      try {
        await navigator.clipboard.writeText(text);
        Alert.alert('Copied', 'Text copied to clipboard');
      } catch (error) {
        Alert.alert('Error', 'Failed to copy text');
      }
    } else {
      Clipboard.setString(text);
      Alert.alert('Copied', 'Text copied to clipboard');
      Vibration.vibrate(50);
    }
  };

  const clearTerminal = () => {
    setLines([]);
  };

  const handleKeyPress = (key: string) => {
    if (key === 'Enter') {
      executeCommand(currentCommand);
    }
  };

  const navigateHistory = (direction: 'up' | 'down') => {
    if (commandHistory.length === 0) return;

    let newIndex = historyIndex;
    if (direction === 'up') {
      newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
    } else {
      newIndex = Math.max(historyIndex - 1, -1);
    }

    setHistoryIndex(newIndex);
    setCurrentCommand(newIndex >= 0 ? commandHistory[newIndex] : '');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" hidden />
      
      {/* Quick Commands Bar */}
      {showQuickCommands && (
        <View style={styles.quickCommandsBar}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {COMMON_COMMANDS.map((cmd, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickCommandButton}
                onPress={() => handleQuickCommand(cmd.command)}
              >
                <Text style={[styles.quickCommandText, { fontSize: fontSize - 2 }]}>
                  {cmd.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Terminal Output */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.terminalOutput}
        contentContainerStyle={styles.terminalContent}
      >
        {lines.map((line) => (
          <TouchableOpacity
            key={line.id}
            style={styles.lineContainer}
            onLongPress={() => copyToClipboard(line.content)}
          >
            <Text
              style={[
                styles.terminalText,
                {
                  fontSize,
                  color: line.type === 'command' ? '#00ff00' :
                         line.type === 'error' ? '#ff5555' : '#ffffff'
                }
              ]}
            >
              {line.content}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Command Input */}
      <View style={styles.inputContainer}>
        <Text style={[styles.prompt, { fontSize }]}>$ </Text>
        <TextInput
          ref={inputRef}
          style={[styles.commandInput, { fontSize }]}
          value={currentCommand}
          onChangeText={setCurrentCommand}
          onSubmitEditing={() => executeCommand(currentCommand)}
          placeholder="Enter command..."
          placeholderTextColor="#666666"
          autoCapitalize="none"
          autoCorrect={false}
          multiline={false}
        />
        <TouchableOpacity
          style={styles.executeButton}
          onPress={() => executeCommand(currentCommand)}
        >
          <Play size={20} color="#00ff00" />
        </TouchableOpacity>
      </View>

      {/* Control Buttons */}
      <View style={styles.controlButtons}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => navigateHistory('up')}
        >
          <ChevronUp size={20} color="#00ff00" />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.controlButton}
          onPress={clearTerminal}
        >
          <Trash2 size={20} color="#ff5555" />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.controlButton}
          onPress={() => setShowQuickCommands(!showQuickCommands)}
        >
          <Text style={[styles.controlButtonText, { fontSize: fontSize - 4 }]}>
            CMD
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  quickCommandsBar: {
    backgroundColor: '#111111',
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#00ff00',
  },
  quickCommandButton: {
    backgroundColor: '#222222',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginHorizontal: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#444444',
  },
  quickCommandText: {
    color: '#00ff00',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  },
  terminalOutput: {
    flex: 1,
    padding: 8,
  },
  terminalContent: {
    flexGrow: 1,
  },
  lineContainer: {
    marginVertical: 1,
  },
  terminalText: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111111',
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  prompt: {
    color: '#00ff00',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontWeight: 'bold',
  },
  commandInput: {
    flex: 1,
    color: '#ffffff',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    marginHorizontal: 8,
    padding: 0,
  },
  executeButton: {
    padding: 8,
  },
  controlButtons: {
    flexDirection: 'row',
    backgroundColor: '#111111',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  controlButton: {
    padding: 8,
    backgroundColor: '#222222',
    borderRadius: 4,
    minWidth: 40,
    alignItems: 'center',
  },
  controlButtonText: {
    color: '#00ff00',
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    fontWeight: 'bold',
  },
});