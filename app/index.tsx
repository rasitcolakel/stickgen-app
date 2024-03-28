import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, Text } from "react-native";

export default function App() {
  return (
    <SafeAreaView className="flex-1">
      <StatusBar style="auto" />
      <Text className="text-2xl">
        Open up App.tsx to start working on your app!
      </Text>
    </SafeAreaView>
  );
}
