import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { scheduleAppointmentNotification } from '../../utils/notifications';
import Feather from '@expo/vector-icons/Feather';

type RootStackParamList = {
  Home: undefined;
  Appointment: undefined;
};

type AppointmentScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Appointment'>;

type AppointmentScreenProps = {
  navigation: AppointmentScreenNavigationProp;
};

const Appointment = ({ navigation }: AppointmentScreenProps) => {
  const handleScheduleNotification = async () => {
    // Create a test date 10 seconds from now for testing
    const testDate = new Date();
    testDate.setSeconds(testDate.getSeconds() + 10);

    // For the actual appointment date
    const appointmentDate = new Date('2025-06-14T22:55:00');
    const doctorName = 'Laurie Simons';

    // Schedule both notifications
    await scheduleAppointmentNotification(appointmentDate, doctorName);

    // Log the scheduled time
    console.log('Appointment notification scheduled for:', appointmentDate.toLocaleString());
  };

  useEffect(() => {
    handleScheduleNotification();
  }, []);

  return (
    <View style={styles.container}>
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
        <View style={styles.appointmentBox}>
          <Text style={styles.appointmentText}>Appointment</Text>
        </View>
        <Text style={styles.appointmentInfo}>Thu, December 21, 2024 | 10:00 AM PST</Text>
        <View style={styles.divider} />
        <Text style={styles.meetingLabel}>Meeting link:</Text>
        <Text style={styles.meetingLink}>www.meet.google.com/abc-defa-dwa</Text>
      </View>

      {/* Join Meeting Button */}
      <TouchableOpacity style={styles.joinButton}>
        <Text style={styles.joinButtonText}>Join meeting</Text>
        <Feather name="arrow-up-right" size={24} color="white" />
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
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  doctorName: {
    fontSize: 14,
    color: 'grey',
    marginVertical: 6,
    textAlign: 'center',
  },
  appointmentInfo: {
    fontSize: 12,
    color: '#888',
    marginBottom: 20,
    textAlign: 'center',
  },
  meetingLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    alignSelf: 'flex-start',
  },
  meetingLink: {
    fontSize: 14,
    color: 'grey',
    marginTop: 4,
    marginBottom: 40,
    alignSelf: 'flex-start',
  },
  joinButton: {
    flexDirection: 'row',
    backgroundColor: '#3566E8',
    paddingHorizontal: 100,
    paddingVertical: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 170,
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  appointmentBox: {
    backgroundColor: '#E6E6FA',
    padding: 1,
    borderRadius: 4,
    marginTop: 12,
    marginBottom: 12,
    width: '30%',
    alignSelf: 'center',
  },
  appointmentText: {
    color: '#483D8B',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#483D8B',
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    opacity: 0.3,
  },
});

export default Appointment;