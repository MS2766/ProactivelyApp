import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import type { StackNavigationProp } from '@react-navigation/stack';

type StepsEntryScreenProps = {
  navigation: StackNavigationProp<any>;
};

const StepsEntryScreen = ({ navigation }: StepsEntryScreenProps) => {
  const [steps, setSteps] = useState('');

  const handleSubmit = async () => {
    await AsyncStorage.setItem('steps', steps);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <Text style={styles.label}>Steps count:</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={steps}
          onChangeText={setSteps}
          placeholderTextColor="#999"
        />
        <Text style={styles.suffix}>steps</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default StepsEntryScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 18, marginTop: 20, marginBottom: 12, fontWeight: 'bold'},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginTop: 5,
    paddingHorizontal: 12,
    paddingVertical: 6,
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
    marginTop: 40, // Increased spacing as per previous change
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});