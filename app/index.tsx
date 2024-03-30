import { router } from "expo-router";
import { useEffect } from "react";
import { supabase } from "app/lib/supabase";
import { useSetAtom } from "jotai";
import { sessionAtom } from "./store/auth";

export default function App() {
  const setSession = useSetAtom(sessionAtom);

  const fetchSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      router.replace("(tabs)");
      setSession({ session });
    }
  };

  const handleAuthStateChange = (_event: string, session: any) => {
    if (_event === "SIGNED_IN") {
      setSession({ session });
    }
    if (session) {
      router.replace("(tabs)");
    } else {
      router.replace("(auth)/sign-in");
    }
  };

  useEffect(() => {
    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    return () => subscription.unsubscribe();
  }, []);

  return <></>;
}
