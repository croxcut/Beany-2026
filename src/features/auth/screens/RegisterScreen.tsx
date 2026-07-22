import { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '../hooks/useAuth';
import { AuthTextField } from '../components/AuthTextField';
import { AuthButton } from '../components/AuthButton';

export function RegisterScreen() {
  const { register } = useAuth();
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleRegister() {
    setIsSubmitting(true);
    const result = await register({ email, password, name });
    setIsSubmitting(false);

    if (result.success) {
      router.replace('/');
    } else {
      Alert.alert('Registration failed', result.error);
    }
  }

  return (
    <View className="flex-1 bg-white justify-center px-6">
      <Text className="text-2xl font-bold mb-6">Create account</Text>

      <AuthTextField label="Name" value={name} onChangeText={setName} autoCapitalize="words" />

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
      <Text className="text-xs text-gray-400 -mt-2 mb-6">
        8+ characters, upper + lowercase, a number, and a symbol.
      </Text>

      <AuthButton
        label={isSubmitting ? 'Creating account...' : 'Create account'}
        onPress={handleRegister}
        disabled={isSubmitting}
      />

      <Link href="/login" className="text-center text-blue-600">
        Already have an account? Log in
      </Link>
    </View>
  );
}
