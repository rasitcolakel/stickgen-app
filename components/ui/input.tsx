import { forwardRef, useMemo } from "react";
import { TextInput, View } from "react-native";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";
import { cn } from "~/lib/utils";
import { Text } from "./text";

export interface InputProps
  extends React.ComponentPropsWithoutRef<typeof TextInput> {
  label?: string;
  labelClasses?: string;
  inputClasses?: string;
  error?: boolean;
  errorMessage?: string;
}

const Input = forwardRef<
  React.ElementRef<typeof TextInput>,
  React.ComponentPropsWithoutRef<typeof TextInput> & InputProps
>(({ className, placeholderClassName, error, errorMessage, ...props }, ref) => {
  return (
    <View className="w-full">
      <Text className={cn("text-muted-foreground pb-1", props.labelClasses)}>
        {props.placeholder}
      </Text>
      <TextInput
        ref={ref}
        className={cn(
          "web:flex h-10 native:h-12 web:w-full rounded-md border border-input bg-background px-3 web:py-2 text-base lg:text-sm native:text-lg native:leading-[1.25] text-foreground placeholder:text-muted-foreground web:ring-offset-background file:border-0 file:bg-transparent file:font-medium web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2",
          props.editable === false && "opacity-50 web:cursor-not-allowed",
          className
        )}
        placeholderClassName={cn("text-muted-foreground", placeholderClassName)}
        {...props}
      />
      {error && <Text className="text-red-500">{errorMessage}</Text>}
    </View>
  );
});

type FormInputProps = InputProps & {
  name: string;
  registerOptions?: RegisterOptions;
};

const FormInput = forwardRef<
  React.ElementRef<typeof TextInput>,
  React.ComponentPropsWithoutRef<typeof TextInput> & FormInputProps
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
