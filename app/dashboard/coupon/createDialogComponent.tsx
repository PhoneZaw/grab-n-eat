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
import { request } from "@/lib/request";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

export const formSchema = z.object({
  code: z.string().min(3, {
    message: "Coupon must be at least 3 characters.",
  }),
  discountPercentage: z
    .number()
    .min(1, {
      message: "Discount percentage must be at least 1",
    })
    .max(100, {
      message: "Discount percentage must be at most 100",
    }),
  branchId: z.string(),
  expiryDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Expiration date is required",
  }),
});

export function DialogComponent({
  children,
  selectedBranchId,
}: Readonly<{
  children: React.ReactNode;
  selectedBranchId: string;
}>) {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
      discountPercentage: 0,
      branchId: selectedBranchId,
      expiryDate: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formattedValues = {
      ...values,
      expiryDate: new Date(values.expiryDate).toISOString(),
    };
    await request("/api/coupons", "POST", formattedValues);

    form.reset();
    setOpen(false);

    toast({
      title: "Coupon created successfully",
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
          <DialogTitle>Create Coupon</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code *</FormLabel>
                  <FormControl>
                    <Input placeholder="Coupon Code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discountPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Percentage *</FormLabel>

                  <FormControl>
                    <div className="relative">
                      <Input
                        type="number"
                        placeholder="Discount Percentage"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="pr-8"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                        %
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date *</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) =>
                          field.onChange(date ? date.toISOString() : "")
                        }
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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
