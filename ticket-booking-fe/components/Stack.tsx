import { View, Text, ViewProps } from "react-native";
import React, { PropsWithChildren } from "react";
import { defaultShortcuts, ShortcutProps } from "@/styles/shortcuts";

export interface StackProps
  extends PropsWithChildren,
    ShortcutProps,
    ViewProps {
  flex?: number;
  direction?: "row" | "column";
  gap?: number;
  alignItems?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
}

const Stack = ({
  flex,
  direction,
  gap,
  alignItems,
  justifyContent,
  children,
  style,
  ...restProps
}: StackProps) => {
  return (
    <View
      style={[
        defaultShortcuts(restProps),
        { flex, flexDirection: direction, gap, alignItems, justifyContent },
        style,
      ]}
      {...restProps}
    >
      {children}
    </View>
  );
};

export default Stack;
