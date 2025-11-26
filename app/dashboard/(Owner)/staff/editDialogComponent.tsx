"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { request, requestWithResponse } from "@/lib/request";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

export const formSchema = z.object({
  id: z.string(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  phoneNumber: z.string(),
  branchId: z.string(),
  branchName: z.string(),
});

export function EditDialogComponent({
  open,
  setOpen,
  values,
  restaurantId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  values: {
    id: string;
    name: string;
    phoneNumber: string | null;
    branchId: string;
    branchName: string;
  };
  restaurantId: string;
}) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: values.id,
      name: values.name,
      phoneNumber: values.phoneNumber || "",
      branchId: values.branchId,
      branchName: values.branchName,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await request("/api/staff", "PUT", values);

    setOpen(false);

    toast({
      title: "Staff updated",
    });

    setTimeout(() => {
      router.refresh();
    }, 1000);
  }

  const [branches, setBranches] = useState([]);

  useEffect(() => {
    async function fetchBranches() {
      const response = await requestWithResponse(
        `/api/branches/${restaurantId}`,
        "GET"
      );

      setBranches(response);
    }

    fetchBranches();
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Staff</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Category Name" {...field} />
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
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="branchId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Branch</FormLabel>

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
              <Button type="submit">Update</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
