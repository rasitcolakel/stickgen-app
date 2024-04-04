import { cssInterop } from "nativewind";
import { Image as ExpoImage } from "expo-image";

export const Image = cssInterop(ExpoImage, {
  className: "style",
});
