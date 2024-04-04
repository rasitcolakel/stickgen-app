import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const FAL_KEY = Deno.env.get("FAL_KEY");
const STORAGE_URL = Deno.env.get("STORAGE_URL");
const INSERT_EDGE_FUNCTION_URL = Deno.env.get("INSERT_EDGE_FUNCTION_URL");

const supabaseClient = createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
);

Deno.serve(async (req) => {
  const reqBody = await req.json();
  console.log("reqBody", reqBody);

  if (reqBody.type === "INSERT") {
    const newSticker = reqBody.record;
    console.log("newSticker", newSticker);

    const result = await fetch(
      `https://queue.fal.run/fal-ai/face-to-sticker?fal_webhook=${INSERT_EDGE_FUNCTION_URL}`,
      {
        method: "POST",
        headers: {
          Authorization: `Key ${FAL_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_url: `${STORAGE_URL}/${newSticker.image_url}`,
          prompt: newSticker?.prompt ?? "Turn your face into a sticker",
        }),
      }
    );

    const body = await result.json();

    let { data: updateData, error } = await supabaseClient
      .from("stickers")
      .update({
        request_id: body.request_id,
      })
      .eq("id", newSticker.id)
      .select();

    console.log("updateData", updateData);
    console.log("error", error);

    return new Response(
      JSON.stringify({
        body,
        newSticker,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } else {
    const { sticker_image, sticker_image_background_removed } = reqBody.payload;
    let { data: updateData, error } = await supabaseClient
      .from("stickers")
      .update(
        reqBody.status === "OK"
          ? {
              sticker_image: sticker_image?.url,
              sticker_image_background_removed:
                sticker_image_background_removed?.url,
              status: "DONE",
            }
          : {
              status: "FAILED",
            }
      )
      .eq("request_id", reqBody.request_id)
      .select();

    return new Response(JSON.stringify(updateData), {
      headers: { "Content-Type": "application/json" },
    });
  }
});
