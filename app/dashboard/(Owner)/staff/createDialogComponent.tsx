"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { request, requestWithResponse } from "@/lib/request";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BranchListResponse } from "@/services/branch/branchList";

export const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  phoneNumber: z.string(),
  branchId: z.string().min(1, "Branch is required"),
  branchName: z.string(),
});

export function DialogComponent({
  children,
  restaurantId,
}: Readonly<{
  children: React.ReactNode;
  restaurantId: string;
}>) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [branches, setBranches] = useState<BranchListResponse[]>([]);

  useEffect(() => {
    async function fetchBranches() {
      const response = await requestWithResponse(
        `/api/branches/${restaurantId}`,
        "GET"
      );

      console.log(response);

      setBranches(response);
    }

    fetchBranches();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      branchId: "",
      branchName: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await request("/api/staff", "POST", values);

    form.reset();

    setOpen(false);

    toast({
      title: "Staff created",
    });

    setTimeout(() => {
      router.refresh();
    }, 1000);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Staff</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
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
                    <Input placeholder="Email" {...field} />
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
                  <FormLabel>PhoneNumber</FormLabel>
                  <FormControl>
                    <Input placeholder="PhoneNumber" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Get branch list and select */}
            <FormField
              control={form.control}
              name="branchId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Branch *</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Branch" />
                    </SelectTrigger>

                    <FormControl>
                      <SelectContent>
                        {branches &&
                          branches.map((branch: any) => {
                            return (
                              <SelectItem key={branch.id} value={branch.id}>
                                {branch.name}
                              </SelectItem>
                            );
                          })}
                      </SelectContent>
                    </FormControl>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex w-full justify-end">
              <Button type="submit">Create</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
