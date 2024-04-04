import { useFormContext } from "react-hook-form";
import { Text } from "./text";
import { cn } from "~/lib/utils";
import { View } from "react-native";

type Props = {
  children: React.ReactNode;
  name: string;
  label?: string;
  labelClasses?: string;
  inputClasses?: string;
  error?: boolean;
  className?: string;
};

// show form errors and children

const FormField = (props: Props) => {
  const methods = useFormContext();
  const errors = methods.formState.errors;

  if (!methods) {
    throw new Error("FormInput must be used within a FormProvider");
  }

  const { name } = props;
  const hasError = !!errors[name];
  const errorMessage = (errors[name]?.message as string) || "";

  return (
    <View className={cn("w-full", props.className)}>
      {props.label && (
        <Text className={cn("text-muted-foreground pb-1", props.labelClasses)}>
          {props.label}
        </Text>
      )}
      {props.children}
      {hasError && <Text className="text-red-500">{errorMessage}</Text>}
    </View>
  );
};

export { FormField };
