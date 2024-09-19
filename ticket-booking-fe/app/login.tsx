import Button from "@/components/Button";
import Divider from "@/components/Divider";
import HStack from "@/components/HStack";
import Input from "@/components/Input";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import Text from "@/components/Text";
import VStack from "@/components/VStack";
import React, { useState } from "react";
import { KeyboardAvoidingView, ScrollView } from "react-native";

const Login = () => {
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function toggeAuthMode() {
    setAuthMode(authMode === "login" ? "register" : "login");
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <VStack
          flex={1}
          alignItems="center"
          p={40}
          gap={40}
          justifyContent="center"
        >
          <HStack gap={10}>
            <Text fontSize={30} bold mb={20}>
              Ticket Booking
            </Text>
            <TabBarIcon name="ticket" size={50} />
          </HStack>

          <VStack w={"100%"} gap={30}>
            <VStack gap={5}>
              <Text ml={10} fontSize={14} color="gray">
                Email
              </Text>

              <Input
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                placeholderTextColor="darkgray"
                autoCapitalize="none"
                autoCorrect={false}
                h={48}
                p={14}
              />
            </VStack>

            <VStack gap={5}>
              <Text ml={10} fontSize={14} color="gray">
                Password
              </Text>

              <Input
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                placeholder="Email"
                placeholderTextColor="darkgray"
                autoCapitalize="none"
                autoCorrect={false}
                h={48}
                p={14}
              />
            </VStack>

            <Button
              isLoading={false} //TODO:
              onPress={() => {}} //TODO:
            >
              {authMode === "login" ? "Login" : "Register"}
            </Button>
          </VStack>

          <Divider w={"90%"} />

          <Text onPress={toggeAuthMode} underline fontSize={16}>
            {authMode === "login"
              ? "Register New Account"
              : "Login To Your Account"}
          </Text>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
