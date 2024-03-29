import React, { useState } from "react";
import { Alert, View, AppState } from "react-native";
import { supabase } from "app/lib/supabase";
import { FormInput, Input } from "app/components/Input";
import { Button } from "app/components/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "app/components/Card";
import { KeyboardAvoidingView } from "app/components/KeyboardAvoidingView";
import { Divider } from "app/components/Divider";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInInput, signInSchema } from "app/schemas/auth";
import { router } from "expo-router";

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const methods = useForm({
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
            <Divider />
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
            <Divider />
          </CardContent>
          <CardFooter>
            <View className="flex flex-col gap-2 w-full">
              <Button
                title="Sign in"
                disabled={methods.formState.isSubmitting}
                onPress={methods.handleSubmit(signInWithEmail)}
              />
              <Button
                variant="secondary"
                title="Sign up"
                onPress={goToSignUp}
              />
            </View>
          </CardFooter>
        </Card>
      </KeyboardAvoidingView>
    </FormProvider>
  );
}
