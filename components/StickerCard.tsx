import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import React, { useCallback, useMemo } from "react";
import { CheckIcon, XIcon, Loader2Icon } from "lucide-react-native";
import { cn, getStickerImageUrl } from "~/lib/utils";
import { Image } from "./ui/image";

export interface Sticker {
  id: number;
  image_url: string;
  request_id: string;
  status: "DONE" | "IN_PROGRESS" | "FAILED";
  sticker_image?: string;
  sticker_image_background_removed?: string;
  user_id: string;
}

type Props = {
  sticker: Sticker;
  onStickerClick?: (sticker: Sticker) => void;
};

const StickerCard = ({ sticker, onStickerClick }: Props) => {
  const getStickerImage = useCallback(() => {
    if (sticker.status === "DONE" && sticker.sticker_image) {
      return sticker.sticker_image;
    }
    return getStickerImageUrl(sticker.image_url);
  }, [sticker]);

  const Icon = useMemo(() => {
    if (sticker.status === "DONE") {
      return CheckIcon;
    }
    if (sticker.status === "IN_PROGRESS") {
      return Loader2Icon;
    }
    return XIcon;
  }, [sticker]);

  const stickerClassName = useMemo(() => {
    if (sticker.status === "DONE") {
      return "bg-green-500";
    }
    if (sticker.status === "IN_PROGRESS") {
      return "bg-blue-500 animate-spin";
    }
    return "bg-red-500";
  }, [sticker]);

  const imageContainerClassName = useMemo(() => {
    if (sticker.status === "FAILED") {
      return "opacity-75";
    }
    return "opacity-100";
  }, [sticker]);

  return (
    <View
      className={cn(
        "flex flex-col items-center justify-center gap-2 w-full h-32"
      )}
      key={sticker.id}
    >
      <TouchableWithoutFeedback
        onPress={() => onStickerClick?.(sticker)}
        disabled={!onStickerClick || sticker.status !== "DONE"}
      >
        <View className="relative" key={sticker.id}>
          <View
            className={cn(
              "w-6 h-6 rounded-full absolute right-1 top-1 z-10 text-white flex items-center justify-center",
              stickerClassName
            )}
          >
            <Icon color="white" size="16px" />
          </View>
          <Image
            source={getStickerImage()}
            cachePolicy="disk"
            className={cn("w-28 h-28 rounded-md", imageContainerClassName)}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default StickerCard;

const styles = StyleSheet.create({});
