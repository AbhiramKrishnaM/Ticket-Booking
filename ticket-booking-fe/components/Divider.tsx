import { View } from "react-native";
import React from "react";
import { defaultShortcuts, ShortcutProps } from "@/styles/shortcuts";

interface DividerProps extends ShortcutProps {}

const Divider = (props: DividerProps) => {
  return (
    <View
      style={[
        defaultShortcuts(props),
        { backgroundColor: "lightgray", height: 1 },
      ]}
    ></View>
  );
};

export default Divider;
