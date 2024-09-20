import Button from "@/components/Button";
import Divider from "@/components/Divider";
import HStack from "@/components/HStack";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import Text from "@/components/Text";
import VStack from "@/components/VStack";
import { useAuth } from "@/context/AuthContext";
import { eventService } from "@/services/event";
import { Event } from "@/types/event";
import { UserRole } from "@/types/user";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, TouchableOpacity } from "react-native";

const EventScreen = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  function onGoToEventPage(id) {
    if (user?.role === UserRole.Manager) {
      router.push(`/(events)/event/${id}`);
    }
  }

  const fetchEvents = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await eventService.getAll();
      setEvents(response.data);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch events");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return;
  <VStack flex={1} p={20} pb={0} gap={20}>
    <HStack alignItems="center" justifyContent="center">
      <Text fontSize={18} bold>
        {events.length} Events
      </Text>
    </HStack>

    <FlatList
      data={events}
      keyExtractor={({ id }) => id.toString()}
      onRefresh={fetchEvents}
      refreshing={isLoading}
      ItemSeparatorComponent={() => <VStack h={20} />}
      renderItem={({ item: event }) => (
        <VStack
          gap={20}
          p={20}
          style={{ backgroundColor: "white", borderRadius: 20 }}
          key={event.id}
        >
          <TouchableOpacity onPress={() => onGoToEventPage(event.id)}>
            <HStack alignItems="center" justifyContent="space-between">
              <HStack alignItems="center">
                <Text fontSize={16} bold>
                  {event.name}
                </Text>
                <Text fontSize={16} bold>
                  |
                </Text>
                <Text fontSize={16} bold>
                  {event.location}
                </Text>
              </HStack>
              {user?.role === UserRole.Manager && (
                <TabBarIcon size={24} name="chevron-forward" />
              )}
            </HStack>
          </TouchableOpacity>

          <Divider />

          <HStack justifyContent="space-between">
            <Text bold fontSize={16} color="gray">
              Sold: {event.totalTicketsPurchased}
            </Text>
            <Text bold fontSize={16} color="green">
              Entered : {event.totalTicketsEntered}
            </Text>
          </HStack>

          {user?.role === UserRole.Attendee && (
            <VStack>
              <Button
                variant="outlined"
                disabled={isLoading}
                onPress={() => {}}
              >
                Buy Ticket
              </Button>
            </VStack>
          )}
        </VStack>
      )}
    />
  </VStack>;
};

export default EventScreen;
