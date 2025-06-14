import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import AccountScreen from '../screens/Account/AccountScreen';
import HomeScreen from '../screens/Home/HomeScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = ({ setIsLoggedIn }: { setIsLoggedIn: (val: boolean) => void }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 70,
          borderTopWidth: 0.5,
          borderTopColor: '#ddd',
        },
        tabBarLabel: ({ focused }) => (
          <Text style={{ 
            fontSize: 12, 
            color: focused ? '#5D5FEF' : '#999', 
            marginBottom: 6 
          }}>
            {route.name}
          </Text>
        ),
        tabBarIcon: ({ focused }) => {
          let icon;

          switch (route.name) {
            case 'Home':
              icon = focused 
                ? require('../assets/home-filled.png')
                : require('../assets/home.png');
              break;
            case 'Account':
              icon = focused
                ? require('../assets/account-filled.png')
                : require('../assets/account.png');
              break;
            default:
              icon = null;
          }

          return (
            <View style={styles.iconContainer}>
              <Image 
                source={icon} 
                style={styles.tabIcon} 
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          headerShown: false
        }}
      />
      <Tab.Screen name="Account">
        {(props) => <AccountScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  tabIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default TabNavigator;
