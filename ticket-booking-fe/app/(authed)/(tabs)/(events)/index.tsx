import HStack from "@/components/HStack";
import Text from "@/components/Text";
import VStack from "@/components/VStack";
import { eventService } from "@/services/event";
import { Event } from "@/types/event";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, FlatList } from "react-native";

const EventScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

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
          <HStack alignItems="center" justifyContent="center">
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
          </HStack>
        </VStack>
      )}
    />
  </VStack>;
};

export default EventScreen;
