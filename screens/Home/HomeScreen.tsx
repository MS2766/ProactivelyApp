import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { predefinedUser } from '../../utils/auth';
import { StackNavigationProp } from '@react-navigation/stack';

type Todo = {
  id: number;
  text: string;
  date: string;
  completed: boolean;
};

type RootStackParamList = {
  StepsEntry: undefined;
  BMIEntry: undefined;
  SleepEntry: undefined;
  Appointment: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'StepsEntry'>;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [healthMetrics, setHealthMetrics] = useState({
    steps: '0',
    bmi: '0',
    sleep: '0'
  });
  const [fadeAnim] = useState(new Animated.Value(-100));
  const isFocused = useIsFocused();
  const score = 91;
  const translateX = useRef(new Animated.Value(-150)).current;

  useEffect(() => {
    const loadTodos = async () => {
      const saved = await AsyncStorage.getItem('todos');
      if (saved) {
        setTodos(JSON.parse(saved));
      } else {
        const mock = [
          { id: 1, text: 'Achieve 30k steps every week for blood sugar', date: 'Sep 5, 2024', completed: false },
          { id: 2, text: 'Take up health Coaching', date: 'Sep 5, 2024', completed: false },
          { id: 3, text: 'Go to a nearby gym and workout for 30 mins', date: 'Sep 5, 2024', completed: false },
          { id: 4, text: 'Complete 2 courses of Dr. Laurie Simons', date: 'Aug 30, 2024', completed: true },
        ];
        setTodos(mock);
        await AsyncStorage.setItem('todos', JSON.stringify(mock));
      }
    };
    loadTodos();
  }, []);

  useEffect(() => {
    const loadHealthMetrics = async () => {
      try {
        const [steps, bmi, sleep] = await Promise.all([
          AsyncStorage.getItem('steps'),
          AsyncStorage.getItem('bmi'),
          AsyncStorage.getItem('sleep')
        ]);
        
        setHealthMetrics({
          steps: steps || '0',
          bmi: bmi || '0',
          sleep: sleep || '0'
        });
      } catch (error) {
        console.error('Error loading health metrics:', error);
      }
    };

    loadHealthMetrics();
  }, [isFocused]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 100,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: 400,
          duration: 15000,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: -150,
          duration: 0,
          useNativeDriver: true,
        })
      ])
    ).start();
  }, []);

  const toggleTodo = async (id: number) => {
    const updated = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updated);
    await AsyncStorage.setItem('todos', JSON.stringify(updated));
  };

  const completedCount = todos.filter(t => t.completed).length;
  const healthScoreProgress = 100;

  const getArrowColor = (percentage: number) => {
    const red = Math.round(255 * (1 - percentage / 100));
    const green = Math.round(255 * (percentage / 100));
    return `rgb(${red}, ${green}, 0)`;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.headerTop}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/100?img=12' }}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>{predefinedUser.name}</Text>
          <Ionicons name="notifications-outline" size={24} color="#fff" />
        </View>

        <Text style={styles.healthScoreLabel}>Health Score</Text>
        <Text style={styles.healthScoreValue}>2,740</Text>

        <View style={styles.backgroundImageContainer}>
          <Text style={styles.healthScoreInfo}>This score is for information purposes only.</Text>
          <Animated.Image
            source={require('../../assets/proactively_badge_home.png')}
            style={[
              styles.backgroundImage,
              {
                transform: [{ translateX }],
              }
            ]}
            height={250}
            width={500}
            resizeMode="contain"
          />
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.arrowContainer}>
            <View 
              style={[
                styles.arrow, 
                { 
                  left: `${score}%`,
                  borderTopColor: getArrowColor(score)
                }
              ]} 
            />
          </View>
          <View style={styles.progressBarLarge}>
            <LinearGradient
              colors={['#FF4B4B', '#FFD700', '#4CAF50']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.progressFill, { width: `${healthScoreProgress}%` }]}
            />
          </View>
        </View>
        <View style={styles.progressLabels}>
          {['0', '600', '1200', '1800', '2400', '3000'].map((label, index) => (
            <Text key={index} style={styles.label}>{label}</Text>
          ))}
        </View>
      </View>

      <View style={styles.bodyContainer}>
        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('Appointment')}
        >
          <View style={styles.cardHeader}>
            <View style={styles.appointmentTextContainer}>
              <View style={styles.upcomingHeader}>
                <Text style={styles.upcomingLabel}>UPCOMING</Text>
                <Ionicons name="chevron-forward" size={20} color="#3566E8" style={styles.cardArrow} />
              </View>
              <Text style={[styles.appointmentTitle, { marginTop: 10 }]}>Laurie Simons, MD, DipABL...</Text>
              <Text style={[styles.appointmentInfo, { marginBottom: 10 }]}>Internal Medicine</Text>
              <Text style={styles.appointmentInfo}>Thu, December 21, 2024 | 10:00 AM PST</Text>
            </View>
            <Image
              source={{ uri: 'https://i.pravatar.cc/100?img=5' }}
              style={styles.appointmentImage}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Health Overview</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.healthCardsScroll}
          >
            <TouchableOpacity 
              style={styles.healthCard}
              onPress={() => navigation.navigate('StepsEntry')}
            >
              <LinearGradient
                colors={['#A3BFFA', '#EBF4FF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.healthCardGradient}
              >
                <View style={styles.healthCardContent}>
                  <View style={styles.healthCardTop}>
                    <View style={styles.healthLabelContainer}>
                      <Text style={[styles.healthLabel, styles.healthLabelBold]}>Steps</Text>
                      <Text style={[styles.updatedText, { color: '#020650' }]}>
                        {healthMetrics.steps === '0' ? 'No data' : 'Updated'}
                        </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#020650" />
                  </View>
                  <Text style={[styles.healthValue, { color: '#020650' }]}>
                    {healthMetrics.steps === '0' ? '--' : healthMetrics.steps}
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.healthCard}
              onPress={() => navigation.navigate('BMIEntry')}
            >
              <LinearGradient
                colors={['#FEF9C3', '#FEF3C7']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.healthCardGradient}
              >
                <View style={styles.healthCardContent}>
                  <View style={styles.healthCardTop}>
                    <View style={styles.healthLabelContainer}>
                      <Text style={[styles.healthLabel, styles.healthLabelBold]}>BMI</Text>
                      <Text style={[styles.updatedText, { color: '#e69b00' }]}>
                        {healthMetrics.bmi === '0' ? 'No data' : 'Updated'}
                       </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#e69b00" />
                  </View>
                  <View style={styles.healthValueContainer}>
                    <Text style={[styles.healthValue, { color: '#e69b00' }]}>
                      {healthMetrics.bmi === '0' ? '--' : healthMetrics.bmi}
                    </Text>
                    {healthMetrics.bmi !== '0' && (
                      <Text style={[styles.subText, { color: '#B2AE89' }]}>kg/m²</Text>
                    )}
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.healthCard}
              onPress={() => navigation.navigate('SleepEntry')}
            >
              <LinearGradient
                colors={['#FEEBC8', '#FFEDD5']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.healthCardGradient}
              >
                <View style={styles.healthCardContent}>
                  <View style={styles.healthCardTop}>
                    <View style={styles.healthLabelContainer}>
                      <Text style={[styles.healthLabel, styles.healthLabelBold]}>Sleep</Text>
                      <Text style={[styles.updatedText, { color: '#720000' }]}>
                        {healthMetrics.sleep === '0' ? 'No data' : 'Updated'}
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#720000" />
                  </View>
                  <View style={styles.healthValueContainer}>
                    <Text style={[styles.healthValue, { color: '#720000' }]}>
                      {healthMetrics.sleep === '0' ? '--' : healthMetrics.sleep}
                    </Text>
                    {healthMetrics.sleep !== '0' && (
                      <Text style={[styles.subText, { color: '#B2A58C' }]}>hours</Text>
                    )}
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View style={styles.todoSection}>
          <View style={styles.dividerLine} />
          <Text style={styles.todoTitle}>Let's check off your to-dos</Text>
          <Text style={styles.completedText}>{completedCount}/{todos.length} Completed</Text>
          <View style={[styles.progressBarLarge, { marginBottom: 20 }]}>
            <View
              style={[
                styles.progressFill,
                { 
                  width: todos.length === 0 ? '0%' : `${(completedCount / todos.length) * 100}%`,
                  backgroundColor: '#9DD18C'
                }
              ]}
            />
          </View>
          {todos.map(todo => (
            <TouchableOpacity
              key={todo.id}
              style={styles.todoItem}
              onPress={() => toggleTodo(todo.id)}
            >
              <View style={styles.todoContent}>
                <View style={[styles.checkbox, todo.completed && styles.checkboxCompleted]}>
                  {todo.completed && (
                    <Ionicons name="checkmark" size={16} color="#fff" />
                  )}
                </View>
                <View style={styles.todoTextContainer}>
                  <Text style={[styles.todoText, todo.completed && styles.todoTextCompleted]}>
                    {todo.text}
                  </Text>
                  <Text style={styles.todoDate}>Laurie Simons • {todo.date}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const CustomCheckbox = ({
  value,
  onValueChange,
}: {
  value: boolean;
  onValueChange: () => void;
}) => (
  <TouchableOpacity
    onPress={onValueChange}
    style={[
      styles.checkbox,
      value && styles.checkboxCompleted,
    ]}
    accessibilityRole="checkbox"
    accessibilityState={{ checked: value }}
  >
    {value && (
      <Ionicons name="checkmark" size={16} color="#fff" />
    )}
  </TouchableOpacity>
);

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerContainer: {
    backgroundColor: '#3566E8',
    padding: 20,
    paddingTop: 60,
    paddingBottom: 60,
    position: 'relative',
    zIndex: 0,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userName: {
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  healthScoreLabel: { 
    color: '#fff', 
    fontSize: 14, 
    marginBottom: 30,
  },
  healthScoreValue: { 
    fontSize: 36, 
    fontWeight: 'bold', 
    color: '#fff',
    marginBottom: 0,
  },
  backgroundImageContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  backgroundImage: {
    position: 'relative',
    width: '80%',
    height: '80%',
    opacity: 0.4,
    marginTop: -150,
    marginBottom: -70,
  },
  healthScoreInfo: { 
    color: '#dce6f7', 
    fontSize: 12, 
    textAlign: 'left',
  },
  progressContainer: {
    position: 'relative',
  },
  progressBarLarge: {
    height: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 6,
  },
  arrowContainer: {
    height: 10,
    marginBottom: 5,
    position: 'relative',
  },
  arrow: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    transform: [{ translateX: -8 }],
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  label: { fontSize: 10, color: '#fff' },
  bodyContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#fff',
    marginTop: -20,
    position: 'relative',
    zIndex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  appointmentTextContainer: {
    flex: 1,
  },
  upcomingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#4A8C3B',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  upcomingLabel: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  cardArrow: {
    position: 'absolute',
    right: -225,
    top: 6,
    color: 'grey',
  },
  appointmentTitle: { 
    fontWeight: 'bold', 
    fontSize: 14,
    marginBottom: 4,
  },
  appointmentInfo: { 
    color: '#888', 
    fontSize: 12,
  },
  appointmentImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  section: { marginBottom: 30 },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: '600', 
    marginBottom: 10,
  },
  healthCardsScroll: {
    flexGrow: 0,
  },
  healthCard: {
    width: 160,
    marginRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  healthCardGradient: {
    padding: 12,
    flex: 1,
  },
  healthCardContent: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  healthCardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  healthLabelContainer: {
    flexDirection: 'column',
  },
  healthLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  healthLabelBold: {
    fontWeight: 'bold',
  },
  updatedText: {
    fontSize: 12,
    opacity: 1,
    marginTop: 4,
  },
  healthValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  healthValue: { 
    fontSize: 20, 
    fontWeight: '600', 
    marginRight: 4,
    opacity: 1,
    marginTop: 6,
  },
  subText: {
    fontSize: 14,
    fontWeight: '400',
  },
  todoSection: {
    paddingBottom: 30,
  },
  todoTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  completedText: {
    fontSize: 12,
    color: 'grey',
    marginBottom: 8,
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  todoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#9DD18C',
    borderColor: '#9DD18C',
  },
  todoTextContainer: {
    flex: 1,
  },
  todoText: {
    fontSize: 14,
    color: '#000',
  },
  todoTextCompleted: {
    color: '#9DD18C',
  },
  todoDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  healthMetrics: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 20,
    color: '#3566E8',
  },
  todosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  todoBox: {
    width: '48%',
    marginBottom: 10,
  },
  dividerLine: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginHorizontal: 3,
    marginVertical: 11,
  },
});