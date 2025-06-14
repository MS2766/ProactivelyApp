import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { LogBox } from 'react-native';

// Suppress Expo Go warning about remote notifications
LogBox.ignoreLogs([
  'expo-notifications: Android Push notifications',
  '`expo-notifications` functionality is not fully supported in Expo Go',
]);

// Set foreground behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// 📲 Request permissions
export async function requestNotificationPermissions() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function scheduleAppointmentNotification(appointmentDate: Date, doctorName: string) {
  try {
    if (!(appointmentDate instanceof Date) || isNaN(appointmentDate.getTime())) {
      throw new Error('Invalid date provided');
    }

    const triggerDate = new Date(appointmentDate);
    triggerDate.setHours(triggerDate.getHours() - 1);

    if (triggerDate <= new Date()) {
      console.warn('Trigger date is in the past:', triggerDate.toLocaleString());
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Appointment Reminder',
        body: `Your appointment with ${doctorName} is in 1 hour`,
        data: { screen: 'Appointment' },
      },
      trigger: triggerDate,
    });

    console.log('✅ Notification scheduled for:', triggerDate.toLocaleString());
  } catch (error) {
    console.error('🚨 Error scheduling notification:', error);
  }
}
