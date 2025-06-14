import { Linking } from 'react-native';

export const openGoogleMeet = async (meetingCode: string) => {
  try {
    const meetUrl = `https://meet.google.com/${meetingCode}`;
    const supported = await Linking.canOpenURL(meetUrl);

    if (supported) {
      await Linking.openURL(meetUrl);
    } else {
      console.error("Google Meet cannot be opened");
    }
  } catch (error) {
    console.error("Error opening Google Meet:", error);
  }
};