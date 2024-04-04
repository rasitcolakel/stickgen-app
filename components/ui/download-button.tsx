// generate a download button

import { useMemo, useState } from "react";
import { Button } from "~/components/ui/button";
import { Text } from "~/components/ui/text";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { cn } from "~/lib/utils";
import { View } from "react-native";
import { CheckIcon, Loader2Icon, DownloadIcon } from "~/components/Icons";
type Status = "DONE" | "IN_PROGRESS" | "ERROR";

type DownloadButtonProps = {
  imageUrl: string;
  title?: string;
};

export const DownloadButton = ({ imageUrl, title }: DownloadButtonProps) => {
  const [status, setStatus] = useState<Status>();
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  const downloadSticker = async () => {
    setStatus("IN_PROGRESS");
    if (permissionResponse?.status !== "granted") {
      await requestPermission();
    }

    let fileUri =
      (FileSystem.documentDirectory ?? "") + new Date().getTime() + ".png";
    try {
      const res = await FileSystem.downloadAsync(imageUrl, fileUri);
      await saveFile(res.uri);
    } catch (err) {
      console.log("Download err: ", err);
      setStatus("ERROR");
    }
  };

  const saveFile = async (fileUri: string) => {
    try {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      const album = await MediaLibrary.getAlbumAsync("Download");
      if (album == null) {
        await MediaLibrary.createAlbumAsync("Download", asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }
      setStatus("DONE");
    } catch (err) {
      console.log("Save err: ", err);
      setStatus("ERROR");
    }
  };

  const Icon = useMemo(() => {
    if (status === "DONE") {
      return CheckIcon;
    }
    if (status === "IN_PROGRESS") {
      return Loader2Icon;
    }
    return DownloadIcon;
  }, [status]);

  const color = useMemo(() => {
    if (status === "DONE") {
      return "bg-green-500";
    }
    return "";
  }, [status]);

  const iconClassName = useMemo(() => {
    if (status === "IN_PROGRESS") {
      return "animate-spin";
    }
    return "animate-none";
  }, [status]);

  return (
    <Button
      onPress={downloadSticker}
      variant="default"
      size="sm"
      className={cn("flex flex-row items-center gap-2", color)}
      disabled={status === "IN_PROGRESS"}
    >
      <View
        className={cn(
          "w-6 h-6 rounded-full flex items-center justify-center",
          iconClassName
        )}
      >
        <DownloadIcon
          size={14}
          className={cn("text-primary-foreground", iconClassName)}
        />
      </View>
      <Text className="flex items-center">{title ?? "Download"}</Text>
    </Button>
  );
};
