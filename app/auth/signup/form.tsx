"use client";

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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  email: z.string().email("Invalid email address."),
  name: z.string().min(1, "Name is required"),
  phoneNumber: z.string().min(10, "Phone number is required"),
  age: z.string(),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number.",
    }),
});

type FormData = z.infer<typeof FormSchema>;

export default function FormPage() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      name: "",
      phoneNumber: "",
      age: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log("Submitting form", data);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Process response here
      console.log("Registration Successful", response);
      toast({ title: "Registration Successful" });

      router.push("/");
      router.refresh();
    } catch (error: any) {
      console.error("Registration Failed:", error);
      toast({ title: "Registration Failed", description: error.message });
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] xl:min-h-[800px] h-full">
      <div className="flex items-center justify-center py-12">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto grid w-[350px] gap-6"
          >
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">SignUp</h1>
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="Name"
                      {...field}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="Email"
                      {...field}
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password *</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="Password"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>PhoneNumber *</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="PhoneNumber"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Age</FormLabel>
                  <FormControl>
                    <Input
                      className="text-black"
                      placeholder="Age"
                      {...field}
                      type="number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              SignUp
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
