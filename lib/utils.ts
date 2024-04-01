import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getStickerImageUrl = (image: string) =>
  `${process.env.EXPO_PUBLIC_SUPABASE_STORAGE_URL}${image}`;
