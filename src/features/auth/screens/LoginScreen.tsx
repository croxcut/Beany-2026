import { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '../hooks/useAuth';
import { AuthTextField } from '../components/AuthTextField';
import { AuthButton } from '../components/AuthButton';

export function LoginScreen() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogin() {
    setIsSubmitting(true);
    const result = await login({ email, password });
    setIsSubmitting(false);

    if (result.success) {
      router.replace('/');
    } else {
      Alert.alert('Login failed', result.error);
    }
  }

  return (
    <View className="flex-1 bg-white justify-center px-6">
      <Text className="text-2xl font-bold mb-6">Log in</Text>

      <AuthTextField
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <AuthTextField
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <AuthButton
        label={isSubmitting ? 'Logging in...' : 'Log in'}
        onPress={handleLogin}
        disabled={isSubmitting}
      />

      <Link href="/register" className="text-center text-blue-600">
        Don't have an account? Register
      </Link>
    </View>
  );
}
