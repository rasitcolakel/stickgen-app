import { supabase } from "app/lib/supabase";
import { userIdAtom } from "app/store/auth";
import { useAtomValue } from "jotai";
import { View, Text, Button } from "react-native";

export default function Tab() {
  const userId = useAtomValue(userIdAtom);

  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <Text>Tab [Home|Settings]</Text>
      <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
    </View>
  );
}
