import { Text, TouchableOpacity } from "react-native";

type ButtonProps = {
  title: string;
  onPress: () => void;
};

export default function Button({ title, onPress }: ButtonProps) {
    return (
        <TouchableOpacity onPress={onPress} className="bg-orange-600 flex items-center ps-4 pe-4 pt-1 pb-1 rounded-lg">
            <Text className="text-black">{title}</Text>
        </TouchableOpacity>
    );
}