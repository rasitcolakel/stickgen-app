import { router } from "expo-router";
import { useEffect } from "react";
import { supabase } from "./lib/supabase";

export default function App() {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("getSession", session);
      if (session) {
        router.replace("(tabs)");
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log("onAuthStateChange", session);
      if (session) {
        router.replace("(tabs)");
      } else {
        router.replace("(auth)/sign-in");
      }
    });
  }, []);

  return <></>;
}
