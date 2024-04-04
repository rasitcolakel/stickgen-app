import { View, Text, ViewProps } from "react-native";
import React from "react";
import Constants from "expo-constants";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = ViewProps & {
  className?: string;
  children?: React.ReactNode;
};

const ScreenContainer = (props: Props) => {
  const statusBarHeight = Constants.statusBarHeight;
  console.log(statusBarHeight);
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <View {...props}>{props.children}</View>
    </SafeAreaView>
  );
};

export default ScreenContainer;
