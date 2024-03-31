import "../global.css";
import * as React from "react";
import { router, Slot, Stack } from "expo-router";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { useSetAtom } from "jotai";
import { sessionAtom } from "~/store/auth";
import { supabase } from "~/lib/supabase";

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

function Layout() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isLoaded, setIsLoaded] = React.useState(false);
  const setSession = useSetAtom(sessionAtom);

  const fetchSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      setSession({ session });
    }
  };

  const handleAuthStateChange = (_event: string, session: any) => {
    if (session) {
      if (_event === "SIGNED_IN") {
        setSession({ session });
        router.replace("(tabs)");
      }
    } else {
      router.replace("(auth)/sign-in");
    }
  };

  React.useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem("theme");

      if (!theme) {
        AsyncStorage.setItem("theme", colorScheme);
        setIsLoaded(true);
        return;
      }
      const colorTheme = theme === "dark" ? "dark" : "light";
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);

        setIsLoaded(true);
        return;
      }
      setIsLoaded(true);
    })().finally(() => {
      // SplashScreen.hideAsync();
    });
  }, []);

  React.useEffect(() => {
    fetchSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(handleAuthStateChange);

    return () => subscription.unsubscribe();
  }, []);

  if (!isLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
      <Slot />
    </ThemeProvider>
  );
}

export default Layout;
