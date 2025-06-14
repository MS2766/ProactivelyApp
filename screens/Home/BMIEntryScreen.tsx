import AsyncStorage from '@react-native-async-storage/async-storage';
import type { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type BMIEntryScreenProps = {
  navigation: StackNavigationProp<any>;
};

const BMIEntryScreen = ({ navigation }: BMIEntryScreenProps) => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  const handleSubmit = async () => {
    const bmi = Number(weight) / ((Number(height) / 100) ** 2);
    await AsyncStorage.setItem('bmi', bmi.toFixed(2));
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <Text style={styles.label}>Body weight:</Text>
      <View style={styles.rowContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={weight}
            onChangeText={setWeight}
            placeholderTextColor="#999"
          />
          <Text style={styles.suffix}>kgs</Text>
        </View>
      </View>

      <Text style={styles.label}>Height:</Text>
      <View style={styles.rowContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={height}
            onChangeText={setHeight}
            placeholderTextColor="#999"
          />
          <Text style={styles.suffix}>cms</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default BMIEntryScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#fff' 
  },
  label: { 
    fontSize: 18, 
    marginTop: 20, 
    marginBottom: 12, 
    fontWeight: 'bold'
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginTop: 5,
    paddingHorizontal: 12,
    paddingVertical: 6,
    width: '50%',
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 26,
    fontWeight: 'bold',
    paddingRight: 10,
  },
  suffix: {
    fontSize: 16,
    color: '#999',
    marginLeft: 5,
    marginTop: 4,
  },
  button: {
    backgroundColor: '#3566E8',
    padding: 16,
    borderRadius: 8,
    marginTop: 40,
    alignItems: 'center',
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 16 
  },
});