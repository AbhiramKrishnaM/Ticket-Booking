import { View, Text, TextInputProps, TextInput } from "react-native";
import React from "react";
import { defaultShortcuts, ShortcutProps } from "@/styles/shortcuts";

interface InputProps extends ShortcutProps, TextInputProps {}

const Input = (props: InputProps) => {
  return (
    <TextInput
      style={[
        defaultShortcuts(props),
        {
          fontSize: 16,
          borderRadius: 16,
          backgroundColor: "lightgray",
          color: "black",
        },
      ]}
      {...props}
    />
  );
};

export default Input;
