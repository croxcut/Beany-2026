import { View, Text, TextInput, TextInputProps } from 'react-native';

interface AuthTextFieldProps extends TextInputProps {
  label: string;
}

export function AuthTextField({ label, ...inputProps }: AuthTextFieldProps) {
  return (
    <View className="mb-4">
      <Text className="text-gray-700 font-medium mb-1">{label}</Text>
      <TextInput className="border border-gray-300 rounded-lg px-3 py-2" {...inputProps} />
    </View>
  );
}
