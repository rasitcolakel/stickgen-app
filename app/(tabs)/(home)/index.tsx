import { ScrollView, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import { supabase } from "~/lib/supabase";
import { useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { userIdAtom } from "~/store/auth";
import StickerCard, { Sticker } from "~/components/StickerCard";
import ScreenContainer from "~/components/ui/screen-container";
import RenderStickers from "~/components/RenderStickers";

export default function Tab() {
  const userId = useAtomValue(userIdAtom);

  const [stickers, setStickers] = useState<Sticker[]>([]);

  const getStickers = async () => {
    try {
      const { data, error } = await supabase
        .from("stickers")
        .select("*")
        .order("id", { ascending: false });
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
    setStickers((prevStickers) => {
      return [sticker, ...prevStickers];
    });
  };

  const handleUpdate = (updatedSticker: Sticker) => {
    setStickers((prevStickers) => {
      return prevStickers.map((sticker) => {
        if (sticker.id === updatedSticker.id) {
          return updatedSticker;
        }
        return sticker;
      });
    });
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
    <ScreenContainer className="px-4 flex-1">
      <View className="flex flex-row items-center justify-between w-full">
        <Text className="text-2xl font-bold">Your Stickers</Text>
        <Button
          variant="secondary"
          onPress={() => router.push("(home)/new-sticker")}
        >
          <Text>New Sticker</Text>
        </Button>
      </View>
      <View className="flex-1 w-full">
        <RenderStickers stickers={stickers} />
      </View>
    </ScreenContainer>
  );
}
