import React from "react";
import { Stack } from "expo-router";

const EventLayout = () => {
  return (
    <Stack screenOptions={{ headerBackTitle: "Events" }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="new" />
      <Stack.Screen name="event/[id]" />
    </Stack>
  );
};

export default EventLayout;
