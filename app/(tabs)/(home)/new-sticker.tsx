import { View, Image } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Button } from "~/components/ui/button";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FormInput } from "~/components/ui/input";
import { Text } from "~/components/ui/text";
import { supabase } from "~/lib/supabase";
import { useAtomValue } from "jotai";
import { userIdAtom } from "~/store/auth";
import { NewStickerInput, newStickerSchema } from "~/schemas/stickers";

const NewSticker = () => {
  const userId = useAtomValue(userIdAtom);
  const methods = useForm<NewStickerInput>({
    resolver: zodResolver(newStickerSchema),
    mode: "onChange",
  });

  const image = methods.watch("image");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.3,
    });

    if (!result.canceled) {
      methods.setValue("image", result.assets[0].uri);
    }
  };

  const renderImage = () => {
    if (image) {
      return (
        <Image source={{ uri: image }} className="rounded-full w-48 h-48 m-2" />
      );
    }

    return (
      <View className="w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center">
        <FontAwesome name="image" size={48} />
      </View>
    );
  };

  const handleUpload = async (inputs: NewStickerInput) => {
    const arraybuffer = await fetch(inputs.image).then((res) =>
      res.arrayBuffer()
    );

    const fileExt = image.split(".").pop()?.toLowerCase() ?? "jpeg";
    const path = `${userId}/${Date.now()}.${fileExt}`;
    const { data, error: uploadError } = await supabase.storage
      .from("upload")
      .upload(path, arraybuffer, {
        contentType: `image/${fileExt}`,
      });

    if (uploadError) {
      console.error(uploadError);
      return;
    }
  };

  return (
    <View className="container py-4">
      <FormProvider {...methods}>
        <View className="flex items-center justify-center w-full gap-4">
          <Text className="text-2xl font-bold text-center">New Sticker</Text>
          <FormInput name="prompt" placeholder="Prompt" className="w-full" />
          <View className="flex flex-row items-center justify-center w-full gap-4">
            {renderImage()}
            <Button onPress={pickImage} variant="secondary">
              <Text>Choose Image</Text>
            </Button>
          </View>
          <Button
            className="w-full"
            disabled={methods.formState.isSubmitting}
            onPress={methods.handleSubmit(handleUpload)}
          >
            <Text className="text-white">Upload</Text>
          </Button>
        </View>
      </FormProvider>
    </View>
  );
};

export default NewSticker;
