import { defaultShortcuts, ShortcutProps } from "@/styles/shortcuts";
import React, { PropsWithChildren } from "react";
import { TextProps, Text as RNText } from "react-native";

interface CutsomTextProps extends PropsWithChildren, ShortcutProps, TextProps {
  fontSize?: number;
  bold?: boolean;
  underline?: boolean;
  color?: string;
}

const Text = ({
  fontSize = 18,
  bold,
  underline,
  color,
  children,
  ...restProps
}: CutsomTextProps) => {
  return (
    <RNText
      style={[
        defaultShortcuts(restProps),
        {
          fontSize,
          fontWeight: bold ? "bold" : "normal",
          textDecorationLine: underline ? "underline" : "none",
          color,
        },
      ]}
      {...restProps}
    >
      {children}
    </RNText>
  );
};

export default Text;
