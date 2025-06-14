import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type RootStackParamList = {
  Home: undefined;
  Appointment: undefined;
};

type AppointmentScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Appointment'>;

type AppointmentScreenProps = {
  navigation: AppointmentScreenNavigationProp;
};

const Appointment = ({ navigation }: AppointmentScreenProps) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Appointment details</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Appointment Card */}
      <View style={styles.card}>
        <View style={styles.upcomingHeader}>
          <Text style={styles.upcomingLabel}>UPCOMING</Text>
        </View>
        <Image
          source={{ uri: 'https://i.pravatar.cc/100?img=5' }}
          style={styles.profileImage}
        />
        <Text style={styles.title}>Your upcoming appointment with</Text>
        <Text style={styles.doctorName}>Laurie Simons, MD, DipABLM</Text>
        <Text style={styles.appointmentInfo}>Thu, December 21, 2024 | 10:00 AM PST</Text>
        <Text style={styles.meetingLabel}>Meeting link:</Text>
        <Text style={styles.meetingLink}>www.meet.google.com/abc-defa-dwa</Text>
      </View>

      {/* Join Meeting Button */}
      <TouchableOpacity style={styles.joinButton}>
        <Text style={styles.joinButtonText}>Join meeting</Text>
        <Ionicons name="chevron-forward" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    paddingTop: 50,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  card: {
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
  },
  upcomingHeader: {
    backgroundColor: '#4A8C3B',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  upcomingLabel: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6B46C1',
    marginVertical: 8,
    textAlign: 'center',
  },
  appointmentInfo: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
    textAlign: 'center',
  },
  meetingLabel: {
    fontSize: 14,
    color: '#000',
    alignSelf: 'flex-start',
  },
  meetingLink: {
    fontSize: 14,
    color: '#3566E8',
    marginTop: 4,
    marginBottom: 40,
    alignSelf: 'flex-start',
  },
  joinButton: {
    flexDirection: 'row',
    backgroundColor: '#3566E8',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
});

export default Appointment;