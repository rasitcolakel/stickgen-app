import React from "react";
import ScreenContainer from "~/components/ui/screen-container";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { View } from "~/components/primitives/slot";
import { supabase } from "~/lib/supabase";
import { useColorScheme } from "~/lib/useColorScheme";

type Props = {};

const Profile = (props: Props) => {
  const { toggleColorScheme } = useColorScheme();
  const onLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <ScreenContainer className="flex flex-col items-center justify-center gap-2 h-screen px-4">
      <View>
        <Text className="text-2xl font-bold">Profile</Text>
      </View>
      <Button
        variant="ghost"
        className="w-full"
        onPress={() => toggleColorScheme()}
      >
        <Text>Change Theme</Text>
      </Button>
      <Button onPress={onLogout} variant="destructive" className="w-full">
        <Text>Logout</Text>
      </Button>
    </ScreenContainer>
  );
};

export default Profile;
