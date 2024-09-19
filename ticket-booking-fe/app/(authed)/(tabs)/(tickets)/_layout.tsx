import React from "react";
import { Stack } from "expo-router";

const TicketLayout = () => {
  return (
    <Stack screenOptions={{ headerBackTitle: "Tickets" }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="ticket/[id]" />
    </Stack>
  );
};

export default TicketLayout;
