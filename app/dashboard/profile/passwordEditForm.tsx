"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { request, requestWithResponse } from "@/lib/request";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";

export const passwordFormSchema = z.object({
  email: z.string(),
  currentPassword: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  newPassword: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function PasswordEditForm({ email }: { email: string }) {
  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      email: email,
      currentPassword: "",
      newPassword: "",
    },
  });

  async function onPasswordSubmit(values: z.infer<typeof passwordFormSchema>) {
    var response = await requestWithResponse(
      "/api/auth/dashboard/change-password",
      "POST",
      values
    );

    if (response.status === 401) {
      alert("Invalid password");
      return;
    }
    passwordForm.reset();

    toast({
      title: "Password changed",
    });
  }

  return (
    <Card x-chunk="dashboard-04-chunk-2">
      <CardHeader>
        <CardTitle>Password</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...passwordForm}>
          <form
            onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
            className="space-y-8"
          >
            <FormField
              control={passwordForm.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Current Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={passwordForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="New Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex w-full">
              <Button type="submit" disabled={!passwordForm.formState.isDirty}>
                Save
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
