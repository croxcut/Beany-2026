import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '../features/auth/hooks/useAuth';

export default function Index() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  if (isLoading) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  if (!user) {
    return (
      <View className="flex-1 bg-white items-center justify-center px-6">
        <Text className="text-xl font-bold mb-6">Welcome</Text>
        <Link href="/login" className="text-blue-600 mb-3 text-base">
          Log in
        </Link>
        <Link href="/register" className="text-blue-600 text-base">
          Create an account
        </Link>
      </View>
    );
  }

  async function handleLogout() {
    await logout();
    router.replace('/login');
  }

  return (
    <View className="flex-1 bg-white items-center justify-center px-6">
      <Text className="text-xl font-bold mb-2">Hey, {user.name ?? user.email}</Text>
      <Text className="text-gray-500 mb-8">
        {user.email} · {user.role ?? 'no role assigned'}
      </Text>
      <Pressable onPress={handleLogout} className="bg-black rounded-lg px-6 py-3 active:opacity-70">
        <Text className="text-white font-medium">Logout</Text>
      </Pressable>
    </View>
  );
}
