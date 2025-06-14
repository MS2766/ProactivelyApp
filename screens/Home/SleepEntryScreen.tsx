import AsyncStorage from '@react-native-async-storage/async-storage';
import type { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type SleepEntryScreenProps = {
  navigation: StackNavigationProp<any>;
};

const SleepEntryScreen = ({ navigation }: SleepEntryScreenProps) => {
  const [hours, setHours] = useState(8);

  const increment = () => setHours(prev => Math.min(prev + 1, 24));
  const decrement = () => setHours(prev => Math.max(prev - 1, 0));

  const handleSubmit = async () => {
    await AsyncStorage.setItem('sleep', String(hours));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.boxContainer}>
        <View style={styles.row}>
          <TouchableOpacity style={styles.circleButton} onPress={decrement}>
            <Text style={styles.circleText}>-</Text>
          </TouchableOpacity>
          <View style={styles.timeContainer}>
            <Image 
              source={require('../../assets/moon_image.png')} 
              style={styles.icon} 
            />
            <Text style={styles.hoursText}>{hours} hours</Text>
          </View>
          <TouchableOpacity style={styles.circleButton} onPress={increment}>
            <Text style={styles.circleText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SleepEntryScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', justifyContent: 'center' },
  label: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginBottom: 40 },
  boxContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginTop: -540,
    marginBottom: 40,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    width: 44,
    height: 44,
    marginRight: -3,
  },
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#3566E8', // Blue outline
    backgroundColor: 'rgba(53, 102, 232, 0.1)', // Transparent light blue
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    fontSize: 24,
    color: '#3566E8', // Blue text
    lineHeight: 24,
  },
  hoursText: { fontSize: 20, fontWeight: '500', textAlign: 'center' },
  button: {
    backgroundColor: '#3566E8',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});