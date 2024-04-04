import React from "react";
import { FlashList } from "@shopify/flash-list";
import StickerCard, { Sticker } from "./StickerCard";
import { router } from "expo-router";
import { useMediaQuery } from "~/lib/useMediaQuery";

type Props = {
  stickers: Sticker[];
};

const RenderStickers = ({ stickers }: Props) => {
  const isSmallScreen = useMediaQuery("400");

  const goToSticker = (sticker: Sticker) => {
    router.push(`(home)/sticker/${sticker.id}`);
  };

  return (
    <FlashList
      renderItem={({ item }) => (
        <RenderSticker item={item} onPress={() => goToSticker(item)} />
      )}
      estimatedItemSize={110}
      data={stickers}
      numColumns={isSmallScreen ? 3 : 4}
      showsVerticalScrollIndicator={false}
    />
  );
};

const RenderSticker = React.memo(
  ({ item, onPress }: { item: Sticker; onPress: () => void }) => {
    return <StickerCard sticker={item} onStickerClick={onPress} />;
  },
  (prevProps, nextProps) => {
    return (
      prevProps.item.id === nextProps.item.id &&
      prevProps.item.status === nextProps.item.status
    );
  }
);

export default RenderStickers;
