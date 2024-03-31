import { z } from "zod";

export const newStickerSchema = z.object({
  image: z.string(),
  prompt: z.string(),
});

export type NewStickerInput = z.infer<typeof newStickerSchema>;
