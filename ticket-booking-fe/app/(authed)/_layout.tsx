import { View, Text } from "react-native";
import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/context/AuthContext";

const AppLayout = () => {
  // check if the user is logged in
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Redirect href="/login" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default AppLayout;
