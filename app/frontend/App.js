import React, { useEffect } from 'react';
import { View, Platform } from 'react-native';
import { ThemeProvider } from './theme/ThemeProvider';
import RootNavigator from './navigation/RootNavigator';
import { SQLiteProvider } from 'expo-sqlite';
import { initializeDatabaseTables } from './database/DB';
import './global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GlobalToast, globalToastReference } from './components/ui/Toast';
import * as Notifications from 'expo-notifications';

export default function App() {
  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
      }).catch((err) => console.log('Notification channel error:', err));
    }
  }, []);

  return (
    <SQLiteProvider databaseName='user.db' onInit={initializeDatabaseTables}>
      <SafeAreaProvider>
        <ThemeProvider>
          <View style={{ flex: 1 }}>
            <RootNavigator />
            <GlobalToast ref={globalToastReference} />
          </View>
        </ThemeProvider>
      </SafeAreaProvider>
    </SQLiteProvider>
  );
}

