import { forwardRef, useMemo } from "react";
import { Text, TextInput, View } from "react-native";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";

import { cn } from "app/lib/utils";

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {
  label?: string;
  labelClasses?: string;
  inputClasses?: string;
  error?: boolean;
  errorMessage?: string;
}

const Input = forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ className, label, labelClasses, inputClasses, ...props }, ref) => (
    <View className={cn("flex flex-col gap-1.5", className)}>
      {label && <Text className={cn("text-base", labelClasses)}>{label}</Text>}
      <TextInput
        className={cn(
          inputClasses,
          "border border-input py-2.5 px-4 rounded-lg hover:border-primary focus:border-primary",
          props.error ? "border-red-500" : ""
        )}
        {...props}
      />
      {props.error && (
        <Text className="text-xs text-red-500">{props.errorMessage}</Text>
      )}
    </View>
  )
);

type FormInputProps = InputProps & {
  name: string;
  registerOptions?: RegisterOptions;
};

const FormInput = forwardRef<
  React.ElementRef<typeof TextInput>,
  FormInputProps
>(({ className, label, labelClasses, inputClasses, ...props }, ref) => {
  const methods = useFormContext();
  const errors = methods.formState.errors;

  if (!methods) {
    throw new Error("FormInput must be used within a FormProvider");
  }

  const { name } = props;
  const hasError = !!errors[name];
  const errorMessage = (errors[name]?.message as string) || "";

  return (
    <Controller
      control={methods.control}
      name={name}
      render={({ field }) => (
        <Input
          {...field}
          {...props}
          onChangeText={field.onChange}
          error={hasError}
          errorMessage={errorMessage}
        />
      )}
    />
  );
});

export { Input, FormInput };
