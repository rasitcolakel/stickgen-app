import { View } from "react-native";
import { router } from "expo-router";
import { useColorScheme } from "~/lib/useColorScheme";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { supabase } from "~/lib/supabase";
import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { userIdAtom } from "~/store/auth";
import { getStickerImageUrl } from "~/lib/utils";
import { Image } from "react-native";

export interface Sticker {
  id: number;
  image_url: string;
  status: "COMPLETED" | "IN_PROGRESS";
  user_id: string;
}

export default function Tab() {
  const userId = useAtomValue(userIdAtom);

  const [stickers, setStickers] = useState<Sticker[]>([]);

  const getStickers = async () => {
    try {
      const { data, error } = await supabase.from("stickers").select("*");
      if (error) {
        console.error(error);
        return;
      }
      setStickers(data as Sticker[]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInsert = (sticker: Sticker) => {
    setStickers((prevStickers) => [...prevStickers, sticker]);
  };

  const handleUpdate = (updatedSticker: Sticker) => {
    setStickers((prevStickers) =>
      prevStickers.map((sticker) =>
        sticker.id === updatedSticker.id ? updatedSticker : sticker
      )
    );
  };

  const getOnParams = () => ({
    schema: "public",
    table: "stickers",
    filter: `user_id=eq.${userId}`,
  });

  useEffect(() => {
    if (!userId) {
      return;
    }

    getStickers();
    const stickersListener = supabase
      .channel("stickers")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          ...getOnParams(),
        },
        (payload) => {
          const newSticker = payload.new as Sticker;
          handleInsert(newSticker);
        }
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          ...getOnParams(),
        },
        (payload) => {
          const updatedSticker = payload.new as Sticker;
          handleUpdate(updatedSticker);
        }
      )
      .subscribe();

    return () => {
      stickersListener.unsubscribe();
    };
  }, [userId]);

  return (
    <View className="flex flex-col items-center justify-center gap-2">
      <Text className="text-2xl font-bold">Stickers</Text>
      <View className="flex flex-row items-center justify-center gap-2">
        {stickers.map((sticker) => (
          <View
            className="flex flex-col items-center justify-center gap-2"
            key={sticker.id}
          >
            <Image
              source={{ uri: getStickerImageUrl(sticker.image_url) }}
              className="w-24 h-24 rounded-full"
            />
            <Text>{sticker.status}</Text>
          </View>
        ))}
      </View>
      <Button
        variant="secondary"
        onPress={() => router.push("(home)/new-sticker")}
      >
        <Text>New Sticker</Text>
      </Button>
    </View>
  );
}
