import { View } from "react-native";
import { router } from "expo-router";
import { useColorScheme } from "~/lib/useColorScheme";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { supabase } from "~/lib/supabase";

export default function Tab() {
  const { toggleColorScheme } = useColorScheme();

  return (
    <View className="flex flex-col items-center justify-center gap-2">
      {/* <Button
        title="New Sticker"
        onPress={() => router.push("(home)/new-sticker")}
      />
      <Button label="Toggle Theme" onPress={toggleColorScheme} /> */}
      <Button
        variant="secondary"
        onPress={() => router.push("(home)/new-sticker")}
      >
        <Text>New Sticker</Text>
      </Button>
      <Button
        variant="outline"
        className="shadow shadow-foreground/5"
        onPress={toggleColorScheme}
      >
        <Text>Update</Text>
      </Button>
      <Button
        variant="destructive"
        className="shadow shadow-foreground/5"
        onPress={() => supabase.auth.signOut()}
      >
        <Text>Logout</Text>
      </Button>
    </View>
  );
}
