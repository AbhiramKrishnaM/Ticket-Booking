import Button from "@/components/Button";
import DateTimePicker from "@/components/DateTimePicker";
import Input from "@/components/Input";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import Text from "@/components/Text";
import VStack from "@/components/VStack";
import { useOnScreenListener } from "@/hooks/useOnScreenListener";
import { eventService } from "@/services/event";
import { Event } from "@/types/event";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

const EventDetailScreen = () => {
  const navigation = useNavigation();
  const { id } = useLocalSearchParams();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eventData, setEventData] = useState<Event | null>(null);

  async function onSubmitChanges() {
    if (!eventData) return;

    try {
      setIsSubmitting(true);
      await eventService.updateOne(
        Number(id),
        eventData.name,
        eventData.location,
        eventData.date
      );

      router.back();
    } catch (error) {
      Alert.alert("Error", "Failed to fetch event");
    } finally {
      setIsSubmitting(false);
    }
  }

  const fetchEvent = useCallback(async () => {
    try {
      const response = await eventService.getOne(Number(id));
      setEventData(response.data);
    } catch (error) {
      router.back();
    }
  }, [id, router]);

  const onDelete = useCallback(() => {
    if (!eventData) return;

    try {
      Alert.alert(
        "Delete Event",
        "Are you sure you want to delete this event?",
        [
          { text: "Cancel" },
          {
            text: "Delete",
            onPress: async () => {
              await eventService.deleteOne(Number(id));
              router.back();
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert("Error", "Failed to delete event");
    }
  }, [eventData, id]);

  function updateField(field: keyof Event, value: string | Date) {
    setEventData((prev) => ({ ...prev!, [field]: value }));
  }

  useOnScreenListener("focus", fetchEvent);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerRight: () => headerRight(onDelete),
    });
  }, [navigation, onDelete]);

  return (
    <VStack m={20} flex={1} gap={30}>
      <VStack gap={5}>
        <Text ml={10} fontSize={14} color="gray">
          Name
        </Text>

        <Input
          value={eventData?.name}
          onChangeText={(value) => updateField("name", value)}
          placeholder="Name"
          placeholderTextColor="darkgray"
          h={48}
          p={14}
        />
      </VStack>

      <VStack gap={5}>
        <Text ml={10} fontSize={14} color="gray">
          Location
        </Text>

        <Input
          value={eventData?.location}
          onChangeText={(value) => updateField("location", value)}
          placeholder="Name"
          placeholderTextColor="darkgray"
          h={48}
          p={14}
        />
      </VStack>

      <VStack gap={5}>
        <Text ml={10} fontSize={14} color="gray">
          Date
        </Text>

        <DateTimePicker
          onChange={(date) => updateField("date", date || new Date())}
          currentDate={new Date(eventData?.date || new Date())}
        />
      </VStack>

      <Button
        mt={"auto"}
        disabled={isSubmitting}
        isLoading={isSubmitting}
        onPress={onSubmitChanges}
      >
        Save Changes
      </Button>
    </VStack>
  );
};

const headerRight = (onPress: VoidFunction) => {
  return <TabBarIcon size={30} name="trash" onPress={onPress} />;
};

export default EventDetailScreen;
