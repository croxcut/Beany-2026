import { Pressable, Text } from 'react-native';

interface AuthButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

export function AuthButton({ label, onPress, disabled }: AuthButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className="bg-black rounded-lg py-3 mb-4 active:opacity-70"
    >
      <Text className="text-white text-center font-medium">{label}</Text>
    </Pressable>
  );
}
