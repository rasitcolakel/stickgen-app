import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme as useNativeWindColorScheme } from "nativewind";
import { setAndroidNavigationBar } from "./android-navigation-bar";

export function useColorScheme() {
  const {
    colorScheme,
    setColorScheme,
    toggleColorScheme: nativeToggleColorScheme,
  } = useNativeWindColorScheme();

  const toggleColorScheme = async () => {
    const newTheme = colorScheme === "dark" ? "light" : "dark";
    await AsyncStorage.setItem("theme", newTheme);
    await setAndroidNavigationBar(newTheme);
    nativeToggleColorScheme();
  };
  return {
    colorScheme: colorScheme ?? "dark",
    isDarkColorScheme: colorScheme === "dark",
    setColorScheme,
    toggleColorScheme,
  };
}
