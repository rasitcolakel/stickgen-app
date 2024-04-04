import React from "react";
import { Tabs } from "expo-router";
import { HomeIcon, UserIcon } from "lucide-react-native";

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => <HomeIcon size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color }) => <UserIcon size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
