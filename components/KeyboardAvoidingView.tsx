import {
  Platform,
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  ScrollView,
} from "react-native";

import { cn } from "~/lib/utils";

export interface KeyboardAvoidingViewProps
  extends React.ComponentPropsWithoutRef<typeof RNKeyboardAvoidingView> {
  scrollEnabled?: boolean;
  scrollViewProps?: React.ComponentPropsWithoutRef<typeof ScrollView>;
}

function KeyboardAvoidingView({
  className,
  scrollEnabled = false,
  ...props
}: KeyboardAvoidingViewProps) {
  if (scrollEnabled) {
    return (
      <RNKeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        {...props}
      >
        <ScrollView {...props.scrollViewProps} className={cn(className)}>
          {props.children}
        </ScrollView>
      </RNKeyboardAvoidingView>
    );
  }

  return (
    <RNKeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className={cn("flex-1", className)}
      {...props}
    />
  );
}

export { KeyboardAvoidingView };
