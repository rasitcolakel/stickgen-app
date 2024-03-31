import React, { useState } from "react";
import { Alert, View, AppState } from "react-native";
import { supabase } from "~/lib/supabase";
import { FormInput, Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { KeyboardAvoidingView } from "~/components/KeyboardAvoidingView";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInInput, signInSchema } from "~/schemas/auth";
import { router } from "expo-router";
import { Text } from "~/components/ui/text";
import { useColorScheme } from "~/lib/useColorScheme";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const { toggleColorScheme } = useColorScheme();
  const methods = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
  });

  async function signInWithEmail(data: SignInInput) {
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) Alert.alert(error.message);
  }

  const goToSignUp = () => {
    router.push("sign-up");
  };

  return (
    <FormProvider {...methods}>
      <KeyboardAvoidingView className="justify-center container">
        <Card className="w-full gap-4 py-4">
          <CardHeader className="gap-2">
            <CardTitle className="text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Sign in to your account with your email and password.
            </CardDescription>
          </CardHeader>
          <CardContent className="gap-2 py-0">
            <FormInput
              name="email"
              label="Email"
              placeholder="Email"
              autoCapitalize={"none"}
              keyboardType={"email-address"}
            />
            <FormInput
              name="password"
              label="Password"
              placeholder="Password"
              secureTextEntry={true}
            />
          </CardContent>
          <CardFooter>
            <View className="flex flex-col gap-2 w-full">
              <Button
                disabled={methods.formState.isSubmitting}
                onPress={methods.handleSubmit(signInWithEmail)}
              >
                <Text>Sign In</Text>
              </Button>
              <Button variant="secondary" onPress={goToSignUp}>
                <Text>Sign Up</Text>
              </Button>

              <Button variant="secondary" onPress={() => toggleColorScheme()}>
                <Text>Theme</Text>
              </Button>
            </View>
          </CardFooter>
        </Card>
      </KeyboardAvoidingView>
    </FormProvider>
  );
}
