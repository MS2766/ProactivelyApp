# ProactivelyApp

A React Native mobile application for health tracking and appointment management. The app enables users to monitor their health metrics, schedule appointments, and receive notifications for upcoming medical consultations.

## Features

- 🔐 Secure user authentication
- 📊 Health metrics tracking (Steps, BMI, Sleep)
- 🗓️ Appointment management with Google Meet integration
- 📱 Real-time notifications for appointments
- 📈 Health score monitoring
- ✅ To-do list for health tasks

## Tech Stack

- React Native with Expo
- TypeScript
- React Navigation (Stack & Tab)
- Expo Notifications
- AsyncStorage for local data persistence
- Linear Gradient for UI effects

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ProactivelyApp.git
cd ProactivelyApp
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
expo start
```

## Project Structure

```
ProactivelyApp/
├── assets/                 # Images and icons
├── navigation/            # Navigation configuration
│   ├── AppNavigator.tsx
│   └── TabNavigator.tsx
├── screens/
│   ├── Account/          # Account related screens
│   └── Home/             # Main app screens
├── utils/                # Utility functions
│   ├── auth.ts
│   ├── meetingUtils.ts
│   └── notifications.ts
└── App.tsx              # Root component
```

## Screen Components

- **LoginScreen**: User authentication
- **HomeScreen**: Dashboard with health metrics
- **AppointmentScreen**: Appointment details and Google Meet integration
- **AccountScreen**: User profile and settings
- **Health Entry Screens**: BMI, Steps, and Sleep tracking

## Features in Detail

### Authentication
- Email and password login
- Secure session management
- Profile management

### Health Tracking
- Steps counter
- BMI calculator
- Sleep duration tracking
- Health score visualization

### Appointment Management
- Upcoming appointment display
- Google Meet integration
- Notification reminders
- One-click meeting join

## Development

### Prerequisites
- Node.js >= 14
- Expo CLI
- iOS Simulator or Android Emulator

### Environment Setup
1. Install Expo CLI:
```bash
npm install -g expo-cli
```

2. Configure app.json:
```json
{
  "expo": {
    "name": "ProactivelyApp",
    "slug": "ProactivelyApp",
    ...
  }
}
```

### Building for Production

1. For Android APK:
```bash
eas build -p android --profile preview
```

2. For iOS:
```bash
eas build -p ios
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
