import React from "react";
import Stack, { StackProps } from "./Stack";

interface VStackProps extends StackProps {}

const VStack = (props: VStackProps) => {
  return <Stack {...props} direction="column" />;
};

export default VStack;
