import { View, Text } from "react-native";
import React from "react";
import { Redirect, Stack } from "expo-router";

const AppLayout = () => {
  // check if the user is logged in
  const isLoggedIn = true;

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default AppLayout;
