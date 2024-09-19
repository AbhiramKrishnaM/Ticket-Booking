import React from "react";
import Stack, { StackProps } from "./Stack";

interface HStackProps extends StackProps {}

const HStack = (props: HStackProps) => {
  return <Stack {...props} direction="row" />;
};

export default HStack;
