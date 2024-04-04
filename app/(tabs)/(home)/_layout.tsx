import { router, Stack } from "expo-router";
import { XIcon } from "lucide-react-native";
import { Platform } from "react-native";
import { Button } from "~/components/ui/button";
export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="new-sticker"
        options={{
          title: "New Sticker",
          presentation: "modal",
          ...(Platform.OS === "ios" && {
            headerRight: ({ tintColor, canGoBack }) => (
              <Button
                onPress={() => canGoBack && router.back()}
                size="icon"
                variant="ghost"
              >
                <XIcon size={28} color={tintColor} />
              </Button>
            ),
          }),
        }}
      />
      <Stack.Screen
        name="sticker/[id]"
        options={{
          title: "Sticker",
          presentation: "modal",
          ...(Platform.OS === "ios" && {
            headerRight: ({ tintColor, canGoBack }) => (
              <Button
                onPress={() => canGoBack && router.back()}
                size="icon"
                variant="ghost"
              >
                <XIcon size={28} color={tintColor} />
              </Button>
            ),
          }),
        }}
      />
    </Stack>
  );
}
