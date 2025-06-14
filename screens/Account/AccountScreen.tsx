import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Image, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { predefinedUser } from '../../utils/auth';

const AccountScreen = ({ setIsLoggedIn }: { setIsLoggedIn: (val: boolean) => void }) => {
  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('user');
              setIsLoggedIn(false);
            } catch (error) {
              console.error('Error logging out:', error);
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.name}>{predefinedUser.name}</Text>
          <Text style={styles.email}>{predefinedUser.username}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Ionicons name="person-circle-outline" size={24} color="#000" />
        <Text style={styles.sectionTitle}>Account</Text>
      </View>

      <TouchableOpacity 
        style={styles.logoutSection}
        onPress={handleLogout}
      >
        <Text style={styles.logoutText}>Log out</Text>
        <Ionicons name="chevron-forward" size={24} color="#FF3B30" />
      </TouchableOpacity>

      <Text style={styles.versionText}>Proactively version 0.0.1</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? ((StatusBar.currentHeight ?? 0) + 20) : 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 18,
    marginTop: 15,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  email: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  section: {
    marginBottom: 20,
    flexDirection: 'row',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginLeft: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 8,
    marginLeft: 10,
    width: '85%',
    alignSelf: 'center',
  },
  logoutSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: -21,
    marginBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '500',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#999',
    marginTop: 480,
  },
});

export default AccountScreen;
