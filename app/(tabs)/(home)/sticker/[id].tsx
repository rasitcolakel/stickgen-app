import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";

import { Text, View } from "react-native";
import { Sticker } from "~/components/StickerCard";
import { supabase } from "~/lib/supabase";

import { Button } from "~/components/ui/button";
import { DownloadButton } from "~/components/ui/download-button";
import { Image } from "~/components/ui/image";

export default function Page() {
  const { id } = useLocalSearchParams();

  const [sticker, setSticker] = useState<Sticker | null>(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    supabase
      .from("stickers")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
          return;
        }
        setSticker(data as Sticker);
      });
  }, [id]);

  return (
    <View className="container py-4">
      {sticker && (
        <View className="flex w-full gap-4 flex-col items-center">
          <Image
            source={sticker.sticker_image}
            cachePolicy="disk"
            className="rounded-lg w-64 h-64 xs:w-24"
          />
          {sticker.sticker_image && (
            <DownloadButton imageUrl={sticker.sticker_image} title="Download" />
          )}
          <Image
            source={sticker.sticker_image_background_removed}
            cachePolicy="disk"
            className="rounded-lg w-64 h-64"
          />
          {sticker.sticker_image_background_removed && (
            <DownloadButton
              imageUrl={sticker.sticker_image_background_removed}
              title="Download Background Removed"
            />
          )}
        </View>
      )}
    </View>
  );
}
