import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';
import React, { useEffect, useRef } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';
import { requestNotificationPermissions } from './utils/notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function App() {
  const navigationRef = useRef<NavigationContainerRef<any>>(null);

  useEffect(() => {
    requestNotificationPermissions();
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      const screen = response.notification.request.content.data?.screen;
      if (screen && navigationRef.current) {
        navigationRef.current.navigate('Appointment');
      }
    });
    return () => subscription.remove();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <StatusBar style="auto" />
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
