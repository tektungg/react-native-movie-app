import { icons } from "@/constants/icons";
import React from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

interface Props {
  onPress?: () => void;
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  autoFocus?: boolean;
}

const SearchBar = ({
  onPress,
  placeholder,
  value,
  onChangeText,
  autoFocus = false,
}: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-2">
      <Image
        source={icons.search}
        className="size-5"
        resizeMode="contain"
        tintColor={"#AB8BFF"}
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        placeholderTextColor={"#A8b5DB"}
        value={value}
        onChangeText={onChangeText}
        autoFocus={autoFocus}
        className="flex-1 ml-2 text-white"
      />
      {value && value.length > 0 && onChangeText && (
        <TouchableOpacity
          onPress={() => onChangeText("")}
          className="ml-2 w-6 h-6 rounded-full bg-dark-100 items-center justify-center"
        >
          <Text className="text-light-200 text-sm font-bold">✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;
