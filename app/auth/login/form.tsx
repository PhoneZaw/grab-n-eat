"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { useRestaurantCart } from "@/hooks/useLocalStorage";

const FormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(8, {
    message: "Invalid password.",
  }),
});

type FormData = z.infer<typeof FormSchema>;

export default function LoginForm({ redirectUrl }: { redirectUrl: string }) {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    console.log("Submit login - ", data);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: data.email, password: data.password }),
    });

    if (response.ok) {
      var body = await response.json();
      var user = body.user;

      toast({
        title: "Login Success",
      });

      router.push(redirectUrl);
      router.refresh();
    } else {
      toast({
        title: "Invalid email or password.",
        variant: "destructive",
      });
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] h-full">
      <div className="flex items-center justify-center py-12">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto grid w-[350px] gap-6"
          >
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="Email"
                      {...field}
                      type="text"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="Password"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <p className="text-red-500 text-sm"> {error && error}</p>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </div>
      <div className="hidden bg-muted lg:block relative h-full">
        <Image
          src="/dashboard_login.jpg"
          alt="Image"
          fill
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
