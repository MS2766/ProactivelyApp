import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import Appointment from '../screens/Home/Appointment';
import BMIEntryScreen from '../screens/Home/BMIEntryScreen';
import LoginScreen from '../screens/Home/LoginScreen';
import SleepEntryScreen from '../screens/Home/SleepEntryScreen';
import StepsEntryScreen from '../screens/Home/StepsEntryScreen';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const user = await AsyncStorage.getItem('user');
      setIsLoggedIn(!!user);
      setIsLoading(false);
    };
    checkLogin();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isLoggedIn ? (
        <Stack.Screen name="Login">
          {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
      ) : (
        <>
          <Stack.Screen name="MainTabs">
            {(props) => <TabNavigator {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
          <Stack.Screen 
            name="StepsEntry" 
            component={StepsEntryScreen}
            options={{ headerShown: true, title: 'Steps Entry' }}
          />
          <Stack.Screen 
            name="BMIEntry" 
            component={BMIEntryScreen}
            options={{ headerShown: true, title: 'BMI Entry' }}
          />
          <Stack.Screen 
            name="SleepEntry" 
            component={SleepEntryScreen}
            options={{ headerShown: true, title: 'Sleep Entry' }}
          />
          <Stack.Screen 
            name="Appointment" 
            component={Appointment}
            options={{ 
              headerShown: true,
              title: 'Appointment'
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
