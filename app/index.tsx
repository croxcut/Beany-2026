import { useRouter } from 'expo-router';
import { View } from 'react-native';
import "../global.css";
import LoginPage from './auth/login';

export default function Index() {
  const router = useRouter();

  return (
    <View>
      <LoginPage></LoginPage>
    </View>
  );
}
