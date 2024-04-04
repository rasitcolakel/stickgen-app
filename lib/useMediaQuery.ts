// create a hook to use media query in components to make them responsive in react native without any third party library
import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(
    Dimensions.get("window").width < parseInt(query)
  );

  useEffect(() => {
    const handler = ({ window }: { window: { width: number } }) =>
      setMatches(window.width < parseInt(query));
    Dimensions.addEventListener("change", handler);
    return () => {
      //   Dimensions.removeEventListener("change", handler);
    };
  }, []);

  return matches;
};
